# Upload-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the file upload workflow for selecting, validating, queuing, uploading, and managing files. Supports single and multi-file uploads with preview, progress tracking, error recovery, and drag-and-drop interaction.

---

## Composition

```
UploadPage (Container)
├── UploadSection
│   ├── UploadZone (drag-and-drop target)
│   │   ├── DropOverlay (visible on drag-over)
│   │   │   ├── UploadIcon (animated)
│   │   │   └── DropMessage ("Drop files here")
│   │   ├── BrowseButton (click alternative)
│   │   ├── UploadHint ("Max 10MB per file. Supported: PDF, DOCX, PNG, JPG")
│   │   └── HiddenInput (type="file")
│   ├── FileQueue (before upload)
│   │   └── FileCard (multiple, queued state)
│   │       ├── FileIcon (by type)
│   │       ├── FileName
│   │       ├── FileSize
│   │       ├── RemoveButton
│   │       └── ValidationBadge (error if invalid)
│   └── UploadActions
│       ├── UploadAllButton (primary, disabled if queue empty)
│       └── ClearQueueButton (ghost)
├── UploadProgressList
│   └── FileCard (multiple, uploading state)
│       ├── FileIcon
│       ├── FileName
│       ├── ProgressBar (animated)
│       ├── ProgressPercentage
│       ├── CancelButton (per file)
│       └── StatusIcon (uploading / complete / error)
├── UploadedFileList (after completion)
│   └── FileCard (multiple, complete state)
│       ├── FileIcon
│       ├── FileName
│       ├── FileSize
│       ├── UploadDate
│       ├── DownloadButton
│       └── DeleteButton
├── PreviewArea (optional, image preview variant)
│   ├── ImagePreview (large preview)
│   │   ├── Image
│   │   ├── ZoomControls
│   │   └── RotateButton
│   └── PreviewThumbnails (file list as thumbnails)
│       └── Thumbnail (selectable)
├── UploadCompleteBanner (after all files uploaded)
│   ├── SuccessIcon
│   ├── SuccessMessage ("N files uploaded successfully")
│   └── ActionButtons (Continue, View Files)
├── UploadError (per-file or global)
│   ├── ErrorIcon
│   ├── ErrorMessage (specific validation or upload failure)
│   └── RetryButton / RemoveButton
└── GlobalUploadStatus (sticky footer, multi-file uploads)
    ├── TotalProgress (aggregate progress bar)
    ├── FileCount ("Uploading 3 of 5 files")
    └── CancelAllButton
```

---

## When to Use

- File attachment upload in forms (job applications, document submissions)
- Document management import (bulk upload of reports, datasets)
- Profile image or avatar upload
- AI conversation file attachments
- Any workflow requiring file selection and server transfer

## When NOT to Use

- Simple text or data entry without files
- Linking to external files without upload (use URL input)
- Real-time collaborative document editing (use dedicated editor)
- File synchronization (use dedicated sync client)

---

## Variants

### Single File Upload
| Aspect | Specification |
|--------|---------------|
| UploadZone | `multiple=false`, `maxFiles=1` |
| Preview | Image preview shown immediately after selection |
| Auto-upload | Upload begins on file selection (no queue step) |
| Progress | Inline progress on FileCard |
| Best for | Avatar upload, single document attachment |

### Multi-File Upload
| Aspect | Specification |
|--------|---------------|
| UploadZone | `multiple=true`, configurable `maxFiles` |
| Queue | Files queued for review before upload |
| Upload trigger | Explicit "Upload All" button |
| Progress | Per-file and aggregate progress |
| Best for | Document bundles, batch report upload |

### Upload with Preview
| Aspect | Specification |
|--------|---------------|
| Flow | Select → Preview → Confirm → Upload |
| Preview | ImagePreview for images; DocumentPreview for docs |
| Editing | Basic image edits (crop, rotate) before upload |
| Best for | Profile photos, marketing images, presentation uploads |

