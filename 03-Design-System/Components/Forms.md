# Forms

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Feedback-System.md](../../02-Design-Language/Feedback-System.md), [Error-State-System.md](../../02-Design-Language/Error-State-System.md))

---

## Purpose

Forms capture, validate, and submit user data. Every form control is designed for clarity, ease of use, and accessibility. Validation is inline, real-time, and helpful.

---

## When to Use

- Data entry and editing
- Settings and preferences
- Search inputs and filters
- Login, registration, onboarding
- Any structured data collection from the user

## When NOT to Use

- Displaying read-only data — use text or data display components
- Simple yes/no choices — use toggle or switch
- Selecting from many options — use searchable select or typeahead

---

## Variants

### Text Input

Single-line text entry.

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding (inline) | 12px |
| Border | Border-Default (1px) |
| Border radius | Radius-Sm (4px) |
| Background | Surface-1 |
| Text | Body (15px) |
| Label | Label token (14px/500) above input |
| Placeholder | Text-Tertiary |

| State | Visual |
|-------|--------|
| Default | Border-Default |
| Hover | Border-Hover |
| Focus | Border-Focus + 2px ring (Primary-200) |
| Disabled | 0.4 opacity, not-allowed cursor |
| Error | Border-Danger + error message below |
| Success (optional) | Border-Success + check icon |
| Read-only | Neutral-100 background, no changes possible |

### Textarea

Multi-line text entry for longer content.

| Property | Value |
|----------|-------|
| Min height | 80px (3 lines) |
| Max height | 240px (optional auto-resize) |
| Padding | 12px |
| Border | Border-Default (1px) |
| Border radius | Radius-Sm (4px) |
| Resize | Vertical only (or none for controlled) |
| Character count | Optional counter below, right-aligned |

### Select

Single or multi-option dropdown selector.

| Property | Value |
|----------|-------|
| Height | 40px |
| Trigger | Standard input appearance with chevron |
| Dropdown | Layer 2 elevation, max 320px height (scrollable) |
| Option height | 36px |
| Option padding | 8px 12px |
| Selected option | Primary-50 background, check icon |
| Multi-select | Checkbox per option, chip display for selected |

| Variant | Description |
|---------|-------------|
| Standard | Static options list |
| Searchable | Text input filters options as user types |
| Multi-select | Multiple options selectable with chips |
| Grouped | Options grouped by category with group labels |

### Checkbox

Binary selection — multiple independent choices.

| Property | Value |
|----------|-------|
| Box size | 18x18px |
| Border radius | Radius-Sm (4px) |
| Border | Border-Default |
| Checked background | Primary-600 |
| Checked icon | White checkmark |
| Label | Body (15px), 8px gap from checkbox |

| State | Visual |
|-------|--------|
| Unchecked | Border-Default, transparent fill |
| Checked | Primary-600 fill, white checkmark |
| Indeterminate | Primary-600 fill, white minus |
| Hover | Border-Hover |
| Focus | 2px ring (Primary-200) on box |
| Disabled | 0.4 opacity |
| Error | Border-Danger |

### Radio

Single selection from multiple mutually exclusive options.

| Property | Value |
|----------|-------|
| Circle size | 18x18px |
| Border | Border-Default (1.5px) |
| Selected fill | Primary-600 inner circle (10px) |
| Label | Body (15px), 8px gap |

| State | Visual |
|-------|--------|
| Unselected | Border-Default, transparent fill |
| Selected | Primary-600 filled inner circle |
| Hover | Border-Hover |
| Focus | 2px ring (Primary-200) |
| Disabled | 0.4 opacity |

### Switch

Binary toggle for settings and preferences.

| Property | Value |
|----------|-------|
| Track width | 36px |
| Track height | 20px |
| Thumb size | 16px circle |
| Off track | Neutral-300 |
| On track | Primary-500 |
| Thumb | White |
| Animation | 200ms Ease-Out |

| State | Visual |
|-------|--------|
| Off | Neutral-300 track, thumb left |
| On | Primary-500 track, thumb right |
| Focus | 2px ring on track |
| Disabled | 0.4 opacity |
| Label | Body (15px), 12px gap from track, clickable |

### Date Picker

Calendar-based date selection.

