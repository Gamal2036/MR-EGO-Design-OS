# FileInput

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

File selection component with drag-and-drop support, accept-type filtering, multiple file support, and size limit display. Provides visual feedback for drag states and file validation.

---

## Responsibilities

- Render a clickable drop zone or button to trigger the native file picker
- Support drag-and-drop file selection with visual feedback (drag over, drag leave)
- Accept file type filtering via `accept` attribute
- Support single and multiple file selection
- Display selected file(s) with name, size, and type
- Show file size limit and validate against it
- Support file removal from the selection
- Handle drag-over, drag-leave, and drop events

---

## Composition

```
FileInput
├── FileDropZone
│   ├── UploadIcon
│   ├── UploadText ("Drag files here or click to browse")
│   ├── BrowseButton (optional inline button)
│   ├── AcceptedTypesText ("PNG, JPG, PDF up to 10MB")
│   └── DragOverlay (visible during drag-over)
├── FileList
│   ├── FileItem (multiple)
│   │   ├── FileIcon
│   │   ├── FileName
│   │   ├── FileSize
│   │   ├── FileStatus (uploading, uploaded, error)
│   │   └── RemoveButton
│   └── FileLimitIndicator ("3 of 5 files")
├── HiddenFileInput (<input type="file">)
└── HelperText / ErrorMessage
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout |
| Child | FileDropZone | Drag-and-drop target area |
| Child | FileList | Selected files display |
| Child | FileItem | Individual file row |
| Child | HiddenFileInput | Native file input |

---

## Props Contract

```typescript
/** A selected file entry. */
export interface FileEntry {
  /** The native File object. */
  file: File;
  /** Unique id for this entry. */
  id: string;
  /** Upload progress 0-100. */
  progress?: number;
  /** Upload status. @default "pending" */
  status?: 'pending' | 'uploading' | 'uploaded' | 'error';
  /** Error message if status is 'error'. */
  error?: string;
  /** Preview URL for images. */
  previewUrl?: string;
}

/**
 * Props for the FileInput component.
 */
export interface FileInputProps {
  // Display
  /** Visual variant. @default "standard" */
  variant?: 'standard' | 'compact' | 'button-only';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component spans full width. @default true */
  fullWidth?: boolean;
  /** Whether to show the file list below the drop zone. @default true */
  showFileList?: boolean;

  // State
  /** Selected files. */
  value?: FileEntry[];
  /** Default value (uncontrolled). @default [] */
  defaultValue?: FileEntry[];
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether files are uploading. @default false */
  isLoading?: boolean;
  /** Whether the input has an error. @default false */
  hasError?: boolean;
  /** Error message text. */
  errorMessage?: string;
  /** Whether the input is required. @default false */
  isRequired?: boolean;
  /** Whether multiple file selection is allowed. @default false */
  multiple?: boolean;

  // Constraints
  /** Accepted MIME types. */
  accept?: string | string[];
  /** Maximum file size in bytes. */
  maxFileSize?: number;
  /** Maximum number of files. @default 0 (unlimited) */
  maxFiles?: number;
  /** Minimum file size in bytes. @default 0 */
  minFileSize?: number;

  // Content
  /** Label text above. */
  label?: string;
  /** Helper text below. */
  helperText?: string;
  /** Custom text for the drop zone. */
  dropZoneText?: string;
  /** Custom browse button text. */
  browseText?: string;
  /** Name attribute. */
  name?: string;

  // Events
  /** Called when files are added. */
  onChange?: (files: FileEntry[]) => void;
  /** Called when a file is removed. */
  onRemove?: (fileId: string) => void;
  /** Called when files are dropped onto the zone. */
  onDrop?: (files: File[]) => void;
  /** Called when file validation fails. */
  onValidationError?: (error: FileValidationError) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}

