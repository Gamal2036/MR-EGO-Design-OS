# Job Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 5, 12), DP-4 ([Jobs-Layout.md](../05-Application-Shell/Layouts/Jobs-Layout.md)), DP-3 ([Search-Pattern.md](../04-Component-Library/Patterns/Search-Pattern.md))

---

## Purpose

Enable users to discover, evaluate, and act on job opportunities with AI-powered matching and guidance.

---

## User Goal

"Find the right job opportunities for my skills and career goals."

---

## Flow Architecture

```
                    ┌─────────────────────────────────────────────────────┐
                    │                  JOB DISCOVERY LOOP                  │
                    └─────────────────────────────────────────────────────┘
                                                                          
  ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
  │  SEARCH    │───▶│   FILTER   │───▶│   REVIEW   │───▶│   MATCH    │───▶│  APPLY /   │
  │  (query)   │    │  (refine)  │    │  (results) │    │  (detail)  │    │   SAVE     │
  └────────────┘    └────────────┘    └────────────┘    └────────────┘    └────────────┘
       │                                                                            │
       └─────────────────────────── LOOP ───────────────────────────────────────────┘
```

---

## Phase Specifications

### 1. Search

| Aspect | Value |
|--------|-------|
| **Purpose** | Enter search criteria for job discovery |
| **Entry** | Dashboard "Find Jobs" or sidebar Jobs click |
| **Exit** | Search results displayed |
| **Primary CTA** | Search (triggered on input or Enter) |
| **Search Types** | Keyword, title, company, location, natural language (AI) |
| **Debounce** | 300ms for keyword search |
| **AI Search** | Natural language input: "Find remote senior frontend roles paying 150k+" |
| **Accessibility** | `role="combobox"` on search, autocomplete suggestions, `aria-label` on search input |

### 2. Filter

| Aspect | Value |
|--------|-------|
| **Purpose** | Narrow job results to relevant opportunities |
| **Entry** | Search results displayed |
| **Exit** | Filtered results |
| **Filters** | Job type (full-time, part-time, contract, remote), Location (city, remote, hybrid), Salary range, Experience level, Industry, Company size, Posted date |
| **Interaction** | Filters update results in real-time |
| **Active filters** | Displayed as removable chips above results |
| **Accessibility** | All filter controls labeled, date ranges accessible, salary slider with `aria-valuenow` |

### 3. Review Results

| Aspect | Value |
|--------|-------|
| **Purpose** | Browse and compare job listings |
| **Entry** | Search/filter complete |
| **Exit** | Click job card or paginate |
| **Primary CTA** | Click job card → Job Detail |
| **List Format** | Cards with: title, company, location, salary, match score (if profile complete), posted date, key skills |
| **Sort Options** | Relevance, date, salary, match score |
| **Pagination** | Page numbers, "Load More", or infinite scroll (mobile) |
| **Accessibility** | Each card `role="article"` with `aria-label`, keyboard navigation with arrow keys |

### 4. Job Detail + Match

| Aspect | Value |
|--------|-------|
| **Purpose** | Evaluate job fit with AI match analysis |
| **Entry** | Click job card from results |
| **Exit** | Apply, Save, or Back |
| **Primary CTA** | "Apply Now" |
| **Secondary CTA** | "Save Job", "Share", "See Similar" |
| **Match Score** | AI-calculated percentage with breakdown (skills, experience, culture, location) |
| **Sections** | Job info, match score + breakdown, company info, similar jobs, skills gap analysis |
| **AI Interaction** | Match score with section breakdown, AI suggests cover letter, AI identifies gaps |
| **Accessibility** | Match score as text + percentage, not color alone |

### 5. Apply / Save

| Aspect | Value |
|--------|-------|
| **Purpose** | Take action on a job opportunity |
| **Entry** | Job Detail page |
| **Exit** | Application submitted or job saved |
| **Primary CTA** | "Apply Now" (→ Application Form) |
| **Save** | "Save Job" (adds to saved jobs list) |
| **Shared Behavior** | Apply navigates to Application Form; Save adds to list with toast confirmation |

