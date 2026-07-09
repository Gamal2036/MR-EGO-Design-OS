# Design Tokens — DP-2 Component Extensions

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Design-Tokens.md](../../02-Design-Language/Design-Tokens.md))

---

## Purpose

This document extends the DP-1 Design Token architecture with component-specific tokens. Component tokens sit at Layer 3 of the token architecture (Component Tokens) and provide granular control for each component variant and state.

No new primitive or semantic tokens are created here. All component tokens reference existing DP-1 primitives and semantics.

---

## Token Extension Rules

1. **No new primitive tokens.** Every component-specific value derives from existing DP-1 primitives.
2. **No new semantic tokens.** Component tokens map to existing semantics.
3. **Component tokens follow the naming convention:** `component-<name>-<element>-<property>`.
4. **State-specific tokens follow:** `component-<name>-<element>-<property>-<state>`.
5. **Module-specific tokens use module prefix:** `<module>-<component>-<element>-<property>`.

---

## Component Token Map

### Buttons

| Token | Maps To | Variant |
|-------|---------|---------|
| `button-primary-bg` | `color-primary-600` | Primary default |
| `button-primary-bg-hover` | `color-primary-700` | Primary hover |
| `button-primary-bg-active` | `color-primary-800` | Primary active |
| `button-primary-text` | `color-white` | Primary text |
| `button-secondary-bg` | `color-surface-1` | Secondary default |
| `button-secondary-bg-hover` | `color-surface-2` | Secondary hover |
| `button-secondary-bg-active` | `color-neutral-200` | Secondary active |
| `button-secondary-border` | `color-border-default` | Secondary border |
| `button-ghost-bg-hover` | `color-surface-2` | Ghost hover |
| `button-danger-bg` | `color-danger-500` | Danger default |
| `button-danger-bg-hover` | `color-danger-600` | Danger hover |
| `button-ai-bg` | `color-primary-50` | AI Action default |
| `button-ai-bg-hover` | `color-primary-100` | AI Action hover |
| `button-ai-border` | `color-primary-200` | AI Action border |
| `button-disabled-opacity` | `opacity-40` | Disabled opacity |
| `button-height-xs` | `28px` | Size XS |
| `button-height-sm` | `32px` | Size SM |
| `button-height-md` | `40px` | Size MD |
| `button-height-lg` | `48px` | Size LG |

### Cards

| Token | Maps To | Usage |
|-------|---------|-------|
| `card-padding-default` | `space-7` (24px) | Comfortable padding |
| `card-padding-compact` | `space-5` (16px) | Compact padding |
| `card-bg` | `color-surface-1` | Card background |
| `card-border` | `color-border-default` | Card border |
| `card-shadow` | `shadow-1` | Default shadow |
| `card-shadow-hover` | `shadow-2` | Hover shadow |
| `card-radius` | `radius-md` (8px) | Card border radius |
| `card-gap` | `space-7` (24px) | Gap between cards |

### Forms

| Token | Maps To | Usage |
|-------|---------|-------|
| `input-height` | `40px` | Standard input height |
| `input-padding` | `space-4` (12px) | Input text padding |
| `input-border` | `color-border-default` | Input border |
| `input-border-hover` | `color-border-hover` | Input hover border |
| `input-border-focus` | `color-border-focus` | Input focus border |
| `input-radius` | `radius-sm` (4px) | Input border radius |
| `input-bg` | `color-surface-1` | Input background |
| `input-disabled-opacity` | `opacity-40` | Disabled input |
| `label-gap` | `space-2` (6px) | Label to input gap |
| `field-gap` | `space-7` (24px) | Gap between fields |
| `checkbox-size` | `18px` | Checkbox/radio size |

### Navigation

| Token | Maps To | Usage |
|-------|---------|-------|
| `sidebar-width-expanded` | `240px` | Expanded sidebar |
| `sidebar-width-collapsed` | `64px` | Collapsed sidebar |
| `sidebar-bg` | `color-surface-2` | Sidebar background |
| `sidebar-item-padding` | `space-4 space-5` | Sidebar item |
| `sidebar-active-bg` | `color-primary-100` | Active item |
| `sidebar-active-border` | `3px solid color-primary-600` | Active indicator |
| `topbar-height` | `56px` | Top bar height |
| `tab-height` | `40px` | Tab height |
| `tab-active-border` | `2px solid color-primary-500` | Active tab |

### Tables

| Token | Maps To | Usage |
|-------|---------|-------|
| `table-header-height` | `44px` | Header row height |
| `table-row-height` | `48px` | Body row height |
| `table-row-height-compact` | `36px` | Compact row height |
| `table-cell-padding` | `space-4 space-5` | Cell padding |
| `table-header-bg` | `color-surface-2` | Header background |
| `table-row-hover` | `color-neutral-50` | Row hover |
| `table-row-selected` | `color-primary-50` | Row selected |

