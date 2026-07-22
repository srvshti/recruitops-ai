# Implementation Notes

## Optimizations Over Typical Hackathon AI Recruiter Projects

1. Product-first dashboard
   - The main screen is a working recruiter operations surface, not a landing page.
   - Recruiters can search, filter, select candidates, shortlist, reject, and change stages.

2. Better data modeling
   - `Candidate` and `Application` are separate so one candidate can apply to multiple jobs.
   - `AiMatchResult` is separate from `Application` so scores can be regenerated and audited.
   - `PipelineEvent` captures stage changes instead of overwriting history.

3. Safer AI architecture
   - Default scoring is deterministic and explainable.
   - LLM providers can be added behind the scoring service without exposing API keys.
   - Recommendations produce reasons, risks, and missing skills rather than automatic decisions.

4. Interview-aligned engineering
   - React and TypeScript frontend.
   - Node.js and Express backend.
- PostgreSQL-ready Prisma schema.
- Seeded in-memory demo path so reviewers can inspect workflows without database setup.
   - JWT authentication pattern.
   - Zod validation.
   - Docker Compose and GitHub Actions.

## Future Production Upgrades

- Persist API routes with Prisma Client instead of seed arrays.
- Add background jobs for async resume parsing.
- Store resumes in S3-compatible object storage.
- Add OpenAI/Gemini scoring adapters with redaction and prompt tests.
- Add PostgreSQL full-text search and pgvector semantic search.
- Add RBAC policies for recruiter, hiring manager, and admin flows.
- Add Playwright E2E tests for shortlist/reject and filter workflows.
- Add OpenAPI generation from route schemas.
