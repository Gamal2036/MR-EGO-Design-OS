# Job Search — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Design Specification
**Inherits:** DP-0 through DP-8
**Pages Covered:** Job Search, Search Results, Filter Sidebar, AI Panel, Saved Searches

---

## Purpose

Powerful job discovery engine with natural language search, granular filters, AI-powered match scoring, and real-time refinement. Users find roles that align with their CV, preferences, and career trajectory.

---

## Layout Overview

```
┌──────────┬─────────────┬───────────────────────────────────────┬────────────┐
│          │             │                                       │            │
│ SIDEBAR  │ FILTERS     │  RESULTS AREA                         │ AI PANEL   │
│ (240px)  │ (280px)     │                                       │ (320px)    │
│          │             │  ┌─────────────────────────────────┐  │ (optional) │
│          │ ┌─────────┐ │  │ SEARCH BAR (48px)              │  │            │
│          │ │ Keyword  │ │  │ [🔍] senior frontend react [✕] │  │ ┌────────┐ │
│          │ │ [input]  │ │  └─────────────────────────────────┘  │ │ Match  │ │
│          │ │          │ │                                       │ │ Score  │ │
│          │ │ Location │ │  ┌─────────────────────────────────┐  │ │ 92%    │ │
│          │ │ [input]  │ │  │ RESULTS HEADER                  │  │ └────────┘ │
│          │ │          │ │  │ 147 jobs · Sort: Newest ▾       │  │            │
│          │ │ Work     │ │  │ [Save Search]                    │  │ ┌────────┐ │
│          │ │ Type     │ │  └─────────────────────────────────┘  │ │ Skills │ │
│          │ │ □ Remote │ │                                       │ │ Gap    │ │
│          │ │ □ Hybrid │ │  ┌─────────────────────────────────┐  │ │ ...    │ │
│          │ │ □ Onsite │ │  │ JOB CARD                        │  │ └────────┘ │
│          │ │          │ │  │ [Logo 48px] Senior Frontend     │  │            │
│          │ │ Salary   │ │  │ Acme Corp · SF, CA · $150-180K  │  │            │
│          │ │ ───●───  │ │  │ [92% match] React, TS, Next.js  │  │            │
│          │ │ 100k-200k│ │  │ Full-time · Remote · Posted 2d  │  │            │
│          │ │          │ │  └─────────────────────────────────┘  │            │
│          │ │ ...      │ │                                       │            │
│          │ │          │ │  ┌─────────────────────────────────┐  │            │
│          │ │ [Apply]  │ │  │ JOB CARD                        │  │            │
│          │ │ [Clear]  │ │  │ [Logo 48px] Staff Engineer      │  │            │
│          │ └─────────┘ │  │ Megacorp · Remote · $200-250K    │  │            │
│          │             │  │ [78% match] System Design, K8s   │  │            │
│          │             │  └─────────────────────────────────┘  │            │
│          │             │                                       │            │
│          │             │  ┌─────────────────────────────────┐  │            │
│          │             │  │ PAGINATION:  < 1 2 3 ... 10 >   │  │            │
│          │             │  └─────────────────────────────────┘  │            │
│          └─────────────┴───────────────────────────────────────┴────────────┘
```

---

## Section 1: Search Bar

| Property | Value |
|----------|-------|
| Purpose | Primary input for job search queries with natural language support |
| Priority | P0 |
| Visual weight | High — prominent, full-width |
| Height | 48px |
| Max width | 100% of results area |
| Background | Surface-1 |
| Border | 1px solid Neutral-300 |
| Border radius | radius-md (8px) |
| Elevation | Layer 1 |
| Spacing below | Space-5 (16px) |

### Elements

| Element | Spec |
|---------|------|
| Search icon | 20×20px, Neutral-400, left inset Space-5 |
| Input | Body (15px/400), Text-Primary, placeholder Text-Secondary, flex 1, no border, no outline |
| Clear button | "✕" 20×20px, Neutral-400, hover → Neutral-600, right Space-3, hidden when empty |

