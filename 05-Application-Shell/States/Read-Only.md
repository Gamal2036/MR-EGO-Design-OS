# State — Read Only

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Project-Constitution.md](../../01-Constitution/Project-Constitution.md) — Data Sovereignty)

---

## Purpose

Defines the read-only state — how the workspace behaves when the user has view-only access to content (due to permissions, sharing context, or offline mode).

---

## Read-Only State Behavior

### Visual Indicators
- Banner below header: "View-only mode"
- Edit controls are disabled (greyed out) with tooltip: "Read-only"
- Create/Edit/Delete actions are hidden or disabled
- A lock icon may appear in the region header

### Functional Behavior

| Action | Read-Only Behavior |
|--------|-------------------|
| View content | Fully available |
| Edit fields | Disabled with explanation tooltip |
| Create new | Button disabled or hidden |
| Delete | Button disabled or hidden |
| Share | Available (if user has share permission) |
| Export | Available (unless restricted) |
| Comment/annotate | Available (if enabled for read-only mode) |

### Transitions

| Transition | Behavior |
|------------|----------|
| Read-only → Editable | Banner disappears. Controls re-enable. No page reload. |
| Editable → Read-only | Banner appears. Controls disable. Unsaved changes are saved or warned. |

---

## Read-Only State Rules

| Rule | Description |
|------|-------------|
| Clear indication | Read-only mode is clearly and consistently indicated |
| No data loss | Users can view all data without restriction |
| Export allowed | Users can export/print content in read-only mode |
| Feedback expected | Disabled controls explain why they are disabled |
| Permissions explained | Banner includes a brief explanation of the access level |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Offline.md](Offline.md) | Offline mode may trigger read-only behavior |

---

*Read-only state ensures users can view and interact with content even when they cannot edit it. The state is clearly communicated and navigation is unrestricted.*
