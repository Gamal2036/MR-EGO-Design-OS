# Dependency Graph

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-2 ([Architecture.md](../../03-Design-System/Architecture.md))

---

## Purpose

Maps all inter-component dependencies to ensure no circular dependencies, no orphan components, and clear dependency resolution order.

---

## Dependency Categories

### Internal Dependencies

Dependencies on other components within the Enterprise Component Library.

### External Dependencies

Dependencies on Design Tokens, shared utilities, and external library interfaces.

### Optional Dependencies

Dependencies that are conditionally resolved (feature flags, module availability).

---

## Complete Dependency Matrix

### Level 0: Utilities

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Icon | None | Design Tokens | None |
| Spinner | Icon | Design Tokens | None |
| Portal | None | DOM API | None |
| FocusTrap | None | DOM API | Portal |
| SkipLink | None | None | None |
| VisuallyHidden | None | None | None |
| ClickOutside | None | DOM API | None |
| ResizeObserver | None | DOM API | None |
| KeyboardShortcut | None | None | None |

### Level 1: Core Primitives

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Divider | None | Design Tokens | None |
| Avatar | Icon | Design Tokens | Badge, Tooltip |
| Badge | None | Design Tokens | Tooltip |
| Chip | Icon | Design Tokens | Avatar, Tooltip |
| Tag | None | Design Tokens | Tooltip |
| Tooltip | Portal | Design Tokens | None |
| Container | None | Design Tokens | None |
| Surface | None | Design Tokens | None |

### Level 2: Core Composites

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Button | Icon, Spinner | Design Tokens | Tooltip, Badge |
| IconButton | Icon, Tooltip | Design Tokens | None |
| FloatingButton | Icon, Tooltip | Design Tokens | None |
| SplitButton | Button, Icon | Design Tokens | Dropdown |
| Card | Surface | Design Tokens | Badge, Avatar, Tag, Chip |
| Panel | Surface, Divider | Design Tokens | None |
| Popover | Portal, ClickOutside, FocusTrap | Design Tokens | None |

### Level 3: Forms

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Input | Icon, Tooltip | Design Tokens | Validation |
| Password | Input, Icon | Design Tokens | Validation |
| Textarea | Tooltip | Design Tokens | Validation |
| Checkbox | VisuallyHidden | Design Tokens | Validation |
| Radio | VisuallyHidden | Design Tokens | Validation |
| Select | Icon, Popover, ClickOutside | Design Tokens | Validation |
| MultiSelect | Select, Chip, Badge | Design Tokens | Validation |
| DatePicker | Input, Icon, Popover, ClickOutside | Design Tokens | Validation |
| Switch | VisuallyHidden | Design Tokens | None |
| Slider | Tooltip | Design Tokens | Validation |
| FileInput | Button, Icon, Tag | Design Tokens | Validation |
| SearchInput | Input, Icon, Popover | Design Tokens | Validation |
| CommandInput | Input, Icon, Badge | Design Tokens | Validation |
| Stepper | Icon, Badge | Design Tokens | Validation |
| FormGroup | Divider, Tooltip | Design Tokens | Validation |
| Validation | None | None | None |

### Level 4: Navigation

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Sidebar | Surface, SidebarGroup, SidebarItem, Divider, Avatar | Design Tokens | Badge |
| SidebarGroup | Icon, SidebarItem | Design Tokens | None |
| SidebarItem | Icon, Badge, Tooltip | Design Tokens | None |
| Topbar | Surface, IconButton, Avatar, Badge, Breadcrumb, SearchInput | Design Tokens | Dropdown |
| Breadcrumb | Icon, Tooltip | Design Tokens | Dropdown |
| Tabs | Badge | Design Tokens | None |
| CommandPalette | Input, Icon, Portal, FocusTrap, ClickOutside | Design Tokens | KeyboardShortcut |
| ContextMenu | Portal, ClickOutside, FocusTrap | Design Tokens | KeyboardShortcut |
| Dropdown | Portal, ClickOutside, Icon | Design Tokens | None |
| NavigationRail | Icon, Tooltip, Badge | Design Tokens | Tooltip |

### Level 5: Dashboard

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| StatCard | Card, Icon, Tooltip | Design Tokens | None |
| MetricCard | Card, Icon, Badge | Design Tokens | Tooltip |
| ProgressCard | Card, ProgressBar, Icon | Design Tokens | None |
| ActivityCard | Card, Avatar, Icon | Design Tokens | TimelineCard |
| TimelineCard | Card, Icon, Badge | Design Tokens | None |
| RecommendationCard | Card, Icon, Badge | Design Tokens | ConfidenceBadge |
| InsightCard | Card, Icon, Badge, Tag | Design Tokens | None |
| QuickActionCard | Card, Icon, Tooltip | Design Tokens | None |
| SummaryCard | Card, Icon, StatCard, ProgressCard | Design Tokens | None |

