# Command Palette — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-3:CommandInput, DP-4:CommandBar, DP-6:Command Palette UX, DP-7:Command Palette Wireframe

---

## Purpose

Advanced command palette for power users — fast access to every action, navigation, AI feature, and system command in MR:EGO. Activated via Ctrl+K / Cmd+K as an alternative mode from search.

---

## Layout Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OVERLAY (Level 5, full-screen)                      │
│  Backdrop: rgba(15,23,42,0.72) + backdrop-blur(8px)                        │
│                                                                             │
│                         ┌──────────────────────────────────┐                │
│                         │    COMMAND PALETTE CARD          │                │
│                         │    max-width: 560px              │                │
│                         │    top: 15%                      │                │
│                         │                                  │                │
│                         │  ┌────────────────────────────┐  │                │
│                         │  │ ⌨ Type a command/search... │  │                │
│                         │  └────────────────────────────┘  │                │
│                         │                                  │                │
│                         │  ┌─ NAVIGATION ───────────────┐  │                │
│                         │  │ ▶ Dashboard                │  │                │
│                         │  │ ▶ Jobs                     │  │                │
│                         │  │ ▶ CV                       │  │                │
│                         │  │ ▶ Messages                 │  │                │
│                         │  │ ▶ Settings                 │  │                │
│                         │  └────────────────────────────┘  │                │
│                         │                                  │                │
│                         │  ─── ─── ─── ─── ─── ─── ─── ─  │                │
│                         │                                  │                │
│                         │  ┌─ ACTIONS ──────────────────┐  │                │
│                         │  │ ✚ New CV                   │  │                │
│                         │  │ 📄 Upload Document         │  │                │
│                         │  │ ✉️ Generate Cover Letter   │  │                │
│                         │  │ 📊 Analyze Job Market      │  │                │
│                         │  └────────────────────────────┘  │                │
│                         │                                  │                │
│                         │  ─── ─── ─── ─── ─── ─── ─── ─  │                │
│                         │                                  │                │
│                         │  ┌─ AI ───────────────────────┐  │                │
│                         │  │ ✨ Ask MR:EGO               │  │                │
│                         │  │ ✨ Improve CV               │  │                │
│                         │  │ ✨ Find Matching Jobs       │  │                │
│                         │  └────────────────────────────┘  │                │
│                         │                                  │                │
│                         │  ─── ─── ─── ─── ─── ─── ─── ─  │                │
│                         │                                  │                │
│                         │  ┌─ RECENT ───────────────────┐  │                │
│                         │  │ 🕐 New CV (2m ago)         │  │                │
│                         │  │ 🕐 Dashboard (5m ago)      │  │                │
│                         │  │ 🕐 Settings (1h ago)       │  │                │
│                         │  └────────────────────────────┘  │                │
│                         │                                  │                │
│                         └──────────────────────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Overlay & Backdrop

| Property | Token | Value |
|----------|-------|-------|
| Positioning | Fixed | inset 0 |
| Elevation | Layer 5 | Shadow-5, z-index 5000 |
| Backdrop color | Glass-Backdrop | rgba(15,23,42,0.72) |
| Backdrop blur | — | backdrop-filter: blur(8px) |
| Background | — | Transparent |

### States

| State | Behavior |
|-------|----------|
| Open | Overlay visible, backdrop fade 200ms, card slide 250ms |
| Closed | Fade out 150ms, card slide up 200ms |
| Input empty | Navigation section selected by default |
| Input has text | Filter list in real-time |

---

## Section 2: Command Card

| Property | Token | Value |
|----------|-------|-------|
| Position | Absolute | top 15%, centered horizontally |
| Max width | — | 560px |
| Width | — | 90vw (max 560px) |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border radius | radius-xl | 16px |
| Elevation | Layer 5 | Shadow-5 |
| Padding | Space-3 | 8px (inner container) |
| Max height | — | 50vh (viewport) |
| Overflow | — | Hidden (list scrolls internally) |

---

## Section 3: Command Input

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 48px |
| Background | — | Transparent |
| Border bottom | — | 1px solid Neutral-200 |
| Padding horizontal | Space-5 | 16px |
| Margin bottom | Space-3 | 8px |

### Elements

| Element | Spec |
|---------|------|
| Command icon | 20×20px, Primary-500, left |
| Input | Body (15px/400), Text-Primary, flex 1, no border, no outline |
| Placeholder | Body (15px/400), Text-Secondary, "Type a command or search..." |
| Recent indicator | Caption (12px/400), Text-Secondary, right, shows last-selected command name |
| Clear button | 20×20px, Neutral-400, hover Neutral-600, visible when input has text |

### States

| State | Visual |
|-------|--------|
| Default | No border, transparent bg |
| Focus | No border, subtle shadow inset |
| Typing | Filtering active, matched chars highlighted |
| Empty | Placeholder visible, recent indicator hidden |

---

## Section 4: Command List

| Max height | — | calc(50vh - 80px) |
| Overflow | — | Auto scroll, smooth |
| Scrollbar | — | Thin, Neutral-300, 4px width |

