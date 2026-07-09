# Accordion

## Purpose
Present collapsible content sections that allow users to expand and collapse panels to show or hide content. Optimized for progressive disclosure of related information.

## Responsibilities
- Group collapsible panels under a shared container
- Support single (one-at-a-time) and multiple (independent) expansion modes
- Render expand/collapse icon on left or right of header
- Manage exclusive expansion state in single mode
- Animate panel open/close transitions
- Emit expand and collapse events with panel identifier
- Maintain scroll position when panels expand

## Composition
```
Accordion
├── AccordionPanel (×N)
│   ├── AccordionHeader
│   │   ├── ExpandCollapseIcon
│   │   ├── PanelTitle
│   │   ├── PanelSubtitle (optional)
│   │   └── HeaderAction (optional, e.g. delete button)
│   └── AccordionContent (animated)
│       └── (arbitrary children)
└── AccordionEmptyState (when no panels)
```

## Hierarchy
- **Parent:** Form sections, FAQ pages, settings panels, documentation
- **Children:** Any content (Text, Form, List, Table, Image)

## Props Contract (TypeScript)

```typescript
interface AccordionProps {
  panels: AccordionPanelData[];
  variant?: 'single' | 'multiple';
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  iconPosition?: 'left' | 'right';
  iconIndicator?: 'chevron' | 'plus-minus' | 'arrow';
  compact?: boolean;
  bordered?: boolean;
  ghost?: boolean;
  expandOnHeaderClick?: boolean;
  allowToggle?: boolean; // in single mode, allow collapsing the open panel
  lazyRender?: boolean; // render content only when panel is expanded
  classNames?: Partial<Record<'accordion' | 'panel' | 'header' | 'content', string>>;
}

interface AccordionPanelData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
  headerAction?: React.ReactNode;
  badge?: string | number;
  icon?: string;
}

interface AccordionPanelProps {
  panel: AccordionPanelData;
  expanded: boolean;
  iconPosition: 'left' | 'right';
  iconIndicator: 'chevron' | 'plus-minus' | 'arrow';
  onToggle: () => void;
  compact: boolean;
  lazyRender: boolean;
  animated: boolean;
}
```

## Variants

| Variant | Description |
|---------|-------------|
| **single** | Only one panel open at a time; opening a panel collapses the previously open one |
| **multiple** | Multiple panels can be open independently; each panel toggles individually |

## Visual Styles

| Style | Description |
|-------|-------------|
| **bordered** | Each panel wrapped in a card-like border with divider between panels |
| **ghost** | No border or background; minimal with only header text and icon |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Collapsed | Header visible, content hidden, arrow pointing down/right | Click header to expand |
| Expanded | Header visible, content visible, arrow pointing up/down | Content area at full height |
| Hover (header) | Background shift (neutral-50) | Cursor pointer |
| Focused (header) | Focus ring around header | Keyboard navigation |
| Disabled (panel) | 50% opacity | Header not clickable |
| Expanding | Content height animating from 0 to auto | Transition in progress |
| Collapsing | Content height animating from auto to 0 | Transition in progress |

## Accessibility

- Each panel header uses `<button>` with `aria-expanded="true|false"`
- `aria-controls` on header button points to content panel id
- `aria-labelledby` on content panel points back to header button id
- `role="region"` on content panels with `aria-labelledby` for context
- Accordion container has `role="region"` or is labelled via `aria-label`
- Keyboard: Tab to focus header, Enter/Space to toggle, Arrow keys do not navigate by default (defer to page scroll)
- Screen reader announces "Expanded" / "Collapsed" state after toggle
- Focus remains on header after toggle; does not shift to content

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >768px | Default layout with icon position as configured |
| <768px | Force `compact` mode; reduce padding from 16px to 12px |
| <480px | Icon position forced to left; full-width tap targets; increase header tap area to 48px minimum |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Content expand | 250ms | ease-out | Expand |
| Content collapse | 200ms | ease-in | Collapse |
| Icon rotation | 200ms | ease | Toggle |
| Panel border highlight | 150ms | ease | Focus/hover |

## Future Expansion

- Nested accordions (accordion within accordion panel content)
- Programmatic expand/collapse all
- Scroll-into-view when panel opens (for long accordions)
- Drag-to-reorder panels
- Accordion wizard mode (single panel open, "Next" button navigates forward)
- Persistent expand state via URL hash or localStorage

## Dependencies

- React 18+
- `@mrego/icons` (chevrons, plus, minus)
- `@mrego/theme`
- `react-spring` or `framer-motion` (for height animation)

## Related Components

| Component | Relationship |
|-----------|-------------|
| TreeView | Hierarchical content — accordion is single-level; TreeView is recursive |
| List | Non-expandable vertical list alternative |
| Tabs | Alternative progressive disclosure — tabs show one panel at a time in a horizontal layout |
| Collapse | Standalone collapsible panel without the accordion container |
| Stepper | Wizard-like sequential navigation, often uses accordion pattern |

## Anti-patterns

- **Animating auto height:** CSS `height: auto` won't animate — use `max-height` + overflow or JS-based height measurement
- **Nested accordions without clear hierarchy:** Limit to one level of nesting; deeper hierarchies should use TreeView
- **Long content in single mode:** If panels contain very long content, single mode may cause excessive scrolling — consider tabs or multiple mode
- **Missing `allowToggle` in single mode:** Users expect to be able to collapse the single open panel; only lock it if semantically required
- **Expanding on double-click:** Use single-click for expand/collapse as users expect
- **Icons without text labels:** Expand/collapse icon must have `aria-label` for screen readers

## Performance Notes

- Use `lazyRender` to defer rendering of panel content until first expand
- For large content, avoid mounting/unmounting on toggle — use `display` or `visibility` to preserve DOM
- Height animation should use `transform` + `will-change` where possible to avoid layout thrashing
- In `multiple` mode with many open panels, consolidate state changes to a single batch update
- If accordion contains heavy components (e.g., DataGrid), defer rendering until the panel is opened
- Avoid re-rendering all panels when one panel toggles — each Panel should be independently memoized
