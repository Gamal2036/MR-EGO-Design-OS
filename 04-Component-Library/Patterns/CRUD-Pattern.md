# CRUD-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-2 ([Form-Specifications.md](../../03-Design-System/Forms/Form-Specifications.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the standard Create, Read, Update, Delete flow for managing entities. Provides a consistent user experience for data management across all modules — jobs, documents, profiles, settings, and enterprise resources.

---

## Composition

```
CRUDPage (Container)
├── Topbar (page title + Create button)
├── ViewToggle (list / card / table variant)
├── EntityList (variant-dependent)
│   ├── [List]
│   │   └── ListItem (multiple)
│   │       ├── EntitySummary
│   │       ├── RowActions (edit, delete, duplicate)
│   │       └── Checkbox (batch select)
│   ├── [CardGrid]
│   │   └── Card (multiple)
│   │       ├── Card.Header (entity name, status badge)
│   │       ├── Card.Body (entity details)
│   │       └── Card.Footer (RowActions)
│   └── [Table]
│       ├── Table.Header (sortable columns)
│       ├── Table.Body
│       │   └── Table.Row (multiple)
│       │       ├── Table.Cell (per column)
│       │       ├── RowActions
│       │       └── Checkbox (batch select)
│       └── Table.Footer (pagination summary)
├── Pagination (page navigation)
├── BatchActionBar (conditional, visible when items selected)
│   ├── SelectionCount ("3 selected")
│   ├── BatchDeleteButton
│   ├── BatchEditButton
│   └── ClearSelectionButton
├── CreateEditForm (Dialog or Page)
│   ├── FormGroup (multiple fields)
│   │   ├── Input / Select / DatePicker / etc.
│   │   └── Validation
│   ├── FormActions
│   │   ├── SaveButton
│   │   └── CancelButton
│   └── InlineEditing (optional, in-table editing)
│       ├── EditableCell
│       └── SaveInlineButton / CancelInlineButton
├── ConfirmationDialog (delete)
│   ├── Dialog.Body (warning message + entity name)
│   └── Dialog.Footer
│       ├── CancelButton
│       └── ConfirmButton (danger variant)
└── Toast (success/error feedback)
    └── UndoAction (optional, within toast)
```

---

## When to Use

- Managing a collection of entities that users create, view, edit, and delete
- Any module with persistent data requiring full lifecycle management
- Admin panels, document management, job boards, profile directories
- Batch operations on multiple entities (bulk delete, bulk status change)

## When NOT to Use

- Read-only data views that never require modification
- Simple single-entity forms (use direct FormGroup composition instead)
- Non-persistent in-memory data (use local state patterns)
- Real-time collaborative editing (use dedicated collaboration patterns)

---

## Variants

### List-Based
| Aspect | Specification |
|--------|---------------|
| Layout | Single column list with avatar/icon, title, subtitle, metadata |
| Density | Compact, single-line items |
| Best for | Entity types where name + brief metadata is sufficient preview |
| Actions | IconButton row actions on hover (right side) |
| Selection | Checkbox on left side for batch operations |

### Card-Based
| Aspect | Specification |
|--------|---------------|
| Layout | Responsive grid of Cards (1 col mobile, 2 tablet, 3-4 desktop) |
| Density | Standard padding, richer preview content |
| Best for | Visual entities — jobs, profiles, documents with preview |
| Actions | Footer buttons or hover-reveal action bar |
| Selection | Card-level checkbox or click-to-select |

### Table-Based
| Aspect | Specification |
|--------|---------------|
| Layout | Full table with sortable columns, sticky header |
| Density | Dense rows with horizontal scroll on mobile |
| Best for | Data-heavy entities with many attributes (users, logs, configs) |
| Actions | IconButton in last column; inline editing in cells |
| Selection | Row-level checkbox column |

### Inline Editing
| Aspect | Specification |
|--------|---------------|
| Trigger | Click on cell/text value, single-click or edit icon |
| Experience | Cell transforms to Input/Select in place |
| Save | Auto-save on blur or explicit Save button |
| Cancel | Escape key reverts to original value |
| Best for | Quick edits within table rows without opening full form |

