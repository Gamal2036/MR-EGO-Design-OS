# Folder Structure

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-2 ([Architecture.md](../../03-Design-System/Architecture.md))

---

## Purpose

Defines the implementation folder structure for the Enterprise Component Library when it is realized in the Frontend codebase.

---

## Repository Structure

```
mr-ego-components/
├── package.json
├── tsconfig.json
├── README.md
├── CHANGELOG.md
│
├── src/
│   ├── index.ts                          # Public API barrel exports
│   ├── types/
│   │   ├── index.ts                      # Shared type definitions
│   │   ├── components.ts                 # Component-specific types
│   │   └── tokens.ts                     # Design Token types
│   │
│   ├── tokens/
│   │   ├── index.ts                      # Token export barrel
│   │   ├── colors.ts                     # Color token values
│   │   ├── typography.ts                 # Typography token values
│   │   ├── spacing.ts                    # Spacing token values
│   │   ├── elevation.ts                  # Elevation token values
│   │   ├── motion.ts                     # Motion token values
│   │   ├── radius.ts                     # Border radius values
│   │   ├── shadows.ts                    # Shadow values
│   │   ├── glass.ts                      # Glass effect values
│   │   └── themes/
│   │       ├── light.ts                  # Light theme token values
│   │       └── dark.ts                   # Dark theme token values
│   │
│   ├── utilities/
│   │   ├── Icon/
│   │   │   ├── Icon.tsx
│   │   │   ├── Icon.types.ts
│   │   │   ├── Icon.styles.ts
│   │   │   └── Icon.test.tsx
│   │   ├── Spinner/
│   │   ├── Portal/
│   │   ├── FocusTrap/
│   │   ├── SkipLink/
│   │   ├── VisuallyHidden/
│   │   ├── ClickOutside/
│   │   ├── ResizeObserver/
│   │   └── KeyboardShortcut/
│   │
│   ├── core/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── variants/
│   │   │   │   ├── PrimaryButton.tsx
│   │   │   │   ├── SecondaryButton.tsx
│   │   │   │   ├── DangerButton.tsx
│   │   │   │   ├── OutlineButton.tsx
│   │   │   │   ├── GhostButton.tsx
│   │   │   │   └── AIActionButton.tsx
│   │   │   └── __tests__/
│   │   │       ├── Button.unit.test.tsx
│   │   │       ├── Button.accessibility.test.tsx
│   │   │       └── Button.interaction.test.tsx
│   │   ├── IconButton/
│   │   ├── FloatingButton/
│   │   ├── SplitButton/
│   │   ├── Card/
│   │   ├── Surface/
│   │   ├── Panel/
│   │   ├── Container/
│   │   ├── Divider/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Chip/
│   │   ├── Tag/
│   │   ├── Tooltip/
│   │   └── Popover/
│   │
│   ├── forms/
│   │   ├── Input/
│   │   ├── Password/
│   │   ├── Textarea/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Select/
│   │   ├── MultiSelect/
│   │   ├── DatePicker/
│   │   ├── Switch/
│   │   ├── Slider/
│   │   ├── FileInput/
│   │   ├── SearchInput/
│   │   ├── CommandInput/
│   │   ├── Stepper/
│   │   ├── FormGroup/
│   │   └── Validation/
│   │
│   ├── navigation/
│   │   ├── Sidebar/
│   │   ├── SidebarGroup/
│   │   ├── SidebarItem/
│   │   ├── Topbar/
│   │   ├── Breadcrumb/
│   │   ├── Tabs/
│   │   ├── CommandPalette/
│   │   ├── ContextMenu/
│   │   ├── Dropdown/
│   │   └── NavigationRail/
│   │
│   ├── dashboard/
│   │   ├── StatCard/
│   │   ├── MetricCard/
│   │   ├── ProgressCard/
│   │   ├── ActivityCard/
│   │   ├── TimelineCard/
│   │   ├── RecommendationCard/
│   │   ├── InsightCard/
│   │   ├── QuickActionCard/
│   │   └── SummaryCard/
│   │
│   ├── ai/
│   │   ├── AIMessage/
│   │   ├── StreamingMessage/
│   │   ├── ThinkingCard/
│   │   ├── ReasoningPanel/
│   │   ├── ConfidenceBadge/
│   │   ├── RecommendationPanel/
│   │   ├── Conversation/
│   │   ├── MemoryIndicator/
│   │   ├── ContextBadge/
│   │   └── PromptCard/
│   │
│   ├── documents/
│   │   ├── UploadZone/
│   │   ├── FileCard/
│   │   ├── DocumentPreview/
│   │   ├── ImagePreview/
│   │   ├── AttachmentCard/
│   │   └── VersionHistory/
│   │
│   ├── feedback/
│   │   ├── Toast/
│   │   ├── Alert/
│   │   ├── Dialog/
│   │   ├── ConfirmationDialog/
│   │   ├── WarningDialog/
│   │   ├── ProgressBar/
│   │   ├── Skeleton/
│   │   ├── LoadingState/
│   │   ├── EmptyState/
│   │   └── ErrorState/
│   │
│   ├── data/
│   │   ├── Table/
│   │   ├── DataGrid/
│   │   ├── TreeView/
│   │   ├── List/
│   │   ├── Accordion/
│   │   ├── Timeline/
│   │   ├── Pagination/
│   │   ├── Filters/
│   │   └── Sorting/
│   │
│   ├── layout/
│   │   ├── Grid/
│   │   ├── Stack/
│   │   ├── Workspace/
│   │   ├── ResizablePanel/
│   │   ├── SplitView/
│   │   ├── Section/
│   │   ├── HeroContainer/
│   │   └── ContentArea/
│   │
│   ├── charts/
│   │   ├── LineChart/
│   │   ├── AreaChart/
│   │   ├── BarChart/
│   │   ├── PieChart/
│   │   ├── TimelineChart/
│   │   ├── HeatMap/
│   │   └── AnalyticsContainer/
│   │
│   ├── providers/
│   │   ├── ThemeProvider.tsx              # Theme context provider
│   │   ├── LocaleProvider.tsx             # Internationalization context
│   │   ├── DirectionProvider.tsx          # RTL/LTR context
│   │   └── ToastProvider.tsx              # Toast notification context
│   │
│   └── hooks/
│       ├── useBreakpoint.ts               # Responsive breakpoint hook
│       ├── useClickOutside.ts             # Outside click detection
│       ├── useFocusTrap.ts                # Focus trapping
│       ├── useKeyboardShortcut.ts         # Keyboard binding
│       ├── useMediaQuery.ts               # Media query hook
│       ├── useReducedMotion.ts            # Motion preference hook
│       ├── useTheme.ts                    # Theme access hook
│       └── useLocale.ts                   # Locale access hook
│
├── stories/                               # Storybook stories
│   ├── core/
│   │   ├── Button.stories.tsx
│   │   └── Card.stories.tsx
│   ├── forms/
│   ├── navigation/
│   ├── dashboard/
│   ├── ai/
│   ├── feedback/
│   ├── data/
│   └── layout/
│
├── __tests__/
│   ├── setup.ts                           # Test configuration
│   ├── helpers.ts                         # Test utilities
│   └── accessibility/
│       └── axe-setup.ts                   # aXe accessibility test setup
│
└── dist/                                  # Build output
    ├── esm/                               # ES Module build
    ├── cjs/                               # CommonJS build
    └── types/                             # TypeScript declarations
```

