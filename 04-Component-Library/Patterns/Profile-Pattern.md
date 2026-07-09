# Profile-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the user profile layout for viewing and editing personal information, professional background, skills, documents, and activity. Supports view mode, edit mode, and public view for other users.

---

## Composition

```
ProfilePage (Container)
├── ProfileHeader (hero section)
│   ├── Avatar (large, 96px-128px)
│   │   ├── AvatarImage
│   │   └── AvatarEditOverlay (edit mode, camera icon)
│   ├── ProfileName (full name, heading)
│   ├── ProfileRole (job title / role)
│   ├── ProfileMeta
│   │   ├── Location (with map pin icon)
│   │   ├── Company
│   │   ├── Email (conditional, privacy-dependent)
│   │   └── MemberSince
│   ├── ProfileActions
│   │   ├── EditProfileButton (owner view)
│   │   ├── FollowButton / ConnectButton (public view)
│   │   ├── ShareButton
│   │   └── MessageButton (public view)
│   └── ProfileStatus
│       ├── AvailabilityBadge (Open to work / Available / Busy)
│       └── VerificationBadge (verified account)
├── ProfileTabs (section navigation)
│   ├── Tab ("About")
│   ├── Tab ("Experience")
│   ├── Tab ("Skills")
│   ├── Tab ("Documents")
│   └── Tab ("Activity")
├── ProfileContent (active tab panel)
│   ├── AboutSection
│   │   ├── Bio (rich text or markdown)
│   │   ├── ContactInfo (conditional visibility)
│   │   └── Links (social, portfolio, website)
│   ├── ExperienceSection
│   │   ├── ExperienceCard (multiple, chronological)
│   │   │   ├── CompanyLogo
│   │   │   ├── JobTitle
│   │   │   ├── CompanyName
│   │   │   ├── DateRange
│   │   │   ├── Description
│   │   │   └── Tags (skills used)
│   │   └── AddExperienceButton (edit mode)
│   ├── SkillsSection
│   │   ├── SkillTag (multiple)
│   │   │   ├── SkillName
│   │   │   └── EndorsementCount (optional)
│   │   ├── SkillCategory (grouped)
│   │   └── AddSkillButton (edit mode)
│   ├── DocumentsSection
│   │   ├── DocumentCard (multiple)
│   │   │   ├── FileIcon
│   │   │   ├── DocumentName
│   │   │   ├── DocumentType
│   │   │   ├── UploadDate
│   │   │   └── Actions (download, delete)
│   │   └── UploadButton (edit mode)
│   └── ActivitySection
│       ├── ActivityFilter (All / Posts / Comments / Likes)
│       └── ActivityFeed
│           └── ActivityCard (multiple)
│               ├── ActivityIcon
│               ├── ActivityText
│               ├── ActivityTarget (link to related entity)
│               └── Timestamp
└── ProfileEditForm (edit mode overlay or inline)
    ├── FormSection (multiple)
    │   ├── FormGroup
    │   │   ├── Input (name, email, phone, location)
    │   │   ├── Textarea (bio)
    │   │   ├── Select (role, industry)
    │   │   └── Switch (privacy toggles)
    │   └── FormActions (Save, Cancel)
    └── AvatarUpload (embedded UploadZone)
        ├── AvatarPreview (circular crop)
        └── UploadButton
```

---

## When to Use

- User profile pages (own profile and viewing other users)
- Professional profiles with experience, skills, and portfolio
- Employee/team member profiles in enterprise context
- Public-facing user representation

## When NOT to Use

- Simple user identity display (use Avatar + Name in a Card instead)
- Admin user management (use enterprise CRUD pattern)
- Application forms (use Wizard-Pattern)
- Settings configuration (use Settings-Pattern)

---

## Variants

### View Mode (Owner)
| Aspect | Specification |
|--------|---------------|
| Header | Avatar (96px), name, role, edit button |
| Tabs | All sections visible and editable |
| Actions | Edit Profile, Share, Settings |
| Privacy | All fields visible to owner |

### View Mode (Other User)
| Aspect | Specification |
|--------|---------------|
| Header | Avatar (96px), name, role, connect/message buttons |
| Tabs | Sections visible per privacy settings |
| Actions | Connect, Message, Share |
| Privacy | Respects target user's privacy settings |

