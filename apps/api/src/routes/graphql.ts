import { Router } from "express";
import { z } from "zod";
import { agentRuns, applications, auditEvents, candidates, jobs, matchResults, users } from "../config/seed.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { ApiError } from "../middleware/errors.js";
import { runRecruiterAgent } from "../services/agentWorkflow.js";

const graphqlRequestSchema = z.object({
  query: z.string().min(1),
  variables: z.record(z.unknown()).optional().default({})
});

const candidateInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  location: z.string().optional().default(""),
  headline: z.string().min(2),
  resumeText: z.string().min(20),
  parsedSkills: z.array(z.string()).min(1),
  yearsExp: z.number().min(0),
  source: z.string().min(2),
  jobId: z.string().optional()
});

const jobInputSchema = z.object({
  title: z.string().min(3),
  department: z.string().min(2),
  location: z.string().min(2),
  description: z.string().min(20),
  requirements: z.array(z.string()).min(1),
  niceToHave: z.array(z.string()).default([])
});

const stageInputSchema = z.object({
  applicationId: z.string(),
  stage: z.enum(["APPLIED", "SCREEN", "IN_REVIEW", "SHORTLISTED", "INTERVIEW", "OFFER", "REJECTED"]),
  note: z.string().optional()
});

export const graphqlSchema = `# RecruitOps AI portfolio GraphQL schema
type Query {
  jobs: [Job!]!
  job(id: ID!): Job
  candidates(search: String, stage: CandidateStage, jobId: ID): [CandidateApplication!]!
  candidate(id: ID!): Candidate
  applications(jobId: ID, stage: CandidateStage): [Application!]!
  agentRuns(applicationId: ID): [AgentRun!]!
  auditEvents(resourceId: ID): [AuditEvent!]!
}

type Mutation {
  runCandidateAgent(applicationId: ID!): AgentRun!
  updateApplicationStage(applicationId: ID!, stage: CandidateStage!, note: String): Application!
  createCandidate(input: CandidateInput!): Candidate!
  createJob(input: JobInput!): Job!
}`;

const operationAliases = [
  "jobs",
  "job",
  "candidates",
  "candidate",
  "applications",
  "agentRuns",
  "auditEvents",
  "runCandidateAgent",
  "updateApplicationStage",
  "createCandidate",
  "createJob"
] as const;

type OperationName = (typeof operationAliases)[number];

function requestedOperation(query: string): OperationName {
  const normalized = query.replace(/\s+/g, " ");
  const match = operationAliases.find((name) => new RegExp(`\\b${name}\\b`).test(normalized));
  if (!match) {
    throw new ApiError(400, "Unsupported GraphQL operation");
  }
  return match;
}

