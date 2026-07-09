# UploadZone

## Purpose
A drag-and-drop file upload target that allows users to select files via browser dialog or drag-and-drop. Provides clear visual feedback during all phases of the upload lifecycle and validates files against type/size constraints.

## Responsibilities
- Accept file selection via drag-and-drop from the OS or other browser tabs
- Accept file selection via click-to-browse file dialog
- Display real-time visual drop indicator when files are dragged over
- Support multiple file selection and queued uploading
- Validate files against configured type and size restrictions
- Surface validation errors per-file and globally
- Report upload progress to the parent via callbacks
- Prevent browser default drag-and-drop behavior on the page

## Composition
```
UploadZone
├── DropOverlay (conditional, visible on drag-over)
│   ├── UploadIcon (animated)
│   └── DropMessage
├── BrowseButton
├── FilePreviewList
│   └── FileCard (for each queued file)
└── ValidationMessage (conditional, on error)
```

## Hierarchy
```
Pages → Form / UploadSection → UploadZone → FileCard
```

## Props Contract

```typescript
interface UploadZoneProps {
  /** Accepted MIME types, e.g. ['image/png', 'application/pdf'] */
  accept?: string[];
  /** Maximum file size in bytes (default: 10MB) */
  maxFileSize?: number;
  /** Maximum number of files (default: 1) */
  maxFiles?: number;
  /** Minimum file size in bytes */
  minFileSize?: number;
  /** Callback when files pass validation and are ready to upload */
  onFilesSelected?: (files: File[]) => void;
  /** Callback during upload of each file (0–1) */
  onProgress?: (fileName: string, progress: number) => void;
  /** Callback when a file errors */
  onError?: (fileName: string, error: UploadError) => void;
  /** Callback when upload completes */
  onComplete?: (fileName: string) => void;
  /** Callback when a file is removed from the queue */
  onRemove?: (fileName: string) => void;
  /** Whether uploading is in progress */
  uploading?: boolean;
  /** Disable the entire zone */
  disabled?: boolean;
  /** Custom validator — return error message or null */
  validate?: (file: File) => string | null;
  /** Allow multiple files (default: false) */
  multiple?: boolean;
  /** Upload state */
  state?: 'default' | 'drag-over' | 'uploading' | 'error' | 'success';
  /** Error message to display */
  errorMessage?: string;
  /** Label text */
  label?: string;
  /** Hint text shown below the zone */
  hint?: string;
  /** Accepted file type labels (display only) */
  acceptedLabel?: string;
  /** Maximum size label (display only) */
  maxSizeLabel?: string;
  className?: string;
}

interface UploadError {
  code: 'FILE_TOO_SMALL' | 'FILE_TOO_LARGE' | 'TOO_MANY_FILES'
      | 'INVALID_TYPE' | 'VALIDATION_FAILED' | 'UPLOAD_FAILED';
  message: string;
}
```

## Variants
| Variant | Description |
|---|---|
| Single | Accepts exactly one file |
| Multiple | Accepts multiple files up to `maxFiles` |
| Strict | Enforces exact type/size — rejects on drop without queuing |
| Permissive | Queues files with warnings instead of rejecting |

## States
| State | Visual |
|---|---|
| Default | Dashed border, upload icon, "Drag files here or click to browse" |
| Drag-over | Border becomes solid/accent, background tinted, icon pulses, "Drop files here" overlay |
| Uploading | Progress indicators on each file card, zone dimmed, cancel option |
| Error | Border turns error color, error message below zone, invalid files highlighted |
| Success | Border turns success color briefly (1.5 s), green checkmark, then resets |
| Disabled | Reduced opacity, pointer-events: none, descriptive tooltip |

## Accessibility
- Role `button` on the clickable area with `tabindex="0"`
- `aria-label` on UploadZone describing the action
- Drag-and-drop operations broadcast via `aria-live="polite"` region
- Focus management: focus remains on zone after file selection; focus moves to error message on validation failure
- Keyboard support: `Enter` / `Space` to open browse dialog
- Hidden `<input type="file">` with proper `accept` attribute for screen readers
- Drag events (`dragenter`, `dragover`, `dragleave`, `drop`) must have `aria-dropeffect` set appropriately
- Error announcements use `role="alert"`

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px (tablet/desktop) | Full drag-and-drop zone, 320px+ height |
| < 768px (mobile) | Full-width minimal zone (120px height), touch-friendly tap target (≥ 44px), fallback to click-to-browse only (drag-and-drop not reliable on mobile) |

## Animation Rules
- Drop overlay: fade in over 150ms with `ease-out`
- Drag-over border: transition `border-color` 150ms, `background-color` 200ms
- File cards entering: slide in from top with fade, 250ms, staggered by 50ms per card
- Success state: brief scale-up of checkmark icon (1→1.1→1) over 300ms
- Error shake: horizontal shake 50px amplitude, 3 oscillations, 300ms
- Duration: all micro-interactions ≤ 300ms

## Future Expansion
- Upload via clipboard paste (Ctrl+V / Cmd+V)
- Directory upload (`webkitdirectory`)
- Cloud file picker integrations (Google Drive, Dropbox, OneDrive)
- Resumable uploads with chunking
- Image crop/customize before upload
- Drag-and-drop reorder of queued files
- Auto-upload on drop vs. manual queue submit

## Dependencies
- `FileCard` (to display queued files)
- `Icon` (upload, file-type, checkmark, error)
- `Button` (browse trigger)
- `ProgressBar` (during upload)
- Custom `useFileUpload` hook (internal validation + progress tracking)

## Related Components
- `Button` — opens the file browser alternative
- `FileCard` — renders each queued/uploaded file
- `AttachmentCard` — compact read-only variant used in messages
- `ImagePreview` — preview for uploaded image files

## Anti-patterns
- ❌ Using UploadZone inside scrolling lists without click-and-drag isolation
- ❌ Accepting all file types without validation on the server side (client-only validation is a UX aid, not a security measure)
- ❌ Allowing unlimited files without pagination or virtualisation
- ❌ Overriding browser default drag-and-drop without providing a fallback for users with disabilities
- ❌ Replacing the native file input entirely — always keep a hidden `<input type="file">` for assistive tech

## Performance Notes
- File validation runs synchronously on drop — debounce or chunk for > 50 files
- File card list should virtualize when exceeding 20 files
- Thumbnail generation for images should be async (Web Worker) to avoid blocking the main thread
- Avoid re-rendering the entire zone on every progress tick — memoize FileCard children and use granular progress updates
- For large files (≥ 500 MB), avoid reading the full file into memory client-side; stream metadata only