### 4.1 Section Headers

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (12px/600) | Text-Secondary, uppercase |
| Letter spacing | — | 0.8px |
| Padding | Space-3 Space-5 | 8px 16px |
| Sticky | — | Sticky top within scroll |
| Background | Surface-1 | #FFFFFF / Neutral-100 |

### 4.2 Divider Between Sections

| Property | Value |
|----------|-------|
| Element | hr, 1px solid Neutral-150 |
| Margin | Space-3 (8px) vertical |

### 4.3 Command Items

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 48px (single line), 56px (with description) |
| Padding | Space-3 Space-5 | 8px 16px |
| Border radius | radius-md | 8px |
| Icon | 16×16px | Primary-500 |
| Label | Body (14px/500) | Text-Primary |
| Shortcut hint | Caption (12px/400) | Text-Secondary, right-aligned |
| Description | Caption (12px/400) | Text-Secondary, secondary line, 14px from label |

### States

| State | Visual |
|-------|--------|
| Default | Surface-1 bg |
| Hover | Surface-2 bg (Neutral-100) |
| Active/Selected | Primary-50 bg, Primary-600 text, left border 3px Primary-500 |
| Focused (keyboard) | Ring 2px Primary-300 |

### List Stagger Animation

| Property | Value |
|----------|-------|
| Delay per item | 20ms |
| Fade | opacity 0→1, 150ms |
| Slide | translateY(6px)→0, 150ms ease-out |

---

## Section 5: No Results State

| Property | Token | Value |
|----------|-------|-------|
| Display | — | Visible when filter matches no commands |
| Padding | Space-10 | 48px vertical |
| Icon | — | 40px, Neutral-300 |
| Heading | Body (15px/500) | Text-Primary, "No commands found for [query]" |
| Suggestion | Body-Small (14px/400) | Text-Secondary, "Try asking AI instead" |
| AI link | — | "Ask MR:EGO →" Primary-500, navigates to AI workspace |

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Role | `dialog` with `aria-modal="true"` |
| Label | `aria-label="Command palette"` |
| Input label | `aria-label="Type a command or search"` |
| Command list | `role="listbox"` with `aria-label="Available commands"` |
| Command items | `role="option"` with `aria-selected` |
| Active descendant | `aria-activedescendant` on input pointing to focused option |
| Live region | `aria-live="polite"` for filtered count |
| Focus trap | Tab stays within palette |
| Focus return | Returns to trigger on close |
| Announcement | "Command palette opened" / "Closed" |
| No results | `aria-live="assertive"` announces count zero |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Ctrl+K / Cmd+K | Toggle command palette |
| Type | Filter command list in real-time |
| ↑ | Navigate up through filtered commands |
| ↓ | Navigate down through filtered commands |
| Enter | Execute focused command |
| Escape | Close command palette |
| Tab | Move focus to next section |
| Shift+Tab | Move focus to previous section |
| Backspace | Delete character; if input empty, close |
| Ctrl+Backspace | Clear entire input |
| Ctrl+P / Cmd+P | Navigate to previous item in history |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Centered card, max 560px, top 15% |
| Tablet (768-1024px) | Card 90vw, max 520px, top 10% |
| Mobile (<768px) | Full-width, top 0, 100vw, radius-none, max-height 100vh |
| Mobile list | Full viewport height minus input, no overscroll |

---

## Motion Specification

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Overlay fade in | opacity 0→1 | 200ms | ease-out |
| Overlay fade out | opacity 1→0 | 150ms | ease-in |
| Card slide in | translateY(-16px)→0 | 250ms | cubic-bezier(0.16,1,0.3,1) |
| Card slide out | translateY(0)→(-16px) | 200ms | ease-in |
| Item stagger | Each item delays 20ms | 150ms total | ease-out |
| Input filter | No animation, instant re-render | — | — |
| Reduces motion | Respects prefers-reduced-motion | — | All animations disabled |

---

## AI Features

| Feature | Behavior |
|---------|----------|
| AI category | Dedicated section with sparkle icon |
| Command: Ask MR:EGO | Opens AI workspace with context |
| Command: Improve CV | Launches CV optimization flow |
| Command: Find Jobs | Triggers AI job matching |
| No-results fallback | "Ask MR:EGO" suggestion when no command matches |
| Command prediction | AI suggests next likely command based on context |
| Usage learning | Most-used commands float to top of section |

---

## Future Expansion

| Feature | Category | Notes |
|---------|----------|-------|
| Plugin commands | Extensibility | Third-party integrations add commands |
| Custom commands | User | User-defined command sequences |
| Command aliases | Usability | "goto dashboard" same as "Dashboard" |
| Command history depth | History | Persistent across sessions via backend |
| Fuzzy matching | Search | Typo-tolerant matching |
| Multi-step commands | Actions | "Apply for job" triggers multi-step action |
| Command palette in mobile | Mobile | Bottom sheet variant |
| Drag to reorder | Customization | Users reorder sections |
| Shortcut recording | Power user | Assign custom shortcuts to commands |
| Natural language commands | AI | "find me senior remote jobs" executes search |
