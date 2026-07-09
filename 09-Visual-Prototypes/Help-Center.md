# Help Center — Visual Prototype

**Phase:** DP-9 (Visual Prototype System)
**Status:** Complete
**Inherits:** DP-7 (Help-Center Wireframe), DP-6:IA, DP-1:All

---

## Purpose

Self-service help center with searchable articles, FAQ, guided tutorials, and contact support. AI-powered answer suggestions and context-aware recommendations.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px glass)                                │
│          │  ← Help Center                   [Contact Us]      │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT (scrollable, centered)                    │
│          │                                                    │
│  SEARCH SECTION (centered 640px)                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  🔍 "How can we help?"                    [Search]     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  QUICK HELP CARDS (4-column)                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Getting  │ │ CV &     │ │ Job      │ │ Account  │      │
│  │ Started  │ │Documents │ │ Search   │ & Billing │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                    │
│  AI SUGGESTED ARTICLES                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 💡 Based on your activity: "How to optimize your CV"  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  POPULAR ARTICLES (2-column grid)                           │
│  ┌──────────────────────────┐ ┌──────────────────────────┐  │
│  │ Article Card 1           │ │ Article Card 2           │  │
│  │ Title + read time        │ │ Title + read time        │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
│  ┌──────────────────────────┐ ┌──────────────────────────┐  │
│  │ Article Card 3           │ │ Article Card 4           │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
│                                                    │
│  FAQ SECTION (accordion)                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ▸ How does AI matching work?                          │  │
│  │ ▸ How do I improve my CV score?                       │  │
│  │ ▸ Can I have multiple CV versions?                    │  │
│  │ ▸ How do I generate a cover letter?                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  CONTACT SUPPORT                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Still need help? [Email] [Chat] [Schedule]             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Search Section

| Property | Value |
|----------|-------|
| Max width | 640px centered |
| Padding top | Space-9 (40px) |
| Padding bottom | Space-8 (32px) |
| Background | Surface-0 |
| Purpose | Primary entry point for help content discovery |
| Priority | Highest — first visual element |
| Visual weight | High — centered, largest element |

### Search Input:

| Property | Value |
|----------|-------|
| Height | 52px |
| Radius | radius-md (8px) |
| Border | Border-Default (1px Neutral-300) |
| Background | Surface-1 |
| Shadow | Shadow-1 |
| Padding | Space-4 (12px) horizontal |
| Layout | Flex row, centered |

### Elements:

| Element | Size | Details |
|---------|------|---------|
| Search icon | 20px magnifier | Neutral-400, left padding Space-4 |
| Input | Flex 1 | Body (15px, 400), placeholder "How can we help?" Text-Secondary |
| Clear button | 20px X icon | Visible only when text entered |
| Search action | Text-Caption | "Press Enter to search" or button |

### States:

| State | Visual |
|-------|--------|
| Default | Neutral border, neutral icon, placeholder visible |
| Focus | Border-Focus (Primary-500), 2px ring Primary-200, icon Primary |
| Typing | Clear button appears, placeholder hidden |
| Searching | Input disabled, spinner replaces icon |
| Results | Dropdown appears below (max 480px height, scrollable) |
| No results | "No articles found for [query]" + contact support link |
| Error | Border-Danger, "Search unavailable" message |

---

## 2. Quick Help Cards

| Property | Value |
|----------|-------|
| Layout | 4 cards, gap Space-4 (12px) |
| Max width | 960px centered |
| Margin bottom | Space-8 (32px) |
| Purpose | Category-based navigation to common help topics |
| Priority | High — secondary entry point |

### Card Specification:

| Property | Value |
|----------|-------|
| Width | 1fr (equal 4-column) |
| Height | 120px |
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Shadow | Shadow-1 |
| Hover | Shadow-2, border-hover, cursor pointer |
| Motion | Elevation transition 150ms |

### Card Elements:

| Element | Size | Details |
|---------|------|---------|
| Icon | 32px x 32px | Type-specific (rocket, document, search, user) |
| Title | Body (15px, 600 weight) | Category name |
| Description | Caption (13px, 400), Text-Secondary | Brief category summary |
| Spacing: icon→title | Space-3 (8px) | |
| Spacing: title→desc | Space-1 (2px) | |

### Categories:

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Rocket | Getting Started | Learn the basics of MR:EGO |
| 2 | Document | CV & Documents | Upload, analyze, and optimize |
| 3 | Search | Job Search | Find and apply to positions |
| 4 | User | Account & Billing | Manage your account and plan |

