import type { AgentRun, Application, AuditEvent, Candidate, CandidateStage, Job, MatchResult, RecruiterUser } from "../types/domain.js";

export const users: RecruiterUser[] = [
  {
    id: "usr_admin",
    email: "alex@recruitops.ai",
    name: "Alex Rivera",
    role: "ADMIN"
  }
];

export const jobs: Job[] = [
  {
    id: "job_ai_builder",
    title: "AI Builder Engineer",
    department: "Agent Platform",
    location: "Bangalore, India",
    status: "OPEN",
    description: "Build customer-facing AI agents with React, TypeScript, Python, GraphQL, prompts, reasoning, and tool workflows.",
    requirements: ["React", "TypeScript", "Python", "GraphQL", "Prompt Engineering", "PostgreSQL", "Testing"],
    niceToHave: ["Apex", "Agentforce", "LLM", "Docker"],
    createdAt: "2026-07-20T10:00:00.000Z"
  },
  {
    id: "job_fullstack",
    title: "Fullstack Product Engineer",
    department: "Product Engineering",
    location: "Remote PST overlap",
    status: "OPEN",
    description: "Own end-to-end product workflows across React, Node.js, APIs, databases, and CI.",
    requirements: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Git", "Testing"],
    niceToHave: ["GraphQL", "AWS", "Prisma", "Docker"],
    createdAt: "2026-07-18T10:00:00.000Z"
  },
  {
    id: "job_backend",
    title: "Backend Platform Engineer",
    department: "Core Services",
    location: "Hyderabad, India",
    status: "OPEN",
    description: "Design reliable APIs, data models, service integrations, and workflow automation.",
    requirements: ["Java", "Python", "REST API", "PostgreSQL", "Docker", "CI/CD", "System Design"],
    niceToHave: ["AWS", "Kafka", "GraphQL", "Observability"],
    createdAt: "2026-07-16T10:00:00.000Z"
  },
  {
    id: "job_data_ai",
    title: "Data and AI Engineer",
    department: "Analytics",
    location: "Bangalore, India",
    status: "OPEN",
    description: "Build data pipelines, model-ready datasets, and AI-assisted analytics workflows.",
    requirements: ["Python", "SQL", "PostgreSQL", "Pandas", "Data Pipeline", "Machine Learning", "Docker"],
    niceToHave: ["Airflow", "Snowflake", "LLM", "RAG"],
    createdAt: "2026-07-15T10:00:00.000Z"
  },
  {
    id: "job_frontend",
    title: "Frontend Engineer",
    department: "Experience",
    location: "Remote",
    status: "OPEN",
    description: "Create production UI workflows with React, TypeScript, accessibility, and API integrations.",
    requirements: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Testing", "Git"],
    niceToHave: ["GraphQL", "Design Systems", "Vite", "Accessibility"],
    createdAt: "2026-07-14T10:00:00.000Z"
  },
  {
    id: "job_devops_ai",
    title: "AI DevOps Automation Engineer",
    department: "Infrastructure",
    location: "Pune, India",
    status: "OPEN",
    description: "Build AI-assisted operational workflows for diagnosis, remediation, and incident auditability.",
    requirements: ["Python", "AWS", "Lambda", "CloudWatch", "Docker", "REST API", "Observability"],
    niceToHave: ["Step Functions", "LLM", "Kubernetes", "Prometheus"],
    createdAt: "2026-07-13T10:00:00.000Z"
  }
];

