# CV System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([CV-Flow.md](../06-UX-Architecture/CV-Flow.md)), DP-7 ([CV-Builder.md](../07-High-Fidelity-Wireframes/CV-Builder.md), [CV-Analysis.md](../07-High-Fidelity-Wireframes/CV-Analysis.md))

---

## Purpose

Defines the CV management system — upload, parsing, analysis, optimisation, version comparison, and ATS compatibility.

---

## CV Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CV SYSTEM                             │
├─────────────────────────────────────────────────────────┤
│  CV Store                                                │
│  CV list, current version, metadata, tags               │
├─────────────────────────────────────────────────────────┤
│  Parsing Engine (AI)                                     │
│  Parse → Structure → Validate → Enrich                   │
├─────────────────────────────────────────────────────────┤
│  Analysis Engine (AI)                                    │
│  Score → Section breakdown → Improvement list → ATS     │
├─────────────────────────────────────────────────────────┤
│  Optimisation Engine (AI)                                │
│  Suggestions → Side-by-side diff → Accept/reject        │
└─────────────────────────────────────────────────────────┘
```

---

## CV Data Model

```typescript
// Pseudocode
interface CV {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: CVStatus;
  parsed?: ParsedCV;
  analysis?: CVAnalysis;
  versions: CVVersion[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

enum CVStatus {
  Uploading,
  Uploaded,
  Parsing,
  Parsed,
  Analysing,
  Analysed,
  Error,
}

interface ParsedCV {
  sections: CVSection[];
  raw: string;                 // Raw text
  structure: CVStructure;      // Parsed structure
  confidence: number;          // Parsing confidence
}

interface CVSection {
  type: 'header' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'languages' | 'custom';
  title: string;
  content: string;
  confidence: number;
  items: CVSectionItem[];
}
```

---

## CV Analysis

```typescript
// Pseudocode
interface CVAnalysis {
  overallScore: number;                  // 0-100
  categoryScores: CategoryScore[];
  improvements: Improvement[];
  atsScore: number;                      // ATS compatibility
  atsIssues: ATSIssue[];
  keywordAnalysis: KeywordAnalysis;
  suggestions: Suggestion[];
}

interface CategoryScore {
  category: 'summary' | 'experience' | 'education' | 'skills' | 'format';
  score: number;
  weight: number;
  feedback: string;
}

interface Improvement {
  section: string;
  current: string;
  suggested: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

interface ATSIssue {
  severity: 'critical' | 'warning' | 'info';
  issue: string;
  suggestion: string;
}
```

---

## CV Optimisation Flow

```
User views CV analysis
     ↓
Clicks "Optimise"
     ↓
AI generates optimised version(s)
     ↓
├── Side-by-side view: Original | Optimised
├── Per-section: Suggestions listed
├── Each suggestion: Accept / Modify / Reject
└── Overall: Accept All / Reject All
     ↓
User reviews and accepts/rejects each suggestion
     ↓
User clicks "Save Changes"
     ↓
New version created with accepted changes
```

---

## Version Comparison

```
Current version (v3)
     ↓
Select version to compare (v1)
     ↓
Side-by-side diff view:
  ┌──────────────────────┐  ┌──────────────────────┐
  │  v1 (Original)       │  │  v3 (Current)        │
  │                      │  │                      │
  │  Software Engineer   │  │  Senior Software     │
  │  at Acme Corp        │  │  Engineer at Acme    │
  │  (unchanged text)    │  │  Corp                 │
  │  [removed]           │  │  (unchanged text)     │
  │                      │  │  [added: TypeScript]  │
  └──────────────────────┘  └──────────────────────┘
```

---

## ATS Compatibility

| Factor | Importance | Check |
|--------|------------|-------|
| File format | Critical | PDF preferred, DOCX accepted |
| Section headers | Critical | Standard headers recognised |
| Fonts | High | Standard fonts only |
| Tables | High | Avoid — ATS cannot parse |
| Columns | High | Single column preferred |
| Images | Medium | Avoid — text in images not parsed |
| Special characters | Medium | Avoid in headers |
| Links | Low | Full URLs, not hyperlinked text |

---

## CV States

| State | UI | Action Available |
|-------|-----|------------------|
| No CV | Empty state with upload | Upload, skip |
| Uploading | Progress bar | Cancel |
| Uploaded | File card in list | View, delete |
| Parsing | Skeleton with pulsing sections | Wait |
| Parsed | Parsed preview | View, edit, analyse |
| Analysing | Skeleton analysis | Wait |
| Analysed | Score + breakdown | Optimise, download |
| Error | Error state with retry | Retry, delete, re-upload |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Document-System.md](Document-System.md) | CV as document type |
| [AI-Integration-Layer.md](AI-Integration-Layer.md) | CV analysis AI pipeline |
| [Job-System.md](Job-System.md) | CV attachment in applications |

---

## Validation Notes

1. CV parsing handles multiple formats (PDF, DOCX, images via OCR) with confidence scoring.
2. Analysis produces actionable improvement suggestions per section.
3. Optimisation preserves user control — every suggestion requires explicit acceptance.
4. Version comparison shows clear diffs between any two versions.
5. ATS compatibility checking prevents submission of non-machine-readable CVs.
