export type Role = "ADMIN" | "RECRUITER" | "HIRING_MANAGER" | "VIEWER";

export type CandidateStage =
  | "APPLIED"
  | "SCREEN"
  | "IN_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: "OPEN" | "CLOSED";
  description: string;
  requirements: string[];
  niceToHave: string[];
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  resumeText: string;
  parsedSkills: string[];
  yearsExp: number;
  source: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  stage: CandidateStage;
  appliedAt: string;
}

export interface MatchResult {
  id: string;
  applicationId: string;
  score: number;
  summary: string;
  strengths: string[];
  risks: string[];
  missingSkills: string[];
  modelProvider: string;
  modelVersion: string;
  createdAt: string;
}

export interface AgentToolCall {
  id: string;
  name: "parse_resume" | "extract_skills" | "score_job_fit" | "generate_recommendation" | "write_audit_event";
  status: "SUCCEEDED" | "SKIPPED";
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  latencyMs: number;
}

export interface AgentRun {
  id: string;
  applicationId: string;
  prompt: string;
  recommendation: string;
  confidence: number;
  fitScore: number;
  toolCalls: AgentToolCall[];
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RecruiterUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