### Drop Zone Only
| Aspect | Specification |
|--------|---------------|
| UploadZone | Inline in page, no file list shown |
| After upload | Single success state; parent handles result |
| Best for | Drag-and-drop within AI conversation input area |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Dashed border UploadZone with upload icon and browse text | Ready for interaction |
| **Drag-over** | Solid accent border (Primary-500), tinted background (Primary-50), icon pulses | Files can be dropped |
| **Drag-invalid** | Red border, "File type not supported" overlay | Invalid file dragged over |
| **File selected** | FileCard appears with file name, size, type icon | Validation runs immediately |
| **Validating** | FileCard shows spinner; type/size check in progress | Brief validation state |
| **Validation error** | FileCard red border; error message; "Remove" option | File rejected with specific reason |
| **Queued** | FileCard gray tint; pending icon; ready for upload | Awaiting user action |
| **Queue full** | UploadZone disabled; "Max N files reached" message | Cannot add more files |
| **Uploading** | ProgressBar animating; CancelButton visible; status icon spinning | File being transferred |
| **Uploaded** | FileCard green checkmark; success state (1.5s animation) | Upload complete |
| **Upload error** | FileCard red border; error icon; RetryButton visible | Upload failed; retry available |
| **Complete (all)** | UploadCompleteBanner with success message and action buttons | All files processed |
| **Disabled** | UploadZone 0.4 opacity; tooltip "Uploads disabled" | Cannot interact |
| **Empty** | (No files) UploadZone in default state | No files selected or uploaded |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| UploadZone role | `role="button"`, `tabindex="0"`, `aria-label="Upload files. Drag and drop or click to browse."` |
| Hidden input | `<input type="file">` with proper `accept` attribute for screen reader association |
| Drop feedback | `aria-live="polite"` announces "Files detected. Drop to add." on drag-over |
| File card list | `role="list"`, `aria-label="File upload queue"` |
| File cards | `role="listitem"`, `aria-label="{file name}, {file size}, {state}"` |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` |
| Remove button | `aria-label="Remove {file name}"` |
| Retry button | `aria-label="Retry upload for {file name}"` |
| Cancel button | `aria-label="Cancel upload for {file name}"` |
| Validation error | `role="alert"` on error message; `aria-invalid` on file card |
| Upload complete | `aria-live="polite"` announces "Upload complete" |
| Drag-and-drop | Must have keyboard alternative (click to browse); drag-and-drop is enhancement |
| Focus management | Focus moves to first queued file after selection; focus moves to error message on validation failure |
| Keyboard | Enter/Space on UploadZone opens file browser; Tab navigates file cards |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | UploadZone: reduced height (120px), full-width. Drag-and-drop unreliable — fallback to click-to-browse. File cards stack vertically. Progress bar full-width below file info. Touch targets minimum 44x44px. Preview: full-screen modal. |
| Tablet (768-1023px) | UploadZone: 200px height. File cards: horizontal layout with icon, info, progress. Preview: side panel. |
| Desktop (1024-1279px) | UploadZone: 240px height. File cards: row layout. Preview: side panel or popover. Multi-column file grid for >5 files. |
| Wide (1280-1599px) | UploadZone: 280px height. File cards: rich layout with thumbnail previews. |
| Ultra-wide (1600px+) | UploadZone: 320px height. File display constrained to 1200px max width. |

---

## Implementation Example

```typescript
<UploadPage onComplete={handleUploadComplete}>
  <UploadSection>
    <UploadZone
      accept={['image/png', 'image/jpeg', 'application/pdf']}
      maxFileSize={10 * 1024 * 1024}
      maxFiles={5}
      multiple
      onFilesSelected={handleFilesSelected}
      onError={handleUploadError}
      hint="Max 10MB per file. Supported: PNG, JPG, PDF"
    />
    {queue.length > 0 && (
      <FileQueue>
        {queue.map(file => (
          <FileCard
            key={file.name}
            file={file}
            state="queued"
            onRemove={() => removeFromQueue(file.name)}
          />
        ))}
      </FileQueue>
    )}
    {queue.length > 0 && (
      <UploadActions>
        <Button variant="primary" onClick={handleUploadAll} isLoading={isUploading}>
          Upload {queue.length} files
        </Button>
        <Button variant="ghost" onClick={clearQueue}>Clear queue</Button>
      </UploadActions>
    )}
  </UploadSection>
  {uploading.length > 0 && (
    <UploadProgressList>
      {uploading.map(file => (
        <FileCard
          key={file.name}
          file={file}
          state="uploading"
          progress={file.progress}
          onCancel={() => cancelUpload(file.name)}
        />
      ))}
    </UploadProgressList>
  )}
  {completed.length > 0 && (
    <UploadCompleteBanner
      fileCount={completed.length}
      onContinue={handleContinue}
    />
  )}
  <UploadedFileList>
    {completed.map(file => (
      <FileCard
        key={file.name}
        file={file}
        state="complete"
        onDownload={() => downloadFile(file)}
        onDelete={() => deleteFile(file)}
      />
    ))}
  </UploadedFileList>
</UploadPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [CRUD-Pattern.md](CRUD-Pattern.md) | File upload as part of Create/Edit form for entity attachments |
| [AI-Workspace-Pattern.md](AI-Workspace-Pattern.md) | File attachments within AI conversation for context |
| [Profile-Pattern.md](Profile-Pattern.md) | Avatar/document upload in user profiles |
| [Search-Pattern.md](Search-Pattern.md) | Search finds uploaded documents and files |

## Dependencies

| Component | Usage |
|-----------|-------|
| [UploadZone](../Documents/UploadZone.md) | Drag-and-drop file target |
| [FileCard](../Documents/FileCard.md) | File status display |
| [AttachmentCard](../Documents/AttachmentCard.md) | Compact file display |
| [ImagePreview](../Documents/ImagePreview.md) | Image preview before upload |
| [DocumentPreview](../Documents/DocumentPreview.md) | Document preview |
| [ProgressBar](../Feedback/ProgressBar.md) | Upload progress indicator |
| [Button](../Core/Button.md) | Action buttons |
| [IconButton](../Core/IconButton.md) | Remove/Cancel controls |
| [Toast](../Feedback/Toast.md) | Upload success feedback |
| [ErrorState](../Feedback/ErrorState.md) | Upload error state |
| [Skeleton](../Feedback/Skeleton.md) | Loading placeholder |

## Anti-patterns

1. **No file validation** — Always validate file type, size, and count client-side before upload.
2. **No progress feedback** — Every upload must show progress bar or indeterminate progress.
3. **Allowing unlimited file types** — Restrict to supported MIME types.
4. **No error recovery** — Failed uploads must show Retry option, not just error message.
5. **No max file limit** — Always enforce `maxFiles` to prevent resource exhaustion.
6. **Auto-upload without user control** — Multi-file uploads should have explicit "Upload All" trigger.
7. **Removing drag-and-drop on mobile** — Provide click-to-browse fallback (mobile drag is unreliable).
8. **No file size display** — Always show file size before upload begins.
9. **Overwriting existing files without confirmation** — Check for name conflicts and prompt.
10. **No cancel during upload** — Users must be able to cancel pending or in-progress uploads.
