# Component Hierarchy

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md)), DP-2 ([Architecture.md](../../03-Design-System/Architecture.md))

---

## Purpose

Defines the complete parent-child-sibling relationships for every component in the Enterprise Component Library. This hierarchy governs composition rules, dependency resolution, and inheritance behavior.

---

## Hierarchy Levels

### Level 0: Utilities (Infrastructure)

Foundation utilities that all components may depend upon.

```
Utilities/
├── Icon
├── Spinner
├── Portal
├── FocusTrap
├── SkipLink
├── VisuallyHidden
├── ClickOutside
├── ResizeObserver
├── KeyboardShortcut
└── (shared hooks, context providers)
```

### Level 1: Core Primitives

Atomic building blocks with no component dependencies.

```
Core/
├── Divider
├── Avatar
├── Badge
├── Chip
├── Tag
├── Tooltip
├── Container
└── Surface
```

### Level 2: Core Composites

Components that compose Level 0 and Level 1 elements.

```
Core/
├── Button (uses Icon, Spinner, Tooltip)
├── IconButton (uses Icon, Tooltip)
├── FloatingButton (uses Icon, Tooltip)
├── SplitButton (uses Button, Dropdown, Icon)
├── Card (uses Surface, Badge, Avatar, Tag, Chip)
├── Panel (uses Surface, Divider)
└── Popover (uses Portal, ClickOutside, FocusTrap)
```

### Level 3: Forms

Form controls that compose core primitives and composites.

```
Forms/
├── Input (uses Icon, Tooltip)
├── Password (uses Input, Icon)
├── Textarea (uses Tooltip)
├── Checkbox (uses VisuallyHidden)
├── Radio (uses VisuallyHidden)
├── Select (uses Icon, Popover, ClickOutside)
├── MultiSelect (uses Select, Chip, Badge)
├── DatePicker (uses Input, Icon, Popover, ClickOutside)
├── Switch (uses VisuallyHidden)
├── Slider (uses Tooltip)
├── FileInput (uses Button, Icon, Tag)
├── SearchInput (uses Input, Icon, Popover)
├── CommandInput (uses Input, Icon, Badge)
├── Stepper (uses Icon, Badge)
├── FormGroup (uses Divider, Tooltip)
└── Validation (shared validation engine)
```

### Level 4: Navigation

Navigation components that compose core and form elements.

```
Navigation/
├── Sidebar (uses Surface, SidebarGroup, SidebarItem, Divider, Avatar)
├── SidebarGroup (uses Icon, SidebarItem)
├── SidebarItem (uses Icon, Badge, Tooltip)
├── Topbar (uses Surface, IconButton, Avatar, Badge, Breadcrumb, SearchInput)
├── Breadcrumb (uses Icon, Tooltip)
├── Tabs (uses Badge)
├── CommandPalette (uses Input, Icon, Portal, FocusTrap, ClickOutside)
├── ContextMenu (uses Portal, ClickOutside, FocusTrap)
├── Dropdown (uses Portal, ClickOutside, Icon)
└── NavigationRail (uses Icon, Tooltip, Badge)
```

### Level 5: Dashboard

Dashboard components composing Level 1-4 elements.

```
Dashboard/
├── StatCard (uses Card, Icon, Tooltip)
├── MetricCard (uses Card, Icon, Badge)
├── ProgressCard (uses Card, ProgressBar, Icon)
├── ActivityCard (uses Card, Avatar, Icon, TimelineCard)
├── TimelineCard (uses Card, Icon, Badge)
├── RecommendationCard (uses Card, Icon, Badge, ConfidenceBadge)
├── InsightCard (uses Card, Icon, Badge, Tag)
├── QuickActionCard (uses Card, Icon, Tooltip)
└── SummaryCard (uses Card, Icon, StatCard, ProgressCard)
```

### Level 5: Data Display

Data components composing Level 1-4 elements.

```
Data/
├── Table (uses Pagination, Filters, Sorting, Checkbox, Tooltip)
├── DataGrid (uses Table, Filters, Sorting, Pagination, TreeView)
├── TreeView (uses Accordion, Icon, Tag)
├── List (uses Avatar, Badge, Tag, Icon)
├── Accordion (uses Icon)
├── Timeline (uses Icon, Badge, Card)
├── Pagination (uses IconButton, Tooltip)
├── Filters (uses Select, Input, Checkbox, Button, Tag)
└── Sorting (uses Icon, Button)
```

