export type Stage = "Applied" | "Screen" | "In review" | "Shortlisted" | "Interview" | "Offer" | "Rejected";

export interface CandidateRow {
  id: string;
  initials: string;
  name: string;
  role: string;
  match: number;
  stage: Stage;
  source: string;
  applied: string;
  tags: string[];
  email: string;
  phone: string;
  location: string;
  summary: string;
  strengths: string[];
  risks: string[];
  skills: string[];
  experience: { title: string; company: string; dates: string }[];
}

export const candidates: CandidateRow[] = [
  {
    id: "jessica",
    initials: "JW",
    name: "Jessica Williams",
    role: "Senior Frontend Engineer",
    match: 87,
    stage: "In review",
    source: "LinkedIn",
    applied: "Jul 21, 2026",
    tags: ["React", "TypeScript", "+2"],
    email: "jessica.williams@gmail.com",
    phone: "(415) 555-0198",
    location: "San Francisco, CA",
    summary: "Strong match for the active role with clear React, TypeScript, testing, and component architecture evidence.",
    strengths: [
      "Strong experience with React, TypeScript, and Next.js",
      "High similarity in required skills at 87%",
      "Experience with component libraries and state management",
      "Good match for seniority and years of experience"
    ],
    risks: ["No explicit GraphQL experience; listed as nice-to-have"],
    skills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML", "CSS", "Sass", "Tailwind CSS", "Redux", "Jest", "Testing Library", "Git", "Figma", "Webpack", "ESLint"],
    experience: [
      { title: "Senior Frontend Engineer", company: "TechNova", dates: "Jun 2022 - Present" },
      { title: "Frontend Engineer", company: "BrightApps", dates: "May 2020 - May 2022" }
    ]
  },
  {
    id: "rahul",
    initials: "RK",
    name: "Rahul Kumar",
    role: "Frontend Engineer",
    match: 82,
    stage: "In review",
    source: "LinkedIn",
    applied: "Jul 20, 2026",
    tags: ["React", "Next.js", "+3"],
    email: "rahul.kumar@example.com",
    phone: "(408) 555-0142",
    location: "Austin, TX",
    summary: "Strong fullstack-adjacent candidate with API, Node.js, PostgreSQL, and React evidence.",
    strengths: ["Matches React and TypeScript requirements", "Includes Node.js and PostgreSQL project experience", "Good testing and CI/CD signal"],
    risks: ["Less senior than the target role"],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Cypress", "GitHub Actions"],
    experience: [{ title: "Frontend Engineer", company: "Northstar Labs", dates: "Aug 2023 - Present" }]
  },
  {
    id: "aisha",
    initials: "AM",
    name: "Aisha Martinez",
    role: "Frontend Engineer",
    match: 75,
    stage: "In review",
    source: "Referral",
    applied: "Jul 19, 2026",
    tags: ["React", "TypeScript", "+2"],
    email: "aisha.martinez@example.com",
    phone: "(510) 555-0137",
    location: "Seattle, WA",
    summary: "Solid frontend candidate with clean UI implementation and accessibility strengths.",
    strengths: ["React and TypeScript overlap", "Good accessibility and design-system exposure"],
    risks: ["Node.js and PostgreSQL are not visible in parsed skills"],
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS", "Accessibility", "REST API"],
    experience: [{ title: "Frontend Engineer", company: "ProductKind", dates: "Jan 2024 - Present" }]
  },
  {
    id: "david",
    initials: "DL",
    name: "David Lee",
    role: "Fullstack Engineer",
    match: 68,
    stage: "Applied",
    source: "Indeed",
    applied: "Jul 18, 2026",
    tags: ["Vue", "TypeScript", "+1"],
    email: "david.lee@example.com",
    phone: "(650) 555-0171",
    location: "New York, NY",
    summary: "General fullstack candidate with adjacent skills; needs manual review for React depth.",
    strengths: ["Backend and CI/CD exposure", "Testing and Docker are visible"],
    risks: ["Primary frontend framework appears to be Vue instead of React"],
    skills: ["Vue", "JavaScript", "Express", "MongoDB", "Docker", "CI/CD", "Testing"],
    experience: [{ title: "Fullstack Engineer", company: "MarketPilot", dates: "Feb 2022 - Present" }]
  },
  {
    id: "sophie",
    initials: "SP",
    name: "Sophie Patel",
    role: "Frontend Engineer",
    match: 62,
    stage: "Applied",
    source: "LinkedIn",
    applied: "Jul 17, 2026",
    tags: ["React", "CSS", "+2"],
    email: "sophie.patel@example.com",
    phone: "(212) 555-0199",
    location: "Chicago, IL",
    summary: "Frontend-focused candidate with strong UI fundamentals but limited backend/data signal.",
    strengths: ["React and design-system experience", "Good CSS depth"],
    risks: ["No TypeScript, Node.js, or PostgreSQL evidence"],
    skills: ["React", "CSS", "Sass", "HTML", "Design Systems", "Storybook", "Git"],
    experience: [{ title: "Frontend Engineer", company: "Northbridge", dates: "Mar 2024 - Present" }]
  },
  {
    id: "tyler",
    initials: "TC",
    name: "Tyler Chen",
    role: "Frontend Engineer",
    match: 55,
    stage: "Screen",
    source: "Company site",
    applied: "Jul 16, 2026",
    tags: ["React", "Next.js", "+1"],
    email: "tyler.chen@example.com",
    phone: "(503) 555-0119",
    location: "Portland, OR",
    summary: "Early-career frontend candidate; best suited for junior roles.",
    strengths: ["React and Next.js basics", "Good recent project signal"],
    risks: ["Low experience for senior role", "Backend/database skills not visible"],
    skills: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
    experience: [{ title: "Frontend Intern", company: "Appridge", dates: "Jun 2025 - Dec 2025" }]
  }
];

export const activity = [
  { id: "a1", title: "AI match score updated to 87", detail: "Score recalculated after resume parse update and job profile changes", actor: "RecruitOps AI", time: "10:24 AM", type: "ai" },
  { id: "a2", title: "Moved to In review", detail: "Stage changed from Screen", actor: "Alex Rivera", time: "10:20 AM", type: "person" },
  { id: "a3", title: "Resume parsed", detail: "Extracted 45 skills, 3 jobs, 2 education entries", actor: "RecruitOps AI", time: "10:18 AM", type: "file" },
  { id: "a4", title: "Application received", detail: "Via LinkedIn", actor: "System", time: "10:17 AM", type: "upload" }
];