### Edit Mode
| Aspect | Specification |
|--------|---------------|
| Layout | Inline editing within sections or full-page form |
| Header | Avatar editable (upload overlay); name fields editable |
| Sections | Each tab becomes editable form with Save/Cancel |
| Save | Per-section save or global save |
| Cancel | Discard changes per section |

### Public View
| Aspect | Specification |
|--------|---------------|
| Header | Avatar (96px), name, role only |
| Tabs | About (limited), Skills, Documents (public) |
| Actions | Connect, Message, Share, Report |
| Privacy | Minimal information; no contact details |

### Minimal Profile
| Aspect | Specification |
|--------|---------------|
| Layout | Single column, compact |
| Header | Avatar (64px), name, role inline |
| Sections | About, Skills (only) |
| Use case | Team directory card, comment author popover |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton header (avatar circle, 2 text lines); skeleton tab content (3-5 lines) | Profile data loading |
| **Loaded (view)** | Full profile with header, tabs, content | All sections interactive |
| **Loaded (other)** | Profile with privacy-limited fields | Contact/connect actions available |
| **Editing** | Inline form fields replace display text; Save/Cancel per section; avatar shows upload overlay | Form fields editable |
| **Saving** | Save button shows spinner; section dimmed during save | Saving in progress |
| **Saved** | Toast "Profile updated"; fields return to display mode | Save successful |
| **Error loading** | ErrorState in content area; retry button | Data fetch failure |
| **Error saving** | Error message on failed section; retry save | Save failed |
| **Empty section** | EmptyState "No {section} added yet" with Add button | User has no data in section |
| **Public view** | Reduced fields; no edit controls; connect/message visible | External user viewing |
| **Private field** | "Private" placeholder instead of hidden field value | Field hidden due to privacy |
| **Uploading avatar** | Avatar shows progress overlay; spinner | Avatar upload in progress |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Header role | `role="region"`, `aria-label="Profile header"` |
| Avatar | `role="img"`, `aria-label="{name}'s profile photo"` |
| Edit avatar | `aria-label="Change profile photo"` on upload overlay |
| Profile name | `<h1>` heading |
| Profile role | `<p>` or `<span>` with appropriate heading level |
| Tab list | `role="tablist"`, `aria-label="Profile sections"` |
| Tab panels | `role="tabpanel"`, `aria-labelledby` linked to tab |
| Edit button | `aria-label="Edit profile"` |
| Connect button | `aria-label="Connect with {name}"` |
| Message button | `aria-label="Send message to {name}"` |
| Section content | `<section>` with `aria-label` per section |
| Experience cards | `role="article"`, `aria-label="{job title} at {company}"` |
| Skills | `<ul>` with `<li>` per skill; `aria-label="Skills"` |
| Documents | `role="list"`, each document has `aria-label` with name |
| Activity feed | `aria-live="polite"` for new activity |
| Privacy indicators | "Private" fields labeled clearly, not hidden |
| Keyboard | Tab navigates tabs and content; Arrow keys for tab switching; Enter/Space to activate |
| Focus management | Focus moves to section title after tab change; focus returns after edit save |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Header stacked: avatar centered, name/role below. Tabs scrollable (horizontal swipe). Sections full-width single column. Experience cards compact. Skills wrap inline. Activity compact. Edit mode: full-screen form. Avatar: 80px. |
| Tablet (768-1023px) | Header: avatar left, info right. Tabs: scrollable bar. Sections: 2-column layout for skills and documents. |
| Desktop (1024-1279px) | Header: avatar left (96px), info right, actions right-aligned. Tabs: full-width bar. Sections: experience list, skills grid (3 columns), documents grid (2 columns). |
| Wide (1280-1599px) | Profile content constrained to 960px max width. Sections use available space. Skills: 4 columns. |
| Ultra-wide (1600px+) | Profile content 960px centered. Header wider with expanded meta information. |

---

## Implementation Example