function rowsForCandidates(variables: Record<string, unknown>) {
  const search = String(variables.search ?? "").toLowerCase();
  const stage = variables.stage ? String(variables.stage) : undefined;
  const jobId = variables.jobId ? String(variables.jobId) : undefined;

  return applications
    .filter((application) => !jobId || application.jobId === jobId)
    .filter((application) => !stage || application.stage === stage)
    .map((application) => {
      const candidate = candidates.find((item) => item.id === application.candidateId);
      const job = jobs.find((item) => item.id === application.jobId);
      const match = matchResults.find((item) => item.applicationId === application.id);
      const agentRun = agentRuns.find((item) => item.applicationId === application.id);
      return candidate && job ? { application, candidate, job, match, agentRun } : null;
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .filter((row) => {
      if (!search) return true;
      return [row.candidate.name, row.candidate.email, row.candidate.headline, row.candidate.parsedSkills.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
}

function runAgent(applicationId: string, actorId: string) {
  const application = applications.find((item) => item.id === applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  const candidate = candidates.find((item) => item.id === application.candidateId);
  const job = jobs.find((item) => item.id === application.jobId);
  if (!candidate || !job) {
    throw new ApiError(404, "Candidate or job not found");
  }

  const { match, agentRun, auditEvent } = runRecruiterAgent({ application, candidate, job, actorId });
  const matchIndex = matchResults.findIndex((item) => item.applicationId === applicationId);
  const runIndex = agentRuns.findIndex((item) => item.applicationId === applicationId);

  if (matchIndex >= 0) matchResults[matchIndex] = match;
  else matchResults.push(match);

  if (runIndex >= 0) agentRuns[runIndex] = agentRun;
  else agentRuns.push(agentRun);

  auditEvents.push(auditEvent);
  return agentRun;
}

export const graphqlRouter = Router();

graphqlRouter.use(requireAuth);

graphqlRouter.get("/schema", (_req, res) => {
  res.type("text/plain").send(graphqlSchema);
});

graphqlRouter.post("/", (req, res) => {
  const { query, variables } = graphqlRequestSchema.parse(req.body);
  const operation = requestedOperation(query);
  const actorId = req.user?.id ?? users[0]!.id;

  switch (operation) {
    case "jobs":
      res.json({ data: { jobs } });
      return;
    case "job":
      res.json({ data: { job: jobs.find((item) => item.id === String(variables.id)) ?? null } });
      return;
    case "candidates":
      res.json({ data: { candidates: rowsForCandidates(variables) } });
      return;
    case "candidate":
      res.json({ data: { candidate: candidates.find((item) => item.id === String(variables.id)) ?? null } });
      return;
    case "applications":
      res.json({
        data: {
          applications: applications.filter((item) => {
            const matchesJob = !variables.jobId || item.jobId === String(variables.jobId);
            const matchesStage = !variables.stage || item.stage === String(variables.stage);
            return matchesJob && matchesStage;
          })
        }
      });
      return;
    case "agentRuns":
      res.json({
        data: {
          agentRuns: agentRuns.filter((item) => !variables.applicationId || item.applicationId === String(variables.applicationId))
        }
      });
      return;
    case "auditEvents":
      res.json({
        data: {
          auditEvents: auditEvents.filter((item) => !variables.resourceId || item.resourceId === String(variables.resourceId))
        }
      });
      return;
    case "runCandidateAgent": {
      requireRole("ADMIN", "RECRUITER")(req, res, () => undefined);
      const applicationId = String(variables.applicationId ?? "");
      res.json({ data: { runCandidateAgent: runAgent(applicationId, actorId) } });
      return;
    }
    case "updateApplicationStage": {
      requireRole("ADMIN", "RECRUITER", "HIRING_MANAGER")(req, res, () => undefined);
      const payload = stageInputSchema.parse(variables);
      const application = applications.find((item) => item.id === payload.applicationId);
      if (!application) {
        throw new ApiError(404, "Application not found");
      }
      application.stage = payload.stage;
      auditEvents.push({
        id: `audit_stage_${payload.applicationId}_${Date.now()}`,
        actorId,
        action: "APPLICATION_STAGE_UPDATED",
        resourceType: "APPLICATION",
        resourceId: payload.applicationId,
        metadata: { stage: payload.stage, note: payload.note ?? null },
        createdAt: new Date().toISOString()
      });
      res.json({ data: { updateApplicationStage: application } });
      return;
    }
    case "createCandidate": {
      requireRole("ADMIN", "RECRUITER")(req, res, () => undefined);
      const payload = candidateInputSchema.parse(variables.input);
      const { jobId, ...candidatePayload } = payload;
      const candidate = { id: `cand_${crypto.randomUUID()}`, ...candidatePayload };
      const application = {
        id: `app_${crypto.randomUUID()}`,
        jobId: jobId ?? jobs[0]!.id,
        candidateId: candidate.id,
        stage: "APPLIED" as const,
        appliedAt: new Date().toISOString()
      };
      candidates.push(candidate);
      applications.push(application);
      res.status(201).json({ data: { createCandidate: candidate } });
      return;
    }
    case "createJob": {
      requireRole("ADMIN", "RECRUITER")(req, res, () => undefined);
      const payload = jobInputSchema.parse(variables.input);
      const job = {
        id: `job_${crypto.randomUUID()}`,
        ...payload,
        status: "OPEN" as const,
        createdAt: new Date().toISOString()
      };
      jobs.push(job);
      res.status(201).json({ data: { createJob: job } });
      return;
    }
  }
});
