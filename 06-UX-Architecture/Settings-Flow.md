# Settings Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 13, 17), DP-4 ([Settings-Layout.md](../05-Application-Shell/Layouts/Settings-Layout.md)), DP-3 ([Settings-Pattern.md](../04-Component-Library/Patterns/Settings-Pattern.md))

---

## Purpose

Provide a centralized interface for managing all user preferences, account settings, privacy controls, and application configuration.

---

## User Goal

"Configure MR:EGO to work the way I want."

---

## Flow Architecture

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                          SETTINGS WORKSPACE                          │
  ├───────────┬─────────────────────────────────────────────────────────┤
  │ SECTIONS  │                    CONTENT                               │
  │           │                                                          │
  │ Profile   │  ┌──────────────────────────────────────────────────┐   │
  │ Notific.  │  │  Section title + description                     │   │
  │ Privacy   │  │                                                   │   │
  │ Appear.   │  │  Group 1: [Setting label]    [Control]           │   │
  │ Security  │  │  Group 2: [Setting label]    [Control]           │   │
  │           │  │  ...                                              │   │
  │           │  └──────────────────────────────────────────────────┘   │
  ├───────────┴─────────────────────────────────────────────────────────┤
  │           [Save Changes] [Discard]  (when unsaved)                  │
  └─────────────────────────────────────────────────────────────────────┘
```

---

## Section Specifications

### Profile Settings

| Aspect | Value |
|--------|-------|
| **Purpose** | Edit personal information and contact details |
| **Entries** | Name, email, phone, location, bio, social links, avatar |
| **Save Behavior** | Auto-save on field blur + manual save |
| **Privacy** | Visibility toggles per field |

### Notification Settings

| Aspect | Value |
|--------|-------|
| **Purpose** | Configure notification channels and frequency |
| **Entries** | Email notifications (on/off per type), Push notifications, In-app alerts, Digest frequency (daily/weekly/never), Quiet hours |
| **Save Behavior** | Auto-save on toggle |
| **Notification Types** | Application status, Job recommendations, Profile views, Messages, Career insights, System updates |

### Privacy Settings

| Aspect | Value |
|--------|-------|
| **Purpose** | Control data visibility and sharing |
| **Entries** | Profile visibility (public/connections/private), Activity status, Search indexing, Data sharing for AI improvement, Data export, Account deletion |
| **Save Behavior** | Manual save with confirmation for sensitive changes |

### Appearance Settings

| Aspect | Value |
|--------|-------|
| **Purpose** | Customize visual preferences |
| **Entries** | Theme (light/dark/system), Accent color, Font size (slider), Density (comfortable/compact), Reduce motion toggle |
| **Save Behavior** | Instant apply (no save button) |

### Security Settings

| Aspect | Value |
|--------|-------|
| **Purpose** | Manage account security |
| **Entries** | Password change, Two-factor authentication, Active sessions (view + revoke), Login history |
| **Save Behavior** | Manual save; sensitive actions require re-authentication |

### Preferences

| Aspect | Value |
|--------|-------|
| **Purpose** | Configure application behavior |
| **Entries** | Default CV, Job search defaults (location, remote preference), Language/Locale, Timezone, AI assistance level (full/suggestions only/off), Command palette shortcuts |

---

## Entry Points

| Source | Trigger |
|--------|---------|
| User menu | Topbar avatar → "Settings" |
| Sidebar | Settings gear icon |
| Command palette | Ctrl+K → "Settings" or Ctrl+, |
| Dashboard | Quick action → Settings |

## Exit Points

| Source | Destination |
|--------|-------------|
| Any settings page | Sidebar navigation |
| Save | Stay on section |
| Discard (with changes) | Confirmation → previous page |

---

## Change Tracking

- Unsaved changes trigger sticky bottom bar: "You have unsaved changes" + Save/Discard
- Navigating away with unsaved changes shows confirmation dialog
- Theme and language changes apply instantly without save

---

## Danger Zone

| Action | Protection | Description |
|--------|-----------|-------------|
| Delete account | Requires: password re-entry + confirmation text + 30-day grace period | Irreversible after grace period |
| Export all data | One-click (may take time) | Generates JSON/CSV/Markdown archive |
| Clear AI memory | Confirmation dialog | Removes AI-learned preferences |
| Reset all settings | Confirmation dialog | Returns to defaults |

---

## State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Loading | Skeleton sections | Settings loading |
| Default | Section with current values | Ready for interaction |
| Editing | Active control highlighted | User modifying |
| Unsaved | Sticky save bar visible | Changes pending |
| Saving | Button spinner | Saving in progress |
| Saved | Toast + bar hides | Changes applied |
| Error | Inline error message | Retry |
| Danger action | Confirmation dialog | Double confirm |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Section nav | `role="navigation"` with `aria-label="Settings sections"` |
| Content region | `role="region"` with `aria-labelledby` |
| Switch | `role="switch"`, `aria-checked` |
| Slider | `role="slider"`, `aria-valuenow` |
| Danger zone | `aria-label="Danger zone"` |
| Save button | `aria-label="Save settings"` |
| Discard button | `aria-label="Discard changes"` |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Section selector as top tabs, single-column controls, sticky bottom save bar |
| Tablet (768-1023px) | Collapsible section sidebar, single-column settings |
| Desktop (1024-1279px) | Fixed sidebar (200px) + content, inline label-control layout |
| Ultra-wide (1600px+) | Content 960px centered, multi-column for dense groups |

---

## AI Interaction

| Surface | AI Role |
|---------|---------|
| Privacy settings | AI explains data usage implications |
| Notification settings | AI suggests optimal notification config based on usage |
| Appearance | AI recommends theme based on time-of-day |
| Security | AI alerts about unusual login activity |
| Preferences | AI suggests AI assistance level based on engagement |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Enterprise admin settings | Phase 11 |
| Module-specific settings | Phase 8+ |
| Billing and subscription | Phase 11 |
| API key management | Phase 12 |
| Team settings (enterprise) | Phase 11 |
| Integration management | Phase 12 |

---

*Settings are the user's control panel. Every preference is clearly described, changes are tracked, and destructive actions are protected. Refer to [Profile-Flow.md](Profile-Flow.md) for identity-related settings and [Notification-Flow.md](Notification-Flow.md) for notification configuration details.*
