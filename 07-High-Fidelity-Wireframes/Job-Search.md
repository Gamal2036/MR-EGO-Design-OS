# Job Search — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Job Search), DP-6:Nav (Application Flow), DP-1:All

---

## Purpose

Find relevant job opportunities with AI-powered search, intelligent filtering, and match-based recommendations.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────┬───────────┐
│          │  TOPBAR (56px)                          │           │
│          │  ← Jobs                   Saved(8)  ⋮  │           │
│ SIDEBAR  ├──────────┬─────────────────────────────┤ AI PANEL  │
│ (240px)  │  FILTERS  │  RESULTS                    │ (optional)│
│          │  (280px)  │                             │           │
│          │           │  SEARCH BAR (full width)    │ Match     │
│          │  Role     │  ┌─────────────────────┐    │ Insights  │
│          │  [Input]  │  │ Senior Frontend  🔍 │    │           │
│          │           │  └─────────────────────┘    │           │
│          │  Location │  Result count: 47 jobs      │           │
│          │  [Input]  │  Sort: Most Recent ▼        │           │
│          │           │                             │           │
│          │  Remote   │  ┌──────────────────────┐   │           │
│          │  ☐ On-site│  │ Job Card 1            │   │           │
│          │  ☒ Hybrid │  │ Acme Corp - SF        │   │           │
│          │  ☐ Remote │  │ $120-150k  92% match  │   │           │
│          │           │  └──────────────────────┘   │           │
│          │  Salary   │  ┌──────────────────────┐   │           │
│          │  [range]  │  │ Job Card 2            │   │           │
│          │           │  │ Beta Inc - Remote     │   │           │
│          │           │  │ $130-160k  85% match  │   │           │
│          │  [Clear]  │  └──────────────────────┘   │           │
│          │  [Apply]  │  ┌──────────────────────┐   │           │
│          │           │  │ Job Card 3            │   │           │
│          │           │  │ ...                  │   │           │
│          │           │  └──────────────────────┘   │           │
│          │           │                             │           │
│          │           │  PAGINATION (centered)      │           │
│          │           │  [<] [1] [2] [3] [>]       │           │
│          └───────────┴─────────────────────────────┘           │
├──────────┴────────────────────────────────────────────────────┤
│  [AI Assistant: "Refine your search?"]                        │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Search Bar

| Property | Value |
|----------|-------|
| Height | 48px |
| Radius | radius-md (8px) |
| Border | Border-Default |
| Background | Surface-1 |
| Margin bottom | Space-4 (12px) |

### Elements:
| Element | Details |
|---------|---------|
| Search icon | 20px magnifier, Neutral-400, left padding Space-4 |
| Text input | Flex 1, 14px, "Search jobs, companies, keywords..." |
| Clear button | X icon, visible only when text entered |
| Search trigger | Submit on Enter or click anywhere in bar |

---

## 2. Filter Sidebar (Left)

| Property | Value |
|----------|-------|
| Width | 280px |
| Background | Surface-1 |
| Border right | Border-Default |
| Padding | Space-5 (16px) |
| Overflow | Scroll |

### Filter Groups:

**Keyword:**
| Element | Type | Details |
|---------|------|---------|
| Label | "Role / Title" — Label (14px, 500 weight) |
| Input | 40px height, full width, text input |
| Spacing bottom | Space-5 (16px) |

**Location:**
| Element | Details |
|---------|---------|
| Label | "Location" |
| Input | 40px height, full width, text input + suggestions dropdown |
| Spacing bottom | Space-5 (16px) |

**Work Type (Checkbox group):**
| Property | Value |
|----------|-------|
| Label | "Work Type" |
| Option | Checkbox (16px) + label (Body, 14px), stacked |
| Options | On-site, Hybrid, Remote |
| Gap | Space-3 (8px) between options |
| Spacing bottom | Space-5 (16px) |

**Salary Range (Dual slider):**
| Property | Value |
|----------|-------|
| Label | "Salary Range" |
| Min | $0 |
| Max | $250k+ |
| Track | 4px height, rounded |
| Handles | 16px circle, Primary-500 |
| Spacing bottom | Space-5 (16px) |

**Experience Level (Checkbox group):**
| Options | Entry, Junior, Mid, Senior, Lead, Executive |

**Date Posted (Radio group):**
| Options | Any, Past 24h, Past Week, Past Month |

**Filter actions:**
| Button | Details |
|--------|---------|
| "Clear Filters" | Button-ghost, text link |
| "Apply Filters" | Button-Small-Primary |

---

## 3. Results Area

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Background | Surface-0 |

### Result Header:
| Element | Details |
|---------|---------|
| Count | "47 jobs found" — Body, 600 weight |
| Sort | Dropdown: "Most Recent" / "Most Relevant" / "Highest Match" |
| Save search | Button-ghost: "Save Search" |
| Margin bottom | Space-4 (12px) |

### Job Card:
| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Hover | Shadow-2, border-hover, cursor pointer |
| Min height | 120px |
| Gap bottom | Space-3 (8px) |