### States

| State | Visual |
|-------|--------|
| Default | Neutral-300 border, Neutral-50 bg |
| Hover | Neutral-400 border |
| Focus | Primary-500 border, 2px Primary-400/30 ring, Neutral-0 bg |
| Active typing | Clear button visible, subtle shadow Layer 2 |
| Loading | Spinner replaces search icon |
| Error | Error-500 border, error message below |
| Disabled | Opacity 0.5, cursor not-allowed, Neutral-200 bg |

### Natural Language Examples

| Input | Parsed |
|-------|--------|
| "senior frontend engineer remote react" | Keywords + remote filter + react skill |
| "product manager in nyc under 180k" | Role + location + salary max |
| "staff level AI/ML jobs this week" | Level + field + date posted |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | search |
| aria-label | "Search jobs" |
| aria-describedby | Suggestions dropdown |
| aria-autocomplete | "list" |
| role="combobox" | With listbox for suggestions |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Enter | Execute search |
| Down arrow | Open suggestions, navigate |
| Escape | Clear input or close suggestions |
| Tab | Move to filters |

---

## Section 2: Filter Sidebar

| Property | Value |
|----------|-------|
| Purpose | Granular refinement of search results |
| Priority | P0 |
| Width | 280px (fixed) |
| Background | Surface-0 |
| Padding | Space-5 (16px) |
| Scroll | Independent vertical scroll |
| Sticky | Top aligned with results header |

### Filter Groups

| Group | Control Type | Priority | Items |
|-------|-------------|----------|-------|
| Keyword | Text input | P0 | Free text |
| Location | Text input + radius dropdown | P0 | City/zip + miles |
| Work Type | Checkbox group | P0 | Remote, Hybrid, On-site |
| Salary Range | Dual range slider | P0 | Min knob + Max knob |
| Experience Level | Checkbox group | P0 | Entry, Mid, Senior, Staff, Lead |
| Date Posted | Radio group | P1 | Any, Past 24h, Past week, Past month |
| Company Size | Checkbox group | P1 | Startup, Mid-size, Enterprise |
| Industry | Multi-select dropdown | P1 | Tech, Finance, Healthcare... |
| Visa Sponsorship | Toggle | P2 | Yes/No/Any |
| Benefits | Checkbox group | P2 | Equity, 401k, Unlimited PTO... |

### Group Header

| Property | Value |
|----------|-------|
| Height | 40px |
| Title | Body-Small (14px/600), Text-Primary |
| Collapse chevron | 16×16px, right-aligned, rotates on collapse |

### Checkbox Item

| Property | Value |
|----------|-------|
| Height | 32px |
| Checkbox | 18×18px, radius-sm, Neutral-300 border |
| Checked bg | Primary-500, white checkmark |
| Label | Body-Small (14px/400), Text-Primary |
| Count badge | Caption (13px/400), Text-Secondary, right-aligned |

### Dual Range Slider (Salary)

| Property | Value |
|----------|-------|
| Height | 40px |
| Track height | 4px |
| Track bg | Neutral-200 |
| Fill bg | Primary-500 |
| Knob size | 20×20px, Primary-500, radius-full, white center |
| Label | Caption (13px/400), "Min: $100k — Max: $200k" |

### Action Buttons

| Button | Spec | Behavior |
|--------|------|----------|
| Apply Filters | Primary-500, full width, 40px height | Updates results with new filter set |
| Clear All | Secondary, full width, 40px height | Resets all filters to defaults |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Search filters" |
| role="group" | Per filter group with aria-labelledby |
| role="checkbox" | Per checkbox item |
| role="slider" | On salary range with aria-valuemin/max/now |
| aria-controls | Links to results area |

---

## Section 3: Results Area

