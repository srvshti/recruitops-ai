# RecruitOps AI

RecruitOps AI is a fullstack AI recruiter workflow platform built as an optimized, original version of common AI hiring co-pilot demos. It focuses on production engineering signals: maintainable React/TypeScript UI, Node.js REST APIs, PostgreSQL-ready data modeling, Prisma schema design, JWT authentication shape, deterministic AI scoring fallback, CI, Docker, and clear architecture.

This project is intentionally not a clone of RecruitAI or Zara. It uses the same real-world recruiting problem space, but with a different product model, data schema, UI system, and implementation structure.

## Tech Stack

- React + TypeScript + Vite
- Node.js + Express + TypeScript
- PostgreSQL-ready Prisma schema
- JWT authentication pattern
- Zod request validation
- Docker Compose
- GitHub Actions CI
- Deterministic explainable AI matching fallback
- Optional future LLM provider adapter

## Product Features

- Recruiter dashboard for an active job opening
- Candidate search, source filtering, and stage filtering
- Candidate ranking with AI match scores
- Candidate profile inspector with parsed skills and experience
- Shortlist/reject workflow with local UI state updates
- Stage transitions across hiring pipeline states
- Audit trail for AI recommendations and recruiter actions
- REST API for auth, jobs, candidates, stage updates, and match scoring
- PostgreSQL-ready Prisma schema for users, jobs, candidates, applications, match results, pipeline events, and audit events
- Seeded demo API for portfolio review without requiring private data or API keys

## Architecture

```mermaid
flowchart LR
    recruiter["Recruiter"]
    web["React + TypeScript Web App"]
    api["Node.js Express API"]
    auth["JWT Auth + RBAC Middleware"]
    scoring["Explainable Match Scoring Service"]
    prisma["Prisma Data Model"]
    db[("PostgreSQL")]
    ci["GitHub Actions"]

    recruiter --> web
    web --> api
    api --> auth
    api --> scoring
    api --> prisma
    prisma --> db
    ci --> web
    ci --> api
```

## Data Model

Core tables modeled in [prisma/schema.prisma](./prisma/schema.prisma):

- `User`
- `Job`
- `Candidate`
- `Application`
- `AiMatchResult`
- `PipelineEvent`
- `AuditEvent`

The schema is designed around recruiter workflows rather than one-off resume analysis. A candidate can apply to multiple jobs, each application can move through a pipeline, and every AI score can be audited separately.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

Web app:

```text
http://localhost:5173
```

API:

```text
http://localhost:4000
```

Demo login:

```text
alex@recruitops.ai / Password123!
```

## Docker

```bash
docker compose up --build
```

## API Surface

```text
POST   /api/auth/login
GET    /api/jobs
POST   /api/jobs
GET    /api/candidates
POST   /api/candidates
PATCH  /api/candidates/applications/:applicationId/stage
POST   /api/candidates/applications/:applicationId/score
GET    /health
```

## Why This Is Better Than A Basic RecruitAI Clone

- Uses a recruiter operations dashboard instead of a marketing-first demo.
- Adds a real relational schema instead of only frontend state.
- Separates job, candidate, application, score, pipeline, and audit concepts.
- Makes AI recommendations explainable with strengths, risks, missing skills, and provider metadata.
- Keeps the default AI path deterministic so the app works without private API keys.
- Includes CI, Docker, validation, auth boundaries, and typed service logic.

## Resume Bullets

```text
• Built RecruitOps AI, a fullstack AI recruiter workflow platform using React, TypeScript, Node.js, and Express to manage jobs, candidates, match scores, and hiring pipeline stages.
• Designed REST APIs and PostgreSQL/Prisma relational data models across 7 core entities, supporting candidate search, source/stage filtering, AI scoring, recruiter review states, pipeline events, and audit logs.
• Implemented an explainable AI matching workflow that compares parsed resume skills against job requirements, generates fit scores, strengths, risks, and missing-skill summaries, and keeps recommendations human-reviewable.
```

## Interview Talking Points

- Why candidate, application, and match result are separate entities.
- How to evolve deterministic scoring into an LLM-backed matching service.
- How to prevent AI recommendations from becoming automatic hiring decisions.
- How to add RBAC for recruiters, hiring managers, and admins.
- How to scale candidate search using PostgreSQL indexes, embeddings, or vector search.
- How to add background jobs for resume parsing and score refreshes.
