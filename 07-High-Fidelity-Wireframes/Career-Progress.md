# Career Progress — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:IA (Career Progress), DP-6:Screen (Progress), DP-1:All

---

## Purpose

Visual career timeline, skill development tracking, goal management, and career analytics dashboard.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Career Progress                                 │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  PAGE HEADER                                                  │
│  "Career Progress"                           [Edit Goals]    │
│                                                    │
│  GOAL PROGRESS CARDS                                          │
│  ┌────────────────────────┐ ┌────────────────────────────┐   │
│  │ Primary Goal           │ │ Goal 2: Skill Development  │   │
│  │ "Senior Frontend"      │ │ "Master TypeScript"        │   │
│  │ ████████████░░░ 65%   │ │ ████████░░░░░░░ 45%       │   │
│  │ Milestone: 3/5         │ │ Milestone: 2/4            │   │
│  │ Target: Dec 2026       │ │ Target: Sep 2026          │   │
│  └────────────────────────┘ └────────────────────────────┘   │
│                                                    │
│  CAREER TIMELINE (vertical, scrollable)                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ● 2026 — Current Goal: Senior Frontend Developer      │  │
│  │   Target: Dec 2026  |  Progress: 65%                  │  │
│  │   Milestones:                                       │  │
│  │   ✓ Completed: CV optimized (Jul 2026)               │  │
│  │   ✓ Completed: 5 applications sent (Jul 2026)        │  │
│  │   ◎ In progress: Technical interview prep            │  │
│  │   ○ Pending: Final interview round                   │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ ● 2025 — Full Stack Developer @ Beta Inc              │  │
│  │   Role achieved ✓                                     │  │
│  │   Key skill: React, Node.js, TypeScript               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  SKILL MAP (radar chart or skill grid)                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │        ┌─────┐                                        │  │
│  │        │Technical│                                     │  │
│  │        └─────┘                                        │  │
│  │   ┌─────┐          ┌─────┐                            │  │
│  │   │Leadership│    │Communication│                      │  │
│  │   └─────┘          └─────┘                            │  │
│  │        ┌─────┐                                        │  │
│  │        │Strategy│                                      │  │
│  │        └─────┘                                        │  │
│  │   Radar chart showing current vs target skill levels  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Goal Progress Cards

| Property | Value |
|----------|-------|
| Layout | 2 or 3 cards, gap Space-5 (16px) |
| Card padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |

### Card Elements:
| Element | Details |
|---------|---------|
| Goal title | Heading-4 (18px) |
| Progress bar | 8px height, rounded, Primary-500 fill |
| Percentage | Body, 600 weight |
| Milestone count | Caption, Text-Secondary |
| Target date | Caption, Text-Secondary |
| Edit button | Icon, top-right |

---

## 2. Career Timeline

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |

### Year Group:
| Element | Details |
|---------|---------|
| Year header | Heading-3 (22px), Primary-600 |
| Connector line | 2px, Primary-200, left edge |

### Timeline Item:
| Element | Details |
|---------|---------|
| Dot | 16px circle, completed=Primary, current=Primary outline, future=dashed |
| Label | Heading-4, current role |
| Description | Body-Small, Text-Secondary |
| Milestone | Check (completed) or circle (pending) + text, Caption |

---

## 3. Skill Map / Radar Chart

| Property | Value |
|----------|-------|
| Height | 320px |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |
| Padding | Space-5 (16px) |

### Chart Elements:
| Element | Details |
|---------|---------|
| Radar chart | 5 axes, current vs target overlay |
| Axis labels | Caption, Text-Secondary |
| Data series | Current level (Primary-500 fill, 0.2 opacity) |
| Target level | Dashed outline, Primary-600 |
| Legend | "Current" vs "Target" — below chart |

---

## 4. Empty State

| State | Behavior |
|-------|----------|
| No goals | "Set your first career goal to start tracking progress" + CTA |
| No timeline | Timeline shows current role only with "Add past experience" |
| No skills | "Add skills to see your skill map" |

---

## 5. AI Integration

| Feature | Behavior |
|---------|----------|
| Goal suggestions | AI recommends career goals based on profile |
| Timeline gaps | AI identifies gaps and suggests additions |
| Skill recommendations | AI suggests next skills to develop |
| Progress assessment | AI evaluates goal progress and adjusts timelines |
| Trend analysis | AI shows skill growth over time |

---

*Cross-references: DP-6:Screen (Progress), DP-6:IA, DP-6:AI, DP-1:All*
