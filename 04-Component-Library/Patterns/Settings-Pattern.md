# Settings-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the configuration interface for managing user and system settings. Provides a consistent layout with section navigation, per-section forms, toggle controls, and save/discard workflows across profile, notifications, privacy, appearance, and security settings.

---

## Composition

```
SettingsPage (Container)
├── SettingsLayout
│   ├── SettingsSidebar (section navigation)
│   │   ├── SettingsNavItem (multiple, grouped)
│   │   │   ├── NavIcon
│   │   │   ├── NavLabel
│   │   │   └── NavBadge (unsaved changes indicator, optional)
│   │   └── SettingsNavGroup (section group label, optional)
│   └── SettingsContent (active section panel)
│       ├── SectionHeader
│       │   ├── SectionTitle
│       │   ├── SectionDescription
│       │   └── SectionActions (Save, Reset)
│       ├── SettingsSection (multiple per panel)
│       │   ├── SectionGroupTitle (subsection heading)
│       │   └── SettingsItem (multiple)
│       │       ├── SettingsItemLabel
│       │       ├── SettingsItemDescription
│       │       └── SettingsControl (variant-dependent)
│       │           ├── [Toggle] Switch (on/off)
│       │           ├── [Select] Select (options list)
│       │           ├── [Input] Input / Textarea (text entry)
│       │           ├── [Slider] Slider (range values)
│       │           ├── [Radio] RadioGroup (single choice)
│       │           ├── [MultiSelect] MultiSelect (multiple choice)
│       │           ├── [Color] ColorPicker (theme color)
│       │           └── [Button] Button (action trigger)
│       └── SettingsDangerZone (destructive actions section)
│           ├── DangerSectionTitle
│           ├── DangerSectionDescription
│           └── DangerButton (destructive variant)
├── ChangeTrackingBar (sticky bottom, visible when unsaved)
│   ├── UnsavedIndicator ("You have unsaved changes")
│   ├── DiscardButton (ghost)
│   └── SaveButton (primary)
└── DiscardConfirmation (dialog, on cancel with unsaved changes)
    ├── Dialog.Body (warning message)
    └── Dialog.Footer
        ├── KeepEditingButton
        └── DiscardButton (danger variant)
```

---

## When to Use

- User preference management (profile, notifications, appearance)
- System configuration (security, privacy, billing)
- Module-specific settings (job board defaults, document templates)
- Admin configuration panels

## When NOT to Use

- Simple preference toggles on a page (use inline Switch directly)
- Application-wide constants that require deployment changes
- Real-time collaboration settings (use collaboration panel)
- One-time setup flows (use Wizard-Pattern instead)

---

## Variants

### Profile Settings
| Aspect | Specification |
|--------|---------------|
| Sections | Personal Info, Contact, Bio, Avatar, Social Links |
| Controls | Input fields, Avatar upload, Textarea bio |
| Sidebar icon | User icon |
| Save behavior | Auto-save on field blur + manual Save |

### Notification Settings
| Aspect | Specification |
|--------|---------------|
| Sections | Email Notifications, Push Notifications, In-App Alerts, Digest Preferences |
| Controls | Switch toggles per notification type, Select for frequency |
| Sidebar icon | Bell icon |
| Save behavior | Auto-save on toggle |

### Privacy Settings
| Aspect | Specification |
|--------|---------------|
| Sections | Profile Visibility, Data Sharing, Activity Status, Search Indexing |
| Controls | Radio groups (public/private/contacts), Switch toggles |
| Sidebar icon | Lock/Shield icon |
| Save behavior | Manual save with confirmation |

### Appearance Settings
| Aspect | Specification |
|--------|---------------|
| Sections | Theme (Light/Dark/System), Color Accent, Font Size, Density, Layout |
| Controls | Radio theme selector, ColorPicker accent, Slider font size, Select density |
| Sidebar icon | Sun/Moon icon |
| Save behavior | Instant apply (no save button needed for theme) |

### Security Settings
| Aspect | Specification |
|--------|---------------|
| Sections | Password, Two-Factor Auth, Active Sessions, API Keys, Audit Log |
| Controls | Password component, Switch for 2FA, list of sessions with revoke, API key management |
| Sidebar icon | Shield icon |
| Save behavior | Manual save; sensitive actions require password confirmation |

