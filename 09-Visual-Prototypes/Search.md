# Search — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-4:Topbar, DP-6:UX (Search Flow), DP-7:Search Wireframe

---

## Purpose

Global search overlay providing instant access to jobs, CVs, documents, people, commands, and AI suggestions across the entire MR:EGO ecosystem. Triggered via Ctrl+K or topbar search button.

---

## Layout Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OVERLAY (Level 5, full-screen)                      │
│  Backdrop: rgba(15,23,42,0.72) + backdrop-blur(4px)                        │
│                                                                             │
│                                                                             │
│                    ┌──────────────────────────────────────────┐             │
│                    │          SEARCH CARD (max 640px)         │             │
│                    │                                          │             │
│                    │  ┌────────────────────────────────────┐  │             │
│                    │  │ 🔍  Search jobs, people, docs... ✕ │  │             │
│                    │  │                     [⌘K]           │  │             │
│                    │  └────────────────────────────────────┘  │             │
│                    │                                          │             │
│                    │  ┌─ RESULTS (max 480px, scrollable) ──┐  │             │
│                    │  │                                     │  │             │
│                    │  │  JOBS                               │  │             │
│                    │  │  ┌────────────────────────────────┐ │  │             │
│                    │  │  │ 💼 Senior Frontend Engineer   │ │  │             │
│                    │  │  │ Acme Corp · San Francisco     │ │  │             │
│                    │  │  │                     [Job]     │ │  │             │
│                    │  │  ├────────────────────────────────┤ │  │             │
│                    │  │  │ 💼 Staff Engineer             │ │  │             │
│                    │  │  │ Megacorp · Remote             │ │  │             │
│                    │  │  │                     [Job]     │ │  │             │
│                    │  │  └────────────────────────────────┘ │  │             │
│                    │  │                                     │  │             │
│                    │  │  CVs                                │  │             │
│                    │  │  ┌────────────────────────────────┐ │  │             │
│                    │  │  │ 📄 Senior Frontend CV v3      │ │  │             │
│                    │  │  │ Updated 2 days ago   [CV]     │ │  │             │
│                    │  │  └────────────────────────────────┘ │  │             │
│                    │  │                                     │  │             │
│                    │  │  DOCUMENTS                          │  │             │
│                    │  │  ┌────────────────────────────────┐ │  │             │
│                    │  │  │ 📎 Cover Letter - Acme        │ │  │             │
│                    │  │  │                    [Doc]      │ │  │             │
│                    │  │  └────────────────────────────────┘ │  │             │
│                    │  │                                     │  │             │
│                    │  │  PEOPLE                             │  │             │
│                    │  │  ┌────────────────────────────────┐ │  │             │
│                    │  │  │ 👤 Alex Chen                   │ │  │             │
│                    │  │  │ Senior Engineer     [User]     │ │  │             │
│                    │  │  └────────────────────────────────┘ │  │             │
│                    │  │                                     │  │             │
│                    │  │  HELP                               │  │             │
│                    │  │  ┌────────────────────────────────┐ │  │             │
│                    │  │  │ ❓ How to apply for a job?     │ │  │             │
│                    │  │  │                    [Help]     │ │  │             │
│                    │  │  └────────────────────────────────┘ │  │             │
│                    │  └─────────────────────────────────────┘  │             │
│                    │                                          │             │
│                    │  ┌─ HOT SECTIONS ──────────────────────┐  │             │
│                    │  │  QUICK ACTIONS                       │  │             │
│                    │  │  [New CV] [Upload Doc] [Apply] [AI] │  │             │
│                    │  │                                      │  │             │
│                    │  │  RECENT SEARCHES                     │  │             │
│                    │  │  • senior frontend engineer         │  │             │
│                    │  │  • react typescript jobs            │  │             │
│                    │  │  • cover letter template            │  │             │
│                    │  │                                      │  │             │
│                    │  │  AI SUGGESTIONS                      │  │             │
│                    │  │  ✨ "Jobs matching your updated CV" │  │             │
│                    │  │  ✨ "Improve your cover letter"     │  │             │
│                    │  └──────────────────────────────────────┘  │             │
│                    └──────────────────────────────────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Overlay & Backdrop