| Property | Value |
|----------|-------|
| Purpose | Display search results with sorting and job cards |
| Priority | P0 |
| Layout | Flex column with header + scrollable card list + pagination |
| Max width | 100% of remaining space |
| Padding | Space-5 (16px) |
| Background | Surface-0 |

### Results Header

| Property | Value |
|----------|-------|
| Height | 40px |
| Count | Body (15px/500), Text-Primary, "147 jobs" |
| Sort dropdown | Body-Small (14px/400), Text-Secondary, dropdown arrow |
| Sort options | Newest, Most Relevant, Salary (high-low), Salary (low-high) |
| Save Search | Button, Body-Small (14px/500), Primary-600, bookmark icon |

### Job Card

| Property | Value |
|----------|-------|
| Min height | 120px |
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Elevation | Layer 1 |
| Hover elevation | Layer 2 |
| Margin bottom | Space-3 (8px) |
| Cursor | pointer |

### Job Card Elements

| Element | Spec |
|---------|------|
| Company logo | 48×48px, radius-md, Neutral-100 fallback bg |
| Title | Heading-4 (18px/600), Text-Primary, Primary-600 hover |
| Company name | Body (15px/500), Text-Primary |
| Location | Body-Small (14px/400), Text-Secondary |
| Salary | Body (15px/600), Success-700 |
| Match badge | "92% Match" — Caption (13px/600), Primary-600 text, Primary-50 bg, radius-sm, 6px padding |
| Skills | Caption (13px/400), Text-Secondary "React, TypeScript, Next.js" |
| Work type | Caption (13px/400), Neutral-500 "Full-time · Remote" |
| Date | Caption (13px/400), Text-Secondary "Posted 2 days ago" |
| Save icon | 20×20px, Neutral-300, hover → Primary-500, filled when saved |

### Match Badge Levels

| Level | Score Range | Text Color | Background |
|-------|-------------|------------|------------|
| Excellent | 90-100% | Primary-600 | Primary-50 |
| Good | 75-89% | Primary-500 | Primary-50/50 |
| Fair | 60-74% | Neutral-600 | Neutral-100 |
| Low | <60% | Neutral-500 | Neutral-100 |

### States

| State | Card | Header |
|-------|------|--------|
| Default | Layer 1, Neutral-200 border | Normal |
| Hover | Layer 2, Primary-100 border, cursor pointer | — |
| Saved | Bookmark icon filled Primary-500 | — |
| Viewed | Opacity 0.85, subtle left border Neutral-300 | — |
| Expanded | Full card with description preview | — |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | list |
| aria-label | "Job search results" |
| role="article" | Per job card |
| aria-label | "Senior Frontend Engineer at Acme Corp, 92 percent match" |
| aria-sort | On sort dropdown |

---

## Section 4: Pagination

| Property | Value |
|----------|-------|
| Purpose | Navigate between pages of results |
| Priority | P1 (hidden when <2 pages) |
| Height | 36px |
| Alignment | Centered |
| Margin top | Space-7 (24px) |

### Button Spec

| Property | Value |
|----------|-------|
| Size | 36×36px |
| Border radius | radius-sm (6px) |
| Background | Neutral-0 |
| Border | 1px solid Neutral-200 |
| Active bg | Primary-500 |
| Active text | Neutral-0 |
| Disabled | Opacity 0.3 |
| Gap between | Space-3 (8px) |

### Elements

| Element | Spec |
|---------|------|
| Previous | "<" icon, left |
| Page numbers | 1, 2, 3, ..., 10 |
| Next | ">" icon, right |
| Ellipsis | "..." when more than 7 pages |

### States

| State | Visual |
|-------|--------|
| Default | Neutral-0 bg, Neutral-200 border |
| Hover | Neutral-50 bg, Neutral-300 border |
| Active/Current | Primary-500 bg, Neutral-0 text |
| Disabled | Opacity 0.3, cursor not-allowed |
| Focus | 2px Primary-400 ring |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | navigation |
| aria-label | "Pagination" |
| aria-current="page" | On active page button |
| aria-label | "Go to page 3" per button |

