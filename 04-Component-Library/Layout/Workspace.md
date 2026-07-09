# Workspace

## Purpose
Provides the top-level page shell that composes Sidebar, Topbar, and ContentArea into a functional workspace layout.

## Responsibilities
- Orchestrate the three main chrome regions: Sidebar, Topbar, ContentArea
- Manage sidebar collapsed/expanded state
- Handle responsive sidebar collapse (drawer mode on mobile)
- Overscroll behavior prevention on body

## Composition
```
Workspace
├── Topbar
│   ├── Logo / Brand
│   ├── Navigation (condensed)
│   └── User Menu / Profile
├── Sidebar
│   ├── Sidebar.Nav (link list)
│   │   ├── Sidebar.NavItem
│   │   └── Sidebar.NavGroup (collapsible)
│   └── Sidebar.Footer
└── ContentArea
    └── (page content — Grid, Stack, Section, etc.)
```

## Hierarchy
- Workspace is the single top-level layout component for every full-page route.
- Workspace has exactly one Topbar, one Sidebar, and one ContentArea.
- ContentArea contains all page-specific components.

## Props Contract (TypeScript)
```typescript
interface WorkspaceProps {
  variant?: 'full' | 'with-sidebar' | 'with-context-panel'; // default 'with-sidebar'
  sidebarCollapsed?: boolean;            // controlled collapsed state
  onSidebarToggle?: () => void;          // toggle callback
  defaultSidebarCollapsed?: boolean;     // default false
  sidebarWidth?: 'sm' | 'md' | 'lg';    // default 'md' (240px)
  topbarContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  contextPanelContent?: React.ReactNode; // for 'with-context-panel' variant
  children: React.ReactNode;             // ContentArea content
  className?: string;
}

interface WorkspaceContextValue {
  sidebarCollapsed: boolean;
  sidebarWidth: number;
  isMobile: boolean;
  toggleSidebar: () => void;
}
```

## Variants
| Variant | Sidebar | Context Panel | Use Case |
|---------|---------|--------------|----------|
| `full` | Hidden | Hidden | Login, settings full-screen |
| `with-sidebar` | Visible | Hidden | Main app pages |
| `with-context-panel` | Visible | Visible | Detail pages (e.g., dashboard + inspector) |

## States
| State | Description |
|-------|-------------|
| Sidebar expanded | Default on desktop. |
| Sidebar collapsed | Icons only (64px). Tooltip on hover. |
| Mobile drawer | Sidebar renders as an overlay drawer. |
| Transitioning | CSS transition on width change (250ms). |

## Accessibility
- Sidebar uses `role="navigation"` with `aria-label="Primary"`.
- Sidebar toggle button has `aria-expanded` and `aria-controls`.
- Topbar banner uses `role="banner"`.
- Main content uses `<main>` landmark.
- When sidebar is a mobile drawer, `aria-modal="true"` and focus is trapped inside.
- Skip link renders before Workspace and targets `#main-content`.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | Standard sidebar (collapsible via toggle) |
| 768–1023px | Sidebar collapses automatically to icon-only |
| <768px | Sidebar hidden; hamburger toggle opens as overlay drawer with backdrop |
| All | Sidebar width scale: `sm`=200px, `md`=240px, `lg`=280px |

## Animation Rules
- Sidebar width transition: 250ms ease-in-out.
- Mobile drawer: slide-in from left 300ms ease-out; backdrop fade 200ms.
- ContentArea margin adjusts synchronously with sidebar.

## Future Expansion
- Multi-sidebar support (left + right).
- Resizable sidebar width via drag handle.
- Topbar auto-hide on scroll.
- Persist sidebar state per route.

## Dependencies
- `Sidebar` component.
- `Topbar` component.
- `ContentArea` component.
- `Portal` component (mobile drawer).
- `FocusTrap` component (mobile drawer).
- `ResizeObserver` hook (responsive breakpoints).

## Related Components
- **Sidebar** — inner navigation chrome.
- **Topbar** — top chrome bar.
- **ContentArea** — main content wrapper.
- **ResizablePanel** — used if sidebar drag-resize is added.
- **SkipLink** — renders before Workspace.

## Anti-patterns
- ❌ Do not render Workspace inside another Workspace.
- ❌ Do not render Sidebar or Topbar outside of Workspace.
- ❌ Do not override Workspace z-index values.
- ❌ Do not place scrollable containers outside ContentArea.

## Performance Notes
- Sidebar visibility changes should use CSS `visibility` + `pointer-events` for collapsed state to avoid unmounting.
- Mobile drawer children are mounted only when open.
- Workspace context values should be memoized to prevent unnecessary re-renders of all children.