```typescript
<ProfilePage userId={userId}>
  <ProfileHeader>
    <Avatar src={profile.avatarUrl} size="lg" editable={isOwner}>
      {isOwner && <AvatarEditOverlay onUpload={handleAvatarUpload} />}
    </Avatar>
    <ProfileName>{profile.name}</ProfileName>
    <ProfileRole>{profile.role} at {profile.company}</ProfileRole>
    <ProfileMeta>
      <span>{profile.location}</span>
      <span>Member since {profile.memberSince}</span>
    </ProfileMeta>
    <ProfileActions>
      {isOwner ? (
        <Button variant="primary" icon={EditIcon} onClick={enterEditMode}>Edit Profile</Button>
      ) : (
        <>
          <Button variant="primary" onClick={handleConnect}>Connect</Button>
          <Button variant="secondary" icon={MessageIcon} onClick={handleMessage}>Message</Button>
        </>
      )}
      <IconButton icon={ShareIcon} aria-label="Share profile" onClick={handleShare} />
    </ProfileActions>
  </ProfileHeader>
  <ProfileTabs activeTab={activeTab} onChange={setActiveTab}>
    <Tab label="About" />
    <Tab label="Experience" />
    <Tab label="Skills" />
    <Tab label="Documents" />
    <Tab label="Activity" />
  </ProfileTabs>
  <ProfileContent>
    {activeTab === 'about' && (
      <AboutSection>
        <Bio content={profile.bio} editable={isEditing} onChange={handleBioChange} />
        <ContactInfo email={profile.email} phone={profile.phone} />
        <Links links={profile.links} />
      </AboutSection>
    )}
    {activeTab === 'experience' && (
      <ExperienceSection>
        {profile.experience.map(exp => (
          <ExperienceCard key={exp.id} {...exp} editable={isEditing} onEdit={handleEditExp} />
        ))}
        {isEditing && <Button icon={PlusIcon} variant="ghost" onClick={addExperience}>Add Experience</Button>}
      </ExperienceSection>
    )}
    {activeTab === 'skills' && (
      <SkillsSection>
        <SkillTag skills={profile.skills} editable={isEditing} onAdd={handleAddSkill} onRemove={handleRemoveSkill} />
      </SkillsSection>
    )}
  </ProfileContent>
</ProfilePage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Settings-Pattern.md](Settings-Pattern.md) | Profile settings (privacy, notifications) in Settings page |
| [CRUD-Pattern.md](CRUD-Pattern.md) | Experience/skills/document management uses CRUD sub-patterns |
| [Upload-Pattern.md](Upload-Pattern.md) | Avatar upload and document upload within profile |
| [Authentication-Pattern.md](Authentication-Pattern.md) | Profile accessible after authentication |
| [Dashboard-Pattern.md](Dashboard-Pattern.md) | User avatar/name in dashboard header links to profile |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Avatar](../Core/Avatar.md) | Profile photo display |
| [Card](../Core/Card.md) | Experience cards, section containers |
| [Tabs](../Navigation/Tabs.md) | Section navigation |
| [FormGroup](../Forms/FormGroup.md) | Edit mode form fields |
| [Input](../Forms/Input.md) | Text inputs in edit mode |
| [Textarea](../Forms/Textarea.md) | Bio editing |
| [Select](../Forms/Select.md) | Role/industry selection |
| [Switch](../Forms/Switch.md) | Privacy toggles |
| [Tag](../Core/Tag.md) | Skill tags |
| [Chip](../Core/Chip.md) | Skill display |
| [Badge](../Core/Badge.md) | Availability/verification badges |
| [Button](../Core/Button.md) | Action buttons |
| [IconButton](../Core/IconButton.md) | Share, action icons |
| [UploadZone](../Documents/UploadZone.md) | Avatar upload |
| [FileCard](../Documents/FileCard.md) | Document display |
| [ActivityCard](../Dashboard/ActivityCard.md) | Activity feed |
| [EmptyState](../Feedback/EmptyState.md) | Empty sections |
| [ErrorState](../Feedback/ErrorState.md) | Error state |
| [Skeleton](../Feedback/Skeleton.md) | Loading state |
| [Toast](../Feedback/Toast.md) | Save feedback |

## Anti-patterns

1. **No privacy controls** — Users must control what information is visible publicly.
2. **Editable fields in view mode** — Only switch to edit mode when user explicitly clicks Edit.
3. **No empty section guidance** — Empty sections should prompt adding content.
4. **Overloaded header** — Header shows only essential info; details in sections.
5. **Editing without save confirmation** — Always show save feedback and confirmation.
6. **Public display of private data** — Respect privacy settings in all view modes.
7. **No activity feed filtering** — Activity feed must have filter options.
8. **Avatar upload without preview** — Show avatar preview with crop before saving.
9. **No verification indicator** — Verified accounts must show verification badge.
10. **Hidden contact information** — Contact methods must be clearly accessible.
