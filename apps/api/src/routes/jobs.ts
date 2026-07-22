import { Router } from "express";
import { z } from "zod";
import { jobs } from "../config/seed.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const createJobSchema = z.object({
  title: z.string().min(3).max(120),
  department: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  description: z.string().min(20),
  requirements: z.array(z.string().min(1)).min(1),
  niceToHave: z.array(z.string().min(1)).default([])
});

export const jobsRouter = Router();

jobsRouter.use(requireAuth);

jobsRouter.get("/", (_req, res) => {
  res.json({ data: jobs });
});

jobsRouter.post("/", requireRole("ADMIN", "RECRUITER"), (req, res) => {
  const payload = createJobSchema.parse(req.body);
  const job = {
    id: `job_${crypto.randomUUID()}`,
    ...payload,
    status: "OPEN" as const,
    createdAt: new Date().toISOString()
  };
  jobs.push(job);
  res.status(201).json({ data: job });
});
