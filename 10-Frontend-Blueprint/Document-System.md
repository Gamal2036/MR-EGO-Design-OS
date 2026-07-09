# Document System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-3 ([Documents/](../04-Component-Library/Documents/)), DP-6 ([CV-Flow.md](../06-UX-Architecture/CV-Flow.md))

---

## Purpose

Defines the document management system — upload pipeline, preview engine, versioning, file types, storage strategy, and document lifecycle.

---

## Document Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  DOCUMENT SYSTEM                          │
├─────────────────────────────────────────────────────────┤
│  Upload Pipeline                                         │
│  File selection → validation → upload → processing      │
├─────────────────────────────────────────────────────────┤
│  Preview Engine                                          │
│  PDF, image, docx, markdown, code, spreadsheet           │
├─────────────────────────────────────────────────────────┤
│  Version Manager                                         │
│  Version tree, diff, restore, compare                    │
├─────────────────────────────────────────────────────────┤
│  File Store                                              │
│  Metadata, content, thumbnails, permissions              │
└─────────────────────────────────────────────────────────┘
```

---

## Document Types

```typescript
// Pseudocode
enum DocumentType {
  CV,                  // Curriculum Vitae / Resume
  CoverLetter,         // Cover letter
  Portfolio,           // Work portfolio
  Certificate,         // Certification
  Transcript,          // Academic transcript
  Recommendation,      // Recommendation letter
  Identification,      // ID document
  Other,               // Other document
}

enum FileCategory {
  Document,            // PDF, DOCX, TXT
  Image,               // PNG, JPG, WebP
  Spreadsheet,         // XLSX, CSV
  Code,                // JS, TS, PY, etc.
  Markdown,            // MD
  Archive,             // ZIP
}
```

---

## Upload Pipeline

```
User selects file (drag or click)
     ↓
Client-side validation:
  - File type allowed?
  - File size within limit?
  - File name valid?
     ↓
┌──────────────┐      ┌───────────────┐
│ VALID        │      │ INVALID        │
│ Show upload  │      │ Show error     │
│ progress     │      │ message        │
│              │      │                │
│ ┌──────────┐ │      │ "File too      │
│ │ Uploading│ │      │ large (max     │
│ │ ████████ │ │      │ 10MB)"         │
│ │ 75%      │ │      │                │
│ └──────────┘ │      │                │
└──────────────┘      └───────────────┘
     │
     ▼
Server processing:
  - Virus scan
  - Thumbnail generation
  - OCR (for CV)
  - Metadata extraction
     ↓
Document created in store
     ↓
UI updates with new document entry
```

---

## File Constraints

| Constraint | Limit |
|------------|-------|
| Max file size | 10MB (standard), 25MB (enterprise) |
| Max files per upload | 5 |
| Allowed types | PDF, DOCX, PNG, JPG, WebP, MD, TXT, XLSX, CSV |
| Blocked types | EXE, ZIP, RAR, DMG, APK, SCR, BAT |
| Max page count (PDF) | 50 pages for preview |
| Image dimensions | Max 5000x5000px |
| Concurrent uploads | 3 |

---

## Preview Engine

```typescript
// Pseudocode
interface PreviewEngine {
  canPreview(file: FileInfo): boolean;
  getPreviewComponent(file: FileInfo): ComponentType;
  getFallback(file: FileInfo): ComponentType;
}

// Preview components by file type
const previewMap = {
  'application/pdf': PDFViewer,
  'image/*': ImagePreview,
  'text/*': CodeViewer,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': DocxViewer,
  'text/markdown': MarkdownRenderer,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': SpreadsheetViewer,
  'text/csv': TablePreview,
};

// Preview states
// Loading → Skeleton
// Ready → Full preview
// Error → "Preview unavailable" + download link
// Unsupported → Download prompt only
```

---

## Version Manager

```typescript
// Pseudocode
interface VersionManager {
  versions: DocumentVersion[];
  currentVersionId: string;
  
  createVersion(documentId: string, file: File): Promise<DocumentVersion>;
  restoreVersion(versionId: string): Promise<void>;
  compareVersions(v1: string, v2: string): VersionDiff;
  getVersionTree(): VersionTreeNode[];
}

interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  file: FileInfo;
  changes: string;              // User description of changes
  createdAt: Date;
  createdBy: string;
}

interface VersionDiff {
  type: 'text' | 'visual';
  changes: Change[];
  summary: string;
}
```

---

## Document Lifecycle

```
Created (uploaded)
     ↓
Processing (scan, thumbnail)
     ↓
Ready (available for use)
     ↓
┌─────────────────────────────────────────────────────┐
│                   ACTIVE STATE                        │
│  Can be: viewed, edited, shared, versioned, deleted  │
│  Attached to: applications, profile, messages        │
└─────────────────────────────────────────────────────┘
     ↓
Archived (user archived — hidden from default view)
     ↓
Deleted (soft delete — 30 day recovery window)
     ↓
Purged (permanent deletion after 30 days)
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [CV-System.md](CV-System.md) | CV documents within document system |
| [Job-System.md](Job-System.md) | Document attachment in applications |
| [Profile-System.md](Profile-System.md) | Profile documents section |

---

## Validation Notes

1. Upload pipeline validates on client and server — no oversized or malicious files.
2. Preview engine supports all common document types with graceful fallback.
3. Version manager preserves history with restore and compare capabilities.
4. All documents support soft delete with 30-day recovery window.
5. File scanning prevents malicious uploads before storage.
