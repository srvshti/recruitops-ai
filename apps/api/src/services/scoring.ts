import type { Candidate, Job, MatchResult } from "../types/domain.js";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#.]/g, "");

export function scoreCandidate(candidate: Candidate, job: Job, applicationId: string): MatchResult {
  const candidateSkills = new Set(candidate.parsedSkills.map(normalize));
  const required = job.requirements.map(normalize);
  const nice = job.niceToHave.map(normalize);
  const requiredMatches = required.filter((skill) => candidateSkills.has(skill));
  const niceMatches = nice.filter((skill) => candidateSkills.has(skill));
  const missingSkills = job.requirements.filter((skill) => !candidateSkills.has(normalize(skill)));

  const requiredScore = required.length === 0 ? 50 : (requiredMatches.length / required.length) * 70;
  const niceScore = nice.length === 0 ? 0 : (niceMatches.length / nice.length) * 10;
  const experienceScore = Math.min(candidate.yearsExp / 4, 1) * 20;
  const score = Math.max(0, Math.min(100, Math.round(requiredScore + niceScore + experienceScore)));

  const strengths = [
    ...requiredMatches.slice(0, 4).map((skill) => `Matches required skill: ${skill}`),
    candidate.yearsExp >= 3 ? `${candidate.yearsExp.toFixed(1)} years of relevant experience` : "Early-career profile with growth signal"
  ];

  const risks = [
    ...missingSkills.slice(0, 3).map((skill) => `Missing or not explicit: ${skill}`),
    candidate.yearsExp < 2 ? "Limited production experience for this role level" : ""
  ].filter(Boolean);

  return {
    id: `match_${applicationId}`,
    applicationId,
    score,
    summary:
      score >= 80
        ? "Strong match for the current job requirements with enough evidence for recruiter review."
        : score >= 60
          ? "Potential match; recommend review for missing skills and seniority alignment."
          : "Lower-confidence match; candidate may fit a different opening or need manual review.",
    strengths,
    risks,
    missingSkills,
    modelProvider: "deterministic",
    modelVersion: "local-explainable-v1",
    createdAt: new Date().toISOString()
  };
}
