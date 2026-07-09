# State — Offline

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Project-Constitution.md](../../01-Constitution/Project-Constitution.md) — Principle 8: Offline is Not Optional)

---

## Purpose

Defines offline behavior for the application shell — how the workspace responds when network connectivity is lost.

---

## Offline State Behavior

### Detection
- Connectivity is detected via `navigator.onLine` and `online`/`offline` events
- Service worker health check (if applicable)
- API health endpoint monitoring

### Visual Indicators

| Element | Normal | Offline |
|---------|--------|---------|
| Status area | No indicator | Yellow/orange dot + "Offline" label |
| Header | Normal | Subtle banner: "You're offline. Some features may be unavailable." |
| AI Region | AI available | "AI services unavailable offline" message |
| Quick actions | All enabled | Actions requiring network are disabled with tooltip |

### Functional Behavior

| Feature | Offline Behavior |
|---------|-----------------|
| Cached pages | Render from cache (service worker) |
| Data entry | Queue changes locally, sync when online |
| Navigation | All local routes available |
| Search | Search cached/indexed content only |
| AI | Unavailable (graceful message) |
| Notifications | Queued, delivered on reconnection |
| File upload | Queued, upload on reconnection |

---

## Offline State Rules

| Rule | Description |
|------|-------------|
| Transparent | Offline state is clearly communicated |
| Functional | Core functionality works offline (navigation, cached content) |
| Graceful | Disabled features show explanation, not errors |
| Queue | User actions are queued and synced when online |
| Reconnection | Reconnection is automatic with visual confirmation |
| Conflict resolution | If conflicts arise on sync, user is prompted to resolve |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Error.md](Error.md) | Error state for failed sync |
| [Architecture/Performance.md](../Architecture/Performance.md) | Offline caching strategy |

---

*Offline support ensures the workspace is never completely unavailable. Core functionality works without connectivity.*
