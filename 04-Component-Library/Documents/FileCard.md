# FileCard

## Purpose
Display a single file's metadata (name, type, size, modified date) with contextual actions and upload progress. Serves as the primary file summary surface across the Documents domain.

## Responsibilities
- Render file type icon based on extension/MIME (pdf, docx, xlsx, image, video, audio, archive, generic)
- Display file name, size (human-readable), and last modified date
- Provide action buttons: download, delete, share
- Show real-time upload progress bar when file is being uploaded
- Indicate file state (queued, uploading, complete, error)
- Truncate long file names with ellipsis
- Support single-click action triggers via callbacks

## Composition
```
FileCard
├── FileIcon (by type)
├── FileInfo
│   ├── FileName (truncated)
│   ├── FileSize
│   └── ModifiedDate
├── ProgressBar (conditional, during upload)
├── StatusIcon (conditional: queued/uploading/complete/error)
└── ActionBar
    ├── DownloadButton
    ├── ShareButton
    └── DeleteButton
```

## Hierarchy
```
Pages → Form / DocumentList
       → UploadZone → FileCard
       → DocumentPreview → FileCard (metadata sidebar)
       → AttachmentCard (compact variant via shared sub-components)
```

## Props Contract

```typescript
interface FileCardProps {
  /** File object or serialised file metadata */
  file: FileDescriptor;
  /** Current upload/processing state */
  state?: 'queued' | 'uploading' | 'complete' | 'error';
  /** Upload progress 0–100 (used when state === 'uploading') */
  progress?: number;
  /** Error message to show (used when state === 'error') */
  errorMessage?: string;
  /** Callbacks */
  onDownload?: (file: FileDescriptor) => void;
  onDelete?: (file: FileDescriptor) => void;
  onShare?: (file: FileDescriptor) => void;
  /** Whether download action is available */
  downloadable?: boolean;
  /** Whether share action is available */
  shareable?: boolean;
  /** Whether delete action is available */
  deletable?: boolean;
  /** Disable all interactions */
  disabled?: boolean;
  /** Compact layout for attachment use-cases */
  compact?: boolean;
  /** Show detailed metadata (dates, etc.) */
  showDetails?: boolean;
  className?: string;
}

interface FileDescriptor {
  id: string;
  name: string;
  /** MIME type */
  type: string;
  /** Size in bytes */
  size: number;
  /** Last modified timestamp (ISO string or Unix ms) */
  modifiedAt?: string | number;
  /** Upload completion timestamp */
  uploadedAt?: string | number;
  /** Signed URL or blob URL */
  url?: string;
  /** Thumbnail URL (for images) */
  thumbnailUrl?: string;
  /** Optional path for directory uploads */
  path?: string;
}

type FileType =
  | 'pdf'
  | 'docx' | 'doc'
  | 'xlsx' | 'xls'
  | 'pptx' | 'ppt'
  | 'image'
  | 'video'
  | 'audio'
  | 'archive'
  | 'code'
  | 'generic';
```

## Variants
| Variant | Description |
|---|---|
| Standard | Full details: icon, name, size, modified date, action bar |
| Compact | Condensed layout, no date, smaller actions — used in lists |
| Upload | With progress bar, queued/uploading states visible |
| ReadOnly | No action buttons, informational display only |
| Error | Red-tinted border, error icon, retry action replaces download |

## States
| State | Visual |
|---|---|
| Default | Standard card with file info + action buttons |
| Queued | Grey tint, clock/pending icon, no progress bar |
| Uploading | Progress bar at current %, pulsing status icon |
| Complete | Green checkmark, brief success animation (1.5 s) |
| Error | Red border, error icon, error message shown below name |
| Disabled | Reduced opacity, actions hidden or disabled |
| Hover | Subtle background lift + shadow elevation (+2px y-translate), 150ms |
| Focus | Visible focus ring around the card |
| Active | Pressed state on action buttons |

## Accessibility
- `role="group"` with `aria-label` on card
- `aria-label` on each action button describing the action + filename
- Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- State changes announced via `aria-live="polite"`
- Tab order: card → download → share → delete
- Keyboard: Enter activates card's primary action; Tab navigates actions
- Truncated file name revealed via `title` attribute or tooltip

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Horizontal layout: icon | info | progress | actions — full action bar visible |
| < 768px | Vertical stack: icon + info on one row, actions on next row; share action moves to overflow menu if 3+ actions; progress bar full width below info |
| Compact variant | Same at all breakpoints — 48px height fixed |

## Animation Rules
- Progress bar width: smooth CSS `transition: width 300ms ease-out`
- State change: background color cross-fade 200ms
- Error state: border-color transition 200ms, icon fade-in 150ms
- Card dismiss/slide-out: 200ms ease-in, translateX(-100%) + opacity 0
- Action button hover → active: 100ms
- File type icon: no animation (static)

## Future Expansion
- File thumbnail preview (small rendered preview for images/PDFs)
- Inline rename action
- Drag-and-drop reorder handle within file lists
- File version badge (if file is a new version of an existing document)
- Expiration badge for shared files with TTL
- Virus scan status indicator

## Dependencies
- `Icon` (file-type icons, action icons)
- `ProgressBar` (upload progress)
- `Tooltip` (truncated name, action descriptions)
- `Button` (action buttons)
- `Menu` (overflow menu on mobile)

## Related Components
- `UploadZone` — parent that queues files and creates FileCards
- `AttachmentCard` — compact read-only variant for messages
- `VersionHistory` — shows FileCards per version in a timeline
- `DocumentPreview` — sidebar can include a FileCard for the active document

## Anti-patterns
- ❌ Showing progress bar for already-complete files
- ❌ Placing FileCard inline within running text — it is a block-level card
- ❌ Removing the delete button for readonly users — conditionally disable it instead
- ❌ Truncating file extension — always show the full extension (e.g., "report...pdf" not "report...")
- ❌ Using human-readable size that rounds to 0 (e.g., showing "0 B" for a 50-byte file)
- ❌ Allowing multiple simultaneous upload progress bars to fight for layout space

## Performance Notes
- File type icon resolution: use a memoised lookup map, no runtime switch statements
- Progress bar updates: cap re-renders to 30 fps (throttle `onProgress` callback)
- For lists > 20 FileCards, virtualise the list (react-window / similar)
- FileCard content is static after upload — memoise or freeze the component
- `FileDescriptor` objects should be serialisable (no closures, no DOM refs) for state management