### Dialogs

| Token | Maps To | Usage |
|-------|---------|-------|
| `dialog-padding` | `space-8` (32px) | Modal padding |
| `dialog-radius` | `radius-lg` (12px) | Modal radius |
| `dialog-shadow` | `shadow-3` | Modal shadow |
| `dialog-max-width-sm` | `400px` | Small modal |
| `dialog-max-width-md` | `480px` | Medium modal |
| `dialog-max-width-lg` | `640px` | Large modal |
| `drawer-width` | `400px` | Default drawer width |
| `drawer-width-wide` | `480px` | Wide drawer |

### Feedback

| Token | Maps To | Usage |
|-------|---------|-------|
| `toast-width` | `360px` | Toast width |
| `toast-padding` | `space-4 space-5` | Toast padding |
| `toast-radius` | `radius-md` (8px) | Toast radius |
| `toast-shadow` | `shadow-3` | Toast shadow |
| `banner-padding` | `space-4 space-5` | Banner padding |
| `banner-left-border` | `3px` | Banner accent border |

### Loading

| Token | Maps To | Usage |
|-------|---------|-------|
| `skeleton-color` | `color-neutral-200` | Skeleton base |
| `skeleton-radius` | `radius-sm` (4px) | Skeleton radius |
| `skeleton-duration` | `1500ms` | Pulse duration |
| `spinner-size-sm` | `16px` | Small spinner |
| `spinner-size-md` | `24px` | Medium spinner |
| `spinner-size-lg` | `40px` | Large spinner |
| `spinner-color` | `color-primary-500` | Spinner color |
| `progress-height` | `4px` | Progress bar height |

### AI Components

| Token | Maps To | Usage |
|-------|---------|-------|
| `ai-message-border` | `3px solid color-primary-300` | AI message accent |
| `ai-message-padding` | `space-5 space-6` | AI message padding |
| `ai-suggestion-bg` | `color-primary-50` | Suggestion card |
| `ai-thinking-duration` | `1500ms` | Thinking animation |
| `ai-streaming-speed` | `30chars/s` | Output streaming |

### Dashboard Components

| Token | Maps To | Usage |
|-------|---------|-------|
| `stat-card-min-height` | `100px` | Stat card height |
| `stat-card-padding` | `space-6` (20px) | Stat card padding |
| `widget-min-height` | `160px` | Widget min height |
| `widget-max-height` | `480px` | Widget max height |
| `quick-action-size` | `64px` | Quick action icon box |

---

## Module Token Namespace

When modules introduce component variants, they prefix tokens with the module name:

```
<module>-<component>-<element>-<property>
```

Examples:
- `career-card-job-padding` — Job card padding in Career module
- `learning-progress-bar-height` — Progress bar height in Learning module
- `crm-avatar-size` — Avatar size in CRM module

Module tokens inherit from component tokens and only override what differs.

---

## Token File Structure

Following DP-1 token architecture, DP-2 adds component-specific token files:

```
tokens/
├── index.json
├── color.json                  # DP-1 primitives
├── typography.json             # DP-1 primitives
├── spacing.json                # DP-1 primitives
├── radius.json                 # DP-1 primitives
├── shadow.json                 # DP-1 primitives
├── elevation.json              # DP-1 primitives
├── motion.json                 # DP-1 primitives
├── breakpoints.json            # DP-1 primitives
├── components/
│   ├── button.json             # Button component tokens
│   ├── card.json               # Card component tokens
│   ├── form.json               # Form component tokens
│   ├── navigation.json         # Navigation component tokens
│   ├── table.json              # Table component tokens
│   ├── dialog.json             # Dialog component tokens
│   ├── feedback.json           # Feedback component tokens
│   ├── loading.json            # Loading component tokens
│   ├── ai.json                 # AI component tokens
│   └── dashboard.json          # Dashboard component tokens
└── themes/
    ├── light.json              # DP-1 theme overrides
    ├── dark.json               # DP-1 theme overrides
    └── high-contrast.json      # DP-1 theme overrides
```

Component token files reference DP-1 primitives and do not create new raw values.

---

## Usage Rules

1. **Implementations reference component tokens**, not raw values. `button-primary-bg` not `#2563EB`.
2. **Component tokens are optional overrides.** If a component token is not defined, the component falls back to semantic tokens.
3. **Module tokens override component tokens** for module-specific needs.
4. **State tokens are only specified when different from default.** If `button-primary-bg = color-primary-600` and hover is different, specify `button-primary-bg-hover`.

---

*This Token extension inherits all rules from DP-1 Design-Tokens.md. Component tokens are created per-component during DP-3 implementation. Refer to [Design-Tokens.md](../../02-Design-Language/Design-Tokens.md) for the token philosophy and architecture foundation.*