### Card Elements:
```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────┐  Senior Frontend Developer                    ♡   │
│  │ logo │  Acme Corporation · San Francisco, CA            │
│  │ 48px │  $120,000 - $150,000 · Full-time · Hybrid       │
│  └──────┘                                                  │
│           ⚡ AI Match: 92%  |  Skills: 8/9 match           │
│           Posted 2 days ago · 45 applicants               │
└──────────────────────────────────────────────────────────────┘
```

| Element | Type | Details |
|---------|------|---------|
| Company logo | 48px x 48px, radius-sm, Surface-2 (placeholder) |
| Job title | Heading-4 (18px), Text-Primary |
| Save icon | ♡ / ♥ toggle, top-right |
| Company | Body-Small, Text-Secondary |
| Location | Body-Small, Text-Secondary |
| Salary | Body-Small, Text-Secondary, 600 weight |
| Type | Body-Small, Text-Secondary |
| Match badge | Body-Small, Primary-600 bg tint, "92% match" |
| Skills match | Caption, Text-Secondary |
| Posted date | Caption, Text-Secondary |
| Applicant count | Caption, Text-Secondary |

---

## 4. Pagination

| Property | Value |
|----------|-------|
| Margin top | Space-7 (24px) |
| Alignment | Center |

### Elements:
| Element | Size | Details |
|---------|------|---------|
| Prev/Next | 36px x 36px, icon buttons | Disabled on first/last page |
| Page numbers | 36px x 36px, body text | Active page: Primary-600 bg, white text |
| Gap | Space-2 (4px) between numbers |

---

## 5. Empty State (No Results)

| Element | Specification |
|---------|---------------|
| Illustration | Search/magnifying glass illustration, 120px |
| Title | "No jobs found" |
| Description | "Try adjusting your filters or search terms" |
| Actions | "Clear All Filters" + "Browse All Jobs" |

---

## 6. Loading State

| State | Behavior |
|-------|----------|
| Initial search | Skeleton result cards (6 cards, 120px h each, shimmer) |
| Filter change | Previous results fade slightly (0.6 opacity), new cards appear with stagger |
| AI match loading | Match badge shows shimmer, then reveals number |

---

## 7. Error States

| Error | Behavior |
|-------|----------|
| Search fails | Toast: "Could not load results. Please try again." + retry |
| Filter fails | Inline: filter section shows error, others remain |
| No results (valid) | Empty state with illustrations |

---

## 8. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Single column, filter as bottom sheet | Filter drawer + results | Filter sidebar + results |
| Filter panel | Bottom sheet (slide up) | Side drawer | Persistent 280px |
| Job cards | Full width, compact | Full width | Full width |
| Search bar | Full width | 600px max | Full width |
| AI panel | Hidden | Right drawer | Optional |
| Pagination | "Load more" button | Numbered | Numbered |

---

## 9. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| Natural language search | Search bar | "Remote senior frontend jobs paying over $130k" |
| Match score | Job card | 92% with breakdown tooltip on hover |
| AI refinements | Bottom suggestion | "Try 'React Native' or expand to 'Full Stack'" |
| Smart filters | Filter sidebar | AI-preferred filters highlighted |
| Saved searches | Top | AI re-runs saved searches, notifies of new matches |
| Salary insights | Job card tooltip | AI-estimated range based on market data |

---

## 10. Accessibility

| Element | Requirement |
|---------|-------------|
| Search input | `aria-label="Search jobs"`, `role="searchbox"` |
| Filters | `<fieldset>` and `<legend>` per group |
| Job cards | `role="article"`, `aria-label="[Title] at [Company]"` |
| Match badge | Text: "92 percent match" — never color alone |
| Sort | `<select>` with `<label>` |
| Pagination | `aria-label="Page [number]"`, `aria-current="page"` |
| Results region | `role="region" aria-label="Job search results"`, `aria-live="polite"` |

---

## 11. Visual Hierarchy

1. **Primary Focus:** Search bar — top, full width, highest contrast
2. **Secondary Focus:** Job cards — titles + match badges
3. **Tertiary Focus:** Filters — left sidebar, secondary importance
4. **Supporting:** Match percentage, salary, company details

---

## 12. Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Search → Filters → Results → Pagination |
| / | Focus search bar (from any page) |
| Arrow keys | Navigate filter options, job list |
| Enter | Open job detail (from card) |
| Escape | Close filter dropdown, clear input |

---

## 13. Future Expansion

| Feature | Phase |
|---------|-------|
| Saved search alerts | Phase 2 |
| Company research panel | Phase 4 |
| Salary insights overlay | Phase 4 |
| Job alert scheduling | Phase 3 |
| One-click apply (saved profile) | Phase 5 |
| Company follow/preferences | Phase 3 |

---

*Cross-references: DP-6:Screen (Job Search), DP-6:Nav (Application Flow), DP-6:Pattern (Progressive Disclosure), DP-1:All*
