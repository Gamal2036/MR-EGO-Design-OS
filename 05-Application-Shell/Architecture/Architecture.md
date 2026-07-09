# Architecture — DP-4 Document Relationships

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md)), DP-3 ([Component-Hierarchy.md](../../04-Component-Library/Architecture/Component-Hierarchy.md))

---

## Purpose

Maps the relationships, dependencies, and authority chains between all DP-4 documents and their connections to DP-0 through DP-3.

---

## Document Dependency Map

```
DP-4 Document Tree
│
├── README.md                         ← DP-0, DP-1, DP-2, DP-3 READMEs
│
├── Architecture/
│   ├── Architecture.md               ← DP-0 Architecture-Overview.md
│   ├── Performance.md                ← DP-1 Motion-System.md, DP-2 Loading.md
│   ├── Security.md                   ← DP-0 Product-Constitution.md
│   └── Command-Palette.md            ← DP-3 CommandPalette.md
│
├── Workspace/
│   ├── Workspace-Philosophy.md       ← DP-0 Project/UX Constitutions, DP-1 Layout-Principles.md
│   ├── Workspace-Hierarchy.md        ← DP-3 Workspace.md, DP-1 Layout-Principles.md
│   ├── Content-Zones.md              ← DP-3 ContentArea.md, DP-3 Section.md
│   ├── AI-Zones.md                   ← DP-0 AI Philosophy, DP-3 AI Components, DP-3 AI-Workspace-Pattern.md
│   ├── Information-Zones.md          ← DP-3 Data components, DP-3 Dashboard components
│   ├── Focus-Zones.md                ← DP-0 UX Constitution Rules 2,3,5
│   ├── Resizable-Areas.md            ← DP-3 ResizablePanel.md
│   ├── Split-Workspace.md            ← DP-3 SplitView.md
│   ├── Dock-Areas.md                 ← DP-3 Dialog.md, DP-3 Panel.md
│   ├── Panel-Rules.md                ← DP-3 Panel.md, DP-3 Surface.md
│   ├── Safe-Areas.md                 ← DP-1 Responsive-System.md
│   └── Scrolling-Rules.md            ← DP-3 ContentArea.md
│
├── Navigation/
│   ├── Primary-Navigation.md         ← DP-3 Sidebar.md, DP-3 NavigationRail.md
│   ├── Secondary-Navigation.md       ← DP-3 Tabs.md, DP-3 SidebarGroup.md
│   ├── Context-Navigation.md         ← DP-3 Dropdown.md, DP-3 ContextMenu.md
│   ├── Breadcrumb-Strategy.md         ← DP-3 Breadcrumb.md
│   ├── Command-Navigation.md         ← DP-3 CommandPalette.md
│   └── Keyboard-Navigation.md        ← DP-0 UX Rule 7, DP-1 Accessibility.md
│
├── Header/
│   ├── Header-Architecture.md        ← DP-3 Topbar.md
│   ├── Global-Search.md              ← DP-3 SearchInput.md, DP-3 Search-Pattern.md
│   ├── Quick-Actions.md              ← DP-3 IconButton.md, DP-3 QuickActionCard.md
│   ├── Notifications.md              ← DP-3 Toast.md, DP-3 Badge.md
│   ├── Workspace-Switcher.md         ← DP-3 Dropdown.md, DP-3 Tabs.md
│   ├── AI-Shortcut.md                ← DP-3 Button.md, DP-3 FloatingButton.md
│   ├── Theme-Switch.md               ← DP-1 Color-System.md, DP-3 Switch.md
│   ├── Language-Switch.md            ← DP-3 Select.md, DP-3 Dropdown.md
│   └── User-Menu.md                  ← DP-3 Avatar.md, DP-3 Dropdown.md
│
├── Sidebar/
│   └── Sidebar-Architecture.md       ← DP-3 Sidebar.md, DP-3 SidebarGroup.md, DP-3 SidebarItem.md
│
├── Panels/
│   └── Panel-Architecture.md         ← DP-3 Panel.md, DP-3 ResizablePanel.md
│
├── Regions/
│   ├── Region-Architecture.md        ← DP-3 Workspace.md, DP-3 Section.md
│   ├── Primary-Region.md             ← DP-3 ContentArea.md
│   ├── Secondary-Region.md           ← DP-3 SplitView.md
│   ├── Context-Region.md             ← DP-3 Panel.md
│   ├── AI-Region.md                  ← DP-3 AI components, DP-3 AI-Workspace-Pattern.md
│   ├── Inspector-Region.md           ← DP-3 Panel.md, DP-3 Data components
│   ├── Preview-Region.md             ← DP-3 DocumentPreview.md, DP-3 ImagePreview.md
│   ├── Floating-Region.md            ← DP-3 Portal.md, DP-3 Dialog.md
│   └── Modal-Region.md               ← DP-3 Dialog.md, DP-3 Portal.md, DP-3 FocusTrap.md
│
├── Layouts/
│   ├── Dashboard-Layout.md           ← DP-3 Dashboard-Pattern.md, DP-3 Grid.md
│   ├── Workspace-Layout.md           ← DP-3 AI-Workspace-Pattern.md, DP-3 Workspace.md
│   ├── Documents-Layout.md           ← DP-3 Documents components, DP-3 Search-Pattern.md
│   ├── Jobs-Layout.md                ← DP-3 CRUD-Pattern.md, DP-3 Search-Pattern.md
│   ├── Analytics-Layout.md           ← DP-3 Analytics-Pattern.md, DP-3 Charts
│   ├── Settings-Layout.md            ← DP-3 Settings-Pattern.md, DP-3 Tabs.md
│   ├── Profile-Layout.md             ← DP-3 Profile-Pattern.md
│   ├── Wizard-Layout.md              ← DP-3 Wizard-Pattern.md
│   └── Authentication-Layout.md      ← DP-3 Authentication-Pattern.md
│
├── Responsive/
│   ├── Responsive-Architecture.md    ← DP-1 Responsive-System.md, DP-1 Grid-System.md
│   ├── Desktop.md                    ← DP-1 breakpoints
│   ├── Laptop.md                     ← DP-1 breakpoints
│   ├── Tablet.md                     ← DP-1 breakpoints
│   ├── Mobile.md                     ← DP-1 breakpoints
│   ├── Ultra-wide.md                 ← DP-1 breakpoints
│   ├── Foldables.md                  ← DP-1 Responsive-System.md
│   └── Future-Devices.md             ← DP-0 Expandable principle
│
├── Accessibility/
│   ├── Keyboard-Navigation.md        ← DP-0 UX Rule 7, DP-1 Accessibility.md
│   ├── Screen-Readers.md             ← DP-1 Accessibility.md
│   ├── Focus-Order.md                ← DP-1 Accessibility.md
│   ├── Contrast.md                   ← DP-1 Accessibility.md, DP-1 Color-System.md
│   ├── Reduced-Motion.md             ← DP-1 Motion-System.md, DP-1 Animation-Principles.md
│   └── Touch-Targets.md              ← DP-1 Accessibility.md
│
└── States/
    ├── Loading.md                    ← DP-2 Loading.md, DP-3 LoadingState.md, DP-3 Skeleton.md
    ├── Offline.md                    ← DP-0 Project Constitution
    ├── Error.md                      ← DP-2 Feedback.md, DP-3 ErrorState.md
    ├── Maintenance.md                ← DP-0 Future Expansion
    ├── Unauthorized.md               ← DP-0 Security
    ├── Read-Only.md                  ← DP-0 Data Sovereignty
    ├── Empty.md                      ← DP-2 EmptyStates.md, DP-3 EmptyState.md
    └── Success.md                    ← DP-0 UX Rule 18
```

---

## Cross-Phase Inheritance

| Phase | Inherited By DP-4 |
|-------|-------------------|
| DP-0 Constitution | All documents — governing philosophy, UX rules, design principles |
| DP-1 Design Language | Responsive breakpoints, motion tokens, accessibility specs, color semantics |
| DP-2 Design System | Component states, pattern definitions, token usage rules |
| DP-3 Component Library | Component contracts, composition rules, hierarchy, naming |

---

## Document Authority Within DP-4

| Priority | Document | Authority |
|----------|----------|-----------|
| 1 | Workspace-Philosophy.md | Foundational workspace beliefs — all other workspace docs derive from it |
| 2 | Region-Architecture.md | Region definitions govern layout composition |
| 3 | Panel-Rules.md | Panel behavior rules govern region behavior |
| 4 | Responsive-Architecture.md | Responsive rules govern all layout adaptation |
| 5 | Layout templates | Concrete templates are governed by all above |

In case of conflict within DP-4, higher priority documents prevail. No DP-4 document contradicts DP-0 through DP-3.

---

*This architecture document is the structural map of DP-4. Refer to [README.md](../README.md) for the full document index and [01-Constitution/Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md) for the cross-phase architecture.*