---

## Section 5: Empty State

| Property | Value |
|----------|-------|
| Purpose | Guide user when no results match criteria |
| Priority | P0 |
| Layout | Centered column, 400px max-width |
| Padding top | Space-14 (128px) |

### Elements

| Element | Spec |
|---------|------|
| Illustration | Search empty illustration, 160×120px |
| Title | Heading-3 (22px/600), Text-Primary, margin-top Space-7 |
| Description | Body (15px/400), Text-Secondary, margin-top Space-3 |
| Clear filters link | Primary-600, Body-Small (14px/500), margin-top Space-5 |
| Modify search link | Primary-600, Caption (13px/500), margin-top Space-3 |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "No jobs found. Try adjusting your filters." |

---

## Section 6: AI Integration

| Feature | Description | Priority |
|---------|-------------|----------|
| Natural language search | Parse free-text queries into structured search params | P0 |
| Match scores | AI compares CV against each job posting | P0 |
| Search refinement | "Make this more specific" / "Broaden this search" buttons | P1 |
| Smart filters | Auto-suggest filters based on query context | P1 |
| Saved search alerts | Notify when new jobs match saved criteria | P1 |
| Related roles | "People who searched this also applied to..." | P2 |
| Salary estimation | AI estimates market rate for matched roles | P2 |
| Resume keyword match | Highlight CV keywords present in job description | P2 |

### AI Panel (320px, optional)

| Section | Content |
|---------|---------|
| Match breakdown | Bar chart: Skills 82%, Experience 74%, Location 100% |
| Skill gaps | Matched skills (green), Missing skills (red) |
| Salary insight | "Market range: $160-195K. Your CV suggests $175K" |
| Search tips | "Try adding 'GraphQL' to broaden matches" |

### AI States

| State | Visual |
|-------|--------|
| Idle | No AI indicators |
| Searching | Animated dots in search bar, "AI is finding matches..." |
| Results ready | Match badges on cards, AI panel populated |
| Enhancing | "Refining results..." pulsing indicator |
| Error | "Search failed" banner with retry |
| Offline | "Search is limited while offline" notice |

---

## States Matrix

| State | Search Bar | Filter Sidebar | Results | Pagination | AI Panel |
|-------|------------|----------------|---------|------------|----------|
| Default | Empty, placeholder | All groups collapsed | No results | Hidden | Hidden |
| Typing | Input with clear | — | — | — | — |
| Searching | Spinner | Disabled | Skeleton cards | Hidden | Pulse |
| Results | Input filled | Active filters shown | Card list | Shown | Match data |
| Hover (card) | — | — | Layer 2 | Bg change | — |
| Focus | Primary ring | Primary ring per control | Card focus ring | Page ring | — |
| Loading | Spinner | Skeleton groups | 6 skeleton cards | Hidden | Hidden |
| Empty | Input with value | Filters applied | Empty state | Hidden | — |
| Error | Error border | — | Error banner | Hidden | Error |
| Offline | "Offline" indicator | Disabled | Cached results | Cached | Unavailable |
| No results | Input with value | Filters applied | Empty state | Hidden | Suggestion |

---

## Loading State: 6 Skeleton Cards

| Property | Value |
|----------|-------|
| Card skeleton | Full-width, 120px height, radius-md |
| Elements per card | Logo circle (48px) + 3 shimmer lines (70%/50%/40% width) |
| Animation | Shimmer sweep Neutral-100 → Neutral-200 |
| Stagger | 80ms between cards |
| Duration | 1200ms per cycle |

---

## Responsive Behavior