| Property | Token | Value |
|----------|-------|-------|
| Positioning | Fixed | inset 0 |
| Elevation | Layer 5 | Shadow-5, z-index 5000 |
| Backdrop color | — | rgba(15,23,42,0.72) |
| Backdrop blur | — | backdrop-filter: blur(4px) |
| Background | — | Surface-0 dark (modal context) |

### States

| State | Behavior |
|-------|----------|
| Open | Overlay visible, backdrop animates in 200ms |
| Closed | Overlay hidden, backdrop fades out 200ms |

---

## Section 2: Search Card

| Property | Token | Value |
|----------|-------|-------|
| Position | Absolute | top 20%, centered horizontally |
| Max width | — | 640px |
| Width | — | 90vw on mobile, 640px max |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border radius | radius-xl | 16px |
| Elevation | Layer 5 | Shadow-5 |
| Padding | Space-7 | 24px |
| Slide animation | — | 250ms, ease-out, translateY(-10px) to translateY(0) |

---

## Section 3: Search Input

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 56px |
| Background | Surface-0 | Neutral-50 |
| Border radius | radius-md | 8px |
| Border | — | 1px solid Neutral-300 |
| Focus border | — | 2px solid Primary-500 |
| Padding left | Space-5 | 16px |
| Padding right | Space-5 | 16px |

### Elements

| Element | Spec |
|---------|------|
| Search icon | 20×20px, Primary-500, left inset Space-5 |
| Input text | Body (15px/400), Text-Primary |
| Placeholder | Body (15px/400), Text-Secondary, "Search jobs, people, documents..." |
| Clear button | 20×20px, Neutral-400, hover → Neutral-600, right Space-3, visible only when input has text |
| Ctrl+K badge | Caption (13px/500), Neutral-500 bg Neutral-200, px-Space-3, py-2px, radius-sm, right Space-3 |

### States

| State | Visual |
|-------|--------|
| Default | Surface-0 bg, Neutral-300 border |
| Focus | Primary-500 border (2px), Shadow-1 |
| Hover | Surface-1 bg, Neutral-400 border |
| Typing | Input text visible, clear button appears |
| Disabled | Surface-1 bg, Neutral-200 text, cursor not-allowed |

---

## Section 4: Results Dropdown

| Property | Token | Value |
|----------|-------|-------|
| Max height | — | 480px |
| Overflow | — | Auto scroll |
| Margin top | Space-3 | 8px |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border radius | radius-md | 8px |
| Border | — | 1px solid Neutral-200 |
| Elevation | Layer 3 | Shadow-3 |

### Section Headers

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (13px/600) | Text-Secondary |
| Text transform | — | Uppercase |
| Letter spacing | — | 0.5px |
| Padding | Space-3 Space-5 | 8px 16px |
| Divider above | — | 1px solid Neutral-100 |

### Result Items

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 52px |
| Padding | Space-3 Space-5 | 8px 16px |
| Border radius | radius-sm | 6px |
| Icon | 20×20px | Primary-500 |
| Title | Body (15px/500) | Text-Primary |
| Subtitle | Caption (13px/400) | Text-Secondary |
| Type badge | Caption (11px/500) | Neutral-500 bg Neutral-100, px-Space-2, py-1px, radius-sm |

### States

| State | Visual |
|-------|--------|
| Default | Surface-1 bg |
| Hover | Surface-2 bg (Neutral-100) |
| Active/Selected | Primary-50 bg, left border 3px Primary-500 |
| Focused (keyboard) | Ring 2px Primary-300 |

### Results Stagger Animation

| Property | Value |
|----------|-------|
| Duration per item | 30ms stagger delay |
| Fade in | opacity 0→1, 200ms |
| Slide | translateY(8px)→translateY(0), 200ms ease-out |

---

## Section 5: Hot Sections

Positioned below results with Space-5 gap.

### 5.1 Quick Actions

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (13px/600) | Text-Secondary, uppercase |
| Chips | 4 items | 40px height, radius-full, Surface-2 bg |
| Chip text | Body-Small (14px/500) | Text-Primary |
| Chip icon | 16px | Primary-500 |
| Chip hover | — | Surface-3 bg (Neutral-200) |
| Gap | Space-3 | 8px |

### 5.2 Recent Searches

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (13px/600) | Text-Secondary, uppercase |
| Items | 3 items | 36px height |
| Item text | Body-Small (14px/400) | Text-Secondary |
| Hover | — | Text-Primary |
| Max items stored | — | 10 (persisted in localStorage) |

