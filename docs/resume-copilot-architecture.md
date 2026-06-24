# Skillwyn AI Resume Copilot Architecture Plan

## Product Positioning

Skillwyn AI Resume Copilot is not a simple ATS checker. It is an evidence-based resume intelligence platform for students, freshers, developers, and job seekers.

The core promise:

- explain why a score was given
- predict interview call probability
- compare users against top candidates
- generate role/company-specific improvements
- turn weak resumes into stronger, verified resumes
- reduce hallucination using industry benchmark datasets

## Critical Architecture Principle

Do not use this pipeline:

```text
Resume -> AI -> Score
```

That creates hallucinated, non-reproducible scores.

Use this production pipeline:

```text
Resume
  -> Parser
  -> Feature Extraction
  -> Rule Engine
  -> Industry Dataset Comparison
  -> AI Reasoning
  -> Deterministic Scoring Engine
  -> Evidence-Based Report
```

AI should explain, rewrite, classify ambiguity, and generate recommendations. AI should not directly invent final scores.

## Tech Stack

Frontend:

- React
- TypeScript
- TailwindCSS
- Shadcn UI
- React Query
- Zustand

Backend:

- Node.js
- Express
- TypeScript

Database:

- PostgreSQL
- Prisma

Queue and Cache:

- BullMQ
- Redis

AI:

- Provider-agnostic AI layer
- OpenAI
- Gemini
- Claude

## Core Modules

### Resume Parser

Supports:

- PDF
- DOCX
- single-column resumes
- multi-column resumes
- tables
- ATS templates
- designer templates

Parser output:

```json
{
  "personalInfo": {},
  "summary": "",
  "education": [],
  "skills": [],
  "projects": [],
  "experience": [],
  "certifications": [],
  "achievements": [],
  "confidence": {
    "overall": 0,
    "sections": {}
  }
}
```

### Feature Extraction Layer

Feature extraction converts parsed resume content into measurable signals.

Signals:

- section completeness
- quantified bullet ratio
- strong verb ratio
- generic bullet ratio
- project count
- deployed project count
- GitHub link count
- portfolio link presence
- role keyword coverage
- company keyword coverage
- skill freshness
- ATS formatting risk
- education signal
- internship signal
- proof-of-work signal
- readability score
- impact metric count

### Rule Engine

The rule engine applies deterministic checks before AI reasoning.

Examples:

- missing quantified achievements
- weak project descriptions
- missing deployment proof
- missing target-role keywords
- no GitHub/portfolio evidence
- resume too long or too short
- poor section ordering
- low action-verb quality

### Industry Benchmark Dataset

The system must not run only on LLM knowledge.

Datasets:

- `skills_dataset`
- `roles_dataset`
- `job_descriptions_dataset`
- `company_expectations_dataset`

Dataset comparison outputs:

- missing required skills
- missing preferred skills
- skill gap percentage
- project gap
- benchmark percentile estimate
- company readiness
- role readiness
- market demand alignment

This reduces hallucination and makes scoring explainable.

## Evidence-Based Scoring

Every score must answer: why did I get this score?

Example:

```json
{
  "recruiterScore": 63,
  "evidence": [
    {
      "issue": "No quantified achievements",
      "impact": -12,
      "source": "experience.bullets",
      "fix": "Add numbers such as users, revenue, latency, accuracy, or time saved."
    },
    {
      "issue": "Generic projects",
      "impact": -10,
      "source": "projects",
      "fix": "Add architecture, scale, deployment, database, and user proof."
    },
    {
      "issue": "Strong React skill coverage",
      "impact": 8,
      "source": "skills",
      "fix": "Keep React visible and connect it to project outcomes."
    }
  ]
}
```

Rules:

- Every score change must point to extracted resume evidence.
- Every negative impact must include a fix.
- Every positive impact must explain why it matters.
- Scores must be reproducible from stored features and scoring version.
- No hardcoded score values.
- No mock scores in production.

## Scoring Engine

Scores are deterministic and auditable.

Primary dimensions:

- Resume Quality
- Project Strength
- Skill Relevance
- ATS Compatibility
- Experience Quality
- Industry Alignment

Scores:

- Recruiter Score
- ATS Score
- Placement Score
- Industry Score
- Project Score
- Interview Probability Score

Example weighted score:

```ts
finalScore = weightedAverage([
  { value: resumeQuality, weight: 0.20 },
  { value: projectStrength, weight: 0.22 },
  { value: skillRelevance, weight: 0.20 },
  { value: atsCompatibility, weight: 0.16 },
  { value: experienceQuality, weight: 0.12 },
  { value: industryAlignment, weight: 0.10 }
]);
```

## Interview Probability Engine

