# VersionHistory

## Purpose
A timeline-style document version browser that displays each saved version with metadata (number, date, author, change summary) and provides actions to download, restore, or compare versions.

## Responsibilities
- Display a chronological (descending) timeline of document versions
- Render version number, date, author avatar/name, and user-written change summary for each entry
- Provide download action per version
- Provide restore/rollback action per version (with confirmation)
- Provide a "Compare" action that selects two versions for diff view
- Indicate the current (latest) version with a visual badge
- Highlight the currently active/restored version
- Support infinite scroll or pagination for documents with many versions

## Composition
```
VersionHistory
├── VersionHeader (title + version count + optional "Compare" mode toggle)
├── VersionList (scrollable)
│   └── VersionEntry (×n)
│       ├── TimelineDot (with branch/connector line)
│       ├── VersionBadge ("v{n}")
│       ├── VersionDate
│       ├── AuthorAvatar + AuthorName
│       ├── ChangeSummary (optional user note)
│       ├── CurrentBadge (conditional, "Current")
│       ├── Actions
│       │   ├── DownloadButton
│       │   ├── RestoreButton
│       │   └── CompareCheckbox (visible in compare mode)
│       └── ExpandButton (to show full change summary)
├── CompareBar (conditional, floating footer when 2 versions selected)
│   └── CompareButton ("Compare v{n} vs v{m}")
└── EmptyState (when no versions exist yet)
```

## Hierarchy
```
Pages → DocumentViewer → DocumentSettings / Sidebar → VersionHistory
```

## Props Contract

```typescript
interface VersionHistoryProps {
  /** Array of version entries */
  versions: VersionEntry[];
  /** Currently active version ID */
  activeVersionId?: string;
  /** Callback to download a specific version */
  onDownload?: (version: VersionEntry) => void;
  /** Callback to restore a previous version */
  onRestore?: (version: VersionEntry) => void;
  /** Callback when user selects 2 versions to compare */
  onCompare?: (versionA: VersionEntry, versionB: VersionEntry) => void;
  /** Loading state for version list */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Whether more versions can be loaded */
  hasMore?: boolean;
  /** Callback to load more versions (infinite scroll) */
  onLoadMore?: () => void;
  /** Disable restore action */
  restoreDisabled?: boolean;
  /** Empty state title/description overrides */
  emptyLabel?: string;
  emptyDescription?: string;
  className?: string;
}

interface VersionEntry {
  id: string;
  /** Version number displayed as "v{n}" */
  versionNumber: number;
  /** Author user info */
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  /** ISO timestamp of when the version was created */
  createdAt: string;
  /** Short user-written summary of changes */
  changeSummary?: string;
  /** Full change notes (expanded view) */
  changeNotes?: string;
  /** Whether this is the current/latest version */
  isCurrent?: boolean;
  /** File size of this version */
  fileSize?: number;
  /** Whether this version is being restored right now */
  isRestoring?: boolean;
}
```

## Variants
| Variant | Description |
|---|---|
| Timeline | Vertical timeline with dots and connector lines, most recent first |
| Compact | Condensed list without timeline graphics, for narrow sidebars |
| Compare-mode | Checkboxes visible on each entry; floating "Compare" bar at bottom |

## States
| State | Visual |
|---|---|
| Loaded | Timeline with all version entries |
| Loading | Skeleton rows (3–5) with shimmer animation |
| Error | ErrorState component with retry button |
| Empty | EmptyState: "No version history" with illustration |
| Restoring | Specific entry shows spinner on restore button, "Restoring..." text |
| Compare-mode | Checkboxes shown, compare bar slides up from bottom |

## Accessibility
- `role="list"` on the version list container
- Each version entry: `role="listitem"` with `aria-label="Version {n}, {date}, by {author}"`
- Current badge: `aria-label="Current version"`
- Restore button: `aria-label="Restore version {n}"`
- Download button: `aria-label="Download version {n}"`
- Compare checkboxes: labelled with "Select version {n} for comparison"
- Infinite scroll region uses `aria-live="polite"` when new items load
- Timeline connector lines: `aria-hidden="true"` (decorative)
- Keyboard: `Tab` navigates entry actions; `Enter` triggers selected action; arrow keys scroll list

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Full timeline with author avatar, change summary preview, action buttons visible |
| < 768px | Compact variant — avatar hidden (name only), change summary truncated to 1 line, actions in overflow menu (⋯); timeline dots shrink; infinite scroll uses scroll position instead of intersection observer |

## Animation Rules
- New version entry appearing: slide-in from bottom + fade, 250ms ease-out
- Restore button → spinner transition: 150ms
- Compare bar slide-up: translateY(100% → 0), 250ms ease-out
- Timeline dot: active version dot has a subtle pulse animation (1.5s interval)
- Entry expand (show full change notes): height transition 200ms ease-out
- Entry removal (hypothetical): slide-out to right 200ms, opacity fade

## Future Expansion
- Side-by-side diff view when "Compare" is pressed
- "View at this version" preview toggle
- Version labels / tags (e.g., "Draft", "Review", "Final")
- Auto-generated change summaries via LLM diff analysis
- Branching version tree (for collaborative editing)
- Version pruning / bulk delete (admin action)
- Version size graph / storage usage display

## Dependencies
- `Skeleton` (loading entries)
- `EmptyState` (no versions)
- `ErrorState` (load error)
- `Avatar` (author photo)
- `Button` / `IconButton` (actions)
- `Checkbox` (compare mode)
- `Badge` (version number, current badge)
- `Tooltip` (truncated summaries)

## Related Components
- `DocumentPreview` — preview a specific version
- `FileCard` — shown in metadata sidebar for selected version
- `ConfirmationDialog` — confirm restore action
- `EmptyState` — used when no versions exist
- `ErrorState` — used on fetch failure

## Anti-patterns
- ❌ Showing version history inline with document editing — it belongs in a sidebar or dedicated panel
- ❌ Allowing restore without confirmation — always prompt with ConfirmationDialog
- ❌ Loading all versions at once (thousands) — always paginate or virtualise
- ❌ Using generic timestamps without relative formatting ("2 hours ago" is preferred alongside absolute date)
- ❌ Making the restore button prominent for non-admin users — show based on permissions

## Performance Notes
- Virtualise the version list if > 50 entries (every row has consistent height)
- Author avatars: lazy load with `loading="lazy"`
- Change summary expansion: use a controlled expand/collapse — don't render full notes until expanded
- Infinite scroll: use IntersectionObserver (polyfill for Safari < 12.2)
- Memoise version entry render — entries are static once loaded; only `isRestoring` state causes re-render
- Avoid re-rendering the entire list when compare mode toggles — only show/hide checkboxes via CSS
