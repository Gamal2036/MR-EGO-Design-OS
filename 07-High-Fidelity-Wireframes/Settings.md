# Settings — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Settings), DP-6:IA, DP-1:All

---

## Purpose

Manage all user preferences: profile settings, notifications, privacy, appearance, security, and AI preferences.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Settings                                       │
│ SIDEBAR  ├──────────────┬─────────────────────────────────────┤
│ (240px)  │  SECTION NAV │  CONTENT                            │
│          │  (240px)     │                                     │
│          │              │  ACCOUNT section                    │
│          │  ▸ Account   │  ┌──────────────────────────────┐   │
│          │  ▸ Notif.    │  │ Name                   [Edit]│   │
│          │  ▸ Privacy   │  │ Email              [Change] │   │
│          │  ▸ Appearance│  │ Password           [Change] │   │
│          │  ▸ AI Prefs  │  └──────────────────────────────┘   │
│          │  ▸ Security  │                                     │
│          │  ▸ Data      │  NOTIFICATIONS section              │
│          │              │  ┌──────────────────────────────┐   │
│          │              │  │ Application updates  [toggle]│   │
│          │              │  │ AI insights          [toggle]│   │
│          │              │  │ Marketing             [toggle]│   │
│          │              │  │ Email digest          [toggle]│   │
│          │              │  └──────────────────────────────┘   │
│          │              │                                     │
│          │              │  APPEARANCE section                 │
│          │              │  ┌──────────────────────────────┐   │
│          │              │  │ Theme: ○ Light ● Dark ○ Auto│   │
│          │              │  │ Density: ○ Comf ● Compact    │   │
│          │              │  │ Font size: [slider]          │   │
│          │              │  └──────────────────────────────┘   │
│          │              │                                     │
│          │              │  DANGER ZONE                        │
│          │              │  ┌──────────────────────────────┐   │
│          │              │  │ [Delete Account]             │   │
│          │              │  └──────────────────────────────┘   │
│          └──────────────┴─────────────────────────────────────┘
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Section Navigation

| Property | Value |
|----------|-------|
| Width | 240px |
| Background | Surface-1 |
| Border right | Border-Default |
| Padding | Space-3 (8px) 0 |

### Nav items:
| Element | Details |
|---------|---------|
| Height | 40px |
| Padding | Space-3 (8px) Space-5 (16px) |
| Active | Primary-50 bg, Primary-600 text, left border Primary |
| Hover | Surface-2 bg |

### Sections: Account, Notifications, Privacy, Appearance, AI Preferences, Security, Data & Storage, Danger Zone

---

## 2. Content Area

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Max width | 720px |

### Section Heading:
| Property | Value |
|----------|-------|
| Title | Heading-3 (22px) |
| Border bottom | Border-Default |
| Padding bottom | Space-5 (16px) |

### Setting Group:
| Property | Value |
|----------|-------|
| Padding vertical | Space-4 (12px) |
| Border bottom | Border-Default (last item: none) |

### Setting Row:
| Element | Details |
|---------|---------|
| Label | Body, 600 weight |
| Description | Body-Small, Text-Secondary (optional) |
| Control | Varies: toggle, select, input, button |
| Layout | Flex, space-between |

### Toggle control:
| Property | Value |
|----------|-------|
| Width | 44px |
| Height | 24px |
| Radius | 12px |
| On bg | Primary-600 |
| Off bg | Neutral-300 |
| Knob | 20px circle, white, shadow |

### Theme selector:
| Property | Value |
|----------|-------|
| Layout | 3 radio cards, 100px x 80px |
| Card | Preview thumbnail + label |
| Selected | Primary-500 border |

---

## 3. AI Preferences Section

| Setting | Control | Description |
|---------|---------|-------------|
| AI Assistant | Toggle | Enable/disable globally |
| Inline Suggestions | Toggle | Show AI suggestions in context |
| Smart Notifications | Toggle | AI-powered notification batching |
| Memory & Context | Toggle | AI remembers your preferences |
| Data for Training | Toggle | Allow anonymized data for model improvement |
| Confidence Threshold | Slider | 40%-90%, minimum confidence to show suggestions |

---

## 4. Danger Zone

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Border | Danger-500 (1px) |
| Radius | radius-md (8px) |
| Background | Danger-50 |

### Elements:
| Element | Details |
|---------|---------|
| Label | "Danger Zone" — Label, Danger-600 |
| Description | Body-Small |
| Button | "Delete Account" — Button-Danger |

### Confirmation:
| Level | Heavy | User types "DELETE" + password to confirm |

---

## 5. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section nav | Dropdown select | Left sidebar | Left sidebar |
| Content | Full width | Full width | 720px max |
| Theme selector | 3 cards stacked row | 3 cards row | 3 cards row |
| Danger zone | Full width | Full width | Full width |

---

*Cross-references: DP-6:Screen (Settings), DP-6:IA, DP-1:All*