Students care about interview calls more than ATS scores.

Output:

```json
{
  "startupProbability": 72,
  "serviceCompanyProbability": 91,
  "productCompanyProbability": 44,
  "reasoning": {
    "startup": ["Strong project shipping signal", "Missing deployment depth"],
    "serviceCompany": ["Good keyword coverage", "Readable ATS format"],
    "productCompany": ["Needs stronger system design and measurable impact"]
  }
}
```

Inputs:

- extracted features
- ATS compatibility
- role keyword coverage
- project strength
- company expectation match
- market benchmark percentile
- experience/internship signals

## Resume vs Top 1% Candidate

Gamified benchmark comparison.

Output:

```json
{
  "you": {
    "projects": 3,
    "skills": 8,
    "deployedProjects": 1,
    "quantifiedBullets": 2
  },
  "topCandidates": {
    "projects": 5,
    "skills": 15,
    "deployedProjects": 4,
    "quantifiedBullets": 10
  },
  "gapSummary": [
    "Add 2 stronger projects",
    "Add deployment proof",
    "Quantify project outcomes"
  ]
}
```

## AI Career Roadmap Generator

Generates a roadmap from actual resume gaps.

Example:

```json
{
  "currentTarget": "React Developer",
  "gaps": ["Docker", "AWS", "CI/CD"],
  "roadmap": [
    {
      "weeks": "1-2",
      "focus": "Docker",
      "outcome": "Containerize one React + API project"
    },
    {
      "weeks": "3-4",
      "focus": "AWS",
      "outcome": "Deploy project with S3/CloudFront or EC2"
    },
    {
      "weeks": "5-6",
      "focus": "CI/CD",
      "outcome": "Add GitHub Actions deployment pipeline"
    }
  ]
}
```

## Recruiter Eye Tracking Simulation

Simulates what a recruiter notices in 7-15 seconds.

Output:

```json
{
  "seen": [
    {
      "section": "Skills",
      "reason": "Visible keyword cluster"
    },
    {
      "section": "Project 1",
      "reason": "Strong title and tech stack"
    }
  ],
  "ignored": [
    {
      "section": "Summary",
      "reason": "Too generic"
    },
    {
      "section": "Achievements",
      "reason": "Buried below weak content"
    }
  ],
  "recommendations": [
    "Move strongest project above certifications",
    "Rewrite summary with role-specific proof"
  ]
}
```

## Resume Impact Analyzer

Scores every bullet.

Signals:

- action verb strength
- metric presence
- business/user impact
- technical specificity
- credibility
- brevity

Example:

```json
{
  "original": "Built food delivery website.",
  "impactScore": 31,
  "issues": ["No metric", "No technical depth", "No user/business proof"],
  "rewrite": "Built a food delivery platform with restaurant listings, cart checkout, and order tracking for 500+ test users."
}
```

## AI Resume Generator

Combines resume analysis and resume builder.

If the resume is weak, users can generate a stronger resume from verified inputs.

Rules:

- Never fabricate metrics.
- Never invent employers, education, projects, or achievements.
- Ask follow-up questions when proof is missing.
- Mark inferred suggestions separately from verified facts.
- Generate ATS-safe sections.
- Export as DOCX/PDF.

Flow:

1. Analyze current resume.
2. Identify missing sections and weak bullets.
3. Ask user for missing factual details.
4. Generate improved resume.
5. Validate against target role/company.
6. Export final resume.

## AI Analysis Modules

Required modules:

1. Recruiter Evaluation
2. ATS Analysis
3. Project Strength Analysis
4. Placement Readiness Analysis
5. Industry Readiness Analysis
6. Resume Roast
7. Resume Rewrite Engine
8. Role Specific Optimization
9. Company Specific Optimization
10. Market Gap Analysis
11. Interview Probability
12. Top 1% Candidate Comparison
13. Career Roadmap
14. Recruiter Eye Tracking Simulation
15. Resume Impact Analysis
16. Resume Generator

## AI Provider Abstraction

Interface:

```ts
interface AIProvider {
  name: "openai" | "gemini" | "claude";
  generateJson<T>(request: AIJsonRequest): Promise<AIJsonResponse<T>>;
}
```

Provider router responsibilities:

- choose provider by config, module, cost, latency, and fallback rules
- enforce JSON schema
- retry transient failures
- timeout slow calls
- record prompt version and model
- never silently replace failed AI output with fake scores

## Prompt Registry

Prompts must not live inside service files.

Prompt folders:

