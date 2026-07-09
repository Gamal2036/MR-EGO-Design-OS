# Profile Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 13, 17), DP-4 ([Profile-Layout.md](../05-Application-Shell/Layouts/Profile-Layout.md)), DP-3 ([Profile-Pattern.md](../04-Component-Library/Patterns/Profile-Pattern.md))

---

## Purpose

Provide a comprehensive view of the user's professional identity with controls for editing, privacy, and data management.

---

## User Goal

"Present my best professional self and control who sees what."

---

## Flow Architecture

```
                    ┌─────────────────────────────────────────────────────┐
                    │                  PROFILE WORKSPACE                   │
                    └─────────────────────────────────────────────────────┘
                                                                          
  ┌──────────────┐             ┌──────────────────────────────────────────┐
  │  PROFILE     │             │               TABS                       │
  │  HEADER      │             │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐  │
  │              │             │  │ABOUT │ │EXPER.│ │SKILLS│ │DOCUMTS │  │
  │  Avatar      │             │  └──────┘ └──────┘ └──────┘ └────────┘  │
  │  Name        │             └──────────────────────────────────────────┘
  │  Role        │                           │
  │  Actions     │             ┌──────────────▼───────────────────────────┐
  └──────────────┘             │            TAB CONTENT                    │
                               │  (View mode by default)                  │
                               │  Edit mode per section                   │
                               └──────────────────────────────────────────┘
```

---

## Section Specifications

### Profile Header

| Aspect | Value |
|--------|-------|
| **Content** | Avatar (96px), full name, job title, company, location, member since, verification badge, availability badge |
| **Actions (owner)** | "Edit Profile", "Share" |
| **Actions (public)** | "Connect", "Message", "Share" |
| **States** | Loading (skeleton), Loaded, Edit (avatar upload overlay) |
| **Accessibility** | Avatar `aria-label`, name as `<h1>`, role as `<p>` |

### About Tab

| Aspect | Value |
|--------|-------|
| **Content** | Bio (rich text), contact info (conditional), links (portfolio, social, website) |
| **Edit** | Inline textarea for bio, inputs for contact and links |
| **Privacy** | Contact info visibility controlled per field |
| **Empty State** | "Add a bio to tell your story" |

### Experience Tab

| Aspect | Value |
|--------|-------|
| **Content** | Chronological experience cards (company, title, dates, description, skills used) |
| **Edit** | Add/edit/delete experience, drag to reorder |
| **Privacy** | Hide individual entries if desired |
| **Empty State** | "Add your work experience" |

### Skills Tab

| Aspect | Value |
|--------|-------|
| **Content** | Skill tags grouped by category, proficiency indicators |
| **Edit** | Add/remove skills, set proficiency, reorder |
| **AI Interaction** | AI suggests skills based on experience |
| **Empty State** | "Add skills that represent your expertise" |

### Documents Tab

| Aspect | Value |
|--------|-------|
| **Content** | Uploaded CVs, cover letters, portfolios |
| **Edit** | Upload, delete, set as default CV |
| **Privacy** | Public/private per document |
| **Empty State** | "Upload your CV to get started" |

---

## Navigation

| Action | Source → Destination |
|--------|---------------------|
| View profile | Sidebar Profile icon → Profile |
| Edit profile | "Edit Profile" button → Inline edit mode |
| Switch tabs | Tab click → Tab content |
| View other profile | Click avatar/name → Other profile (limited view) |
| Back from edit | "Cancel" or "Save" → View mode |

---

## Privacy Model

| Field | Owner View | Public View | Connection View |
|-------|-----------|-------------|-----------------|
| Name | Visible | Visible | Visible |
| Photo | Visible | Visible | Visible |
| Role | Visible | Visible | Visible |
| Company | Visible | Visible | Visible |
| Location | Visible | City only | Visible |
| Email | Visible | Hidden | Visible |
| Phone | Visible | Hidden | Hidden |
| Bio | Visible | Visible | Visible |
| Experience | Visible | Visible (dates hidden) | Visible |
| Skills | Visible | Visible | Visible |
| Documents | Visible | Public docs only | Public docs only |
| Activity | Visible | Hidden | Limited |

---

## State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Loading | Skeleton header + section placeholders | Data fetching |
| View (owner) | Full profile with edit controls | Read with edit capability |
| View (other) | Privacy-filtered profile | Connect/message actions |
| Edit mode | Inline form fields | Save/Cancel per section |
| Saving | Button spinner | Section-level save |
| Saved | Toast confirmation | Return to view |
| Error (load) | ErrorState with retry | Retry or go back |
| Error (save) | Inline error message | Retry save |
| Empty section | EmptyState with prompt | Add first item |
| Avatar uploading | Progress overlay | Upload in progress |

---

## Entry Points

| Source | Trigger |
|--------|---------|
| Sidebar | Profile icon click |
| Dashboard | User avatar/name click → "View Profile" |
| User menu | Topbar avatar → "Profile" |
| Command palette | Ctrl+K → "Profile" or g + p |

## Exit Points

| Action | Destination |
|--------|-------------|
| Dashboard click | Dashboard |
| Settings click | Settings |
| Logout | Landing |
| Navigation click | Any module |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Header | `role="region"` with `aria-label="Profile header"` |
| Avatar | `role="img"`, `aria-label="{name}'s profile photo"` |
| Tab list | `role="tablist"`, `aria-label="Profile sections"` |
| Tab panels | `role="tabpanel"`, `aria-labelledby` linked to tab |
| Edit button | `aria-label="Edit profile"` |
| Section content | `<section>` with `aria-label` per section |
| Experience cards | `role="article"` |
| Skills | `<ul>` with `aria-label="Skills"` |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Header stacked (centered avatar), scrollable tabs, single-column sections, compact cards |
| Tablet (768-1023px) | Header: avatar left + info right, 2-column skills |
| Desktop (1024-1279px) | Header full width + actions right, 3-column skills, experience as list |
| Ultra-wide (1600px+) | Content constrained 960px centered, header expanded with more meta |

---

## AI Interaction

| Surface | AI Role |
|---------|---------|
| Skills tab | AI suggests skills based on experience + CV |
| Experience | AI suggests descriptions, quantifies achievements |
| Profile completeness | AI calculates score + suggests missing sections |
| Public view | AI suggests what to hide/show based on audience |
| Bio | AI suggests professional summary based on profile |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Profile QR code / share link | Phase 7 |
| Public profile page (external) | Phase 7 |
| Profile analytics (who viewed) | Phase 7 |
| Endorsement system | Phase 6 |
| Recommendation letters | Phase 6 |
| Cross-platform profile sync | Phase 12 |

---

*The Profile is the user's identity hub in MR:EGO. Privacy-first, edit-granular, and AI-enhanced. Refer to [Settings-Flow.md](Settings-Flow.md) for configuration not related to identity and [Screen-Inventory.md](Screen-Inventory.md) for detailed specifications.*