| Property | Value |
|----------|-------|
| Trigger | Standard input with calendar icon |
| Dropdown | Layer 4 elevation, 320px width |
| Navigation | Month/year header with chevron arrows |
| Day cells | 36x36px, hover highlight |
| Selected day | Primary-600 fill, white text |
| Today | Primary-500 border |
| Range start/end | Primary-600 fill |
| Range between | Primary-50 background |
| Min/max dates | Grayed out, not selectable |

| Variant | Description |
|---------|-------------|
| Single | Select one date |
| Range | Select start and end date |
| With time | Additional time input below calendar |
| Month picker | Month-only selection (no days) |

### Password Input

Secure text entry with visibility toggle.

| Property | Value |
|----------|-------|
| Input type | `password` (default) |
| Toggle | Eye icon button, right side of input |
| Show state | Input type switches to `text` |
| Strength indicator | Optional bar below input (Weak/Fair/Strong) |
| Mask | Dots by default, revealed on toggle |
| Caps lock warning | Indicated when Caps Lock is on |

---

## Validation

| Type | Timing | Behavior |
|------|--------|----------|
| Inline | On blur | Field validates when user leaves the field |
| Real-time | On input | Field validates as user types (debounced 300ms) |
| On submit | Form submission | All fields validate, focus jumps to first error |
| Async | Server response | Field validates after server returns result |

### Error State

| Element | Specification |
|---------|---------------|
| Border | Border-Danger (1.5px) |
| Icon | Warning/exclamation icon (14px) |
| Message | Caption (13px), Danger-600, below input |
| Association | `aria-describedby` links input to error message |
| Focus | On submit, focus moves to first invalid field |

### Success State (optional)

| Element | Specification |
|---------|---------------|
| Border | Border-Success |
| Icon | Checkmark icon |
| Message | Caption (13px), Success-600, below input |

---

## Form Layout

### Stacked (default)

```
Label
[Input]
Helper text or error message
[Next field ...]
```

### Inline (compact)

```
Label  [Input]  Label  [Input]
```

### Multi-column (desktop only)

```
┌─────────────────┬─────────────────┐
│ Label            │ Label            │
│ [Input]          │ [Input]          │
├─────────────────┴─────────────────┤
│ Label                              │
│ [Input]                            │
└───────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Between fields | 24px | Space-7 |
| Between label and input | 6px | Space-2 |
| Between input and error | 4px | Space-2 |
| Between inline fields | 16px | Space-5 |
| Form section padding | 32px | Space-8 |
| Fieldset margin | 32px | Space-8 |
| Checkbox/radio group gap | 12px | Space-4 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Labels | Every input has explicit `<label>` |
| Placeholder | Never replaces label — label is always visible |
| Error association | `aria-describedby` links to error message |
| Required fields | `aria-required="true"` + optional asterisk |
| Required indicator | Asterisk in label text, explained at form top |
| Focus order | Tab follows visual field order |
| Error summary | `role="alert"` at top of form on submit errors |
| Autocomplete | `autocomplete` attribute on appropriate fields |
| ARIA roles | `form` role (implicit with `<form>`) |
| Touch targets | All interactive controls minimum 44px height |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Single column always. Full-width inputs. |
| Tablet (768-1023px) | Single column. Wider inputs. |
| Desktop (1024px+) | Multi-column for related fields. Inline label option. |
| Actions | Full-width buttons on mobile, inline on desktop. |

---

## Future Expansion

- **Autocomplete** — Suggest-as-you-type with categorized results
- **Rich text editor** — Formatted text input with toolbar
- **File input** — Native file selection with preview
- **Color picker** — Visual color selection with hex input
- **Slider** — Range selection with numeric display
- **Chip input** — Multi-value entry with removable chips (emails, tags)
- **OTP input** — One-time-password with segmented fields
- **Form wizard** — Multi-step form with progress indicator

---

## Related Components

- [Buttons.md](Buttons.md) — Form submit, cancel, and action buttons
- [Search.md](Search.md) — Search input extends text input with autocomplete
- [Dialogs.md](Dialogs.md) — Forms inside modals and drawers
- [Feedback.md](Feedback.md) — Form success/error toasts
- [Navigation.md](Navigation.md) — Tabbed forms
- [Uploads.md](Uploads.md) — File input with drag-drop zone
