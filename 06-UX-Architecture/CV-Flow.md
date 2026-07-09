# CV Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 12, 15), DP-4 ([Documents-Layout.md](../05-Application-Shell/Layouts/Documents-Layout.md)), DP-3 ([Upload-Pattern.md](../04-Component-Library/Patterns/Upload-Pattern.md))

---

## Purpose

Transform a raw CV upload into a structured, AI-optimized professional document that maximizes career opportunities.

---

## User Goal

"Upload my CV, get an honest assessment, and make it as strong as possible."

---

## Flow Architecture

```
  ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌───────────┐    ┌──────────┐
  │  SELECT  │───▶│  UPLOAD  │───▶│   ANALYSIS   │───▶│OPTIMIZATION│───▶│ APPROVAL │
  │  CV File │    │  + Parse │    │  + Score     │    │ + Edit    │    │ + Save   │
  └──────────┘    └──────────┘    └──────────────┘    └───────────┘    └──────────┘
```

---

## Phase Specifications

### 1. Select CV File

| Aspect | Value |
|--------|-------|
| **Purpose** | Choose CV file for upload |
| **Entry** | CV Manager "Upload New CV" |
| **Exit** | File selected and validated |
| **Primary CTA** | "Browse Files" or drag-and-drop |
| **Supported Formats** | PDF, DOCX, TXT, RTF |
| **Max Size** | 10MB per file |
| **Accessibility** | Upload zone `role="button"`, keyboard accessible, `aria-label` instructions |

### 2. Upload + Parse

| Aspect | Value |
|--------|-------|
| **Purpose** | Transfer file and extract structured data |
| **Entry** | File selected |
| **Exit** | Parsing complete |
| **Primary CTA** | None (auto-processing) |
| **States** | Uploading (progress bar), Parsing (analyzing structure), Complete |
| **Duration** | Under 5 seconds for standard CV |
| **Error Handling** | Format error, size error, parse failure with retry |

### 3. Analysis + Score

| Aspect | Value |
|--------|-------|
| **Purpose** | Show AI assessment of CV quality |
| **Entry** | Parsing complete |
| **Exit** | User proceeds to optimization |
| **Primary CTA** | "Apply AI Suggestions" |
| **Components** | Overall score (0-100), section scores (Summary, Experience, Skills, Education, Formatting), ATS compatibility score, improvement opportunities list |
| **Visual** | Score gauge + section breakdown cards + ranked improvement list |
| **Emotion** | Curious → enlightened → motivated |
| **AI Interaction** | AI analyzes each section for: completeness, impact, keyword optimization, action verbs, quantification, formatting |

### 4. Optimization

| Aspect | Value |
|--------|-------|
| **Purpose** | Apply AI suggestions to improve CV |
| **Entry** | User clicks "Apply AI Suggestions" |
| **Exit** | Save changes or preview |
| **Primary CTA** | "Save Changes" |
| **Secondary CTA** | "Preview", "Reject All", "Re-analyze" |
| **Layout** | Split view: original (left) vs optimized (right), suggestion panel |
| **Interaction** | Each suggestion shows: original text → AI suggestion (with confidence) → Accept/Modify/Reject |
| **AI Interaction** | AI action-verb replacements, quantification suggestions, keyword optimization, formatting improvements |

### 5. Approval + Save

| Aspect | Value |
|--------|-------|
| **Purpose** | Confirm final version and save |
| **Entry** | Optimization review complete |
| **Exit** | Return to CV Manager |
| **Primary CTA** | "Approve & Save" |
| **Secondary CTA** | "Save as New Version" |
| **Emotion** | Confident in final product |
| **Storage** | Version history preserved |

---

## Entry Points

| Source | Trigger |
|--------|---------|
| Dashboard | CV Score widget → "Upload CV" |
| Profile | Documents section → "Upload" |
| Application Form | CV selector → "Upload New" |
| Command palette | Ctrl+K → "Upload CV" |

## Exit Points

| Source | Destination |
|--------|-------------|
| After save | CV Manager (version list) |
| Cancel | Previous page |
| Preview | Full-screen document preview |

---

## Analysis Dimensions

| Dimension | What AI Evaluates | Scoring |
|-----------|-------------------|---------|
| Summary/Objective | Clarity, relevance, quantified impact | 0-100 |
| Experience | Action verbs, results, chronology, completeness | 0-100 |
| Skills | Relevance, categorization, proficiency indication | 0-100 |
| Education | Completeness, relevance, formatting | 0-100 |
| Formatting | Parsability, consistency, ATS-friendliness | 0-100 |
| Keywords | Industry term presence, role-specific optimization | 0-100 |
| **Overall** | Weighted composite | 0-100 |

---

## State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Initial | Upload zone | Ready for file |
| Uploading | Progress bar | File transfer |
| Parsing | Analysis skeleton | AI processing |
| Analyzed | Score + breakdown | Interactive results |
| Optimizing | Suggestion panel active | Edit in progress |
| Preview | Full document view | Read-only |
| Saved | Success toast | Return to list |
| Error (format) | Error message | Format guidance |
| Error (parse) | Parsing error | Manual entry fallback |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Upload zone | Keyboard accessible, `aria-label`, `role="button"` |
| Score display | Text value + visual gauge |
| Analysis sections | Clear heading hierarchy |
| Suggestions | `role="list"` with actionable items |
| Editor | Proper focus management between sections |
| Preview | Zoom support, text reflow |
| Version list | `aria-label` per version with date |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Upload full-width, analysis as single-column cards, optimization as suggestion list (no side-by-side) |
| Tablet (768-1023px) | Analysis: 2-column grid, optimization: top suggestion panel + bottom editor |
| Desktop (1024-1279px) | Analysis: score left + breakdown right. Optimization: side-by-side edit + suggestions |
| Ultra-wide (1600px+) | Full tri-panel: original | optimized | AI suggestions, max content 1400px |

---

## AI Interaction Depth

| Feature | AI Role | User Control |
|---------|---------|--------------|
| Structure analysis | Parse sections, identify gaps | View results |
| Action verb replacement | Suggest stronger verbs | Accept/Reject per suggestion |
| Quantification | Add metrics where missing | Edit before accept |
| Keyword optimization | Insert industry terms | Review changes |
| ATS scoring | Evaluate machine readability | View score |
| Version comparison | Highlight differences between versions | Toggle view |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Multi-language CV generation | Phase 7 |
| Cover letter generator | Phase 7 |
| Portfolio document builder | Phase 7 |
| Video CV integration | Phase 7 |
| Peer comparison (anonymized) | Phase 9 |
| Industry-specific CV templates | Phase 7 |
| Real-time collaboration (review by mentor) | Phase 6 |

---

*The CV Flow is one of MR:EGO's highest-value AI interactions. Every suggestion is transparent, optional, and confidence-indicated. The user maintains full control over their document. Refer to [Job-Flow.md](Job-Flow.md) for how the optimized CV feeds into job applications and [AI-Experience.md](AI-Experience.md) for AI interaction patterns.*
