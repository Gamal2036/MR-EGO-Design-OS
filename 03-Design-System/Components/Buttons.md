# Buttons

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Buttons trigger actions. They are the primary mechanism for user-initiated operations — submitting forms, saving data, navigating, and executing commands. Every button communicates its action clearly through text, icon, or both.

---

## When to Use

- Primary actions on any page or dialog
- Form submission and confirmation
- Inline actions within cards, tables, and lists
- Toolbar operations (icon buttons)
- Mobile-fixed primary actions (floating button)

## When NOT to Use

- Navigation between pages — use links or navigation components instead
- Triggering dropdowns — use dropdown trigger pattern ([Navigation.md](Navigation.md))
- Non-interactive labels or badges — use the badge/tag component
- Multiple primary actions on one screen — only one primary action per view per UX Rule 2

---

## Variants

### Primary

The single most important action on a screen. Highest visual emphasis.

| Property | Value |
|----------|-------|
| Background | Primary-600 (light), Primary-500 (dark) |
| Text | White |
| Border | None |
| Hover background | Primary-700 (light), Primary-600 (dark) |
| Active background | Primary-800 (light), Primary-700 (dark) |

### Secondary

Alternative actions equal in importance but lower in visual weight.

| Property | Value |
|----------|-------|
| Background | Surface-1 |
| Text | Text-Body |
| Border | Border-Default (1px) |
| Hover background | Surface-2 |
| Active background | Neutral-200 (light), Neutral-300 (dark) |

### Ghost

Minimal-weight actions that are less prominent than secondary. Used for non-critical actions.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Text | Text-Body |
| Border | None |
| Hover background | Surface-2 |
| Active background | Neutral-200 (light), Neutral-300 (dark) |

### Danger

Destructive actions — delete, remove, irreversible operations.

| Property | Value |
|----------|-------|
| Background | Danger-500 |
| Text | White |
| Border | None |
| Hover background | Danger-600 |
| Active background | Danger-700 (Danger-500 darkened) |

### Outline Danger

Destructive action with lower visual weight than full Danger variant.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Text | Danger-500 |
| Border | Danger-500 (1px) |
| Hover background | Danger-BG |
| Active background | Danger-500 (20% opacity) |

### Outline

Standard bordered button for actions that need distinction without full color fill.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Text | Primary-600 (light), Primary-400 (dark) |
| Border | Primary-600 (light), Primary-400 (dark) |
| Hover background | Primary-50 |
| Active background | Primary-100 |

### Success

Confirmation of positive actions — save complete, publish, approve.

| Property | Value |
|----------|-------|
| Background | Success-500 |
| Text | White |
| Border | None |
| Hover background | Success-600 |
| Active background | Success-600 darkened |

### AI Action

Trigger AI-specific operations — generate, summarize, analyze, suggest.

| Property | Value |
|----------|-------|
| Background | Primary-50 (light), Primary-900 (dark) |
| Text | Primary-600 (light), Primary-400 (dark) |
| Border | Primary-200 (light), Primary-700 (dark) |
| Hover background | Primary-100 (light), Primary-800 (dark) |
| Icon | Sparkle/star icon (left side) |
| Active background | Primary-200 (light), Primary-700 (dark) |

### Disabled

Non-interactive state for any button variant.

| Property | Value |
|----------|-------|
| Background | Neutral-200 (light), Neutral-300 (dark) |
| Text | Neutral-400 (light), Neutral-500 (dark) |
| Border | None (or Neutral-300 for outline variants) |
| Cursor | not-allowed |
| Opacity | 0.4 |

### Loading

Indicates an action is in progress. Same dimensions as the button's default state.

| Property | Value |
|----------|-------|
| Content | Spinner replaces icon or text |
| Interaction | Disabled during loading |
| Duration | Spinner rotation 1000ms (continuous) |
| Accessible label | "Loading" appended to button text via aria-label |

### Icon Button

Action represented by icon only. Used in toolbars, table actions, and compact spaces.

| Sizes | Use Case |
|-------|----------|
| 32px (sm) | Table row actions, inline |
| 40px (md) | Toolbar, default |
| 48px (lg) | Navigation, prominent actions |