### States:

| State | Behavior |
|-------|----------|
| Default | Surface-1 bg, Neutral border |
| Hover | Surface-1 bg, Primary border hover, Shadow-2 |
| Focus | Focus ring visible |
| Click | Navigate to category filtered help list |
| Loading | Skeleton card (120px h, shimmer) on initial page load |

---

## 3. AI Suggested Articles

| Property | Value |
|----------|-------|
| Margin bottom | Space-7 (24px) |
| Max width | 960px centered |
| Purpose | Context-aware article suggestions based on user activity |
| Priority | Medium — helpful but not primary |
| Visual weight | Low — tinted background, subtle |

### Container:

| Property | Value |
|----------|-------|
| Background | Primary-50 (#EFF6FF light) |
| Border | Primary-200 (#BFDBFE) |
| Radius | radius-md (8px) |
| Padding | Space-4 (12px) Space-5 (16px) |

### Elements:

| Element | Details |
|---------|---------|
| Icon | Sparkle (20px), Primary-500 |
| Label | "Based on your activity:", Body-Small (14px, 600), Text-Secondary |
| Article link | Body-Small, Text-Link, "How to optimize your CV for ATS" |
| Dismiss | X icon button, 16px, right-aligned |
| Gap: icon→text | Space-3 (8px) |

### States:

| State | Behavior |
|-------|----------|
| Default | Shows 1 article suggestion |
| Dismissed | Fades out (200ms), new suggestion appears if available |
| No activity | Hidden — not rendered |
| Loading | Skeleton text line (60% width, 14px height, shimmer) |

---

## 4. Popular Articles

| Property | Value |
|----------|-------|
| Layout | 2-column grid, gap Space-5 (16px) |
| Max width | 960px centered |
| Margin bottom | Space-8 (32px) |
| Purpose | Quick access to most-viewed help content |
| Priority | Medium |
| Visual weight | Medium — equal to Quick Cards |

### Section Header:

| Element | Details |
|---------|---------|
| Title | "Popular Articles" — Heading-3 (22px, 600) |
| Spacing bottom | Space-5 (16px) |

### Article Card:

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Min height | 100px |
| Hover | Shadow-2, cursor pointer |

### Elements:

| Element | Type | Details |
|---------|------|---------|
| Category badge | Caption (13px, 600), Primary-600 | "Getting Started" |
| Title | Body (15px, 600) | "How to upload your CV" |
| Description | Body-Small (14px), Text-Secondary | 1 line summary |
| Read time | Caption (13px), Text-Secondary | "10 min read" |
| Spacing: badge→title | Space-2 (4px) | |
| Spacing: title→desc | Space-2 (4px) | |
| Spacing: desc→time | Space-2 (4px) | |

### States:

| State | Behavior |
|-------|----------|
| Default | Neutral styling |
| Hover | Shadow-2, border-hover |
| Loading | 4 skeleton cards (100px h, shimmer) |

---

## 5. FAQ Section

| Property | Value |
|----------|-------|
| Max width | 960px centered |
| Margin bottom | Space-8 (32px) |
| Purpose | Address common questions quickly |
| Priority | Medium |
| Visual weight | Medium |

### Section Header:

| Element | Details |
|---------|---------|
| Title | "Frequently Asked Questions" — Heading-3 (22px, 600) |
| Spacing bottom | Space-5 (16px) |

### Accordion Specification:

| Property | Value |
|----------|-------|
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |

### Accordion Item:

| Property | Value |
|----------|-------|
| Height (collapsed) | 52px |
| Padding | Space-4 (12px) Space-5 (16px) |
| Border bottom | Border-Default (last item: none) |

### Header:

| Element | Details |
|---------|---------|
| Expand arrow | 16px chevron, rotates 180° on expand |
| Question | Body (15px, 500 weight) |
| Click area | Full width |

### Expanded Content:

| Element | Details |
|---------|---------|
| Padding | Space-4 (12px) 0 Space-5 (16px) |
| Answer | Body-Small (14px, 400), Text-Body |
| Links | Inline Text-Link for related articles |
| Animation | Expand 250ms ease-out, collapse 200ms ease-in |

### FAQ Questions (minimum 6):

| # | Question |
|---|----------|
| 1 | How does AI matching work? |
| 2 | How do I improve my CV score? |
| 3 | Can I have multiple CV versions? |
| 4 | How do I generate a cover letter? |
| 5 | How do I track my applications? |
| 6 | Is my data secure? |

---

## 6. Contact Support

| Property | Value |
|----------|-------|
| Max width | 960px centered |
| Padding | Space-8 (32px) |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |
| Purpose | Escalation path when self-help is insufficient |
| Priority | Low |
| Visual weight | Low |

### Elements:

| Element | Type | Details |
|---------|------|---------|
| Title | Heading-4 (18px, 600) | "Still need help?" |
| Description | Body (15px), Text-Secondary | "Our support team is here for you" |
| Actions | 3 buttons, gap Space-4 | [Email Support] [Live Chat] [Schedule Call] |
| Response time | Caption (13px), Text-Secondary | "Typical response: within 2 hours" |

### Button specifications:

| Button | Type | Size |
|--------|------|------|
| Email Support | Button-Secondary outline | 140px x 40px |
| Live Chat | Button-Primary (Primary-600) | 140px x 40px |
| Schedule Call | Button-Secondary outline | 160px x 40px |

### States:

| State | Behavior |
|-------|----------|
| Default | All buttons enabled |
| Email sent | "We'll get back to you within 2 hours" confirmation |
| Chat offline | Button disabled, "Chat offline — email instead" |
| Loading | Skeleton button placeholders |
| Error | "Could not load support options. Try refreshing." |

---

## 7. Article Detail View

### Layout:

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Help Center  /  Getting Started  /  Article     │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT (720px max centered)                     │
│          │                                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Section/article navigation (vertical links)            │  │
│  │ Current article highlighted                            │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  ARTICLE (720px max, centered)                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Category badge: "Getting Started"                     │  │
│  │ Title: "How to upload your CV" — Heading-2            │  │
│  │ Meta: "10 min read · Updated Jul 5, 2026"             │  │
│  │                                                        │  │
│  │ Body content:                                          │  │
│  │ - Section heading (Heading-3)                         │  │
│  │ - Paragraph (Body, 15px, line-height 1.6)             │  │
│  │ - Image/screenshot (max 100% width, radius-md)        │  │
│  │ - Tip box (Primary-50 bg, Primary-200 border)         │  │
│  │ - Step list (numbered, Space-3 gap)                   │  │
│  │ - Code block (Surface-2, JetBrains Mono, 13px)       │  │
│  │                                                        │  │
│  │ Feedback: "Was this helpful?" [Yes] [No]              │  │
│  │                                                        │  │
│  │ Related articles (3 links)                             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Specifications:

| Property | Value |
|----------|-------|
| Max width | 720px centered |
| Breadcrumb | Caption (13px), Text-Secondary, "Help Center > Category > Article" |
| Category badge | Overline (12px, 600), Primary-600 |
| Title | Heading-2 (28px, 650) |
| Meta | Body-Small (14px), Text-Secondary |
| Section heading | Heading-3 (22px, 600) |
| Body text | Body (15px, 400), line-height 1.6, max 70 chars wide |
| Images | Max 100% width, radius-md, caption below in Caption |
| Tip box | Primary-50 bg, Primary-200 border, radius-sm, padding Space-5, icon 20px |
| Code blocks | Surface-2 bg, JetBrains Mono 13px, padding Space-5, radius-sm |
| Feedback | "Was this helpful?" + [Yes] [No], caption thank you on response |

### States:

| State | Behavior |
|-------|----------|
| Loading | Skeleton: title bar (60%), meta line (40%), content lines (6 varying widths) |
| Image loading | Low-quality placeholder, blur-up transition (300ms) |
| Feedback submitted | "Thank you for your feedback" — Caption, Success-500 |
| Related articles | 3 links, Body-Small, Text-Link, gap Space-2 |

---

## 8. Loading State

| Phase | Skeleton | Timing |
|-------|----------|--------|
| Search bar | Input bar (52px h, 100% w) | <500ms |
| Quick cards | 4 card skeletons (120px h, shimmer) | <800ms |
| Popular articles | 4 article card skeletons (100px h) | <1s |
| FAQ | 6 accordion item skeletons (52px h each) | <1.5s |

---

## 9. Error States

| Error | Behavior |
|-------|----------|
| Search fails | Inline: "Search unavailable. Please try again." + retry |
| Articles fail | Section shows error icon + "Could not load articles" + [Retry] |
| FAQ fails | "Could not load FAQ" + [Retry] |
| Contact fails | "Support options unavailable" + email fallback "support@mrego.com" |
| Article not found | "This article doesn't exist or was removed" + related suggestions |
| Network | Offline banner at top, cached articles shown if available |

---

## 10. Empty States

| Section | State |
|---------|-------|
| Search no results | "No articles found for [query]." + "Try different keywords" + "Contact support" |
| Categories loading | Skeleton category cards |
| AI suggestions (no activity) | Hidden — not displayed until user has activity data |
| FAQ (no results) | "No matching questions" |

---

## 11. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| Smart search | Search section | AI understands natural language: "how do I improve my resume?" |
| Suggested articles | AI suggestion bar | Based on user's current page, recent activity, profile completion |
| Answer preview | Search dropdown | AI shows inline answer before article click |
| Context-aware help | Sidebar help icon | AI pre-filters articles based on page context |
| Guided help | Article body | AI-powered step-through for complex workflows |
| Feedback learning | Article feedback | AI learns which articles are helpful per context |

---

## 12. Accessibility

| Element | Requirement |
|---------|-------------|
| Skip link | "Skip to content" at very top |
| Search input | `aria-label="Search help articles"`, `role="searchbox"` |
| Quick cards | `role="navigation" aria-label="Help categories"`, each `aria-label="[Category] help"` |
| AI suggestion | `aria-live="polite"` for dynamic suggestions |
| FAQ accordion | `role="button"` with `aria-expanded="true/false"` |
| FAQ content | `role="region"` with `aria-labelledby` referencing header |
| Articles | `<article>` with proper heading hierarchy |
| Feedback | `aria-label="Was this article helpful?"` |

---

## 13. Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Skip link → Search → Quick cards → AI suggestion → Popular articles → FAQ → Contact |
| / | Focus search from anywhere on help page |
| Enter | Open article, expand FAQ, submit search |
| ↑↓ | Navigate search results, FAQ items |
| Escape | Close search dropdown, collapse FAQ |
| Shift+Tab | Reverse navigation |

---

## 14. Visual Hierarchy

1. **Primary Focus:** Search input — centered, largest element, highest contrast
2. **Secondary Focus:** Quick help cards — icon + title, immediate category navigation
3. **Tertiary Focus:** Popular articles + FAQ — scanned for specific content
4. **Supporting:** AI suggestion bar + Contact support — peripheral assistance

---

## 15. Motion

| Element | Motion | Duration | Easing |
|---------|--------|----------|--------|
| Search focus | Border + ring transition | 100ms | Ease-Out |
| Search results | Dropdown slides down | 200ms | Ease-Out |
| Results list | Items stagger in | 30ms per item | Ease-Out |
| Quick cards | Cards fade up on page load | 300ms, 80ms stagger | Ease-Out |
| AI suggestion | Slides in from left | 300ms | Ease-Out |
| FAQ expand | Content slides down | 250ms | Ease-Out |
| FAQ collapse | Content slides up | 200ms | Ease-In |
| Page transition | Cross-fade with content slide | 300ms | Ease-In-Out |

---

## 16. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Single column | Single column | Sidebar + content |
| Search | Full width (16px margin) | 600px centered | 640px centered |
| Quick cards | 2x2 grid | 4 cards row | 4 cards row |
| Popular articles | 1 column | 2 columns | 2 columns |
| FAQ | Full width | Full width | 960px max |
| Contact | Stacked buttons | Row buttons | Row buttons |
| Article content | Full width | 600px | 720px max |
| Article nav | No sidebar drawer | Dropdown | Sidebar |

---

## 17. Future Expansion

| Feature | Phase | Visual Change |
|---------|-------|---------------|
| Video tutorials | Phase 4 | Video player inline in articles, thumbnail cards |
| Interactive guides | Phase 5 | Overlay step-through, progress indicator |
| Community forum | Phase 5 | Forum categories, Q&A voting, user badges |
| Chatbot live preview | Phase 4 | Floating chat button, chat panel |
| Multi-language support | Phase 6 | Language selector, localized content |
| User feedback analytics | Phase 3 | "Most helpful" badges on articles |
| Guided onboarding walkthrough | Phase 2 | Interactive tooltip overlay for new features |
| AI article generation | Phase 5 | AI-drafted articles reviewed by human editors |

---

*Cross-references: DP-7 (Help-Center), DP-6:IA, DP-5:AI-Visual-Language, DP-4:Layout, DP-1:All*
