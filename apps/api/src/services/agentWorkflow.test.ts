import { describe, expect, it } from "vitest";
import type { Application, Candidate, Job } from "../types/domain.js";
import { runRecruiterAgent } from "./agentWorkflow.js";

describe("runRecruiterAgent", () => {
  const job: Job = {
    id: "job_ai_builder",
    title: "AI Builder Engineer",
    department: "Agent Platform",
    location: "Bangalore",
    status: "OPEN",
    description: "Build AI agents",
    requirements: ["React", "TypeScript", "Python", "GraphQL", "Prompt Engineering"],
    niceToHave: ["Apex", "Agentforce"],
    createdAt: new Date().toISOString()
  };

  const candidate: Candidate = {
    id: "cand_ai",
    name: "AI Candidate",
    email: "ai@example.com",
    phone: "",
    location: "Bangalore",
    headline: "AI Product Engineer",
    resumeText: "React TypeScript Python GraphQL Prompt Engineering LLM Apex Agentforce agent workflows",
    parsedSkills: ["React", "TypeScript", "Python", "GraphQL", "Prompt Engineering", "LLM", "Apex", "Agentforce"],
    yearsExp: 2,
    source: "Referral"
  };

  const application: Application = {
    id: "app_ai",
    jobId: job.id,
    candidateId: candidate.id,
    stage: "IN_REVIEW",
    appliedAt: new Date().toISOString()
  };

  it("produces structured agent output and 5 auditable tool calls", () => {
    const result = runRecruiterAgent({ application, candidate, job, actorId: "usr_admin" });

    expect(result.match.score).toBeGreaterThanOrEqual(80);
    expect(result.agentRun.toolCalls).toHaveLength(5);
    expect(result.agentRun.prompt).toContain("Return structured JSON only");
    expect(result.agentRun.recommendation).toContain("Shortlist");
    expect(result.auditEvent.metadata).toMatchObject({
      candidateId: candidate.id,
      jobId: job.id,
      toolCallCount: 5
    });
  });
});
