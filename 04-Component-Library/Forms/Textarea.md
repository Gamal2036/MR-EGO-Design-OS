# Textarea

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md))

---

## Purpose

Multi-line text entry component for capturing longer-form text content. Supports auto-resize, character counting, and configurable minimum/maximum dimensions.

---

## Responsibilities

- Render a labeled `<textarea>` element
- Support auto-resize height adjustment based on content
- Display character count with optional max length enforcement
- Maintain minimum visible height of 3 lines
- Show helper text and error messages
- Expose value via controlled or uncontrolled patterns

---

## Composition

```
FormGroup (optional wrapper)
└── Textarea
    ├── <label> (rendered by Textarea or FormGroup)
    ├── <textarea> (native HTMLTextAreaElement)
    ├── CharacterCounter (bottom-right, optional)
    └── HelperText / ErrorMessage (below textarea)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout, validation |
| Sibling | CharacterCounter | Char count display with max |
| Sibling | HelperText | Guidance text below |
| Sibling | ErrorMessage | Validation error |
| Sibling | Input | Single-line counterpart |
| Extends | — | Base for rich-text editors |

---

## Props Contract

```typescript
/**
 * Props for the Textarea component.
 */
export interface TextareaProps {
  // Display
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the textarea spans full container width. @default true */
  fullWidth?: boolean;
  /** Whether to enable auto-resize. @default true */
  autoResize?: boolean;
  /** Minimum number of visible rows. @default 3 */
  minRows?: number;
  /** Maximum number of visible rows before scroll. 0 = no max. @default 0 */
  maxRows?: number;
  /** Whether to show the character counter. @default false */
  showCharCount?: boolean;

  // State
  /** Whether the textarea is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the textarea is in a loading state. @default false */
  isLoading?: boolean;
  /** Whether the textarea has a validation error. @default false */
  hasError?: boolean;
  /** Custom error message text. */
  errorMessage?: string;
  /** Whether the textarea is read-only. @default false */
  isReadOnly?: boolean;
  /** Whether the textarea is required. @default false */
  isRequired?: boolean;

  // Content
  /** Label text displayed above the textarea. */
  label?: string;
  /** Placeholder text displayed when textarea is empty. */
  placeholder?: string;
  /** Helper text displayed below the textarea. */
  helperText?: string;
  /** Current value of the textarea. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Name attribute for form submission. */
  name?: string;

  // Validation
  /** Maximum character length. */
  maxLength?: number;
  /** Validation callback. */
  validate?: (value: string) => string | null | Promise<string | null>;

  // Events
  /** Called when the value changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Called when the textarea loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Called when the textarea gains focus. */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  // Accessibility
  /** ARIA label for the textarea. */
  ariaLabel?: string;
  /** ID of element describing this textarea. */
  ariaDescribedBy?: string;
  /** Custom ID for the textarea element. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Fixed CSS height (overrides auto-resize). */
  height?: string | number;
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
| `standard` | Fixed-height textarea with optional resize handle | Comments, descriptions |
| `auto-resize` | Height grows with content up to maxRows | Long-form input, notes |
| `with-counter` | Character counter in bottom-right | Tweets, bios, limited input |
| `minimal` | No label, placeholder only, inline usage | Quick notes, chat input |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | 1px border, neutral bg, 3 visible rows min | Ready for input |
| **Hover** | Border darkens | Indicates interactivity |
| **Focus** | 2px brand ring, clear indicator | Keyboard focus |
| **Active** | User typing, content present | Text entry |
| **Disabled** | 40% opacity, no interaction | Cannot interact |
| **Read-only** | Muted bg, content visible but not editable | Display mode |
| **Error** | Error border, message below, `aria-invalid` | Validation failure |
| **Loading** | Skeleton shimmer on initial render | Async content load |
| **Filled** | Content present, counter active | Data entered |
| **Max length** | Counter turns warning color, border optional | Approaching/exceeding limit |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Label** | `<label htmlFor="...">` or `aria-label`. |
| **Error association** | `aria-invalid="true"`, `aria-describedby` to error message. |
| **Character counter** | `aria-live="polite"` for remaining chars. `role="status"` on counter. |
| **Required indicator** | Asterisk on label + `aria-required="true"`. |
| **Disabled state** | `disabled` + `aria-disabled="true"`. |
| **Focus** | 2px focus ring. Tab reaches textarea normally. |
| **Keyboard** | Tab in/out. Content navigation via arrow keys standard. |
| **Screen reader** | Announce rows/cols if relevant. Announce character limit. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Min rows = 3. Font size min 16px. |
| Tablet (768-1023px) | Full width or fixed. Comfortable padding. |
| Desktop (1024-1279px) | Fixed width up to 600px. Min rows = 3. |
| Wide (1280-1599px) | Fixed width up to 720px. |
| Ultra-wide (1600px+) | Max width 800px. Container constrained. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Height change | Auto-resize | 100ms | Ease-Out |
| Border color | Hover/focus | 100ms | Linear |
| Focus ring | Focus | 150ms | Ease-Out |
| Counter color | Threshold | 200ms | Ease-Out |
| Error state | Validation | 200ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="rich-text"` | Toolbar with bold/italic/list formatting |
| `mention` prop | @mention support with dropdown |
| `hashtag` prop | #hashtag detection and styling |
| `pasteHandler` prop | Custom paste handler (markdown, rich text) |
| `lineNumbers` prop | Line number gutter for code/text |
| `spellCheck` prop | Browser spell-check toggle |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| CharacterCounter | Internal | Character count display |
| HelperText | Internal | Contextual help text |
| ErrorMessage | Internal | Validation error display |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Single-line text sibling |
| FormGroup.md | Parent wrapper for label and layout |
| Validation.md | Consumed for validation rules |

---

## Anti-patterns

1. **Using Input for multi-line text** — Use Textarea for content exceeding one line.
2. **Removing resize capability** — Allow user resize unless explicitly constrained by design.
3. **Hiding character count** — When maxLength is set, always show counter for user awareness.
4. **Setting minRows below 3** — Minimum visible depth must be 3 lines for usability.
5. **Excessive maxRows** — Never set maxRows beyond 20; use pagination or expand/collapse for longer content.
6. **Auto-resize with fixed height** — These props are mutually exclusive; warn if both set.

---

## Performance Notes

- Auto-resize uses `IntersectionObserver` or `ResizeObserver` — avoid layout thrashing.
- Character counter uses O(1) string length check — no impact.
- Large content (10k+ chars) should use virtualization for rendering.
- Value updates on every keystroke; use `useMemo` for derived displays.
- Debounce validation at 300ms for large text.
- Avoid re-rendering CharacterCounter independently of value changes.
