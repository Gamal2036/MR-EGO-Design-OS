# Keyboard Interactions

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 7, 10), DP-4 ([Accessibility/Keyboard-Navigation.md](../05-Application-Shell/Accessibility/Keyboard-Navigation.md))
**Inherits:** All keyboard navigation specifications from DP-0, DP-4, DP-6

---

## Keyboard Interaction Philosophy

Keyboard navigation is a first-class interaction model. Every interactive element is reachable and operable via keyboard alone. Keyboard interactions follow platform conventions and familiar patterns.

---

## Global Keyboard Shortcuts

| Shortcut | Action | Notes |
|----------|--------|-------|
| Tab | Move focus forward | DOM order |
| Shift + Tab | Move focus backward | Reverse DOM order |
| Enter | Activate focused element | — |
| Space | Toggle / Activate | Forms, buttons |
| Escape | Close / Dismiss | Modals, panels, dropdowns, toasts |
| Ctrl+K / Cmd+K | Open command palette | Global — available everywhere |
| Ctrl+I | Toggle AI panel | Show/hide |
| Ctrl+B | Toggle sidebar | Show/hide |
| Ctrl+F | Find in page | Search within current page |
| Ctrl+S | Save | Forms, editors |
| Ctrl+Z | Undo | Last action |
| Ctrl+Shift+Z | Redo | — |
| Ctrl+1-9 | Navigate to nav items | Matches sidebar order |
| Ctrl+, | Open settings | — |
| Ctrl+Shift+F | Focus global search | — |
| / | Focus quick search | — |
| ? | Show keyboard shortcuts | Help overlay |
| F6 | Cycle through regions | Sidebar → Header → Content → Panels |
| Alt+Left | Back navigation | — |
| Alt+Right | Forward navigation | — |

---

## Component Keyboard Interactions

### Buttons

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Focus | 100ms ring appear |
| Enter/Space | Activate | 50ms press feedback |
| Escape | No action | — |

### Links

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Focus | 100ms ring appear |
| Enter | Navigate | 50ms feedback |

### Inputs

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Focus | 100ms ring + cursor |
| Enter | Submit (within form) | 50ms |
| Escape | Blur | 100ms ring disappear |
| Type | Characters appear | Real-time |
| Arrow keys | Cursor movement | — |

### Textarea

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Insert tab character (within) | — |
| Escape | Blur (optional) | — |
| Shift+Tab | Focus previous | — |

### Select / Dropdown

| Key | Action | Duration |
|-----|--------|----------|
| Enter/Space | Open dropdown | 200ms list appear |
| Arrow Up/Down | Navigate options | 100ms highlight move |
| Enter | Select option | 100ms selection |
| Escape | Close dropdown | 150ms list dismiss |

### Checkbox

| Key | Action | Duration |
|-----|--------|----------|
| Space | Toggle | 200ms check/uncheck |
| Tab | Focus | 100ms ring |

### Radio Group

| Key | Action | Duration |
|-----|--------|----------|
| Arrow Up/Down | Change selection | 200ms select animation |
| Tab | Focus group | 100ms ring on selected |

### Switch

| Key | Action | Duration |
|-----|--------|----------|
| Enter/Space | Toggle | 200ms knob slide |
| Tab | Focus | 100ms ring |

### Tabs

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Focus tablist | 100ms ring |
| Arrow Left/Right | Switch tab | 200ms indicator slide + content cross-fade |
| Home/End | First/Last tab | 200ms |
| Enter/Space | Activate tab | — |

### Accordion

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Focus header | 100ms ring |
| Enter/Space | Toggle section | 200ms expand/collapse |
| Arrow Up/Down | Focus prev/next header (within accordion) | 100ms |
| Home/End | First/Last header | 100ms |

### Dialog

| Key | Action | Duration |
|-----|--------|----------|
| Escape | Close | 150ms dismiss animation |
| Tab | Cycle within dialog (focus trap) | 100ms ring |
| Shift+Tab | Cycle backward within dialog | 100ms ring |
| Enter | Confirm primary action | 50ms |

### Dropdown Menu

| Key | Action | Duration |
|-----|--------|----------|
| Enter/Space | Open menu | 200ms appear |
| Arrow Up/Down | Navigate items | 100ms |
| Enter | Select item | 100ms |
| Escape | Close menu | 150ms |

### Context Menu

| Key | Action | Duration |
|-----|--------|----------|
| Shift+F10 | Open menu | 200ms |
| Arrow Up/Down | Navigate items | 100ms |
| Enter | Select | 100ms |
| Escape | Close | 150ms |

