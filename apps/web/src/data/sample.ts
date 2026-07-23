export type Stage = "Applied" | "Screen" | "In review" | "Shortlisted" | "Interview" | "Offer" | "Rejected";

export interface AgentStep {
  name: string;
  status: "Succeeded" | "Skipped";
  latencyMs: number;
  output: string;
}

export interface CandidateRow {
  id: string;
  initials: string;
  name: string;
  role: string;
  match: number;
  confidence: number;
  stage: Stage;
  source: string;
  applied: string;
  tags: string[];
  email: string;
  phone: string;
  location: string;
  summary: string;
  recommendation: string;
  prompt: string;
  agentSteps: AgentStep[];
  strengths: string[];
  risks: string[];
  skills: string[];
  experience: { title: string; company: string; dates: string }[];
}

const stageCycle: Stage[] = ["In review", "Shortlisted", "Applied", "Screen", "Interview", "Applied", "Rejected", "In review"];

const baseProfiles = [
  ["jessica", "Jessica Williams", "Senior Frontend Engineer", "San Francisco, CA", "LinkedIn", ["React", "TypeScript", "Next.js", "GraphQL", "Jest", "Git"], 91],
  ["rahul", "Rahul Kumar", "Fullstack Engineer", "Austin, TX", "LinkedIn", ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "GitHub Actions"], 88],
  ["aisha", "Aisha Martinez", "AI Product Engineer", "Seattle, WA", "Referral", ["React", "TypeScript", "Python", "Prompt Engineering", "GraphQL", "LLM"], 86],
  ["david", "David Lee", "Backend Engineer", "New York, NY", "Indeed", ["Java", "Python", "REST API", "PostgreSQL", "Docker", "CI/CD"], 79],
  ["sophie", "Sophie Patel", "Frontend Engineer", "Chicago, IL", "LinkedIn", ["React", "CSS", "Design Systems", "Storybook", "Accessibility", "Git"], 74],
  ["tyler", "Tyler Chen", "Frontend Engineer", "Portland, OR", "Company site", ["React", "Next.js", "JavaScript", "HTML", "CSS", "Vite"], 69],
  ["noah", "Noah Brown", "Junior Developer", "Denver, CO", "Indeed", ["JavaScript", "HTML", "CSS", "Analytics", "Git"], 54],
  ["emma", "Emma Stewart", "Frontend Engineer", "Boston, MA", "LinkedIn", ["React", "Sass", "HTML", "CSS", "Git"], 61],
  ["maya", "Maya Iyer", "AI Builder Intern", "Bangalore, India", "Referral", ["Python", "TypeScript", "Prompt Engineering", "React", "GraphQL", "Gemini"], 84],
  ["arjun", "Arjun Menon", "Backend Developer", "Hyderabad, India", "Company site", ["Java", "Spring Boot", "REST API", "PostgreSQL", "Docker", "JUnit"], 76],
  ["nina", "Nina Shah", "Data Engineer", "Mumbai, India", "LinkedIn", ["Python", "SQL", "Pandas", "PostgreSQL", "Airflow", "Snowflake"], 73],
  ["owen", "Owen Brooks", "Platform Engineer", "Toronto, Canada", "Indeed", ["AWS", "Lambda", "CloudWatch", "Python", "Docker", "Step Functions"], 78],
  ["priya", "Priya Nair", "AI Application Engineer", "Bangalore, India", "LinkedIn", ["React", "TypeScript", "Python", "LLM", "Prompt Engineering", "GraphQL"], 89],
  ["liam", "Liam Foster", "Fullstack Developer", "Dublin, Ireland", "Referral", ["React", "Node.js", "Express", "PostgreSQL", "REST API", "Docker"], 82],
  ["zoe", "Zoe Kim", "Machine Learning Engineer", "Los Angeles, CA", "LinkedIn", ["Python", "Machine Learning", "Pandas", "Scikit-learn", "SQL"], 67],
  ["samir", "Samir Khan", "Cloud Engineer", "Bengaluru, India", "Company site", ["AWS", "Lambda", "CloudWatch", "Python", "Docker", "Prometheus"], 77],
  ["ella", "Ella Green", "Product Engineer", "London, UK", "Indeed", ["React", "TypeScript", "GraphQL", "PostgreSQL", "Testing", "Git"], 85],
  ["vikram", "Vikram Rao", "Software Engineer", "Chennai, India", "LinkedIn", ["Java", "Python", "SQL", "REST API", "Docker"], 66],
  ["isabella", "Isabella Cruz", "UX Engineer", "Miami, FL", "Referral", ["React", "TypeScript", "Accessibility", "Design Systems", "Testing"], 72],
  ["dev", "Dev Patel", "AI Automation Engineer", "Pune, India", "LinkedIn", ["Python", "AWS", "Lambda", "Step Functions", "LLM", "Prompt Engineering"], 81],
  ["olivia", "Olivia Martin", "Backend Developer", "Phoenix, AZ", "Indeed", ["Node.js", "Express", "PostgreSQL", "REST API", "Docker", "Prisma"], 75],
  ["kavya", "Kavya Reddy", "Fullstack Engineer", "Hyderabad, India", "Referral", ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"], 83],
  ["mason", "Mason Clark", "Data Analyst Engineer", "Atlanta, GA", "Company site", ["SQL", "Python", "Pandas", "Tableau", "PostgreSQL"], 59],
  ["ananya", "Ananya Gupta", "AI Engineer", "Bangalore, India", "LinkedIn", ["Python", "LLM", "Prompt Engineering", "RAG", "PostgreSQL"], 80],
  ["ethan", "Ethan Wright", "Frontend Developer", "Raleigh, NC", "Indeed", ["React", "JavaScript", "CSS", "Vite", "Testing"], 65],
  ["meera", "Meera Joshi", "Platform Developer", "Noida, India", "Referral", ["Java", "Python", "AWS", "Docker", "CI/CD", "REST API"], 70],
  ["lucas", "Lucas Silva", "AI Product Developer", "Sao Paulo, Brazil", "LinkedIn", ["React", "TypeScript", "Python", "GraphQL", "LLM", "Prompt Engineering"], 87],
  ["rhea", "Rhea Kapoor", "Software Developer", "Delhi, India", "Company site", ["Java", "C++", "Python", "SQL", "REST API"], 63],
  ["ben", "Ben Harris", "DevOps Developer", "Seattle, WA", "Indeed", ["AWS", "Docker", "Kubernetes", "Prometheus", "Python"], 64],
  ["tara", "Tara Singh", "New Grad AI Builder", "Nagpur, India", "Referral", ["React", "TypeScript", "Python", "GraphQL", "Prompt Engineering", "PostgreSQL"], 90]
] as const;

