# Switch

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md))

---

## Purpose

Binary toggle control with a horizontal track and sliding thumb. Track width is fixed at 36px. Label can appear on the left or right. Supports standard and with-description variants.

---

## Responsibilities

- Render a horizontal track (36px wide) with a circular thumb
- Toggle between on/off states on click
- Display label text aligned left or right of the track
- Support optional description text below the label
- Animate thumb movement between positions
- Announce state changes to screen readers
- Support controlled and uncontrolled usage

---

## Composition

```
Switch
├── SwitchTrack (36px wide)
│   └── SwitchThumb (circular, animated)
├── SwitchLabel (text, left or right)
└── SwitchDescription (smaller text below label)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Optional wrapper |
| Child | SwitchTrack | Visual track element |
| Child | SwitchThumb | Sliding handle |
| Sibling | SwitchLabel | Toggle label |
| Sibling | SwitchDescription | Additional context |
| Related | Checkbox | Binary selection sibling |

---

## Props Contract

```typescript
/**
 * Props for the Switch component.
 */
export interface SwitchProps {
  // Display
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Color when toggled on. @default "primary" */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Label position relative to track. @default "right" */
  labelPosition?: 'left' | 'right';
  /** Visual variant. @default "standard" */
  variant?: 'standard' | 'with-description';

  // State
  /** Whether the switch is on. @default false */
  isChecked?: boolean;
  /** Default checked state (uncontrolled). @default false */
  defaultChecked?: boolean;
  /** Whether the switch is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the switch is loading. @default false */
  isLoading?: boolean;
  /** Whether the switch has an error. @default false */
  hasError?: boolean;

  // Content
  /** Label text. */
  label?: string;
  /** Description text (with-description variant). */
  description?: string;
  /** Text when on (e.g., "On", "Enabled"). */
  onText?: string;
  /** Text when off (e.g., "Off", "Disabled"). */
  offText?: string;
  /** Name attribute for form submission. */
  name?: string;
  /** Value attribute. */
  value?: string;

  // Events
  /** Called when toggle state changes. */
  onChange?: (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called on blur. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Accessibility
  /** ARIA label. Defaults to label text. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Track with label only | Settings, preferences |
| `with-description` | Track with label and description text | Settings with explanation |
| `icon` | Track with on/off icons inside | Visual toggle indication |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Off** | Gray track, thumb left | Toggle off |
| **On** | Brand-colored track, thumb right | Toggle on |
| **Hover** | Slight shadow on thumb, cursor pointer | Interactive indication |
| **Focus** | Focus ring around track | Keyboard focus |
| **Active** | Thumb scales slightly (1.1) | Press indication |
| **Disabled off** | 40% opacity, muted | Cannot interact |
| **Disabled on** | 40% opacity, muted track | Cannot interact |
| **Loading** | Spinner replaces thumb | Async operation |
| **Error** | Red outline on track | Validation failure |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `role="switch"` on the input element. |
| **Checked state** | `aria-checked="true"` / `"false"`. |
| **Label** | Visible `<label>` or `aria-label`. |
| **Description** | `aria-describedby` linking to description element. |
| **Disabled** | `disabled` + `aria-disabled="true"`. |
| **Focus** | 2px focus ring around track. Tab reaches switch. |
| **Keyboard** | Enter/Space or Arrow keys to toggle. Tab to move focus. |
| **Screen reader** | Announce "On" / "Off", label text, and state changes. |
| **Hidden input** | Native checkbox input hidden but present for form submission. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Track 36px fixed. Touch target min 44x44px (padding extends hit area). |
| Tablet (768-1023px) | Standard behavior. |
| Desktop (1024-1279px) | Standard behavior. |
| Wide (1280-1599px) | Standard behavior. |
| Ultra-wide (1600px+) | Standard behavior. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Thumb slide | Toggle | 200ms | Ease-Out |
| Track color | Toggle | 200ms | Ease-Out |
| Thumb scale | Active/press | 100ms | Ease-Out |
| Focus ring | Focus | 150ms | Ease-Out |
| Spinner appear | Loading | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="icon"` | Icons inside track (sun/moon, play/pause) |
| `size="xs"` | Extra small for dense tables |
| `color` auto | Dynamic color based on context |
| `showOnOff` prop | Display "On/Off" text inside track |
| `confirmation` prop | Show confirmation dialog before toggle |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Spinner | Internal | Loading state indicator |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Checkbox.md | Binary selection sibling (square vs pill) |
| FormGroup.md | Parent wrapper |

---

## Anti-patterns

1. **Using Switch for non-binary options** — Switch is on/off only. Use Select for multi-value.
2. **Removing label** — Always provide a label for context.
3. **Changing label dynamically** — Label should be stable; state changes communicated via track.
4. **Using Switch for form submission** — Use Checkbox when value needs to be part of form data.
5. **Track width modification** — Track must remain 36px wide (Design Specification DP-2).

---

## Performance Notes

- Switch uses CSS transitions only — no JS animation overhead.
- Native checkbox input hidden behind visual track for form participation.
- Thumb position uses CSS `transform: translateX()` — GPU accelerated.
- Minimal re-render footprint — only toggles `isChecked` state.
