# Naming Convention

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-2 ([README.md](../../03-Design-System/README.md)), DP-1 ([Design-Tokens.md](../../02-Design-Language/Design-Tokens.md))

---

## Purpose

Defines the naming conventions for all components, variants, props, states, tokens, and files in the Enterprise Component Library.

---

## Component Names

### Pattern

```
<PascalCase>
```

### Rules

1. Use PascalCase for component names: `Button`, `IconButton`, `FloatingButton`.
2. Acronyms are uppercased: `AIMessage`, `CRUDPattern`.
3. Compound names use concatenation (no hyphens or underscores): `ContextMenu`, `SearchInput`.
4. Names describe the component's purpose: `UploadZone`, `ConfirmationDialog`, `NavigationRail`.
5. Names must be unique across the entire library.
6. Reserved prefixes: `use` for hooks, `with` for HOCs, `Provider` for context providers.

### Examples

| Correct | Incorrect |
|---------|-----------|
| Button | btn |
| IconButton | icon-button |
| DatePicker | Date_Picker |
| AIWorkspace | AiWorkspace |
| ConfirmationDialog | confirm_dialog |

---

## Variant Names

### Pattern

```
<ComponentName><VariantName>
```

### Rules

1. Variant names follow PascalCase.
2. Variant is appended to the component name: `PrimaryButton`, `SecondaryButton`.
3. Variant names describe the visual or functional difference: `OutlineButton`, `DangerButton`.
4. Module-specific variants use namespace prefix: `CareerJobCard`, `LearningCourseCard`.

### Examples

| Variant | Component |
|---------|-----------|
| PrimaryButton | Button |
| SecondaryButton | Button |
| DangerButton | Button |
| OutlineButton | Button |
| GhostButton | Button |
| JobCard | Card |
| AnalyticsCard | Card |
| DashboardStatCard | Card |

---

## Props Contract

### Pattern

```
camelCase for props
```

### Rules

1. All props use camelCase: `isDisabled`, `onClick`, `variantName`.
2. Boolean props use `is`/`has`/`can` prefix: `isDisabled`, `hasError`, `canExpand`.
3. Event handler props use `on` prefix: `onClick`, `onChange`, `onSubmit`.
4. Ref props use `ref` suffix: `inputRef`, `containerRef`.
5. Style props use standard HTML/CSS naming: `className`, `style`.
6. Data attributes use `data-` prefix: `dataTestId`, `dataCy`.
7. Aria attributes use `aria-` prefix.
8. Required props are documented with `(required)` marker.
9. Optional props include default value.
10. Children prop is `children` (React convention).

### Examples

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

// Avoid
interface ButtonProps {
  kind: 'primary' | 'secondary' | 'danger';
  sz: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  handleClick?: () => void;
  label: string;
}
```

---

## State Names

### Pattern

```
<PascalCase>
```

### Standard States

| State | Description |
|-------|-------------|
| Default | Resting/initial state |
| Hover | Mouse pointer over element |
| Focus | Element receives keyboard focus |
| Active | Element being activated (mousedown) |
| Disabled | Non-interactive state |
| Loading | Content/action in progress |
| Error | Error condition |
| Empty | No content to display |
| Selected | Element is selected/chosen |
| Expanded | Collapsible element is open |
| Collapsed | Collapsible element is closed |

---

## File Names

### Pattern

```
<PascalCase>.md
```

### Rules

1. Component documentation files match component names: `Button.md`, `IconButton.md`.
2. Architecture files use hyphenation: `Component-Hierarchy.md`, `Naming-Convention.md`.
3. Pattern files use hyphenation: `CRUD-Pattern.md`, `Dashboard-Pattern.md`.
4. Directory names use PascalCase: `Core/`, `Forms/`, `Navigation/`.

### Examples

```
Core/Button.md
Core/IconButton.md
Architecture/Component-Hierarchy.md
Patterns/CRUD-Pattern.md
```

---

## Design Contract Names

### Pattern

```
<component-name>-<property>
```

### Examples

| Contract | Description |
|----------|-------------|
| button-background | Background color token for button |
| button-padding-horizontal | Horizontal padding for button |
| card-border-radius | Border radius for card |
| form-input-height | Height of form input |

---

## Token Names

Token naming follows DP-1 [Design-Tokens.md](../../02-Design-Language/Design-Tokens.md) convention:

```
<namespace>-<component>-<element>-<property>
```

### Examples

| Token | Value |
|-------|-------|
| mr-button-primary-background | primary-600 |
| mr-card-default-shadow | shadow-1 |
| mr-input-border-radius | radius-sm |

---

## CSS Class Names

### Pattern

```
mr-<component>[-<variant>][-<element>]
```

### Rules

1. All classes prefixed with `mr-` to avoid collisions.
2. Use kebab-case after prefix.
3. Element classes append element name.
4. Variant classes use variant name.

### Examples

| Class | Description |
|-------|-------------|
| mr-button | Base button class |
| mr-button--primary | Primary button variant |
| mr-button__icon | Button icon element |
| mr-card | Base card class |
| mr-card__header | Card header element |
| mr-card--interactive | Interactive card variant |

---

## Rules

1. No duplicate names anywhere in the library.
2. Names must be self-documenting — no abbreviations unless universally understood (AI, UI, API).
3. Names must use English language only.
4. Names must be pronounceable.
5. No deprecated names — use the correct name from the start.
6. All names must follow this convention consistently.
7. Module-specific names use the module prefix.