/** File validation error details. */
export interface FileValidationError {
  /** The file that failed validation. */
  file: File;
  /** Error code. */
  code: 'invalid-type' | 'file-too-large' | 'file-too-small' | 'max-files-exceeded';
  /** Error message. */
  message: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Full drop zone with icon, text, file list | Document upload, form attachments |
| `compact` | Smaller drop zone, inline file list | Sidebar uploads, quick attachments |
| `button-only` | Button trigger only, no drop zone | Simple file select, toolbar actions |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Dashed border drop zone with upload icon | Ready for selection |
| **Drag over** | Solid brand border, brand background, "Drop files here" | File being dragged over |
| **Drag leave** | Reverts to default | File dragged away |
| **Files selected** | File list visible below drop zone | Files ready for submission |
| **Disabled** | 40% opacity, no interaction | Cannot interact |
| **Error** | Red border on drop zone | Validation failure |
| **Loading** | Progress bars on file items | Files uploading |
| **Uploaded** | Green checkmark on file item | Upload complete |
| **Upload error** | Red error text on file item | Upload failed |
| **Size exceeded** | Error message: "File exceeds 10MB limit" | File too large |
| **Type mismatch** | Error message: "File type not accepted" | Wrong file type |
| **Max files** | Drop zone disabled, "Max files reached" text | At capacity |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `role="button"` on drop zone (clickable). |
| **Label** | `aria-label` on drop zone. `aria-label` on remove buttons. |
| **File list** | `role="list"` on file list, `role="listitem"` on each file. |
| **Drop zone** | Keyboard accessible (Enter/Space to open file picker). |
| **Remove button** | `aria-label="Remove {filename}"`. |
| **Progress** | `role="progressbar"` with `aria-valuenow` on uploading files. |
| **Error** | `aria-invalid`, `aria-describedby` to error messages. |
| **Disabled** | `aria-disabled="true"`. |
| **Focus** | Visible focus ring on drop zone and file items. |
| **Keyboard** | Enter/Space on drop zone opens file picker. Tab through file items. Delete/Backspace removes selected file. |
| **Screen reader** | Announce file added, file removed, upload progress, validation errors. |
| **Drag-and-drop** | Do not rely solely on drag-and-drop — provide click-to-browse alternative. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Drop zone reduced height. Touch targets 44x44px. File list stacked. |
| Tablet (768-1023px) | Full width or fixed. Standard drop zone. |
| Desktop (1024-1279px) | Fixed width up to 500px. |
| Wide (1280-1599px) | Fixed width up to 600px. |
| Ultra-wide (1600px+) | Max width 640px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Drop zone border | Drag over/leave | 150ms | Ease-Out |
| Drop zone background | Drag over/leave | 150ms | Ease-Out |
| File item appear | Added | 200ms | Ease-Out |
| File item remove | Removed | 150ms | Ease-In |
| Progress bar fill | Upload progress | 100ms | Linear |
| Icon change | Status change | 200ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `preview` prop | Image/video preview generation |
| `crop` prop | Client-side image cropping |
| `compress` prop | Client-side image compression |
| `uploadUrl` prop | Direct upload endpoint |
| `chunked` prop | Chunked upload for large files |
| `sortable` prop | Reorder files via drag-and-drop |
| `folderUpload` prop | Allow folder selection |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Icon (Upload, File, Image, Close, Check) | Internal | Status icons |
| ProgressBar | Internal | Upload progress display |
| Button | Internal | Browse button |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| UploadZone.md | Dedicated drag-and-drop target |
| FileCard.md | File summary display component |
| FormGroup.md | Parent wrapper |

---

## Anti-patterns

1. **Only supporting drag-and-drop** — Always provide click-to-browse as alternative.
2. **No file size validation** — Always validate file size on client before upload.
3. **No type validation** — Check `accept` both visually and programmatically.
4. **Auto-upload on selection** — Wait for explicit form submission unless upload-on-select is desired.
5. **Not showing progress** — Always show upload progress for files > 1MB.
6. **Blocking maxFiles without feedback** — Show count and limit clearly.

---

## Performance Notes

- File reading (previews) uses `URL.createObjectURL` — revoke with `URL.revokeObjectURL` on cleanup.
- Large files should not generate preview URLs to avoid memory pressure.
- File list uses stable `id` keys to prevent re-render on file status change.
- Progress updates use `requestAnimationFrame` throttling (not every progress event).
- Validate file size and type synchronously before adding to state.
- Drop zone events use passive listeners where possible.