## Per-Component Folder Structure

Every component folder follows this structure:

```
ComponentName/
├── ComponentName.tsx           # Main component implementation
├── ComponentName.types.ts      # TypeScript type definitions
├── ComponentName.styles.ts     # Styled components or CSS module imports
├── ComponentName.test.tsx      # Unit tests
├── ComponentName.stories.tsx   # Storybook stories
├── variants/                   # Variant implementations (if applicable)
│   ├── VariantOne.tsx
│   └── VariantTwo.tsx
└── __tests__/
    ├── ComponentName.unit.test.tsx
    ├── ComponentName.accessibility.test.tsx
    └── ComponentName.interaction.test.tsx
```

## Shared Files

| File | Purpose |
|------|---------|
| `src/types/components.ts` | Shared component type definitions |
| `src/types/tokens.ts` | Design Token type definitions |
| `src/index.ts` | Public API barrel export |
| `src/providers/ThemeProvider.tsx` | Theme context provider |
| `src/hooks/` | Shared React hooks |

---

## Rules

1. Every component must have exactly one folder under its category.
2. Component folder name must match component name exactly.
3. Every component folder must have a `.tsx`, `.types.ts`, `.styles.ts`, and `.test.tsx` file.
4. Storybook stories go in the global `stories/` directory for cross-component stories.
5. Tests go in `__tests__/` subfolder for component-specific tests.
6. Variants go in a `variants/` subfolder.
7. No component may import directly from another component's variant folder.
8. All public exports go through `src/index.ts`.
