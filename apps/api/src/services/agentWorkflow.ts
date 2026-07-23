import type { AgentRun, AgentToolCall, Application, AuditEvent, Candidate, Job, MatchResult } from "../types/domain.js";
import { scoreCandidate } from "./scoring.js";

const now = () => new Date().toISOString();

const ms = (base: number, spread: number, seed: string) => {
  const total = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return base + (total % spread);
};

function promptFor(candidate: Candidate, job: Job) {
  return [
    "You are RecruitOps AI, a recruiter review agent.",
    "Return structured JSON only with fitScore, strengths, risks, missingSkills, and recommendation.",
    `Candidate: ${candidate.name}; headline: ${candidate.headline}; yearsExp: ${candidate.yearsExp}.`,
    `Candidate skills: ${candidate.parsedSkills.join(", ")}.`,
    `Job: ${job.title}; requirements: ${job.requirements.join(", ")}; niceToHave: ${job.niceToHave.join(", ")}.`
  ].join(" ");
}

function call(
  id: string,
  name: AgentToolCall["name"],
  input: Record<string, unknown>,
  output: Record<string, unknown>,
  seed: string
): AgentToolCall {
  return {
    id,
    name,
    status: "SUCCEEDED",
    input,
    output,
    latencyMs: ms(18, 64, `${name}:${seed}`)
  };
}

export function runRecruiterAgent(params: {
  application: Application;
  candidate: Candidate;
  job: Job;
  actorId: string;
}): { match: MatchResult; agentRun: AgentRun; auditEvent: AuditEvent } {
  const { application, candidate, job, actorId } = params;
  const match = scoreCandidate(candidate, job, application.id);
  const prompt = promptFor(candidate, job);
  const topSkills = candidate.parsedSkills.slice(0, 8);
  const recommendation =
    match.score >= 82
      ? "Shortlist for recruiter screen; strong evidence matches the core job profile."
      : match.score >= 65
        ? "Keep in review; validate missing requirements before advancing."
        : "Do not advance automatically; route to manual review or another role.";
  const confidence = Math.max(50, Math.min(96, match.score + (match.missingSkills.length === 0 ? 8 : -4)));

  const toolCalls = [
    call(
      `tool_${application.id}_parse`,
      "parse_resume",
      { candidateId: candidate.id, resumeLength: candidate.resumeText.length },
      { normalizedSections: 4, detectedExperienceYears: candidate.yearsExp },
      application.id
    ),
    call(
      `tool_${application.id}_skills`,
      "extract_skills",
      { candidateId: candidate.id },
      { skillsExtracted: candidate.parsedSkills.length, topSkills },
      candidate.id
    ),
    call(
      `tool_${application.id}_score`,
      "score_job_fit",
      { applicationId: application.id, jobId: job.id, requiredSkills: job.requirements.length },
      { fitScore: match.score, missingSkills: match.missingSkills },
      job.id
    ),
    call(
      `tool_${application.id}_recommend`,
      "generate_recommendation",
      { promptTokensEstimate: Math.ceil(prompt.length / 4), modelProvider: "deterministic-local" },
      { recommendation, confidence },
      `${candidate.id}:${job.id}`
    ),
    call(
      `tool_${application.id}_audit`,
      "write_audit_event",
      { actorId, resourceId: application.id },
      { action: "AGENT_MATCH_EVALUATED", persisted: true },
      actorId
    )
  ];

  const createdAt = now();
  const agentRun: AgentRun = {
    id: `agent_${application.id}`,
    applicationId: application.id,
    prompt,
    recommendation,
    confidence,
    fitScore: match.score,
    toolCalls,
    createdAt
  };

  const auditEvent: AuditEvent = {
    id: `audit_${application.id}_${Date.now()}`,
    actorId,
    action: "AGENT_MATCH_EVALUATED",
    resourceType: "APPLICATION",
    resourceId: application.id,
    metadata: {
      candidateId: candidate.id,
      jobId: job.id,
      fitScore: match.score,
      confidence,
      recommendation,
      toolCallCount: toolCalls.length
    },
    createdAt
  };

  return { match: { ...match, modelProvider: "agentic-deterministic", modelVersion: "structured-prompt-v2" }, agentRun, auditEvent };
}