const profiles = [
  ["jessica", "Jessica Williams", "Senior Frontend Engineer", "San Francisco, CA", "LinkedIn", 4.9, ["React", "TypeScript", "Next.js", "JavaScript", "HTML", "CSS", "Redux", "Jest", "Testing", "Git", "GraphQL"]],
  ["rahul", "Rahul Kumar", "Fullstack Engineer", "Austin, TX", "LinkedIn", 3.2, ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Cypress", "GitHub Actions", "Prisma"]],
  ["aisha", "Aisha Martinez", "AI Product Engineer", "Seattle, WA", "Referral", 2.6, ["React", "TypeScript", "Python", "Prompt Engineering", "GraphQL", "PostgreSQL", "LLM", "Testing"]],
  ["david", "David Lee", "Backend Engineer", "New York, NY", "Indeed", 3.7, ["Java", "Python", "REST API", "PostgreSQL", "Docker", "CI/CD", "System Design"]],
  ["sophie", "Sophie Patel", "Frontend Engineer", "Chicago, IL", "LinkedIn", 2.3, ["React", "CSS", "HTML", "Design Systems", "Storybook", "Git", "Accessibility"]],
  ["tyler", "Tyler Chen", "Frontend Engineer", "Portland, OR", "Company site", 1.5, ["React", "Next.js", "JavaScript", "HTML", "CSS", "Vite"]],
  ["noah", "Noah Brown", "Junior Developer", "Denver, CO", "Indeed", 1.2, ["JavaScript", "HTML", "CSS", "Analytics", "Git"]],
  ["emma", "Emma Stewart", "Frontend Engineer", "Boston, MA", "LinkedIn", 0.8, ["React", "Sass", "HTML", "CSS", "Git"]],
  ["maya", "Maya Iyer", "AI Builder Intern", "Bangalore, India", "Referral", 1.1, ["Python", "TypeScript", "Prompt Engineering", "React", "GraphQL", "PostgreSQL", "Gemini"]],
  ["arjun", "Arjun Menon", "Backend Developer", "Hyderabad, India", "Company site", 2.1, ["Java", "Spring Boot", "REST API", "PostgreSQL", "Docker", "JUnit"]],
  ["nina", "Nina Shah", "Data Engineer", "Mumbai, India", "LinkedIn", 2.8, ["Python", "SQL", "Pandas", "PostgreSQL", "Airflow", "Snowflake", "Docker"]],
  ["owen", "Owen Brooks", "Platform Engineer", "Toronto, Canada", "Indeed", 4.1, ["AWS", "Lambda", "CloudWatch", "Python", "Docker", "Observability", "Step Functions"]],
  ["priya", "Priya Nair", "AI Application Engineer", "Bangalore, India", "LinkedIn", 2.4, ["React", "TypeScript", "Python", "LLM", "Prompt Engineering", "GraphQL", "Testing"]],
  ["liam", "Liam Foster", "Fullstack Developer", "Dublin, Ireland", "Referral", 3.4, ["React", "Node.js", "Express", "PostgreSQL", "REST API", "Docker", "Git"]],
  ["zoe", "Zoe Kim", "Machine Learning Engineer", "Los Angeles, CA", "LinkedIn", 3.1, ["Python", "Machine Learning", "Pandas", "Scikit-learn", "SQL", "Data Pipeline"]],
  ["samir", "Samir Khan", "Cloud Engineer", "Bengaluru, India", "Company site", 2.9, ["AWS", "Lambda", "CloudWatch", "Python", "Docker", "CI/CD", "Prometheus"]],
  ["ella", "Ella Green", "Product Engineer", "London, UK", "Indeed", 2.0, ["React", "TypeScript", "GraphQL", "PostgreSQL", "Testing", "Git"]],
  ["vikram", "Vikram Rao", "Software Engineer", "Chennai, India", "LinkedIn", 1.9, ["Java", "Python", "SQL", "REST API", "Docker", "Data Structures"]],
  ["isabella", "Isabella Cruz", "UX Engineer", "Miami, FL", "Referral", 2.7, ["React", "TypeScript", "Accessibility", "Design Systems", "Testing", "GraphQL"]],
  ["dev", "Dev Patel", "AI Automation Engineer", "Pune, India", "LinkedIn", 2.5, ["Python", "AWS", "Lambda", "Step Functions", "LLM", "Prompt Engineering", "CloudWatch"]],
  ["olivia", "Olivia Martin", "Backend Developer", "Phoenix, AZ", "Indeed", 3.0, ["Node.js", "Express", "PostgreSQL", "REST API", "Docker", "Prisma", "Testing"]],
  ["kavya", "Kavya Reddy", "Fullstack Engineer", "Hyderabad, India", "Referral", 1.8, ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "GitHub Actions"]],
  ["mason", "Mason Clark", "Data Analyst Engineer", "Atlanta, GA", "Company site", 2.2, ["SQL", "Python", "Pandas", "Tableau", "PostgreSQL", "Data Pipeline"]],
  ["ananya", "Ananya Gupta", "AI Engineer", "Bangalore, India", "LinkedIn", 1.6, ["Python", "LLM", "Prompt Engineering", "RAG", "PostgreSQL", "FastAPI"]],
  ["ethan", "Ethan Wright", "Frontend Developer", "Raleigh, NC", "Indeed", 2.4, ["React", "JavaScript", "CSS", "Vite", "Testing", "Git"]],
  ["meera", "Meera Joshi", "Platform Developer", "Noida, India", "Referral", 3.6, ["Java", "Python", "AWS", "Docker", "CI/CD", "REST API", "System Design"]],
  ["lucas", "Lucas Silva", "AI Product Developer", "Sao Paulo, Brazil", "LinkedIn", 2.9, ["React", "TypeScript", "Python", "GraphQL", "LLM", "Prompt Engineering", "PostgreSQL"]],
  ["rhea", "Rhea Kapoor", "Software Developer", "Delhi, India", "Company site", 1.4, ["Java", "C++", "Python", "SQL", "REST API", "Git"]],
  ["ben", "Ben Harris", "DevOps Developer", "Seattle, WA", "Indeed", 4.5, ["AWS", "Docker", "Kubernetes", "Prometheus", "Python", "CloudWatch"]],
  ["tara", "Tara Singh", "New Grad AI Builder", "Nagpur, India", "Referral", 0.9, ["React", "TypeScript", "Python", "GraphQL", "Prompt Engineering", "PostgreSQL", "Testing"]]
] as const;

export const candidates: Candidate[] = profiles.map(([slug, name, headline, location, source, yearsExp, skills]) => ({
  id: `cand_${slug}`,
  name,
  email: `${slug}@example.com`,
  phone: "",
  location,
  headline,
  resumeText: `${headline} with experience in ${skills.join(", ")}. Built projects involving customer workflows, APIs, databases, testing, and AI-assisted decision support.`,
  parsedSkills: [...skills],
  yearsExp,
  source
}));

const stages: CandidateStage[] = ["IN_REVIEW", "IN_REVIEW", "SHORTLISTED", "APPLIED", "SCREEN", "INTERVIEW", "APPLIED", "REJECTED"];

export const applications: Application[] = candidates.map((candidate, index) => ({
  id: `app_${candidate.id.replace("cand_", "")}`,
  jobId: jobs[index % jobs.length]!.id,
  candidateId: candidate.id,
  stage: stages[index % stages.length]!,
  appliedAt: new Date(Date.UTC(2026, 6, 21 - (index % 16), 9 + (index % 7), 15)).toISOString()
}));

export const matchResults: MatchResult[] = [];
export const agentRuns: AgentRun[] = [];
export const auditEvents: AuditEvent[] = [
  {
    id: "audit_seed_login",
    actorId: "usr_admin",
    action: "DEMO_WORKSPACE_SEEDED",
    resourceType: "WORKSPACE",
    resourceId: "demo",
    metadata: { candidates: candidates.length, jobs: jobs.length, applications: applications.length },
    createdAt: "2026-07-21T10:00:00.000Z"
  }
];