const agentSteps = (id: string, match: number, skills: readonly string[]): AgentStep[] => [
  { name: "parse_resume", status: "Succeeded", latencyMs: 24 + id.length, output: "4 normalized sections" },
  { name: "extract_skills", status: "Succeeded", latencyMs: 31 + skills.length, output: `${skills.length} skills extracted` },
  { name: "score_job_fit", status: "Succeeded", latencyMs: 42, output: `${match}% fit score` },
  { name: "generate_recommendation", status: "Succeeded", latencyMs: 57, output: match >= 82 ? "shortlist" : "manual review" },
  { name: "write_audit_event", status: "Succeeded", latencyMs: 19, output: "decision logged" }
];

export const candidates: CandidateRow[] = baseProfiles.map(([id, name, role, location, source, skills, match], index) => {
  const firstLetters = name.split(" ").map((part) => part[0]).join("");
  return {
    id,
    initials: firstLetters,
    name,
    role,
    match,
    confidence: Math.min(96, match + (match >= 80 ? 5 : 1)),
    stage: stageCycle[index % stageCycle.length]!,
    source,
    applied: `Jul ${21 - (index % 16)}, 2026`,
    tags: [skills[0]!, skills[1]!, `+${Math.max(0, skills.length - 2)}`],
    email: `${id}@example.com`,
    phone: "",
    location,
    summary: `${role} profile evaluated against the AI Builder role using resume parsing, skill extraction, fit scoring, and recommendation generation.`,
    recommendation: match >= 82 ? "Shortlist for recruiter screen" : match >= 65 ? "Keep in review and validate gaps" : "Route to manual review",
    prompt: `Evaluate ${name} for an AI Builder role. Return JSON with fitScore, strengths, risks, missingSkills, and recommendation.`,
    agentSteps: agentSteps(id, match, skills),
    strengths: [`Matches ${skills.slice(0, 3).join(", ")}`, `${skills.length} parsed skills available for structured review`, `${match}% AI fit score`],
    risks: match >= 82 ? ["Validate role-specific customer communication experience"] : ["Missing one or more AI Builder priority skills"],
    skills: [...skills],
    experience: [
      { title: role, company: index % 2 === 0 ? "ProductLabs" : "CloudWorks", dates: `${2024 + (index % 2)} - Present` }
    ]
  };
});

export const activity = [
  { id: "a1", title: "30 demo candidates loaded", detail: "Seeded candidates across AI, frontend, backend, data, and DevOps profiles", actor: "RecruitOps AI", time: "10:24 AM", type: "ai" },
  { id: "a2", title: "6 jobs indexed", detail: "AI Builder, Fullstack, Backend, Data AI, Frontend, and AI DevOps roles are searchable", actor: "System", time: "10:22 AM", type: "file" },
  { id: "a3", title: "Agent workflow executed", detail: "5 tool calls completed: parse, extract, score, recommend, audit", actor: "RecruitOps AI", time: "10:20 AM", type: "ai" },
  { id: "a4", title: "GraphQL API published", detail: "7 query operations and 4 mutations available for recruiter workflow automation", actor: "Platform", time: "10:18 AM", type: "upload" }
];