### 5.3 AI Suggestions

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (13px/600) | Text-Secondary, uppercase with sparkle |
| Items | 2 items | 40px height |
| Icon | Sparkle 16px | Primary-500 |
| Text | Body-Small (14px/500) | Primary-600 |
| Hover/click | — | Navigates to AI workspace with context |

---

## Section 6: Empty State

| Property | Token | Value |
|----------|-------|-------|
| Display | — | Visible when input is empty |
| Icon | 🔍 48px | Neutral-300 |
| Text | Body (15px/400) | Text-Secondary, "Start typing to search..." |
| Animation | — | Subtle pulse on icon every 4s |

---

## Section 7: No Results State

| Property | Token | Value |
|----------|-------|-------|
| Display | — | Visible when query returns zero results |
| Icon | — | Neutral-400, 40px |
| Heading | Body (15px/600) | Text-Primary, "No results for [query]" |
| Description | Body-Small | Text-Secondary, "Try different keywords or browse" |
| AI suggestion | — | "Ask AI to help find what you're looking for" link Primary-500 |
| CTA | — | [Clear Search] button, Primary outline |

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Role | `dialog` with `aria-modal="true"` |
| Label | `aria-label="Global search"` on overlay |
| Input label | `aria-label="Search input"` or visible label with `for` |
| Results list | `role="listbox"` with `aria-label="Search results"` |
| Result items | `role="option"` with `aria-selected` |
| Live region | `aria-live="polite"` for results count |
| Focus trap | Focus locked within overlay while open |
| Focus return | Returns to trigger element on close |
| Escape | Closes overlay |
| Announcement | Screen reader announces "Search opened" / "Search closed" |
| No results | `aria-live="assertive"` announces result count |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Ctrl+K / Cmd+K | Toggle search open/close |
| Type | Filter results in real-time |
| ↑ | Navigate up through results |
| ↓ | Navigate down through results |
| Enter | Select focused result, navigate to destination |
| Escape | Close search overlay |
| Tab | Cycle through sections (input → results → hot sections → input) |
| Shift+Tab | Reverse tab cycle |
| Backspace | Delete character; if input empty, close |
| Ctrl+Backspace | Clear entire input |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Full overlay, card max 640px, top 20% |
| Tablet (768-1024px) | Full overlay, card 90vw max 560px, top 15% |
| Mobile (<768px) | Full overlay, card 100vw, top 0, radius-none, full-height results |
| Mobile card | Full width, no border radius, fills viewport height |
| Mobile results | Max height calc(100vh - 120px), no overscroll |

---

## Motion Specification

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Overlay fade in | opacity 0→1 | 200ms | ease-out |
| Overlay fade out | opacity 1→0 | 150ms | ease-in |
| Card slide in | translateY(-20px)→0 | 250ms | cubic-bezier(0.16,1,0.3,1) |
| Card slide out | translateY(0)→(-20px) | 200ms | ease-in |
| Results stagger | Each item delays 30ms | 200ms total | ease-out |
| Input focus | Border color transition | 150ms | ease |
| Clear button appear | opacity 0→1 | 100ms | ease |
| Reduces motion | Respects prefers-reduced-motion | — | Disable all animations |

---

## AI Features

| Feature | Behavior |
|---------|----------|
| AI Suggestions | Two context-aware suggestions below recent searches |
| Sparkle icon | Primary-500, signals AI origin |
| Context awareness | Suggestions based on latest CV, recent searches, application stage |
| Query intent | AI detects if query looks like a command or natural-language question |
| Fallback | If no results, offer "Ask AI" as fallback action |
| Personalization | Suggestions adapt to user role, industry, career stage |

---

## Future Expansion

| Feature | Category | Notes |
|---------|----------|-------|
| Natural language query parsing | Search | "remote react jobs >150k no travel" |
| AI result ranking | Search | Results sorted by relevance score |
| Saved searches | Search | Persisted with notification on new matches |
| Federated search | Search | External sources (LinkedIn, Indeed) |
| Voice search | Input | Microphone icon, speech-to-text |
| Search analytics | Dashboard | Popular searches, no-result queries |
| Cross-device history | Search | Synced recent searches |
| Semantic search | AI | Understands intent, not just keywords |
| Filter chips in search | Search | Inline filters: Type, Date, Status |
| Multi-select results | Search | Select multiple items for bulk actions |
