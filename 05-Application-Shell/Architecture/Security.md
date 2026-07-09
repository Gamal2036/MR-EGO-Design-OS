# Architecture — Security

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — Data Integrity, Scalability Rules)

---

## Purpose

Defines security architecture for the application shell — workspace isolation, permission zones, protected regions, and sensitive UI rules.

---

## Workspace Isolation

| Rule | Description |
|------|-------------|
| Module isolation | Each module operates in an isolated context. No cross-module data access without permission. |
| Iframe isolation (future) | Untrusted third-party modules can be sandboxed in iframes. |
| Data compartmentalization | Module data is stored in separate data stores. Cross-module queries require explicit API calls. |
| UI isolation | One module's error does not crash or corrupt another module's UI. |

---

## Permission Zones

| Zone | Access Level | Components |
|------|-------------|------------|
| Public | No authentication required | Authentication pages, public profile |
| Authenticated | Any logged-in user | Dashboard, Jobs, AI, Documents |
| Sensitive | Authenticated + permission check | Settings (admin), billing |
| Admin | Authenticated + admin role | Admin console, system settings |
| Read-only | Authenticated + read-only permission | Shared documents (viewer) |

---

## Protected Regions

| Region | Protection |
|--------|------------|
| Admin section | Role-based access control. Hidden from non-admin menu. Direct URL access returns 403. |
| Billing | Authentication + subscription status check |
| User data | Authentication + data ownership check |
| Settings | Authentication + permission check per section |

---

## Admin Separation

| Rule | Description |
|------|-------------|
| Separate namespace | Admin features are in a separate namespace (`/admin/*`) |
| Visual distinction | Admin UI uses distinct styling (subtle badge or border) |
| No data leakage | Admin features never expose user data in non-admin contexts |
| Audit logging | All admin actions are logged with user, action, timestamp |

---

## Sensitive UI Rules

| Rule | Description |
|------|-------------|
| Data masking | Sensitive data (passwords, API keys, SSN) is masked by default |
| Confirmation required | Destructive actions require confirmation (type-to-confirm for critical) |
| Session timeout | Automatic logout after inactivity (configurable: 15-60 min) |
| Re-authentication | Sensitive actions (billing, password change) require re-auth |
| Input sanitization | All user inputs are sanitized before display (XSS prevention) |
| CSP headers | Content Security Policy headers are enforced |
| CSRF protection | All state-changing requests include CSRF tokens |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [States/Unauthorized.md](../States/Unauthorized.md) | Unauthorized access state |
| [States/Read-Only.md](../States/Read-Only.md) | Read-only permission state |

---

*Security is inherent in every architectural decision. The workspace protects user data through isolation, permission enforcement, and secure UI patterns.*