### Level 5: Data

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Table | Pagination, Filters, Sorting, Checkbox, Tooltip | Design Tokens | Row selection |
| DataGrid | Table, Filters, Sorting, Pagination | Design Tokens | TreeView |
| TreeView | Accordion, Icon, Tag | Design Tokens | None |
| List | Avatar, Badge, Tag, Icon | Design Tokens | Pagination |
| Accordion | Icon | Design Tokens | None |
| Timeline | Icon, Badge, Card | Design Tokens | None |
| Pagination | IconButton, Tooltip | Design Tokens | None |
| Filters | Select, Input, Checkbox, Button, Tag | Design Tokens | None |
| Sorting | Icon, Button | Design Tokens | None |

### Level 5: AI

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| AIMessage | Card, Avatar, Badge, Button | Design Tokens | ConfidenceBadge, ContextBadge |
| StreamingMessage | AIMessage, Spinner | Design Tokens | None |
| ThinkingCard | Card, Icon, Spinner | Design Tokens | None |
| ReasoningPanel | Panel, Divider, Icon, Badge | Design Tokens | None |
| ConfidenceBadge | Badge, Icon, Tooltip | Design Tokens | None |
| RecommendationPanel | Panel, RecommendationCard, Divider | Design Tokens | None |
| Conversation | AIMessage, StreamingMessage, PromptCard, Input | Design Tokens | None |
| MemoryIndicator | Badge, Icon, Tooltip | Design Tokens | None |
| ContextBadge | Badge, Icon, Tooltip | Design Tokens | None |
| PromptCard | Card, Icon, Button | Design Tokens | None |

### Level 5: Documents

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| UploadZone | Surface, Icon, Button, FileCard | Design Tokens | None |
| FileCard | Card, Icon, Badge, Tag, ProgressBar | Design Tokens | None |
| DocumentPreview | Card, Icon, Tooltip, Skeleton | Design Tokens | ImagePreview |
| ImagePreview | Card, IconButton, Tooltip | Design Tokens | None |
| AttachmentCard | Card, Icon, Tag, Badge | Design Tokens | FileCard |
| VersionHistory | Timeline, Card, Badge | Design Tokens | None |

### Level 5: Feedback

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Toast | Icon, Button, Portal, ClickOutside | Design Tokens | None |
| Alert | Icon, Button, ClickOutside | Design Tokens | None |
| Dialog | Portal, FocusTrap, Button, Icon, ClickOutside | Design Tokens | None |
| ConfirmationDialog | Dialog, Button | Design Tokens | None |
| WarningDialog | Dialog, Button | Design Tokens | None |
| ProgressBar | VisuallyHidden | Design Tokens | None |
| Skeleton | Surface | Design Tokens | None |
| LoadingState | Spinner, Icon | Design Tokens | Card |
| EmptyState | Icon, Button, Card | Design Tokens | None |
| ErrorState | Icon, Button, Card, Alert | Design Tokens | None |

### Level 6: Layout

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| Grid | Container | Design Tokens | Card |
| Stack | Divider | Design Tokens | None |
| Workspace | Sidebar, Topbar, ContentArea, ResizablePanel | Design Tokens | None |
| ResizablePanel | Divider | Design Tokens | None |
| SplitView | ResizablePanel, ContentArea | Design Tokens | None |
| Section | Divider | Design Tokens | None |
| HeroContainer | Container, Button | Design Tokens | None |
| ContentArea | Container | Design Tokens | None |

### Level 6: Charts

| Component | Internal Deps | External Deps | Optional Deps |
|-----------|--------------|---------------|---------------|
| LineChart | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| AreaChart | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| BarChart | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| PieChart | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| TimelineChart | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| HeatMap | Tooltip, Skeleton, AnalyticsContainer | Chart Library | None |
| AnalyticsContainer | Card, Filters, Select, Button, Icon | Design Tokens | None |

---

## Dependency Resolution Order

1. Utilities (Level 0)
2. Core Primitives (Level 1)
3. Core Composites (Level 2)
4. Forms (Level 3)
5. Navigation (Level 4)
6. Dashboard, Data, AI, Documents, Feedback (Level 5)
7. Layout, Charts (Level 6)

---

## Rules

1. **No circular dependencies** — If A depends on B, B must not depend on A (directly or transitively).
2. **Topological order** — Components must be implemented in dependency order (Level 0 first, Level 6 last).
3. **Lazy resolution** — Optional dependencies must be lazy-loaded or conditionally rendered.
4. **Stable interfaces** — All public APIs are stable once defined. Breaking changes require major version bump.
5. **External chart library** — Chart components depend on an external charting library selected during implementation.
6. **External date library** — DatePicker depends on an external date manipulation library.
