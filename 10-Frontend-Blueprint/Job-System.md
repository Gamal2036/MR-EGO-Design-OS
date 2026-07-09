# Job System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Job-Flow.md](../06-UX-Architecture/Job-Flow.md)), DP-7 ([Job-Search.md](../07-High-Fidelity-Wireframes/Job-Search.md), [Job-Details.md](../07-High-Fidelity-Wireframes/Job-Details.md))

---

## Purpose

Defines the job search and management system — search engine, matching algorithm, filtering, saved searches, job detail, and application integration.

---

## Job Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     JOB SYSTEM                            │
├─────────────────────────────────────────────────────────┤
│  Search Engine                                           │
│  Keyword, semantic, location, category search            │
├─────────────────────────────────────────────────────────┤
│  Matching Engine (AI)                                    │
│  Skills match, experience match, culture fit, score      │
├─────────────────────────────────────────────────────────┤
│  Filter Engine                                           │
│  Faceted, range, toggle, saved filters                   │
├─────────────────────────────────────────────────────────┤
│  Job Store                                               │
│  Results, saved jobs, recent views, metadata             │
└─────────────────────────────────────────────────────────┘
```

---

## Job Data Model

```typescript
// Pseudocode
interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  remote: boolean;
  salary: SalaryRange;
  type: JobType;
  experience: ExperienceLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  postedAt: Date;
  expiresAt: Date;
  applications: number;
  match?: JobMatch;
  metadata: JobMetadata;
}

interface JobMatch {
  score: number;                    // 0-100 overall
  breakdown: MatchBreakdown[];
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
  locationMatch: number;
  cultureMatch?: number;
  gaps: SkillGap[];
  confidence: number;
}

interface MatchBreakdown {
  category: string;
  score: number;
  weight: number;
  details: string;
}

enum JobType {
  FullTime,
  PartTime,
  Contract,
  Freelance,
  Internship,
  Temporary,
}

enum ExperienceLevel {
  Entry,
  Mid,
  Senior,
  Lead,
  Executive,
}
```

---

## Search Engine

```typescript
// Pseudocode
interface SearchEngine {
  search(query: SearchQuery): Promise<SearchResults>;
  suggest(query: string): Promise<Suggestion[]>;
  saveSearch(query: SavedSearch): void;
  getSavedSearches(): SavedSearch[];
}

interface SearchQuery {
  keyword: string;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  types: JobType[];
  experience: ExperienceLevel[];
  skills: string[];
  companies: string[];
  postedWithin: '24h' | '3d' | '7d' | '14d' | '30d';
  sort: 'relevance' | 'date' | 'salary';
  page: number;
  pageSize: number;
}

interface SearchResults {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacets;
  took: number;               // ms
}

interface SearchFacets {
  types: FacetCount[];
  experience: FacetCount[];
  companies: FacetCount[];
  locations: FacetCount[];
  salary: FacetCount;
}
```

---

## AI Matching

```typescript
// Pseudocode
interface MatchingEngine {
  matchJob(jobId: string, profile: Profile): Promise<JobMatch>;
  batchMatch(jobs: Job[], profile: Profile): Promise<Map<string, JobMatch>>;
  explainMatch(jobId: string): Promise<MatchExplanation>;
}

interface MatchExplanation {
  summary: string;
  strengths: string[];
  gaps: SkillGap[];
  recommendations: string[];
  sources: MatchSource[];
}

// Match rules:
// - Skills: 40% weight
// - Experience: 30% weight
// - Education: 15% weight
// - Location: 10% weight
// - Culture: 5% weight (AI-estimated)
// - Minimum match threshold: 30% before showing score
```

---

## Job Detail Composition

```
┌─────────────────────────────────────────────────────────┐
│  Job Title                           [Save] [Share]     │
│  Company Name • Location • Posted 3 days ago           │
├─────────────────────────────────────────────────────────┤
│  Match Score Card                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  85% Match                        [View Breakdown]│  │
│  │  ─────────────────────────────────────────────    │  │
│  │  Skills:  90%   Experience: 80%  Education: 100% │  │
│  │  Skills to add: TypeScript, GraphQL              │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  Job Description                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  About the Role                                   │  │
│  │  We are looking for a Senior Developer...         │  │
│  │                                                   │  │
│  │  Requirements:                                    │  │
│  │  • 5+ years experience in React                   │  │
│  │  • Experience with TypeScript                     │  │
│  │                                                   │  │
│  │  Responsibilities:                                │  │
│  │  • Lead frontend development                      │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  Similar Jobs                                      [See All]│
│  ┌──────────────────────────────────────────────────┐  │
│  │  Senior React Engineer at TechCo — 78% Match    │  │
│  │  Frontend Lead at StartupCo — 72% Match         │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  [Apply Now]  [Save for Later]                          │
└─────────────────────────────────────────────────────────┘
```

---

## Saved Jobs

```typescript
// Pseudocode
interface SavedJob {
  jobId: string;
  savedAt: Date;
  notes: string;
  status: 'saved' | 'applied' | 'archived';
  alertEnabled: boolean;
}

interface SavedSearch {
  id: string;
  name: string;
  query: SearchQuery;
  alertEnabled: boolean;
  alertFrequency: 'instant' | 'daily' | 'weekly';
  createdAt: Date;
}
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Application-Tracker.md](Application-Tracker.md) | Application lifecycle from job |
| [CV-System.md](CV-System.md) | CV attachment to applications |
| [AI-Integration-Layer.md](AI-Integration-Layer.md) | AI matching engine |

---

## Validation Notes

1. Search supports keyword, semantic, location, and faceted search.
2. AI matching scores jobs against user profile with transparent breakdown.
3. Saved searches include alert functionality for new matching jobs.
4. Job detail composes match score, description, similar jobs, and application.
5. Filter state is preserved across navigation and persisted in session.
