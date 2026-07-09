# Profile — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Profile), DP-6:Nav (Profile Flow), DP-1:All

---

## Purpose

View and manage professional profile including about, experience, skills, documents, and activity. View mode is default; edit is explicit per section.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Profile                [Share] [Edit Profile]  │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  PROFILE HEADER                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  ┌──────┐  Alex Chen (they/them)                       │  │
│  │  │avatar│  Senior Frontend Developer                    │  │
│  │  │ 80px │  San Francisco, CA · Open to opportunities   │  │
│  │  └──────┘  Member since Jan 2026                       │  │
│  │             [Edit Photo] [Add Open To Work]             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  PROFILE TABS                                                │
│  ┌────────┬──────────┬──────────┬───────────┬──────────┐    │
│  │ About  │Experience│  Skills  │ Documents │ Activity │    │
│  └────────┴──────────┴──────────┴───────────┴──────────┘    │
│                                                    │
│  TAB CONTENT (varies by tab)                               │
│                                                    │
│  ABOUT TAB (default):                                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Bio                              [Edit]               │  │
│  │ "Experienced frontend developer..."                    │  │
│  │                                                        │  │
│  │ Contact Info                    [Edit]                 │  │
│  │ alex@email.com · linkedin.com/in/alex                  │  │
│  │                                                        │  │
│  │ Location                         [Edit]               │  │
│  │ San Francisco, CA (Remote preferred)                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  EXPERIENCE TAB:                                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ○ Senior Frontend Developer — Acme Corp               │  │
│  │   Jul 2024 - Present · 2 yrs                         │  │
│  │   "Lead frontend architecture..."                     │  │
│  │                                        [Edit] [Delete]│  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ ○ Frontend Developer — Beta Inc                       │  │
│  │   Jan 2022 - Jun 2024 · 2.5 yrs                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  SKILLS TAB:                                                │
│  ├── Chips: React, TypeScript, Node.js, CSS, GraphQL...   │  │
│  │   AI Suggested: ●● AWS (confidence)  [Add]            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Profile Header

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |
| Margin bottom | Space-5 (16px) |

### Elements:
| Element | Size | Details |
|---------|------|---------|
| Avatar | 80px x 80px, radius-full | |
| Name | Heading-2 (28px) | + pronouns (Caption) |
| Title | Body-Large (16px) | Current role |
| Location | Body-Small, Text-Secondary | |
| Open to work | Badge, Success-500 bg, white text | Optional |
| Member since | Caption, Text-Secondary | |
| Actions | [Edit Photo] [Share Profile] [Edit Profile] | |

---

## 2. Profile Tabs

| Property | Value |
|----------|-------|
| Height | 44px |
| Active | Primary-600 text + Primary-200 bottom border 2px |
| Tab padding | Space-4 (12px) Space-5 (16px) |

---

## 3. Tab Content (About)

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |

### Sections:
| Section | Edit behavior |
|---------|---------------|
| Bio | Inline edit on click, textarea 120px h |
| Contact | Inline edit per field |
| Location | Inline edit |
| Each section | Save/Cancel buttons appear on edit |

---

## 4. AI Integration

| Feature | Behavior |
|---------|----------|
| Bio improvement | AI suggests stronger professional summary |
| Skill suggestions | AI recommends skills based on experience |
| Profile completeness | AI scores profile completion |
| Experience writing | AI suggests stronger bullet points |
| Profile picture | AI crop/frame suggestions (future) |

---

## 5. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header | Stacked (avatar center) | Side-by-side | Side-by-side |
| Tabs | Horizontal scroll | Full visible | Full visible |
| Tab content | Single column | Single column | Single column |

---

*Cross-references: DP-6:Screen (Profile), DP-6:Nav (Profile Flow), DP-6:Pattern (Inline Edit), DP-1:All*
