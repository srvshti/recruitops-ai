import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { applications, candidates, jobs, matchResults } from "./config/seed.js";
import { errorHandler } from "./middleware/errors.js";
import { authRouter } from "./routes/auth.js";
import { candidatesRouter } from "./routes/candidates.js";
import { healthRouter } from "./routes/health.js";
import { jobsRouter } from "./routes/jobs.js";
import { scoreCandidate } from "./services/scoring.js";

jobs.forEach((job) => {
  applications
    .filter((application) => application.jobId === job.id)
    .forEach((application) => {
      const candidate = candidates.find((item) => item.id === application.candidateId);
      if (candidate && !matchResults.some((match) => match.applicationId === application.id)) {
        matchResults.push(scoreCandidate(candidate, job, application.id));
      }
    });
});

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/candidates", candidatesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "NOT_FOUND", message: "Route not found" });
});
app.use(errorHandler);