### Batch Operations
| Aspect | Specification |
|--------|---------------|
| Selection | Checkbox per row/card + "Select all" header checkbox |
| BatchBar | Fixed bar appears below Topbar when items selected |
| Actions | Delete, status change, export, assign (context-dependent) |
| Count | "N selected" label with clear selection link |
| Confirmation | ConfirmationDialog with "Apply to all N items" message |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton rows (3-5) for list/table; skeleton cards for card grid | No interaction until loaded |
| **Empty** | EmptyState component with illustration, "No [entities] yet" message, Create button | First-time user guidance |
| **Error** | ErrorState component in content area, retry button | Data fetch failure |
| **Creating** | Create form modal/page open; Save button shows loading spinner | Form validation on submit |
| **Editing** | Edit form pre-populated with entity data; Save shows loading spinner | Changes tracked, discard confirmation on close |
| **Deleting** | ConfirmationDialog visible; Confirm button loading with "Deleting..." | Dialog cannot be dismissed during deletion |
| **Batch mode** | BatchActionBar visible; checkboxes shown on each row | Each action triggers confirmation flow |
| **Saving inline** | Cell shows spinner, other cells locked | Changes saved on blur or Enter |
| **Success** | Toast "Entity created/updated/deleted" appears; list refreshes | Auto-dismiss after 3s |
| **Undo available** | Toast includes "Undo" button; entity restored on click | Undo window: 5s |
| **Optimistic update** | Entity updates immediately in list; toast shown | Revert on API failure |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| List role | `role="list"` on entity list container; `role="listitem"` per item |
| Table semantics | Native `<table>` with `<th>`, `<caption>`, `<thead>`, `<tbody>` |
| Row actions | `aria-label="Edit {entity name}"`, `aria-label="Delete {entity name}"` |
| Sortable columns | `aria-sort="ascending"` / `"descending"` / `"none"` on column headers |
| Selection | Checkboxes with `aria-label="Select {entity name}"` |
| Batch actions | `aria-label="N items selected"` on BatchActionBar |
| Create button | `aria-label="Create new {entity type}"` |
| Delete confirmation | `role="alertdialog"`, `aria-describedby` linking to warning message |
| Form validation | `aria-invalid` on errored fields, `aria-describedby` for error messages |
| Inline editing | `aria-label="Edit {field name}"` on editable cell |
| Toast feedback | `role="status"`, `aria-live="polite"` |
| Undo action | `aria-label="Undo {action}"` on undo button |
| Pagination | `aria-label="Pagination"`, `aria-current="page"` on active page |
| Focus management | Focus returns to trigger element after dialog close; focus moves to first invalid field on form error |
| Keyboard | Tab through table rows; Enter/Space to activate row actions; Escape closes forms and dialogs |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Card-based layout forced regardless of variant. Table variant converts to card list. 1 column. Create form opens as full-screen dialog. Inline editing disabled. Batch bar stacks vertically. |
| Tablet (768-1023px) | Card-based: 2 columns. Table: horizontal scroll with sticky first column. Create form as modal dialog. Inline editing available. |
| Desktop (1024-1279px) | Card-based: 3 columns. Table: full width with sortable headers. Create/Edit as modal dialog (md size). Full inline editing. |
| Wide (1280-1599px) | Card-based: 4 columns. Table: full width with optimized column widths. Create/Edit as modal (lg size). |
| Ultra-wide (1600px+) | Card-based: 4-5 columns. Table: full width. Create/Edit as modal (lg size) with multi-column form layout. |

---

## Implementation Example

