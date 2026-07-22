import { describe, expect, it } from "vitest";
import { scoreCandidate } from "./scoring.js";
import type { Candidate, Job } from "../types/domain.js";

describe("scoreCandidate", () => {
  const job: Job = {
    id: "job",
    title: "Fullstack Engineer",
    department: "Engineering",
    location: "Remote",
    status: "OPEN",
    description: "Build fullstack product workflows",
    requirements: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    niceToHave: ["AWS"],
    createdAt: new Date().toISOString()
  };

  it("scores strong matches higher than weak matches", () => {
    const strong: Candidate = {
      id: "strong",
      name: "Strong Candidate",
      email: "strong@example.com",
      phone: "",
      location: "",
      headline: "Fullstack Engineer",
      resumeText: "",
      parsedSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      yearsExp: 4,
      source: "LinkedIn"
    };
    const weak = { ...strong, id: "weak", parsedSkills: ["HTML"], yearsExp: 1 };

    expect(scoreCandidate(strong, job, "app1").score).toBeGreaterThan(scoreCandidate(weak, job, "app2").score);
    expect(scoreCandidate(strong, job, "app1").missingSkills).toEqual([]);
  });
});