### Admin Settings (Enterprise)
| Aspect | Specification |
|--------|---------------|
| Sections | Workspace, Billing, Users, Audit, Integrations, Compliance |
| Controls | CRUD tables for user management, billing history, audit log viewer |
| Sidebar icon | Gear/Shield icon |
| Save behavior | Manual save with audit trail |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton sections (3-5 lines per section) | Cannot interact until loaded |
| **Default** | Settings groups with controls at current values | Ready for interaction |
| **Editing** | Control focused/highlighted; change tracking bar visible at bottom | User modifying a setting |
| **Unsaved** | ChangeTrackingBar shows "You have unsaved changes"; Save/Discard buttons active | Changes pending save |
| **Saving** | SaveButton shows spinner; controls disabled during save | Saving in progress |
| **Saved** | Toast "Settings saved" (auto-dismiss 3s); ChangeTrackingBar hides | Save successful |
| **Save error** | ErrorState inline; "Failed to save. Retry." message | Save failed |
| **Discarding** | DiscardConfirmation dialog open | Confirm before discarding |
| **Danger action** | Danger zone section visible; destructive button requires confirmation | Double-confirmation for destructive actions |
| **Password changing** | Password form with strength indicator; confirm new password | Change password flow |
| **2FA setup** | QR code or setup key; verification input | Two-factor authentication setup |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Sidebar navigation | `role="navigation"`, `aria-label="Settings sections"` |
| Nav items | `role="link"` or `<a>`, `aria-current="page"` on active section |
| Content region | `role="region"`, `aria-labelledby` linked to section title |
| Section headings | `<h2>` for section title, `<h3>` for subsection groups |
| Form controls | All inputs have associated `<label>` elements |
| Switch | `role="switch"`, `aria-checked` for toggle state |
| Slider | `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Color picker | `aria-label="Choose accent color"`, accessible swatch selection |
| Danger zone | `aria-label="Danger zone"` on section; destructive actions announced as "Destructive action" |
| Save button | `aria-label="Save settings"` |
| Discard button | `aria-label="Discard changes"` |
| Change tracking | `aria-live="polite"` on ChangeTrackingBar |
| Save feedback | `role="status"` for save success/error announcements |
| Keyboard | Tab navigates between settings controls; arrow keys for radio and slider; Enter/Space for toggles |
| Focus management | Focus moves to first setting in section on navigation; focus returns to trigger after dialog close |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Sidebar converts to top Tabs or drop-down section selector. Settings stack in single column. ChangeTrackingBar fixed at bottom with full-width buttons. Danger zone at bottom of list. |
| Tablet (768-1023px) | Sidebar collapsible (icon-only rail). Settings single column. ChangeTrackingBar floating footer. |
| Desktop (1024-1279px) | Sidebar pinned (200px). Settings content takes remaining width. Settings items inline (label left, control right). ChangeTrackingBar sticky bottom. |
| Wide (1280-1599px) | Sidebar 240px. Settings content wider. Multi-column layout for dense setting groups (e.g., notifications grid). |
| Ultra-wide (1600px+) | Settings content constrained to 960px max width, centered. Multi-column layout for notification toggles (3 columns). |

---

## Implementation Example

```typescript
<SettingsPage>
  <SettingsLayout>
    <SettingsSidebar>
      <SettingsNavItem icon={UserIcon} label="Profile" section="profile" active={section === 'profile'} />
      <SettingsNavItem icon={BellIcon} label="Notifications" section="notifications" />
      <SettingsNavItem icon={LockIcon} label="Privacy" section="privacy" />
      <SettingsNavItem icon={SunIcon} label="Appearance" section="appearance" />
      <SettingsNavItem icon={ShieldIcon} label="Security" section="security" />
    </SettingsSidebar>
    <SettingsContent>
      {section === 'notifications' && (
        <>
          <SectionHeader title="Notifications" description="Manage how you receive notifications">
            <Button variant="ghost" onClick={resetSection}>Reset section</Button>
          </SectionHeader>
          <SettingsSection title="Email Notifications">
            <SettingsItem label="New applications" description="Notify when someone applies to a job">
              <Switch checked={email.applications} onChange={v => updateEmail('applications', v)} />
            </SettingsItem>
            <SettingsItem label="Messages" description="Notify when you receive a new message">
              <Switch checked={email.messages} onChange={v => updateEmail('messages', v)} />
            </SettingsItem>
            <SettingsItem label="Digest frequency" description="How often to receive digest emails">
              <Select value={email.digest} options={digestOptions} onChange={v => updateEmail('digest', v)} />
            </SettingsItem>
          </SettingsSection>
          <SettingsSection title="Push Notifications">
            <SettingsItem label="Real-time alerts">
              <Switch checked={push.realtime} onChange={v => updatePush('realtime', v)} />
            </SettingsItem>
          </SettingsSection>
        </>
      )}
      {section === 'appearance' && (
        <>
          <SettingsSection title="Theme">
            <SettingsItem label="Theme mode">
              <RadioGroup value={theme} options={['Light', 'Dark', 'System']} onChange={setTheme} />
            </SettingsItem>
            <SettingsItem label="Accent color">
              <ColorPicker value={accent} onChange={setAccent} />
            </SettingsItem>
            <SettingsItem label="Font size">
              <Slider value={fontSize} min={12} max={20} step={1} onChange={setFontSize} />
            </SettingsItem>
          </SettingsSection>
        </>
      )}
      {section === 'security' && (
        <>
          <SettingsSection title="Password">
            <SettingsItem label="Change password">
              <Password onChange={handlePasswordChange} showStrength />
            </SettingsItem>
          </SettingsSection>
          <SettingsDangerZone>
            <p>Delete your account. This action is irreversible.</p>
            <Button variant="danger" onClick={confirmDeleteAccount}>Delete Account</Button>
          </SettingsDangerZone>
        </>
      )}
      <ChangeTrackingBar visible={hasChanges}>
        <span>You have unsaved changes</span>
        <Button variant="ghost" onClick={handleDiscard}>Discard</Button>
        <Button variant="primary" onClick={handleSave} isLoading={saving}>Save Changes</Button>
      </ChangeTrackingBar>
    </SettingsContent>
  </SettingsLayout>
</SettingsPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Profile-Pattern.md](Profile-Pattern.md) | Profile settings section shares address, contact, avatar patterns |
| [Authentication-Pattern.md](Authentication-Pattern.md) | Security settings includes password change and 2FA |
| [CRUD-Pattern.md](CRUD-Pattern.md) | Admin settings use CRUD for user/billing management |
| [Future-Enterprise-Pattern.md](Future-Enterprise-Pattern.md) | Enterprise settings include SSO, compliance, audit logs |
| [Wizard-Pattern.md](Wizard-Pattern.md) | Initial setup wizard transitions to settings for ongoing configuration |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Sidebar](../Navigation/Sidebar.md) | Section navigation |
| [Tabs](../Navigation/Tabs.md) | Mobile section selector |
| [FormGroup](../Forms/FormGroup.md) | Section form fields |
| [Input](../Forms/Input.md) | Text entry |
| [Textarea](../Forms/Textarea.md) | Bio/long text entry |
| [Select](../Forms/Select.md) | Option selection |
| [MultiSelect](../Forms/MultiSelect.md) | Multiple selection |
| [Switch](../Forms/Switch.md) | Toggle controls |
| [Slider](../Forms/Slider.md) | Range values |
| [Radio](../Forms/Radio.md) | Single choice |
| [Password](../Forms/Password.md) | Password change |
| [Button](../Core/Button.md) | Save/Discard/Danger actions |
| [Dialog](../Feedback/Dialog.md) | Discard confirmation |
| [Toast](../Feedback/Toast.md) | Save feedback |
| [Skeleton](../Feedback/Skeleton.md) | Loading state |
| [ErrorState](../Feedback/ErrorState.md) | Error state |
| [Divider](../Core/Divider.md) | Section separators |

## Anti-patterns

1. **No change tracking** — Always track unsaved changes and prompt on navigation away.
2. **Save button without feedback** — Show loading state during save and success toast on completion.
3. **No discard confirmation** — Prompt confirmation when discarding unsaved changes.
4. **Scrolling to reload on toggle** — Toggle changes should apply immediately without page reload.
5. **Hiding danger zone** — Destructive actions should be visible but require double confirmation.
6. **No section for theme changes** — Theme changes must apply instantly (no save button for theme).
7. **Settings without descriptions** — Every setting must have a clear description of what it does.
8. **Too many sections in sidebar** — Maximum 7 sections; group related sections under labels.
9. **Nested scroll within settings** — Settings page scrolls naturally; no nested scrollable containers.
10. **No keyboard accessibility for color picker** — Color swatches must be keyboard-navigable.
