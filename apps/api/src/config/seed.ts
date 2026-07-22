import type { Application, Candidate, Job, MatchResult, RecruiterUser } from "../types/domain.js";

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
    id: "job_frontend",
    title: "Senior Frontend Engineer",
    department: "Product Engineering",
    location: "Remote PST overlap",
    status: "OPEN",
    description: "Build product workflows for an AI recruiter platform using React, TypeScript, APIs, and data modeling.",
    requirements: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Testing", "Git"],
    niceToHave: ["GraphQL", "AWS", "AI products", "Prisma"],
    createdAt: "2026-07-20T10:00:00.000Z"
  }
];

export const candidates: Candidate[] = [
  {
    id: "cand_jessica",
    name: "Jessica Williams",
    email: "jessica.williams@gmail.com",
    phone: "(415) 555-0198",
    location: "San Francisco, CA",
    headline: "Senior Frontend Engineer",
    resumeText: "React TypeScript Next.js Redux Jest Testing Library frontend engineer component libraries Git",
    parsedSkills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML", "CSS", "Redux", "Jest", "Testing Library", "Git", "Figma", "Webpack", "ESLint"],
    yearsExp: 4.9,
    source: "LinkedIn"
  },
  {
    id: "cand_rahul",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    phone: "(408) 555-0142",
    location: "Austin, TX",
    headline: "Frontend Engineer",
    resumeText: "React Next.js TypeScript Node.js PostgreSQL REST API Cypress GitHub Actions",
    parsedSkills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Cypress", "GitHub Actions"],
    yearsExp: 3.2,
    source: "LinkedIn"
  },
  {
    id: "cand_aisha",
    name: "Aisha Martinez",
    email: "aisha.martinez@example.com",
    phone: "(510) 555-0137",
    location: "Seattle, WA",
    headline: "Frontend Engineer",
    resumeText: "React TypeScript Vite Tailwind CSS API integrations accessibility",
    parsedSkills: ["React", "TypeScript", "Vite", "Tailwind CSS", "Accessibility", "REST API"],
    yearsExp: 2.6,
    source: "Referral"
  },
  {
    id: "cand_david",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "(650) 555-0171",
    location: "New York, NY",
    headline: "Fullstack Engineer",
    resumeText: "Vue JavaScript Express MongoDB Docker CI/CD testing",
    parsedSkills: ["Vue", "JavaScript", "Express", "MongoDB", "Docker", "CI/CD", "Testing"],
    yearsExp: 3.7,
    source: "Indeed"
  },
  {
    id: "cand_sophie",
    name: "Sophie Patel",
    email: "sophie.patel@example.com",
    phone: "(212) 555-0199",
    location: "Chicago, IL",
    headline: "Frontend Engineer",
    resumeText: "React CSS Sass HTML design systems Storybook Git",
    parsedSkills: ["React", "CSS", "Sass", "HTML", "Design Systems", "Storybook", "Git"],
    yearsExp: 2.3,
    source: "LinkedIn"
  },
  {
    id: "cand_tyler",
    name: "Tyler Chen",
    email: "tyler.chen@example.com",
    phone: "(503) 555-0119",
    location: "Portland, OR",
    headline: "Frontend Engineer",
    resumeText: "React Next.js JavaScript HTML CSS internship projects",
    parsedSkills: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
    yearsExp: 1.5,
    source: "Company site"
  },
  {
    id: "cand_noah",
    name: "Noah Brown",
    email: "noah.brown@example.com",
    phone: "(720) 555-0184",
    location: "Denver, CO",
    headline: "Frontend Engineer",
    resumeText: "JavaScript HTML CSS WordPress analytics",
    parsedSkills: ["JavaScript", "HTML", "CSS", "Analytics"],
    yearsExp: 1.2,
    source: "Indeed"
  },
  {
    id: "cand_emma",
    name: "Emma Stewart",
    email: "emma.stewart@example.com",
    phone: "(617) 555-0108",
    location: "Boston, MA",
    headline: "Frontend Engineer",
    resumeText: "React Sass landing pages content updates",
    parsedSkills: ["React", "Sass", "HTML", "CSS"],
    yearsExp: 0.8,
    source: "LinkedIn"
  }
];

export const applications: Application[] = candidates.map((candidate, index) => ({
  id: `app_${candidate.id.replace("cand_", "")}`,
  jobId: "job_frontend",
  candidateId: candidate.id,
  stage: ["IN_REVIEW", "IN_REVIEW", "IN_REVIEW", "APPLIED", "APPLIED", "SCREEN", "SCREEN", "REJECTED"][index] as Application["stage"],
  appliedAt: new Date(Date.UTC(2026, 6, 12 - index, 16, 15)).toISOString()
}));

export const matchResults: MatchResult[] = [];
