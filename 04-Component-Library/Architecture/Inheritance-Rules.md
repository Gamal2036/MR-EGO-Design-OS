# Inheritance Rules

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-2 ([README.md](../../03-Design-System/README.md)), DP-1 ([Design-Tokens.md](../../02-Design-Language/Design-Tokens.md))

---

## Purpose

Defines how components inherit visual properties, behaviors, and constraints from Design Tokens, DP-2 specifications, and parent components.

---

## Inheritance Chain

```
Design Tokens (DP-1)
    ↓
Component Specifications (DP-2)
    ↓
Component Contracts (DP-3 — this phase)
    ↓
Component Implementation (Frontend)
```

### Token Inheritance

Every component derives its visual properties from Design Tokens:

| Property | Token Source |
|----------|-------------|
| Colors | Color-System tokens (primary, neutral, semantic) |
| Typography | Typography tokens (font-family, size, weight, line-height) |
| Spacing | Spacing-System tokens (space-2 through space-10) |
| Border radius | Border-Radius tokens (radius-sm, radius-md, radius-lg) |
| Shadows | Shadow-System tokens (shadow-1 through shadow-5) |
| Elevation | Elevation-System tokens (layer-0 through layer-5) |
| Motion | Motion-System tokens (duration, easing curves) |
| Glass effects | Glass-System tokens (opacity, blur) |

### Component Inheritance Rules

1. **No hardcoded values.** Every visual property references a Design Token.
2. **Token overrides.** Components may override tokens only through the component token extension mechanism defined in DP-2.
3. **Theme inheritance.** All components inherit current theme (light/dark) from the Theme Provider.
4. **Locale inheritance.** Components inherit current locale from the Locale Provider.
5. **Direction inheritance.** Components inherit text direction (LTR/RTL) from the Direction Provider.

---

## Override Rules

### Allowed Overrides

| Override Type | Scope | Example |
|--------------|-------|---------|
| Token override per variant | Variant level | Primary button uses primary-600, danger button uses danger-500 |
| Spacing override via props | Instance level | `<Card padding="space-6">` |
| Semantic color via props | Instance level | `<Badge variant="success">` |
| Size override via props | Instance level | `<Button size="lg">` |

### Forbidden Overrides

1. Components must not change base token values.
2. Components must not introduce new color values outside the Design Token palette.
3. Components must not override typography scale values.
4. Components must not override motion timing values.
5. Components must not override spacing scale values.
6. Components must not override border radius values.
7. Components must not override elevation layer values.

### Module-Specific Overrides

Modules may define component variants using the module namespace prefix:

```
<ModulePrefix>-<ComponentName>-<Variant>
```

Example: `career-card-job-listing`, `learning-card-course-progress`

Module variants must:
1. Derive from base component contracts
2. Only override property values that differ from base
3. Follow the naming convention defined in Naming-Convention.md
4. Register the variant in the module's component registry

---

## Composition Over Inheritance

### Preferred Pattern: Composition

```
Header
├── Logo
├── Navigation
└── Avatar Menu
```

Components compose other components. Avoid inheritance chains deeper than 2 levels.

### Discouraged Pattern: Deep Inheritance

```
BaseComponent
└── InteractiveComponent
    └── ClickableComponent
        └── Button
            └── PrimaryButton
                └── SubmitButton
```

Deep inheritance creates fragile hierarchies. Use composition instead.

### Allowed Inheritance

1. **Base → Variant** — A variant extends the base component with property overrides (e.g., Button → PrimaryButton, SecondaryButton).
2. **Pattern → Instance** — A pattern defines composition rules; an instance applies them with specific content.

---

## State Inheritance

1. **Default state** — Inherited from base component specification.
2. **Interactive states** — Hover, focus, active, disabled are inherited from interaction patterns.
3. **Content states** — Loading, empty, error states are inherited from state specifications.
4. **Theme states** — Light/dark mode colors are inherited from theme tokens.
5. **Responsive states** — Breakpoint adaptations are inherited from responsive rules.

---

## Rules

1. Maximum inheritance depth: 2 levels (Base → Variant).
2. Composition is always preferred over inheritance.
3. Variants must not change the public API contract of the base component.
4. Variants must not remove functionality from the base component.
5. Variants should only add or restrict — never replace.
6. Module variants must use the namespace prefix.
7. No component should inherit visual properties from another component — only from Design Tokens.
