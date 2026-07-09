# Design Tokens

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md))

---

## Philosophy

Design tokens are the atomic units of the design language. They translate design decisions (colors, spacing, typography, shadows) into a structured, named system that can be consumed by design tools and codebases.

The token system ensures that every component, page, and module uses the same design variables. No hardcoded values exist anywhere in MR:EGO.

This document defines the **token philosophy, naming convention, and architecture**. Exact token implementations (CSS custom properties, JSON, TypeScript types) are defined in the Design System (DP-2).

---

## Token Categories

| Category | Prefix | Examples | Defined In |
|----------|--------|----------|------------|
| Color | `color-` | `color-primary-500`, `color-neutral-100` | [Color-System.md](Color-System.md) |
| Typography | `font-` | `font-size-h1`, `font-weight-bold` | [Typography.md](Typography.md) |
| Spacing | `space-` | `space-5`, `space-8` | [Spacing-System.md](Spacing-System.md) |
| Radius | `radius-` | `radius-sm`, `radius-md` | [Border-Radius.md](Border-Radius.md) |
| Shadow | `shadow-` | `shadow-1`, `shadow-3` | [Shadow-System.md](Shadow-System.md) |
| Elevation | `elevation-` | `elevation-layer-1`, `elevation-layer-3` | [Elevation-System.md](Elevation-System.md) |
| Duration | `duration-` | `duration-fast`, `duration-normal` | [Motion-System.md](Motion-System.md) |
| Easing | `easing-` | `easing-out`, `easing-in-out` | [Motion-System.md](Motion-System.md) |
| Breakpoint | `bp-` | `bp-sm`, `bp-lg` | [Responsive-System.md](Responsive-System.md) |
| Z-Index | `z-` | `z-layer-1`, `z-overlay` | [Elevation-System.md](Elevation-System.md) |
| Opacity | `opacity-` | `opacity-disabled`, `opacity-glass` | [Color-System.md](Color-System.md) |

---

## Naming Convention

Tokens follow a **hierarchical, descriptive naming convention**:

```
<category>-<property>[-<variant>][-<state>]
```

### Pattern Rules

1. **Lowercase kebab-case.** All tokens are lowercase with hyphens separating words.
2. **Category first.** The broadest category is always the first segment.
3. **Property next.** The specific property being defined.
4. **Variant optional.** `500`, `sm`, `primary` — refines the property.
5. **State optional.** `hover`, `active`, `disabled` — only for state-specific tokens.

### Examples

| Token | Breakdown |
|-------|-----------|
| `color-primary-500` | Category: color, Property: primary, Variant: 500 |
| `space-8` | Category: space, Property: 8 (32px) |
| `font-size-h1` | Category: font, Property: size, Variant: h1 |
| `shadow-layer-2` | Category: shadow, Property: layer, Variant: 2 |
| `duration-fast` | Category: duration, Property: fast |
| `radius-md` | Category: radius, Property: md |

---

## Token Architecture

```
┌─────────────────────────────────────────────┐
│            PRIMITIVE TOKENS                  │
│  Raw values (hex, px, ms, deg)              │
│  color: #2563EB, spacing: 32px, size: 36px  │
├─────────────────────────────────────────────┤
│            SEMANTIC TOKENS                   │
│  Aliases mapped to primitives + context     │
│  color-text-body → color-neutral-800        │
│  space-card-padding → space-7               │
│  font-size-body → font-size-15              │
├─────────────────────────────────────────────┤
│          COMPONENT TOKENS                    │
│  Component-specific overrides               │
│  button-primary-bg → color-primary-600      │
│  card-shadow → shadow-1                     │
├─────────────────────────────────────────────┤
│          THEME OVERRIDES                     │
│  Theme-specific token values               │
│  [dark] color-surface-1 → color-neutral-100 │
│  [high-contrast] color-text-body → black    │
└─────────────────────────────────────────────┘
```

### Layer 1: Primitive Tokens

Primitive tokens represent raw design values. They are the source of truth.

```
color-primary-500: #2563EB
space-8: 32px
font-size-h1: 36px
radius-md: 8px
shadow-1: 0 1px 2px rgba(0,0,0,0.05)
```

### Layer 2: Semantic Tokens

Semantic tokens map primitives to design intent. Components use semantic tokens, not primitives.

```
color-text-body: color-neutral-800
space-page-margin: space-8
font-heading-1: font-size-h1
shadow-card: shadow-1
```

### Layer 3: Component Tokens

Component tokens provide granular control for specific components. Limited to components with unique needs.

```
button-primary-background: color-primary-600
button-primary-text: color-white
card-padding: space-card-padding
```

### Layer 4: Theme Overrides

Theme files override token values for specific themes. Only overrides are specified — the base file covers defaults.

```
// dark-theme.json
{
  "color-surface-1": { "value": "#1E293B" },
  "color-text-body": { "value": "#E2E8F0" }
}
```

---

## Token File Structure

Tokens are organized by category in separate files:

```
tokens/
├── index.json              # Exports all token files
├── color.json              # Color primitives + semantic
├── typography.json         # Font sizes, weights, families
├── spacing.json            # Spacing scale
├── radius.json             # Border radius
├── shadow.json             # Shadow values
├── elevation.json          # Z-index layers
├── motion.json             # Durations + easings
├── breakpoints.json        # Responsive breakpoints
└── themes/
    ├── light.json          # Light theme overrides
    ├── dark.json           # Dark theme overrides
    └── high-contrast.json  # High-contrast theme overrides
```

---

## Token Usage Rules

1. **Components never use raw values.** Every color, space, and size references a token.
2. **Semantic tokens are preferred over primitives.** Components use `color-text-body`, not `color-neutral-800`.
3. **Primitive tokens change rarely.** Semantic tokens can change without touching primitives (or vice versa).
4. **Token names encode meaning**, not appearance. `color-primary-500` not `color-blue`.
5. **Tokens are platform-agnostic.** The naming convention works for CSS, Swift, Kotlin, and design tools.
6. **Deprecated tokens are soft-removed.** Old tokens remain in the file with a `deprecated` flag for one version before removal.

---

## Future Token Expansion

As MR:EGO expands (modules, enterprise, developer platform):

1. **Component tokens** are added per component during DP-2.
2. **Module-specific tokens** use a module prefix: `career-color-timeline-line`, `learning-color-progress-bar`.
3. **Custom theme tokens** are additive — new themes only specify overrides.
4. **Third-party tokens** (for developer platform) are documented and versioned separately.

*See [Future-Expansion.md](../01-Constitution/Future-Expansion.md) for expansion governance.*

---

*This Design Token philosophy is permanent. The Design System (DP-2) implements concrete token files following this architecture. Refer to [Color-System.md](Color-System.md), [Typography.md](Typography.md), [Spacing-System.md](Spacing-System.md), and all other DP-1 documents for the values these tokens reference.*
