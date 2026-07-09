# Profile System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Layouts/Profile-Layout.md](../05-Application-Shell/Layouts/Profile-Layout.md)), DP-6 ([Profile-Flow.md](../06-UX-Architecture/Profile-Flow.md))

---

## Purpose

Defines the profile system — profile data model, section composition, edit/view modes, visibility controls, skill management, and career timeline.

---

## Profile Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   PROFILE SYSTEM                          │
├─────────────────────────────────────────────────────────┤
│  Profile Data Model                                      │
│  Personal, experience, skills, documents, activity       │
├─────────────────────────────────────────────────────────┤
│  Section Engine                                          │
│  View/edit toggle per section, independent saves         │
├─────────────────────────────────────────────────────────┤
│  Visibility Controls                                     │
│  Public/private per field, shareable link                │
├─────────────────────────────────────────────────────────┤
│  Skill Engine                                            │
│  Skill taxonomy, proficiency, endorsements, gaps         │
└─────────────────────────────────────────────────────────┘
```

---

## Profile Data Model

```typescript
// Pseudocode
interface Profile {
  id: string;
  userId: string;
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  documents: ProfileDocument[];
  activity: Activity[];
  preferences: ProfilePreferences;
  visibility: ProfileVisibility;
  timeline: CareerTimeline;
}

interface PersonalInfo {
  fullName: string;
  headline: string;
  summary: string;
  location: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  avatar: string;
}

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  highlights: string[];
  skills: string[];
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 1 | 2 | 3 | 4 | 5;  // 1=Beginner, 5=Expert
  endorsements: number;
  aiSuggested: boolean;
}
```

---

## Section Engine

```typescript
// Pseudocode
interface ProfileSection {
  id: string;
  title: string;
  icon: string;
  component: ComponentType;
  editComponent: ComponentType;
  isEditable: boolean;
  isEmpty: boolean;
  validation?: ValidationRules;
}

// Sections
const profileSections: ProfileSection[] = [
  { id: 'hero', title: 'Overview', icon: 'user', isEditable: true },
  { id: 'about', title: 'About', icon: 'info', isEditable: true },
  { id: 'experience', title: 'Experience', icon: 'briefcase', isEditable: true },
  { id: 'skills', title: 'Skills', icon: 'star', isEditable: true },
  { id: 'education', title: 'Education', icon: 'book', isEditable: true },
  { id: 'documents', title: 'Documents', icon: 'file', isEditable: false },
  { id: 'activity', title: 'Activity', icon: 'activity', isEditable: false },
];
```

### Edit/View Mode

```
Profile page loads in VIEW mode
     ↓
User clicks "Edit" on a section
     ↓
Section enters EDIT mode (inline, not navigation)
     ↓
User modifies fields
     ↓
┌──────────────┐      ┌───────────────┐
│ SAVE         │      │ CANCEL         │
│ Validate     │      │ Discard        │
│ Persist      │      │ changes        │
│ Return to    │      │ Return to      │
│ view mode    │      │ view mode      │
└──────────────┘      └───────────────┘
```

---

## Visibility Controls

```typescript
// Pseudocode
interface ProfileVisibility {
  mode: 'public' | 'private' | 'connections' | 'custom';
  publicFields: string[];           // Always visible
  privateFields: string[];          // Always hidden
  customRules: VisibilityRule[];
}

interface VisibilityRule {
  field: string;
  visibility: 'public' | 'private' | 'authenticated' | 'recruiters';
}

// Default visibilities
const defaultVisibility = {
  mode: 'public' as const,
  publicFields: ['name', 'headline', 'skills'],
  privateFields: ['phone', 'email'],
};
```

---

## Skill Engine

```typescript
// Pseudocode
interface SkillEngine {
  skills: Skill[];
  taxonomy: SkillTaxonomy;
  gaps: SkillGap[];
  suggestions: SkillSuggestion[];
  
  addSkill(skill: Skill): void;
  removeSkill(skillId: string): void;
  updateProficiency(skillId: string, level: number): void;
  getGaps(targetRole: string): SkillGap[];
  getSuggestions(): SkillSuggestion[];
}

interface SkillGap {
  skill: string;
  requiredLevel: number;
  currentLevel: number;
  gap: number;
  importance: 'critical' | 'important' | 'nice-to-have';
}

interface SkillSuggestion {
  skill: string;
  confidence: number;
  source: 'experience' | 'education' | 'ai';
  reason: string;
}
```

---

## Profile Edit Rules

| Rule | Behaviour |
|------|-----------|
| Independent section saves | Each section saves independently — no global save |
| Inline editing | Edit happens in place — no navigation to separate edit page |
| Auto-save | Changes saved immediately on field blur |
| Undo | Ctrl+Z or snackbar "Undo" within 5 seconds |
| Validation | Per-field validation with inline error messages |
| Character limits | Name: 100, Headline: 200, Summary: 2000 |
| Image upload | Avatar: 500KB max, 400x400px, PNG/JPG/WebP |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [CV-System.md](CV-System.md) | CV data linked to profile |
| [Settings-Architecture.md](Settings-Architecture.md) | Privacy settings integration |
| [DP-6 Profile Flow](../06-UX-Architecture/Profile-Flow.md) | Source profile UX specification |

---

## Validation Notes

1. Profile sections are independently editable — no global save required.
2. Visibility controls are per-field with granular privacy options.
3. AI-powered skill suggestions analyse experience to recommend skills.
4. Skill gap analysis compares current skills to target role requirements.
5. Career timeline provides a chronological view of all career events.