---

## Entry Points

| Source | Trigger |
|--------|---------|
| Dashboard | "Find Jobs" widget, Recommended Jobs cards |
| Sidebar | Jobs icon click |
| Notifications | New job match notification |
| Command palette | Ctrl+K → "Search Jobs" or Ctrl+2 |
| AI Workspace | "Find jobs like this" from AI suggestion |

## Exit Points

| Source | Destination |
|--------|-------------|
| Job Detail (Apply) | Application Form |
| Job Detail (Save) | Job Detail (saved state) |
| Job Detail (Back) | Search Results (with filters preserved) |
| Any | Sidebar navigation |

---

## Filter Specification

| Filter | Type | Behavior |
|--------|------|----------|
| Keywords | Text input | Search in title, description, company |
| Location | Text + geo | City search, remote toggle |
| Job Type | Multi-select checkbox | Full-time, Part-time, Contract, Freelance |
| Salary | Range slider | Min/max with currency selector |
| Experience Level | Single-select | Entry, Mid, Senior, Lead, Executive |
| Industry | Multi-select dropdown | Industry taxonomy |
| Posted Date | Date range or preset | Past 24h, Week, Month, Custom |

---

## Match Score Breakdown

| Component | Weight | Source |
|-----------|--------|--------|
| Skills Match | 40% | Profile skills vs job requirements |
| Experience Level | 25% | Years + seniority vs job level |
| Location Fit | 15% | Geographic match + remote eligibility |
| Education | 10% | Degree/field match |
| Industry Experience | 10% | Similar industry background |

---

## State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Initial | Search input focused | Ready for query |
| Searching | Skeleton cards (3-6) | Results loading |
| Results | Card grid with count | Interactive |
| No Results | "No jobs found" + suggestions | Try different terms |
| Filtered | Active filter chips | Refined results |
| Error | ErrorState with retry | Search service error |
| Offline | Cached results (if available) | Limited functionality |
| Saved (job) | "Saved" badge on card | Bookmarked for later |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Search input | `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"` |
| Filter controls | All labeled with `<label>` or `aria-label` |
| Result cards | `role="article"`, keyboard navigable |
| Match score | Text "85% match" + visual gauge |
| Salary | Text range, not color-coded |
| Pagination | `aria-label="Pagination"`, `aria-current="page"` |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Search full-width, filters as bottom sheet, single-column cards, infinite scroll |
| Tablet (768-1023px) | Search 400px, filters as side drawer, 2-column card grid, paginated |
| Desktop (1024-1279px) | 3-column: filters | list | detail (detail opens on select) |
| Ultra-wide (1600px+) | Full 3-column + saved jobs rail, max content 1600px |

---

## AI Interaction Map

| Surface | AI Role | Behavior |
|---------|---------|----------|
| Search input | Natural language interpretation | Parse "remote senior React jobs" as structured filters |
| Match score | Fit calculation + breakdown | Analyze skills, experience, location against job |
| Skills gap | Gap identification | "You're missing 3 of 7 required skills" |
| Similar jobs | Recommendation | "Based on this job, you might also like..." |
| Saved jobs alerts | Monitoring | Notify when similar jobs posted |
| Application assist | Cover letter generation | "Generate tailored cover letter?" |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Salary insights overlay | Phase 2 |
| Company research panel | Phase 2 |
| Job alert scheduling | Phase 2 |
| One-click apply (saved profile) | Phase 2 |
| Video job previews | Phase 7 |
| Application templates | Phase 7 |
| Interview probability prediction | Phase 2 |

---

*The Job Flow is the discovery engine of MR:EGO. AI matching provides transparency and trust, filters give control, and the application pipeline converts interest into action. Refer to [Application-Flow.md](Application-Flow.md) for the post-apply journey and [CV-Flow.md](CV-Flow.md) for preparation.*