```typescript
// CRUDPage container orchestrates the full pattern
<CRUDPage
  entityType="job"
  variant="card"
  onCreate={handleCreate}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
>
  <Topbar
    title="Jobs"
    actions={<Button variant="primary" icon={PlusIcon} onClick={openCreateForm}>Create Job</Button>}
  />
  <ViewToggle active={view} onChange={setView} />
  {view === 'table' && (
    <Table
      data={jobs}
      columns={jobColumns}
      sortable
      selectable
      onSelectionChange={setSelected}
    >
      <Table.Row>
        <Table.Cell><Avatar src={job.logo} /> {job.title}</Table.Cell>
        <Table.Cell>{job.company}</Table.Cell>
        <Table.Cell><Badge variant={job.status}>{job.status}</Badge></Table.Cell>
        <Table.Cell>
          <RowActions
            onEdit={() => openEditForm(job)}
            onDelete={() => openDeleteConfirm(job)}
            onDuplicate={() => handleDuplicate(job)}
          />
        </Table.Cell>
      </Table.Row>
    </Table>
  )}
  <Pagination page={page} total={total} onChange={setPage} />
  {selected.length > 0 && (
    <BatchActionBar
      count={selected.length}
      onDelete={handleBatchDelete}
      onClear={() => setSelected([])}
    />
  )}
  <ConfirmationDialog
    open={deleteConfirm.open}
    variant="destructive"
    title="Delete Job"
    message={`Are you sure you want to delete "${deleteConfirm.entity?.title}"?`}
    onConfirm={handleDeleteConfirm}
    onCancel={closeDeleteConfirm}
    loading={isDeleting}
  />
</CRUDPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Dashboard-Pattern.md](Dashboard-Pattern.md) | Dashboard cards can link to CRUD pages for entity management |
| [Search-Pattern.md](Search-Pattern.md) | Search results displayed in CRUD list/table; search filters apply to entity queries |
| [Upload-Pattern.md](Upload-Pattern.md) | File upload integrated within Create/Edit forms for entity attachments |
| [Settings-Pattern.md](Settings-Pattern.md) | Settings sections use CRUD pattern for configuration entities |
| [Profile-Pattern.md](Profile-Pattern.md) | Profile editing uses CRUD create/edit form pattern |
| [Authentication-Pattern.md](Authentication-Pattern.md) | User management in enterprise uses CRUD pattern |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Button](../Core/Button.md) | Create, Save, Cancel, Confirm actions |
| [Card](../Core/Card.md) | Card-based variant entity display |
| [Table](../Data/Table.md) | Table-based variant entity display |
| [List](../Data/List.md) | List-based variant entity display |
| [FormGroup](../Forms/FormGroup.md) | Create/Edit form fields |
| [Input](../Forms/Input.md) | Text field inputs |
| [Select](../Forms/Select.md) | Dropdown selections |
| [DatePicker](../Forms/DatePicker.md) | Date fields |
| [Switch](../Forms/Switch.md) | Boolean toggles |
| [Checkbox](../Forms/Checkbox.md) | Batch selection |
| [ConfirmationDialog](../Feedback/ConfirmationDialog.md) | Delete confirmation |
| [Dialog](../Feedback/Dialog.md) | Create/Edit form container |
| [Pagination](../Navigation/Pagination.md) | Page navigation |
| [Toast](../Feedback/Toast.md) | Success/error feedback |
| [EmptyState](../Feedback/EmptyState.md) | Empty list display |
| [ErrorState](../Feedback/ErrorState.md) | Error display |
| [Skeleton](../Feedback/Skeleton.md) | Loading state |
| [Badge](../Core/Badge.md) | Status indicators |
| [Avatar](../Core/Avatar.md) | Entity avatars |

## Anti-patterns

1. **Delete without confirmation** — Every destructive action must use ConfirmationDialog.
2. **No optimistic updates** — Updates should reflect immediately in the UI with background sync.
3. **Inline editing without escape** — Escape must always revert to original value.
4. **Batch actions without selection feedback** — Show count and allow clear selection.
5. **No undo** — Destructive batch operations must support undo within a time window.
6. **Loading states without skeletons** — Use skeleton placeholders, not spinners, for list loading.
7. **Creating without validation feedback** — Every form field must show validation state.
8. **Editing without change tracking** — Track dirty state and prompt discard on navigation away.
9. **Table without horizontal scroll on mobile** — Table variant must support horizontal scroll.
10. **No pagination for large datasets** — Always paginate beyond 50 items.