| State | Visual |
|-------|--------|
| Default | Icon at color-text-secondary |
| Hover | Background Surface-2, icon at color-text-body |
| Active | Background Neutral-200 |
| Disabled | Opacity 0.4, cursor not-allowed |

### Split Button

Primary action with a secondary dropdown for related alternative actions.

| Part | Specification |
|------|---------------|
| Primary action | Standard Primary button |
| Dropdown trigger | Chevron down icon, same height, divider line |
| Dropdown | Standard dropdown menu ([Navigation.md](Navigation.md)) |
| Usage | Save + Save As, Send + Schedule Send |

### Floating Button

Mobile-primary action button fixed to bottom-right of viewport.

| Property | Value |
|----------|-------|
| Size | 56px circle |
| Position | Bottom-right, 16px from edges |
| Elevation | Layer 3 (Shadow-3) |
| Icon | Primary action icon |
| Background | Primary-600 |
| Active background | Primary-700 |

---

## Button Anatomy

```
┌──────────────────────────────────┐
│  [Icon]  Label Text  [Badge/Dropdown]  │
└──────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Icon (optional) | 16px, left of text |
| Label | Button token typography (14px/600) |
| Badge (optional) | For notification counts |
| Dropdown indicator (split button) | 16px chevron, right side |
| Touch target minimum | 44x44px (icon-only) |

---

## Sizes

| Size | Height | Padding (H) | Padding (V) | Font Size | Icon Size | Use Case |
|------|--------|-------------|-------------|-----------|-----------|----------|
| XS | 28px | 10px | 4px | 13px | 14px | Table actions, dense UI |
| SM | 32px | 12px | 6px | 13px | 14px | Compact toolbars |
| MD (default) | 40px | 16px | 8px | 14px | 16px | Standard buttons |
| LG | 48px | 20px | 10px | 15px | 18px | Hero, primary CTA |

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Between icon and label | 8px | Space-3 |
| Between buttons in a group | 8px | Space-3 |
| Between split button segments | 1px | Border |
| Button group external margin | 16px | Space-5 |
| Dropdown menu from trigger | 4px | Space-2 |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Resting appearance | — |
| Hover | Mouse enter | Background shift, cursor pointer | 100ms |
| Focus | Tab or click | 2px focus ring (Primary-500) | 100ms |
| Active | Mouse down | Scale to 0.97, darker background | 50ms |
| Disabled | Disabled prop | 0.4 opacity, not-allowed cursor | Instant |
| Loading | Action initiated | Spinner replaces content | 100ms |
| Visited | (links) | No change — buttons do not track visited | — |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Focus indicator | 2px solid ring, Primary-500, 2px offset |
| Keyboard activation | Enter or Space |
| Role | `button` (use `<button>` element, never `<div>`) |
| ARIA disabled | `aria-disabled="true"` for disabled state |
| Loading state | `aria-label` includes "Loading" |
| Icon-only buttons | `aria-label` describes the action |
| Color not sole indicator | Text label or icon always present |
| Touch target | Minimum 44x44px for icon-only buttons |
| Contrast | All text meets WCAG AA 4.5:1 minimum |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Buttons go full-width in forms. Floating button visible. |
| Tablet (768-1023px) | Standard sizing. Button groups may wrap to 2 rows. |
| Desktop (1024px+) | Standard sizing. Inline button groups. |
| Ultra-wide (1600px+) | LG size for primary CTAs in hero sections. |

---

## Future Expansion

- **Toolbar groups** — ButtonGroup component for related actions with consistent spacing
- **Toggle button** — Persistent active state for view toggles (list/grid)
- **Menu button** — Button that opens a menu on click (standardize split button pattern)
- **Share button** — OS-level share sheet trigger on mobile
- **AI action button** — Enhanced with confidence indicator, streaming state

---

## Related Components

- [Cards.md](Cards.md) — Cards contain button actions
- [Dialogs.md](Dialogs.md) — Dialog footer actions use buttons
- [Forms.md](Forms.md) — Form submission buttons
- [Navigation.md](Navigation.md) — Dropdown triggers, tab-like segmented controls
- [Feedback.md](Feedback.md) — Toast action buttons
- [Loading.md](Loading.md) — Button loading state