### Level 5: AI

AI components composing Level 1-4 elements.

```
AI/
├── AIMessage (uses Card, Avatar, Badge, Button, ConfidenceBadge, ContextBadge)
├── StreamingMessage (uses AIMessage, Spinner)
├── ThinkingCard (uses Card, Icon, Spinner)
├── ReasoningPanel (uses Panel, Divider, Icon, Badge)
├── ConfidenceBadge (uses Badge, Icon, Tooltip)
├── RecommendationPanel (uses Panel, RecommendationCard, Divider)
├── Conversation (uses AIMessage, StreamingMessage, PromptCard, Input)
├── MemoryIndicator (uses Badge, Icon, Tooltip)
├── ContextBadge (uses Badge, Icon, Tooltip)
└── PromptCard (uses Card, Icon, Button)
```

### Level 5: Documents

Document components composing Level 1-4 elements.

```
Documents/
├── UploadZone (uses Surface, Icon, Button, FileCard)
├── FileCard (uses Card, Icon, Badge, Tag, ProgressBar)
├── DocumentPreview (uses Card, Icon, Tooltip, Skeleton)
├── ImagePreview (uses Card, IconButton, Tooltip)
├── AttachmentCard (uses Card, Icon, Tag, Badge)
└── VersionHistory (uses Timeline, Card, Badge)
```

### Level 5: Feedback

Feedback components composing Level 1-4 elements.

```
Feedback/
├── Toast (uses Icon, Button, Portal, ClickOutside)
├── Alert (uses Icon, Button, ClickOutside)
├── Dialog (uses Portal, FocusTrap, Button, Icon, ClickOutside)
├── ConfirmationDialog (uses Dialog, Button)
├── WarningDialog (uses Dialog, Button)
├── ProgressBar (uses VisuallyHidden)
├── Skeleton (uses Card, Surface)
├── LoadingState (uses Spinner, Card, Icon)
├── EmptyState (uses Icon, Button, Card)
└── ErrorState (uses Icon, Button, Card, Alert)
```

### Level 6: Layout

Layout components that compose Level 1-5 elements.

```
Layout/
├── Grid (uses Container, Card)
├── Stack (uses Divider)
├── Workspace (uses Sidebar, Topbar, ContentArea, ResizablePanel)
├── ResizablePanel (uses Divider)
├── SplitView (uses ResizablePanel, ContentArea)
├── Section (uses Divider)
├── HeroContainer (uses Container, Button)
└── ContentArea (uses Container)
```

### Level 6: Charts

Chart components that compose Level 1-5 elements.

```
Charts/
├── LineChart (uses Tooltip, Skeleton, AnalyticsContainer)
├── AreaChart (uses Tooltip, Skeleton, AnalyticsContainer)
├── BarChart (uses Tooltip, Skeleton, AnalyticsContainer)
├── PieChart (uses Tooltip, Skeleton, AnalyticsContainer)
├── TimelineChart (uses Tooltip, Skeleton, AnalyticsContainer)
├── HeatMap (uses Tooltip, Skeleton, AnalyticsContainer)
└── AnalyticsContainer (uses Card, Filters, Select, Button, Icon)
```

---

## Hierarchy Diagram

```
Level 0  Utilities
    ↓
Level 1  Core Primitives
    ↓
Level 2  Core Composites
    ↓
Level 3  Forms
    ↓
Level 4  Navigation
    ↓
Level 5  Dashboard | Data | AI | Documents | Feedback
    ↓
Level 6  Layout | Charts
```

## Rules

1. Components may only depend on components at the same or lower level.
2. No circular dependencies.
3. Level 0 utilities should have zero internal dependencies.
4. Level 1 primitives should only depend on Level 0 utilities.
5. Higher levels compose lower levels — they do not reimplement them.
6. A component at level N may depend on multiple components at level N-1 (composition).
7. No component at level N may depend on a component at level N+1.
8. All components depend on Design Tokens (DP-1) for visual properties.
