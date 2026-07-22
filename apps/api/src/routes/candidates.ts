import { Router } from "express";
import { z } from "zod";
import { applications, candidates, jobs, matchResults } from "../config/seed.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { ApiError } from "../middleware/errors.js";
import { scoreCandidate } from "../services/scoring.js";

const createCandidateSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  location: z.string().optional().default(""),
  headline: z.string().min(2).max(160),
  resumeText: z.string().min(20),
  parsedSkills: z.array(z.string().min(1)).min(1),
  yearsExp: z.number().min(0).max(60),
  source: z.string().min(2).max(80)
});

const updateStageSchema = z.object({
  stage: z.enum(["APPLIED", "SCREEN", "IN_REVIEW", "SHORTLISTED", "INTERVIEW", "OFFER", "REJECTED"]),
  note: z.string().max(500).optional()
});

export const candidatesRouter = Router();

candidatesRouter.use(requireAuth);

candidatesRouter.get("/", (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const stage = String(req.query.stage ?? "ALL");
  const source = String(req.query.source ?? "ALL");
  const jobId = String(req.query.jobId ?? jobs[0]?.id);

  const rows = applications
    .filter((application) => application.jobId === jobId)
    .filter((application) => stage === "ALL" || application.stage === stage)
    .map((application) => {
      const candidate = candidates.find((item) => item.id === application.candidateId);
      const match = matchResults.find((item) => item.applicationId === application.id);
      return candidate ? { application, candidate, match } : null;
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .filter((row) => source === "ALL" || row.candidate.source === source)
    .filter((row) => {
      if (!search) return true;
      return [
        row.candidate.name,
        row.candidate.email,
        row.candidate.headline,
        row.candidate.parsedSkills.join(" ")
      ].some((value) => value.toLowerCase().includes(search));
    });

  res.json({ data: rows, total: rows.length });
});

candidatesRouter.post("/", requireRole("ADMIN", "RECRUITER"), (req, res) => {
  const payload = createCandidateSchema.parse(req.body);
  if (candidates.some((candidate) => candidate.email === payload.email)) {
    throw new ApiError(409, "Candidate email already exists");
  }
  const candidate = { id: `cand_${crypto.randomUUID()}`, ...payload };
  candidates.push(candidate);
  const application = {
    id: `app_${crypto.randomUUID()}`,
    jobId: jobs[0]!.id,
    candidateId: candidate.id,
    stage: "APPLIED" as const,
    appliedAt: new Date().toISOString()
  };
  applications.push(application);
  res.status(201).json({ data: { candidate, application } });
});

candidatesRouter.patch("/applications/:applicationId/stage", requireRole("ADMIN", "RECRUITER", "HIRING_MANAGER"), (req, res) => {
  const payload = updateStageSchema.parse(req.body);
  const application = applications.find((item) => item.id === req.params.applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  application.stage = payload.stage;
  res.json({ data: application, audit: { action: "STAGE_UPDATED", note: payload.note ?? null } });
});

candidatesRouter.post("/applications/:applicationId/score", requireRole("ADMIN", "RECRUITER"), (req, res) => {
  const application = applications.find((item) => item.id === req.params.applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  const candidate = candidates.find((item) => item.id === application.candidateId);
  const job = jobs.find((item) => item.id === application.jobId);
  if (!candidate || !job) {
    throw new ApiError(404, "Candidate or job not found");
  }

  const result = scoreCandidate(candidate, job, application.id);
  const existingIndex = matchResults.findIndex((item) => item.applicationId === application.id);
  if (existingIndex >= 0) {
    matchResults[existingIndex] = result;
  } else {
    matchResults.push(result);
  }
  res.json({ data: result });
});
