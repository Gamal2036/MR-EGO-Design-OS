# Settings Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Settings-Flow.md](../06-UX-Architecture/Settings-Flow.md)), DP-4 ([Layouts/Settings-Layout.md](../05-Application-Shell/Layouts/Settings-Layout.md))

---

## Purpose

Defines the settings architecture — settings registry, section system, persistence, defaults, migration, and module integration.

---

## Settings Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SETTINGS SYSTEM                        │
├─────────────────────────────────────────────────────────┤
│  Settings Registry                                       │
│  Core sections, module sections, plugin sections         │
├─────────────────────────────────────────────────────────┤
│  Section Engine                                          │
│  Per-section forms, validation, auto-save, reset         │
├─────────────────────────────────────────────────────────┤
│  Persistence Layer                                       │
│  localStorage, server sync, migration                    │
├─────────────────────────────────────────────────────────┤
│  Defaults Manager                                        │
│  Factory defaults, per-role defaults, per-tier defaults  │
└─────────────────────────────────────────────────────────┘
```

---

## Settings Registry

```typescript
// Pseudocode
interface SettingsRegistry {
  sections: SettingsSection[];
  registerSection(section: SettingsSection): void;
  unregisterSection(id: string): void;
  getSection(id: string): SettingsSection;
  getSectionsByModule(moduleId: string): SettingsSection[];
}

interface SettingsSection {
  id: string;
  moduleId: string;
  title: string;
  icon: string;
  priority: number;
  permissions: string[];
  component: ComponentType;
  groups: SettingGroup[];
}

interface SettingGroup {
  id: string;
  title: string;
  description: string;
  settings: SettingDefinition[];
}
```

---

## Core Settings Sections

| Section | Groups | Module |
|---------|--------|--------|
| General | Language, Region, Date format | Core |
| Profile | Name, Email, Avatar, Bio | Core |
| Notifications | Channels, Types, Quiet hours | Core |
| Privacy | Profile visibility, Data sharing, Activity | Core |
| Appearance | Theme, Density, Font size, Reduced motion | Core |
| Security | Password, Sessions, MFA | Core |
| Integrations | Connected accounts, API keys | Core |
| Advanced | Cache, Data, Debug | Core |

---

## Setting Definition

```typescript
// Pseudocode
interface SettingDefinition {
  id: string;
  label: string;
  description: string;
  type: SettingType;
  defaultValue: SettingValue;
  validation?: ValidationRules;
  persistence: PersistenceTarget;
  dependencies?: string[];       // Depends on these settings
  permissions?: string[];
}

enum SettingType {
  Text,             // Free text input
  Number,           // Numeric input
  Email,            // Email input
  Password,         // Password input
  Select,           // Single select
  MultiSelect,      // Multi select
  Toggle,           // Boolean toggle
  Range,            // Range slider
  Color,            // Color picker
  Date,             // Date picker
  Time,             // Time picker
  File,             // File upload
  Custom,           // Custom component
}

enum PersistenceTarget {
  Local,            // localStorage only
  Server,           // Server-side only
  LocalAndServer,   // Both
}
```

---

## Settings Persistence

```typescript
// Pseudocode
interface SettingsPersistence {
  // Strategy per setting
  strategies: Record<string, PersistenceStrategy>;
  
  // Get setting value
  get<T>(key: string): T;
  
  // Set setting value
  set<T>(key: string, value: T): Promise<void>;
  
  // Persist to server (debounced)
  syncToServer(): Promise<void>;
  
  // Load from server
  loadFromServer(): Promise<void>;
  
  // Reset to default
  reset(key: string): void;
  resetSection(sectionId: string): void;
  resetAll(): void;
}

// Migration
interface SettingsMigration {
  fromVersion: number;
  toVersion: number;
  migrate(settings: Record<string, unknown>): Record<string, unknown>;
}

const migrations: SettingsMigration[] = [
  { fromVersion: 1, toVersion: 2, migrate: (s) => ({ ...s, newSetting: false }) },
];
```

---

## Module Settings Integration

```typescript
// Pseudocode
// In module's onMount
ModuleJobs.onMount = (settingsRegistry: SettingsRegistry) => {
  settingsRegistry.registerSection({
    id: 'jobs',
    moduleId: 'jobs',
    title: 'Job Preferences',
    icon: 'briefcase',
    priority: 50,
    groups: [
      {
        id: 'search',
        title: 'Default Search',
        settings: [
          {
            id: 'jobs.defaultLocation',
            label: 'Default Location',
            type: SettingType.Text,
            defaultValue: '',
            persistence: PersistenceTarget.LocalAndServer,
          },
          {
            id: 'jobs.remoteOnly',
            label: 'Remote Only',
            type: SettingType.Toggle,
            defaultValue: false,
            persistence: PersistenceTarget.LocalAndServer,
          },
        ],
      },
    ],
  });
};
```

---

## Auto-Save Strategy

```
User changes a setting
     ↓
Wait 500ms debounce
     ↓
Validate setting value
     ↓
┌──────────────┐      ┌───────────────┐
│ VALID        │      │ INVALID        │
│ Save to      │      │ Show inline    │
│ localStorage │      │ error          │
│ immediately  │      │ Do not save    │
│ Queue server │      │                │
│ sync (30s)   │      │                │
└──────────────┘      └───────────────┘
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Authentication-Flow.md](Authentication-Flow.md) | Security settings / password change |
| [Theme-Engine.md](Theme-Engine.md) | Appearance settings |
| [Notification-System.md](Notification-System.md) | Notification preferences |

---

## Validation Notes

1. Every setting has a defined type, validation, and persistence target.
2. Auto-save ensures no data loss — no manual save button required per field.
3. Module settings are automatically registered and deregistered on module lifecycle.
4. Migration system handles breaking changes between app versions.
5. Server sync is debounced — no excessive API calls on rapid setting changes.