| Breakpoint | Layout | Changes |
|------------|--------|---------|
| >1400px | Full 4-column | Sidebar + filters + results + AI panel |
| 1100-1400px | 3-column | Sidebar + filters + results (AI panel slides over) |
| 800-1100px | 2-column | Filters collapsed to flyout + results |
| 600-800px | Stacked | Search + results, filters as overlay |
| <600px | Single column | Full-width results, filter as drawer |

### Tablet (<900px)

| Element | Change |
|---------|--------|
| Filter sidebar | Collapsed to a "Filters" button above results, opens as flyout overlay |
| AI panel | Hidden by default, toggle button in topbar |
| Job cards | Full width, simplified layout |
| Search bar | 100% width |

### Mobile (<600px)

| Element | Change |
|--------|--------|
| Sidebar | Hidden (drawer toggle) |
| Filters | Full-screen overlay with sticky Apply button at bottom |
| Job cards | Logo 40px, title Heading-4 → Body (15px/600), single column |
| Pagination | Simplified: "Load more" button instead of numbered pages |
| Search bar | Reduced height 44px |
| Results header | Count + sort only, Save Search moved to menu |
| Match badge | Smaller, Caption (12px) |

---

## Color Tokens Reference

| Element | Light Token | Dark Token |
|---------|-------------|------------|
| Search bar border | Neutral-300 | Neutral-600 |
| Search bar focus border | Primary-500 | Primary-400 |
| Filter group header | Text-Primary | Neutral-800 |
| Checkbox border | Neutral-300 | Neutral-600 |
| Checkbox checked | Primary-500 bg | Primary-400 bg |
| Slider track | Neutral-200 | Neutral-700 |
| Slider fill | Primary-500 | Primary-400 |
| Card bg | Surface-1 | Neutral-100 |
| Card border | Neutral-200 | Neutral-700 |
| Card hover border | Primary-100 | Primary-900 |
| Match badge bg | Primary-50 | Primary-950 |
| Match badge text | Primary-600 | Primary-400 |
| Salary text | Success-700 | Success-400 |
| Empty illustration | Neutral-300 | Neutral-600 |

---

## Typography Reference

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Job card title | Heading-4 | 18px | 600 |
| Company name | Body | 15px | 500 |
| Location/date | Body-Small | 14px | 400 |
| Salary | Body | 15px | 600 |
| Match badge | Caption | 13px | 600 |
| Skills | Caption | 13px | 400 |
| Search input | Body | 15px | 400 |
| Filter group title | Body-Small | 14px | 600 |
| Filter item label | Body-Small | 14px | 400 |
| Results count | Body | 15px | 500 |
| Sort | Body-Small | 14px | 400 |

---

## Spacing Reference

| Usage | Token | Value |
|-------|-------|-------|
| Search bar below | Space-5 | 16px |
| Filter sidebar padding | Space-5 | 16px |
| Results area padding | Space-5 | 16px |
| Card padding | Space-5 | 16px |
| Between cards | Space-3 | 8px |
| Pagination top | Space-7 | 24px |
| Empty state top | Space-14 | 128px |
| Filter group bottom | Space-5 | 16px |
| Icon to text | Space-3 | 8px |
| Pagination button gap | Space-3 | 8px |

---

## Future Expansion Items

| Item | Description | Priority |
|------|-------------|----------|
| Map view | Toggle to show jobs on map with pins | P2 |
| Job alert subscriptions | Email/push when matching jobs posted | P1 |
| Application history | Track which jobs you applied to from search | P1 |
| Company insights | Embed company ratings, growth data, funding | P2 |
| Salary transparency | Verified salary ranges, company-reported | P2 |
| One-click apply | Pre-filled application from CV/profile | P1 |
| Hidden employer mode | Block specific companies from results | P3 |
| Interview availability | Calendar integration for quick apply | P2 |
| Diversity filters | Filter by diversity-friendly certifications | P3 |
| Job board aggregation | Multi-source results (LinkedIn, Indeed, Glassdoor) | P2 |
| Collaborative search | Share search results with team/mentor | P3 |
