# ImagePreview

## Purpose
A full-featured image viewer supporting zoom, pan, rotate, and gallery navigation. Optimised for high-resolution photography, screenshots, diagrams, and other raster image formats.

## Responsibilities
- Render images from URLs or blob sources
- Provide zoom controls: fit-to-container, actual-size (1:1), and custom slider zoom
- Allow panning when image is larger than the viewport
- Support 90° rotation steps (0, 90, 180, 270)
- Provide gallery navigation (prev/next) for multi-image sets
- Display a loading skeleton while the image loads
- Show a clear error state for failed loads or unsupported image types
- Reset zoom/pan on image change
- Handle EXIF orientation metadata

## Composition
```
ImagePreview
├── PreviewToolbar
│   ├── ZoomPresets (fit, actual, custom-slider)
│   ├── RotateButton
│   ├── GalleryNavigation (prev, next, index / total)
│   └── DownloadButton
├── PreviewArea
│   ├── LoadingSkeleton (conditional)
│   ├── ErrorState (conditional)
│   ├── ImageContainer (overflow hidden, handles pan + zoom)
│   │   └── Image (transform: scale + translate + rotate)
│   └── ZoomIndicator (N% badge, auto-hides)
└── ThumbnailStrip (optional, for gallery)
    └── Thumbnail (×n)
```

## Hierarchy
```
Pages → ImageViewer / Gallery
       → ImagePreview
       → DocumentPreview → ImagePreview (fallback for image MIME types)
```

## Props Contract

```typescript
interface ImagePreviewProps {
  /** Image source URL(s) — single string or array for gallery */
  src: string | string[];
  /** Index of the active image in gallery mode */
  activeIndex?: number;
  /** Alt text for the image */
  alt?: string;
  /** Initial zoom mode */
  zoomMode?: 'fit' | 'actual' | 'custom';
  /** Zoom level (when zoomMode === 'custom'); 0.25–5 */
  zoom?: number;
  /** Rotation in degrees (0, 90, 180, 270) */
  rotation?: 0 | 90 | 180 | 270;
  /** Callback when activeIndex changes */
  onIndexChange?: (index: number) => void;
  /** Callback when zoom changes */
  onZoomChange?: (zoom: number, mode: 'fit' | 'actual' | 'custom') => void;
  /** Callback when rotation changes */
  onRotationChange?: (rotation: 0 | 90 | 180 | 270) => void;
  /** Callback on load error */
  onError?: (error: PreviewError) => void;
  /** Callback when image successfully loads */
  onLoad?: (dimensions: { width: number; height: number }) => void;
  /** Show thumbnail strip for gallery */
  showThumbnails?: boolean;
  /** Enable download button */
  downloadable?: boolean;
  /** Enable fullscreen toggle */
  fullscreenable?: boolean;
  /** Disable pan/zoom interactions */
  readOnly?: boolean;
  className?: string;
}

interface PreviewError {
  code: 'LOAD_FAILED' | 'UNSUPPORTED_FORMAT' | 'DECODE_ERROR';
  message: string;
}
```

## Variants
| Variant | Description |
|---|---|
| Single | One image, no gallery controls |
| Gallery | Multiple images with prev/next, thumbnail strip |
| Lightbox | Full-screen overlay, dark backdrop, opened from a thumbnail |
| Embedded | Bounded container within a page layout, no fullscreen |
| Thumbnail | Small preview (< 200px), zoom disabled, opens lightbox on click |

## States
| State | Visual |
|---|---|
| Loading | Skeleton matching aspect ratio (derived from natural dimensions or 16:9), shimmer animation |
| Loaded | Image rendered with current zoom, pan, rotation |
| Error | Broken-image icon, error message, retry button |
| Zooming | Cursor changes to zoom-in/zoom-out, smooth scale transition |
| Panning | Grabbing cursor, image tracks pointer |
| Rotating | 200ms CSS rotation transition |
| Gallery transition | Slide prev/next animation |
| Fullscreen | OS fullscreen API engaged, exit button in toolbar |

## Accessibility
- `role="img"` with `aria-label` set to `alt` text on the image
- Toolbar buttons: `aria-label` for each action ("Zoom in", "Zoom out", "Rotate clockwise", etc.)
- Gallery: `aria-roledescription="carousel"` on the preview area, `aria-label="Image {n} of {total}"`
- Prev/Next: `aria-label="Previous image"` / `"Next image"`
- Keyboard: `ArrowLeft`/`ArrowRight` for gallery navigation; `+`/`-` for zoom; `r` for rotate; `Esc` to close lightbox; `f` for fullscreen
- Zoom slider: `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Loading skeleton: `aria-hidden="true"` when image is ready
- Error state uses `role="alert"`

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 1024px | Full toolbar, thumbnail strip on side or bottom |
| 768–1023px | Compact toolbar (icon-only), thumbnails hidden — swipe navigation |
| < 768px | Lightbox fills viewport, toolbar overlay at top (semi-transparent), thumbnails hidden, swipe left/right for gallery, pinch-to-zoom replaces slider, double-tap to zoom |
| All | Respect device orientation — image re-centers on orientation change |

## Animation Rules
- Zoom: CSS `transform: scale()` transition 200ms `ease-out`
- Pan: direct DOM manipulation (no transition, immediate position tracking via pointer events)
- Rotation: `transform: rotate()` transition 200ms `ease-out`
- Gallery slide: slide-in from right (next) / left (prev) 250ms `ease-in-out`
- Lightbox open: backdrop fade 200ms + image scale-up 250ms
- Lightbox close: backdrop fade 150ms + image scale-down 200ms
- Toolbar auto-hide (mobile): opacity fade 300ms, show on tap
- Zoom indicator badge: auto-hide after 1.5 s, fade-out 300ms

## Future Expansion
- Animated image support (GIF, WebP animation) with pause/play
- Image comparison slider (side-by-side with before/after)
- EXIF metadata display panel
- Colour picker (eyedropper tool)
- Basic editing: crop, brightness/contrast, filters
- SVGs: interactive SVG rendering with layers
- HEIC/RAW format support via server-side conversion

## Dependencies
- `Skeleton` (loading placeholder)
- `ErrorState` (load failure display)
- `Icon` / `IconButton` (toolbar actions)
- `Slider` (zoom slider)
- `Thumbnail` (gallery strip)

## Related Components
- `DocumentPreview` — delegates image MIME types to ImagePreview
- `Skeleton` — loading placeholder
- `ErrorState` — error display
- `Dialog` — lightbox container when used as modal
- `AttachmentCard` — thumbnail preview inside card

## Anti-patterns
- ❌ Loading full-resolution images for thumbnail preview — use server-side thumbnails or `srcset`
- ❌ Ignoring EXIF orientation — always apply `image-orientation: from-image` or read EXIF data
- ❌ Allowing zoom beyond 5× without warning for extremely large images
- ❌ Not handling SVG cross-origin restrictions when rendering in canvas
- ❌ Blocking the main thread with large image decode — use `decode()` method on Image
- ❌ Re-rendering the entire component on every zoom tick — only update transform CSS

## Performance Notes
- Use `loading="lazy"` for gallery images not in view
- Image decode: call `image.decode()` before displaying to avoid layout jump
- High-DPI screens: serve images at 2× resolution via `srcset`
- Large images (> 4000px): downsample on load for smooth zoom/pan; use canvas for 1:1 zoom only on demand
- Gallery images: preload adjacent images (prev, next) with `new Image()` in background
- Avoid re-render loops on zoom — store transform as a ref, not state
- Revoke blob URLs on unmount
