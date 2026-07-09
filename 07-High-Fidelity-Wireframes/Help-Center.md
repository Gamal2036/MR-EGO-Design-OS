# Help Center — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:IA (Help Center), DP-1:All

---

## Purpose

Self-service help center with searchable articles, FAQ, guided tutorials, and contact support. AI-powered answer suggestions.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Help Center                    [Contact Us]    │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  SEARCH SECTION (centered)                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  🔍  How can we help?                       [Search]   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  QUICK HELP CARDS                                            │
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
│  │ Article 1                │ │ Article 2                │  │
│  │ "How to upload your CV"  │ │ "Understanding match     │  │
│  │  10 min read             │ │  scores" 8 min read      │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
│                                                    │
│  FAQ SECTION (accordion)                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ▸ How does AI matching work?                          │  │
│  │ ▸ How do I improve my CV score?                       │  │
│  │ ▸ Can I have multiple CV versions?                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Search Section

| Property | Value |
|----------|-------|
| Max width | 640px centered |
| Padding | Space-9 (40px) top/bottom |

### Input:
| Property | Value |
|----------|-------|
| Height | 48px |
| Radius | radius-md (8px) |
| Border | Border-Default |
| Background | Surface-1 |
| Placeholder | "How can we help?" |

---

## 2. Help Cards

| Property | Value |
|----------|-------|
| Layout | 4 cards, gap Space-4 (12px) |
| Card padding | Space-5 (16px) |
| Card height | 120px |
| Radius | radius-md |
| Background | Surface-1 |
| Border | Border-Default |
| Hover | Shadow-2 |

### Cards: Getting Started, CV & Documents, Job Search, Account & Billing

Each card: Icon (32px) + Title (Body, 600 weight) + Description (Caption)

---

## 3. AI Suggestion Bar

| Property | Value |
|----------|-------|
| Background | Primary-50 |
| Padding | Space-4 (12px) |
| Radius | radius-sm |
| Text | Body-Small + sparkle icon |

---

## 4. FAQ Accordion

Same pattern as CV Analysis section accordion. Single expand at a time.

---

## 5. Article Detail (separate view)

| Property | Value |
|----------|-------|
| Max width | 720px centered |
| Breadcrumb | Help Center > Category > Article |
| Title | Heading-2 |
| Body | Typography body, images max 100% width, code blocks mono |
| Related | 3 related article links |
| Feedback | "Was this helpful?" [Yes] [No] |

---

## 6. AI Integration

| Feature | Behavior |
|---------|----------|
| Smart search | AI understands natural language queries |
| Suggested articles | AI recommends based on current page/activity |
| Answer preview | AI shows inline answer snippet before article click |
| Guided help | AI step-through for complex workflows |

---

*Cross-references: DP-6:IA, DP-1:All*
