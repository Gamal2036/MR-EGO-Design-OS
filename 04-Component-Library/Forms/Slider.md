# Slider

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Range value selection component that allows users to select a single value or a range of values (two handles) along a horizontal track. Supports step increments, numeric input binding, and labeled min/max/current values.

---

## Responsibilities

- Render a horizontal track with a draggable thumb (single) or two thumbs (range)
- Display current value label(s) above or beside the track
- Show min and max labels at track ends
- Snap to step increments when configured
- Support optional linked numeric input for precise value entry
- Animate thumb movement along the track
- Support keyboard adjustment of values
- Enforce min/max constraints

---

## Composition

```
Slider
├── SliderLabels
│   ├── MinLabel
│   └── MaxLabel
├── SliderTrack
│   ├── TrackActive (filled portion)
│   ├── TrackInactive (unfilled portion)
│   ├── Thumb (single) | ThumbStart + ThumbEnd (range)
│   └── StepMarkers (optional dots at intervals)
├── ValueTooltip (floating above thumb, optional)
├── SliderInput (optional linked numeric input)
└── SliderInputRange (optional dual inputs for range)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Optional wrapper |
| Child | SliderTrack | Horizontal bar |
| Child | Thumb | Draggable handle(s) |
| Child | ValueTooltip | Current value display |
| Child | SliderInput | Linked number input |
| Related | Input | Linked numeric input component |

---

## Props Contract

```typescript
/**
 * Props for the Slider component.
 */
export interface SliderProps {
  // Display
  /** Visual variant. @default "single" */
  variant?: 'single' | 'range' | 'step' | 'with-input';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the slider spans full width. @default true */
  fullWidth?: boolean;
  /** Whether to show value tooltip above thumb. @default true */
  showTooltip?: boolean;
  /** Whether to show min/max labels. @default true */
  showLabels?: boolean;
  /** Whether to show step markers. @default false */
  showStepMarkers?: boolean;
  /** Orientation. @default "horizontal" */
  orientation?: 'horizontal' | 'vertical';

  // State
  /** Current value (single variant). */
  value?: number;
  /** Start value (range variant). */
  startValue?: number;
  /** End value (range variant). */
  endValue?: number;
  /** Default value (uncontrolled). @default 0 */
  defaultValue?: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Step increment. @default 1 */
  step?: number;
  /** Whether the slider is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the slider has an error. @default false */
  hasError?: boolean;

  // Content
  /** Label for the slider. */
  label?: string;
  /** Helper text. */
  helperText?: string;
  /** Error message. */
  errorMessage?: string;
  /** Custom format function for displayed values. */
  formatValue?: (value: number) => string;
  /** Custom min label text. */
  minLabel?: string;
  /** Custom max label text. */
  maxLabel?: string;
  /** Name attribute. */
  name?: string;

  // Events
  /** Called while dragging (continuous). */
  onChange?: (value: number | [number, number]) => void;
  /** Called when drag ends (committed). */
  onChangeEnd?: (value: number | [number, number]) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;
  /** ARIA value text (for custom formatting). */
  ariaValueText?: string;

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
| `single` | One thumb, selects a single value | Volume, brightness |
| `range` | Two thumbs, selects a value range | Price range, date range |
| `step` | Thumb snaps to discrete step markers | Rating (1-5), difficulty |
| `with-input` | Single slider with linked number input | Precise value entry |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Gray track, unfilled left, thumb at position | Ready for interaction |
| **Filled** | Brand-colored track from min to thumb | Value selected |
| **Hover** | Thumb slightly larger, shadow | Interactive indication |
| **Focus** | Focus ring on thumb | Keyboard focus |
| **Active/Dragging** | Thumb scaled up (1.15), stronger shadow | User dragging |
| **Disabled** | 40% opacity, no interaction | Cannot interact |
| **Error** | Red track portion | Validation failure |
| **Range filled** | Brand track between two thumbs | Range selected |
| **Step marker** | Small dot at each step interval | Step variant |
| **Tooltip visible** | Value text above thumb | While dragging or hover |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `role="slider"` on the thumb element(s). |
| **Value** | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on each thumb. |
| **Value text** | `aria-valuetext` for custom formatting (e.g., "$50"). |
| **Label** | `aria-label` or `aria-labelledby`. |
| **Disabled** | `aria-disabled="true"`. |
| **Focus** | Visible focus ring on thumb. Tab enters the slider. |
| **Keyboard** | Left/Up = decrease, Right/Down = increase. Home = min, End = max. Page Up/Down = step * 10. Tab to move between range thumbs. |
| **Screen reader** | Announce value changes, min/max boundaries, step increments. |
| **Orientation** | `aria-orientation="horizontal"` / `"vertical"`. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Touch target for thumb minimum 44x44px. Vertical orientation forced if container is narrow. |
| Tablet (768-1023px) | Full width or fixed. |
| Desktop (1024-1279px) | Fixed width up to 400px. |
| Wide (1280-1599px) | Fixed width up to 480px. |
| Ultra-wide (1600px+) | Max width 560px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Thumb position | Value change | 100ms | Ease-Out |
| Thumb scale | Hover/active | 100ms | Ease-Out |
| Track fill | Value change | 100ms | Ease-Out |
| Tooltip appear | Drag start | 100ms | Ease-Out |
| Tooltip disappear | Drag end | 100ms | Ease-In |
| Focus ring | Focus | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="vertical"` | Vertical slider orientation |
| `marks` prop | Custom label marks at specific values |
| `tooltipFormatter` | Custom tooltip content |
| `color` prop | Track color by value thresholds |
| `debounce` prop | Debounce onChange callback |
| `reverse` prop | Reverse track direction (min right) |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Input | Internal | Linked numeric input (with-input variant) |
| Tooltip | Internal | Floating value display |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Linked numeric input for precise entry |
| FormGroup.md | Parent wrapper for label and layout |

---

## Anti-patterns

1. **Very large step count (> 100)** — Use Input with the slider for precision.
2. **No labels for min/max** — Always show min and max values for context.
3. **Small touch target on mobile** — Thumb must be minimum 44x44px on touch devices.
4. **OnChange without debounce for expensive operations** — Use `onChangeEnd` for committing changes.
5. **Hiding step markers for step variant** — Step variant must show markers.

---

## Performance Notes

- Thumb position uses CSS `transform: translateX()` for GPU-accelerated movement.
- `onChange` fires continuously during drag — debounce if used for expensive operations.
- `onChangeEnd` fires once on drag release — use this for committing values.
- Track fill uses `width` percentage — no JS paint calculations.
- Use `useCallback` for drag handlers to prevent re-renders.
- Touch events use passive listeners for scroll performance.
