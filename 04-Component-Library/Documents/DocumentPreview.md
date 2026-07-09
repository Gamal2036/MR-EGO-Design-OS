# DocumentPreview

## Purpose
An in-app document content viewer that renders supported file formats (PDF, DOCX, TXT, MD, code files) with zoom controls, pagination, and loading states. Provides a fallback error state for unsupported or failed-to-load formats.

## Responsibilities
- Render document content for supported file formats
- Display pagination controls (page number, total pages, prev/next)
- Provide zoom controls (zoom in, zoom out, reset-to-fit)
- Show a loading skeleton while the document is being fetched/processed
- Show a clear error state for unsupported formats or failed loads
- Track current page and zoom level via controlled/uncontrolled props
- Handle large documents without freezing the UI

## Composition
```
DocumentPreview
├── PreviewToolbar
│   ├── ZoomControls (zoom-in, zoom-out, fit-width, fit-page, zoom-level display)
│   ├── Pagination (prev, page-number / total, next)
│   └── ViewModeToggle (single-page, scrollable)
├── PreviewArea
│   ├── LoadingSkeleton (conditional)
│   ├── ErrorState (conditional)
│   ├── UnsupportedFormat (conditional)
│   └── DocumentRenderer
│       ├── PDFRenderer
│       ├── DocxRenderer
│       ├── TextRenderer (TXT, MD, code)
│       └── FallbackRenderer (image-based for others)
└── MetadataSidebar (optional)
    └── FileCard
```

## Hierarchy
```
Pages → DocumentViewer → DocumentPreview → DocumentRenderer (format-specific)
```

## Props Contract

```typescript
interface DocumentPreviewProps {
  /** URL or blob URL of the document */
  src: string;
  /** Document MIME type */
  type: DocumentFormat;
  /** Current page number (1-indexed) */
  page?: number;
  /** Total pages (auto-detected, but can be overridden) */
  totalPages?: number;
  /** Zoom level as a multiplier (1 = 100%) */
  zoom?: number;
  /** Zoom mode preset */
  zoomMode?: 'fit-width' | 'fit-page' | 'custom';
  /** View layout */
  layout?: 'single-page' | 'scrollable';
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when zoom changes */
  onZoomChange?: (zoom: number) => void;
  /** Callback when document finishes loading */
  onLoad?: (metadata: DocumentMetadata) => void;
  /** Callback on load error */
  onError?: (error: PreviewError) => void;
  /** Show metadata sidebar */
  showSidebar?: boolean;
  /** File metadata for sidebar */
  file?: FileDescriptor;
  /** Disable interactions */
  readOnly?: boolean;
  className?: string;
}

type DocumentFormat =
  | 'application/pdf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/msword'
  | 'text/plain'
  | 'text/markdown'
  | 'text/html'
  | 'text/css'
  | 'application/javascript'
  | 'application/json'
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'unsupported';

interface DocumentMetadata {
  totalPages: number;
  title?: string;
  author?: string;
  createdAt?: string;
  fileSize?: number;
}

interface PreviewError {
  code: 'LOAD_FAILED' | 'UNSUPPORTED_FORMAT' | 'TOO_LARGE' | 'RENDER_ERROR';
  message: string;
}
```

## Variants
| Variant | Description |
|---|---|
| Full | Complete toolbar + sidebar, page-at-a-time with pagination |
| Scrollable | Continuous scroll, no pagination controls, zoom controls available |
| Minimal | Toolbar-less, full-bleed render (for embedding in other panels) |
| Thumbnail | Small preview thumbnail (100×140px) with overlay "Preview" button |

## States
| State | Visual |
|---|---|
| Loading | Skeleton placeholder matching final document dimensions, shimmer animation |
| Loaded | Document content rendered at current zoom/page |
| Error | Central error icon + title + description + retry button |
| Unsupported | Info icon + "Preview not available" + download button fallback |
| Empty | No `src` provided — empty state with "Select a document" prompt |
| Page Transitioning | Brief fade-out/fade-in (150ms) between pages for PDF renderer |

## Accessibility
- `role="document"` on the preview area
- `aria-label` describing current document name
- Pagination controls: `aria-label="Go to page {n}"`, `aria-current="page"` on current page
- Zoom controls labelled appropriately
- Focus trap not required (not modal)
- Keyboard: arrow keys for page navigation; Ctrl+/- for zoom; Home/End for first/last page
- Loading skeleton: `aria-hidden="true"` to hide from screen readers when content is ready
- Error state uses `role="alert"`

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 1024px | Full toolbar visible, sidebar can be open |
| 768–1023px | Collapsed toolbar (icons only), sidebar slides as overlay |
| < 768px | Full-screen preview in viewport, toolbar hidden on scroll (auto-hide), pagination as floating overlay at bottom, zoom via pinch gesture |
| Print | Uses `fit-page` zoom, renders all pages sequentially |

## Animation Rules
- Page turn: opacity cross-fade 200ms
- Zoom change: CSS `transform: scale()` transition 200ms `ease-out`
- Zoom reset to fit: smooth transition 300ms
- Loading skeleton: shimmer sweep 1.5s infinite linear
- Sidebar slide-in/out: 250ms ease
- Toolbar auto-hide on mobile: translateY(-100%) 200ms, re-appear on tap

## Future Expansion
- Text selection and copy
- Annotation support (highlight, underline, comment)
- Digital signature placement
- Text-to-speech read-aloud
- Side-by-side document comparison (diff view)
- Bookmark / section outline sidebar
- Offline document caching (Service Worker)
- Print-to-PDF export

## Dependencies
- `Skeleton` (loading placeholder)
- `ErrorState` (render failure display)
- `FileCard` (sidebar)
- `Icon` (toolbar icons)
- `Button` / `IconButton` (toolbar controls)
- Third-party: PDF.js (PDF rendering), Mammoth.js (DOCX), marked (Markdown), highlight.js (code)

## Related Components
- `ImagePreview` — used when type is an image format
- `FileCard` — sidebar metadata
- `VersionHistory` — select versions to preview
- `Skeleton` — loading placeholder
- `ErrorState` — error display

## Anti-patterns
- ❌ Rendering PDFs in an iframe without graceful fallback for blockers
- ❌ Assuming all DOCX files render identically — handle layout differences gracefully
- ❌ Blocking the main thread during document parsing — always offload to a Web Worker
- ❌ Loading entire documents into memory before rendering — use streaming where possible
- ❌ Forgetting to revoke blob URLs when the component unmounts (memory leak)

## Performance Notes
- PDF rendering: use canvas-based rendering (PDF.js `renderPage`) off the main thread
- DOCX: parse in a Web Worker, render to HTML asynchronously
- Virtualise pages in scrollable mode — only render +3/−3 pages from current viewport
- Zoom: use CSS `transform: scale()` instead of re-rendering at new resolution for > 50ms interaction response
- Preload adjacent pages (n+1, n-1) after current page renders
- Memoise the toolbar component to avoid re-renders on zoom/page changes
- Blob URLs must be revoked on unmount and on `src` change