### Table

| Key | Action | Duration |
|-----|--------|----------|
| Tab | Navigate cells | 100ms focus ring |
| Arrow keys | Navigate within table | 100ms |
| Enter | Activate cell action | 50ms |
| Space | Toggle row selection | 100ms |

### List

| Key | Action | Duration |
|-----|--------|----------|
| Arrow Up/Down | Navigate items | 100ms |
| Enter | Select/Activate | 50ms |
| Home/End | First/Last item | 100ms |

### Slider

| Key | Action | Duration |
|-----|--------|----------|
| Arrow Left/Right | Decrement/Increment | 200ms value change |
| Home/End | Min/Max | 200ms |
| Page Up/Down | Larger increment | 200ms |

### Date Picker

| Key | Action | Duration |
|-----|--------|----------|
| Enter | Open calendar | 200ms |
| Arrow keys | Navigate days | 100ms |
| Enter | Select date | 200ms |
| Escape | Close | 150ms |

### Tree View

| Key | Action | Duration |
|-----|--------|----------|
| Arrow Up/Down | Navigate items | 100ms |
| Arrow Right | Expand node | 200ms |
| Arrow Left | Collapse node | 150ms |
| Enter | Activate node | 50ms |

---

## Focus Management

### Focus Order Rules

1. Tab order follows visual order (left-to-right, top-to-bottom)
2. Interactive elements receive focus in logical reading order
3. Non-interactive elements are skipped (no tabindex)
4. Modals trap focus — Tab cycles within modal content
5. Focus returns to trigger element when modal/panel closes
6. Page navigation sets focus to main content heading
7. Dynamic content receives focus when it appears
8. Focus is never lost or stuck

### Focus Visual

| Element | Focus Indicator | Offset | Duration |
|---------|----------------|--------|----------|
| Button | 2px ring | 2px | 100ms |
| Input | 2px ring | 2px | 100ms |
| Link | 2px ring (outline) | 2px | 100ms |
| Card | 2px ring | 2px | 100ms |
| Tab | 2px ring | 0px | 100ms |
| Select | 2px ring | 2px | 100ms |
| Checkbox | 2px ring | 2px | 100ms |
| Radio | 2px ring | 2px | 100ms |
| Switch | 2px ring | 2px | 100ms |
| Icon button | 2px ring | 2px | 100ms |
| Dropdown trigger | 2px ring | 2px | 100ms |

### Focus Trap (Modals)

| Property | Specification |
|----------|---------------|
| First focusable | Auto-focused when modal opens |
| Last focusable | Shift+Tab from first goes to last |
| Tab cycle | Tab from last goes to first |
| Escape | Closes modal, focus returns to trigger |
| Dismiss | Click outside backdrop closes modal |
| Return focus | Focus returns to triggering element |

---

## Keyboard Navigation Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Focus ring appear | Ring fades in | 100ms | Ease-Out |
| Focus ring disappear | Ring fades out | 100ms | Ease-Out |
| Tab between items | Focus moves, ring appears on target | 100ms per ring transition |
| Smooth scroll to focus | Viewport scrolls to bring focused element into view | 200ms | Ease-Out |
| Command palette open | Overlay scales in | 200ms | Ease-Out |
| Shortcut hint overlay | Overlay appears | 200ms | Ease-Out |

---

## Shortcut Discovery

| Method | Behavior |
|--------|----------|
| Tooltip | Shortcut shown in element tooltip: "Save (Ctrl+S)" |
| Menu | Shortcut shown right-aligned in menu items |
| Help overlay | "?" opens keyboard shortcut reference overlay |
| Command palette | All actions listed with their shortcuts |
| Onboarding | Essential shortcuts shown during first use |

---

## Keyboard Accessibility Rules

1. All interactive elements have visible focus indicators
2. Focus indicators never use `outline: none` without replacement
3. Focus order matches visual layout
4. No keyboard traps — focus never gets stuck
5. Skip-to-content link available at top of every page
6. Keyboard users can complete all workflows without a mouse
7. Custom components implement standard keyboard patterns
8. Arrow key navigation uses `aria-orientation` for direction

---

*This Keyboard Interactions document defines all keyboard-based interactions. Refer to [Interaction-System.md](Interaction-System.md) for core interaction rules, [Gesture-System.md](Gesture-System.md) for gesture alternatives, and [Accessibility-Motion.md](Accessibility-Motion.md) for accessibility requirements.*
