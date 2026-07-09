# AttachmentCard

## Purpose
A compact, read-friendly attachment display for use within messages, comments, and chat threads. Shows file identity at a glance and provides a single removal action.

## Responsibilities
- Display file type icon derived from extension/MIME
- Show file name (truncated with ellipsis if too long)
- Show file size in human-readable format
- Provide a remove/delete button (dismiss action)
- Surface a download action (optional)
- Indicate upload progress inline for messages sending
- Display error state when an attachment fails to send

## Composition
```
AttachmentCard
├── FileTypeIcon
├── FileInfo
│   ├── FileName (truncated)
│   └── FileSize
├── ProgressIndicator (conditional, circular or linear mini)
├── ErrorIndicator (conditional)
├── RemoveButton
└── DownloadButton (optional)
```

## Hierarchy
```
Pages → Chat / Comments / Messages → MessageBubble → AttachmentCard
```

## Props Contract

```typescript
interface AttachmentCardProps {
  /** File metadata */
  file: FileDescriptor;
  /** Upload/send state */
  state?: 'idle' | 'uploading' | 'complete' | 'error';
  /** Upload progress 0–100 */
  progress?: number;
  /** Error message shown on state === 'error' */
  errorMessage?: string;
  /** Called when user clicks remove */
  onRemove?: (file: FileDescriptor) => void;
  /** Called when user clicks download */
  onDownload?: (file: FileDescriptor) => void;
  /** Show download button */
  downloadable?: boolean;
  /** Allow remove action */
  removable?: boolean;
  /** Disable interactions */
  disabled?: boolean;
  className?: string;
}

interface FileDescriptor {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  thumbnailUrl?: string;
}
```

## Variants
| Variant | Description |
|---|---|
| Default | Horizontal row: icon | name | size | remove |
| Uploading | Same layout but with mini circular progress replacing the icon |
| Error | Red-tinted background, error icon overlay, retry text |
| Downloadable | Shows an additional download icon button |
| ReadOnly | No remove/download — purely informational |

## States
| State | Visual |
|---|---|
| Default | Normal appearance, icon + info + remove button |
| Uploading | Progress ring replacing icon, file info dimmed (opacity 0.6) |
| Complete | Brief green checkmark pulse (600ms), then returns to default |
| Error | Light red background, red file-type icon overlay with "!" , error message in tooltip |
| Disabled | Opacity 0.4, no interaction |
| Hover | Subtle background tint on the whole card |
| Focus | Visible focus ring on remove button |

## Accessibility
- `role="group"` with `aria-label` on the card describing the file
- Remove button: `aria-label="Remove {filename}"`
- Download button: `aria-label="Download {filename}"`
- Progress indicator: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- State changes announced via `aria-live="polite"` in parent message bubble
- Error state: `aria-label="{filename} — upload failed"`

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 480px | Full horizontal row: icon | name | size | actions |
| < 480px | Name truncates to fit available width; actions remain visible; remove button is always at the rightmost edge |

## Animation Rules
- Upload progress ring: SVG stroke-dashoffset transition 200ms linear
- State transition backgrounds: 150ms ease
- Card removal slide-out: translateX(-50%) + opacity 0, 200ms ease-in — triggers `onRemove` callback after animation completes
- Error appearance: border change 150ms, icon fade-in 100ms
- Hover state: background color transition 100ms

## Future Expansion
- Thumbnail preview for images (small square crop)
- Inline preview on click (expand to preview without leaving the message)
- Multi-attachment drag-to-reorder within a message
- File type badge colour-coding (e.g., red for PDF, blue for DOCX)
- "Retry" action on error state

## Dependencies
- `Icon` (file-type icons, close/download icons)
- `Tooltip` (truncated full filename on hover)
- `ProgressRing` (custom circular progress, optional mini component)

## Related Components
- `FileCard` — full-sized sibling with more actions and metadata
- `UploadZone` — creates queued files that become AttachmentCards
- `Toast` — success/error feedback when remove or download triggers a server action

## Anti-patterns
- ❌ Using AttachmentCard for standalone file lists — use FileCard for richer metadata
- ❌ Placing the remove button on the left side (violates Fitts' law / consistent placement)
- ❌ Removing the card instantly without animation — user loses spatial context
- ❌ Showing full file path instead of just filename
- ❌ Allowing remove action for already-sent attachments without confirmation (use ConfirmationDialog)

## Performance Notes
- Extremely lightweight — no expensive computations
- File name truncation calculated once on mount/resize (useResizeObserver if container is fluid)
- Icon resolution via memoised lookup — O(1) map access
- No virtualisation needed (used within message lists that handle their own virtualisation)
- Progress updates throttled to 30fps
