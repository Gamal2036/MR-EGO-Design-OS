# DP-25.1 — Documents Center Route Architecture Fix

## Summary

Refactored the Documents Center routing to align with MR:EGO's dashboard module hierarchy. The route moved from `/documents` to `/dashboard/documents`, matching the architecture used by `/dashboard/jobs`, `/dashboard/applications`, `/dashboard/cv-builder`, and `/dashboard/cv-analysis`.

## Problem

The Documents Center was implemented at:

- File: `app/(dashboard)/documents/page.tsx`
- URL: `/documents`

All other dashboard modules live under `/dashboard/*`. This inconsistency broke the expected navigation hierarchy and caused `/dashboard/documents` to return 404.

## Solution

### 1. Route Moved

- Created: `app/(dashboard)/dashboard/documents/page.tsx`
- Removed: `app/(dashboard)/documents/page.tsx`
- Only one source of truth remains.

### 2. Redirect Added

Added a permanent redirect in `next.config.ts`:

```ts
redirects: async () => [
  {
    source: "/documents",
    destination: "/dashboard/documents",
    permanent: true,
  },
],
```

Old bookmarks and external links to `/documents` now forward to the canonical URL.

### 3. Navigation Updated

Updated `config/navigation.ts`:

```ts
{
  label: "Documents",
  icon: FolderOpen,
  href: "/dashboard/documents",
  module: "documents",
}
```

The sidebar now opens `/dashboard/documents` and shows the correct active state.

### 4. Middleware Updated

Updated `middleware.ts` protected paths:

- Replaced `/documents` with `/dashboard/documents` in `protectedPaths`.
- `/dashboard/documents` is also covered by the existing `/dashboard` prefix.

### 5. Dashboard Quick Actions Updated

Added a Documents Center quick action in `data/dashboard.ts`:

```ts
{
  id: "qa-6",
  label: "Documents Center",
  description: "Manage all your career documents",
  icon: "FolderOpen",
  href: "/dashboard/documents",
}
```

Updated `components/dashboard/quick-action-card.tsx` to support the `FolderOpen` icon.

Updated `app/(dashboard)/dashboard/page.tsx` so the Documents Center quick action navigates to `/dashboard/documents`.

### 6. Application Tracker Links Updated

Updated `components/applications/ApplicationQuickActions.tsx`:

- Documents Center quick action now links to `/dashboard/documents` instead of showing "Coming Soon".

Updated `components/applications/ApplicationDocumentsPanel.tsx`:

- Empty state now links to `/dashboard/documents` with "Open Documents Center".
- Removed outdated "Documents will be available in DP-25" placeholder text.

### 7. Breadcrumb Added

Added breadcrumb to `app/(dashboard)/dashboard/documents/page.tsx`:

```tsx
<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Documents" },
  ]}
/>
```

## Files Changed

| File | Change |
|------|--------|
| `app/(dashboard)/dashboard/documents/page.tsx` | Created new canonical route with breadcrumb |
| `app/(dashboard)/documents/page.tsx` | Removed old route |
| `next.config.ts` | Added permanent redirect from `/documents` |
| `config/navigation.ts` | Updated sidebar Documents href |
| `middleware.ts` | Updated protected path |
| `data/dashboard.ts` | Added Documents Center quick action |
| `components/dashboard/quick-action-card.tsx` | Added `FolderOpen` icon support |
| `app/(dashboard)/dashboard/page.tsx` | Documents Center quick action navigates |
| `components/applications/ApplicationQuickActions.tsx` | Documents Center links to new route |
| `components/applications/ApplicationDocumentsPanel.tsx` | Empty state links to Documents Center |

## Verification

Ran:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Results:

- `pnpm lint`: PASS — No ESLint warnings or errors
- `pnpm typecheck`: PASS — No TypeScript errors
- `pnpm build`: PASS — Build succeeded

Build route list confirms `/dashboard/documents` exists:

```
○ /dashboard/documents                 3.72 kB         116 kB
```

Manual verification:

- ✅ `/dashboard/documents` route exists
- ✅ Sidebar Documents link opens `/dashboard/documents`
- ✅ Dashboard Documents Center quick action opens `/dashboard/documents`
- ✅ Application Tracker Documents Center quick action opens `/dashboard/documents`
- ✅ Application Tracker empty documents state links to `/dashboard/documents`
- ✅ Breadcrumb renders Dashboard → Documents
- ✅ Old `/documents` redirects to `/dashboard/documents`
- ✅ No duplicate Documents route
- ✅ No 404

## Known Limitations

- The Documents Center page currently shows an Under Construction placeholder. The full Documents Center UI will be implemented in a future phase.
- Other dashboard quick actions still reference placeholder or disabled routes (`/cv/list`, `/cv/analysis`, `/ai/chat`). Only the Documents Center quick action was updated as part of this route fix.

## Backend Integration Points

- Redirect logic is handled by Next.js config and middleware.
- Navigation config (`SIDEBAR_NAV`) remains the single source of truth for sidebar and mobile navigation.
- When the full Documents Center is implemented, it will live at `app/(dashboard)/dashboard/documents/page.tsx`.

## Next Phase Recommendation

Proceed with DP-26 Career Progress. The Documents Center route architecture is now consistent with the rest of MR:EGO and ready for full feature implementation when scheduled.