- `prompts/recruiter-evaluation/v1.md`
- `prompts/ats-analysis/v1.md`
- `prompts/project-strength/v1.md`
- `prompts/placement-readiness/v1.md`
- `prompts/industry-readiness/v1.md`
- `prompts/resume-roast/v1.md`
- `prompts/resume-rewrite/v1.md`
- `prompts/role-optimization/v1.md`
- `prompts/company-optimization/v1.md`
- `prompts/market-gap/v1.md`
- `prompts/interview-probability/v1.md`
- `prompts/top-candidate-comparison/v1.md`
- `prompts/career-roadmap/v1.md`
- `prompts/recruiter-eye-tracking/v1.md`
- `prompts/resume-impact/v1.md`
- `prompts/resume-generator/v1.md`

Registry tracks:

- module
- version
- expected JSON schema
- changelog
- test fixtures

## Database Schema Additions

Core tables:

- Users
- Resumes
- ResumeAnalysis
- Projects
- AnalysisScores
- AIReports
- Subscriptions

Benchmark tables:

- SkillsDataset
- RolesDataset
- JobDescriptionsDataset
- CompanyExpectationsDataset

Analysis score fields:

- `recruiterScore`
- `atsScore`
- `placementScore`
- `industryScore`
- `projectScore`
- `interviewProbabilityScore`
- `resumeQuality`
- `skillRelevance`
- `experienceQuality`
- `industryAlignment`
- `evidenceJson`
- `explanationJson`
- `scoreVersion`

## API Design

Required REST APIs:

- `POST /resume/upload`
- `POST /resume/analyze`
- `POST /resume/roast`
- `POST /resume/rewrite`
- `POST /resume/company-analysis`
- `POST /resume/role-analysis`
- `POST /resume/interview-probability`
- `POST /resume/top-candidate-comparison`
- `POST /resume/career-roadmap`
- `POST /resume/impact-analysis`
- `POST /resume/generate`
- `GET /analysis/:id`

## Security

Implement:

- rate limiting
- file validation
- MIME verification
- magic-byte verification
- JWT authentication
- refresh token rotation
- input sanitization
- XSS-safe rendering
- Prisma parameterized queries
- private resume file storage
- audit logs

## Error Handling

Never crash on:

- invalid PDF
- corrupted DOCX
- missing sections
- AI timeout
- empty resume
- low extraction confidence
- provider outage

Return meaningful error codes:

- `INVALID_FILE_TYPE`
- `FILE_TOO_LARGE`
- `LOW_EXTRACTION_CONFIDENCE`
- `EMPTY_RESUME`
- `AI_PROVIDER_TIMEOUT`
- `ANALYSIS_PARTIAL_FAILURE`

## V1 Packaging

Free:

- ATS Score
- Resume Roast
- Recruiter Review

Pro:

- Interview Probability
- Project Strength Analysis
- Market Gap Analysis
- Company Specific Analysis
- Resume Rewrite
- Career Roadmap

## Implementation Phases

### Phase 1: Foundation

- Create backend workspace.
- Add Express + TypeScript.
- Add Prisma + PostgreSQL.
- Add Redis + BullMQ.
- Add auth.
- Add file upload endpoint with validation.
- Add schema and migrations.

### Phase 2: Parser and Feature Extraction

- Implement PDF/DOCX extraction.
- Add structured extraction schema.
- Store raw and parsed resume data.
- Add confidence reporting.
- Add feature extraction layer.

### Phase 3: Dataset and Rule Engine

- Add benchmark dataset tables.
- Seed role/skill/company expectations.
- Implement deterministic rule engine.
- Implement dataset comparison.

### Phase 4: AI Core

- Add provider abstraction.
- Add prompt registry.
- Add JSON schema validation.
- Add module executor.
- Add AI report persistence.

### Phase 5: Scoring and Evidence

- Implement scoring engine.
- Add score evidence.
- Add transparent explanations.
- Add module-level breakdown.

### Phase 6: High-Converting Features

- Interview Probability
- Top 1% Candidate Comparison
- Career Roadmap
- Recruiter Eye Tracking
- Resume Impact Analyzer
- Resume Generator

### Phase 7: Frontend Product

- Build upload workflow.
- Build analysis dashboard.
- Build module tabs.
- Build rewrite views.
- Build roadmap view.
- Build comparison view.
- Build export report UI.

### Phase 8: Production Hardening

- Dockerize.
- Add CI.
- Add integration tests.
- Add prompt tests.
- Add rate limits and audit logs.
- Add monitoring hooks.

## Current App Migration Note

The existing `src/app/api/analyze-resume/route.ts` is prototype-level and should not be used as production Resume Copilot logic because it has:

- hardcoded demo fallback score
- hardcoded prompt in the route
- direct OpenAI coupling
- no parser
- no feature extraction
- no benchmark dataset comparison
- no deterministic scoring
- no audit trail

It should be replaced by the backend architecture above.
