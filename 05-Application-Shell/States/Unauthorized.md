# State — Unauthorized

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — Data Integrity)

---

## Purpose

Defines the unauthorized state — how the workspace responds when a user attempts to access a page or feature they do not have permission to use.

---

## Unauthorized State Types

### Authentication Required (Not Logged In)
- Redirect to authentication layout
- Return path preserved for post-login redirect

### Insufficient Permissions (Logged In)
- Full-page error state within the workspace shell
- Icon: lock or shield
- Title: "Access Denied"
- Message: "You don't have permission to access this section"
- Actions: "Go to Dashboard" | "Request Access"
- Header and sidebar remain visible (user can navigate elsewhere)

### Feature Disabled
- Feature is visually disabled in the UI
- Tooltip explains: "This feature is not available in your plan"
- Optional: Upgrade CTA (for subscription-gated features)

### Module Not Enabled
- Module navigation item is visible but disabled
- Click opens module marketplace / enable dialog
- "Enable Module" action

---

## Unauthorized State Rules

| Rule | Description |
|------|-------------|
| Never expose | Never reveal why access is denied (security) |
| Clear messaging | "You don't have access" — not "Error 403" |
| Actionable | Provide a way to request access or navigate elsewhere |
| No data leakage | Unauthorized pages do not reveal that the page or data exists |
| Consistent | All unauthorized states use the same pattern |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Error.md](Error.md) | Error state overlap with permission errors |

---

*Unauthorized states handle access control gracefully. They protect data while providing clear, actionable feedback to the user.*
