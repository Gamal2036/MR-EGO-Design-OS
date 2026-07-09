# Interaction Patterns

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 14, 18), DP-1 ([Interaction-Language.md](../02-Design-Language/Interaction-Language.md)), DP-1 ([Animation-Principles.md](../02-Design-Language/Animation-Principles.md))

---

## Purpose

Define reusable interaction patterns that apply consistently across all screens and modules.

---

## Pattern 1: Progressive Disclosure

### Behavior
Complexity is hidden until the user needs it. Simple tasks require no configuration.

### Usage
| Screen | Application |
|--------|-------------|
| Job Search | Basic search visible, advanced filters behind toggle |
| Application Form | Required fields shown, optional sections expandable |
| Settings | Common settings visible, advanced behind section expand |
| AI Reasoning | Summary visible, full reasoning expandable |
| Profile | Core info visible, detailed sections behind tabs |

### Implementation
- Collapsible sections with `aria-expanded`
- "Show more" / "Show less" pattern
- Tabs for logical grouping
- Progressive form reveal (step by step)

---

## Pattern 2: One Primary Action

### Behavior
Every screen has exactly one visually prominent primary action. Secondary actions are subdued.

### Screen Map
| Screen | Primary Action | Visual Treatment |
|--------|---------------|------------------|
| Landing | "Start Your Journey" | Primary button, centered, prominent |
| Login | "Sign In" | Primary button, full-width |
| Register | "Create Account" | Primary button, full-width |
| Dashboard | Context-dependent | Most urgent task CTA |
| Job Detail | "Apply Now" | Primary button, sticky on mobile |
| Application Form | "Submit Application" | Primary button, disabled until valid |
| CV Manager | "Upload CV" | Primary button + upload zone |
| CV Analysis | "Apply AI Suggestions" | Primary button, top right |
| Profile (view) | "Edit Profile" | Secondary (view is primary state) |
| Settings | Section-dependent | Primary per section |

---

## Pattern 3: Progressive Loading

### Behavior
Content appears progressively — skeletons first, then data, then AI enhancements.

### Load Order
```
1. Shell layout (sidebar, topbar, regions)
2. Skeleton placeholders for content
3. Critical data (text, numbers)
4. Visual enhancements (charts, trends)
5. AI insights (recommendations, analysis)
```

### Timing
| Phase | Target |
|-------|--------|
| Shell visible | < 500ms |
| Skeleton displayed | < 800ms |
| Critical data loaded | < 2s |
| Full content | < 3s |
| AI enhancements | Progressive (3-10s) |

---

## Pattern 4: Optimistic Updates

### Behavior
UI updates immediately on user action, before server confirmation.

### Usage
| Action | Optimistic Update | Rollback |
|--------|-------------------|----------|
| Toggle switch | Immediate state change | Revert on error |
| Save item | Show as saved | Show error + revert |
| Delete item | Remove from list | Undo option |
| Send message | Show in conversation | Error state on message |
| Apply filter | Show filtered results | Revert on error |

---

## Pattern 5: Undo

### Behavior
Reversible actions use undo instead of confirmation dialogs where possible.

### Usage
| Action | Undo Method | Window |
|--------|-------------|--------|
| Dismiss suggestion | Toast "Suggestion dismissed" + Undo | 5 seconds |
| Delete saved job | Toast "Job removed" + Undo | 5 seconds |
| Archive notification | Toast "Notification archived" + Undo | 5 seconds |
| Remove skill | Tag removed (undo inline) | Immediate |
| Reorder items | Reorder persists, "Undo" on reorder bar | 5 seconds |

---

## Pattern 6: Confirmation for Destructive Actions

### Behavior
Irreversible actions require explicit confirmation.

### Confirmation Levels
| Level | Action Examples | Method |
|-------|-----------------|--------|
| Light | Discard form, remove item | Toast + Undo |
| Medium | Delete CV, withdraw application | Confirmation dialog |
| Heavy | Delete account, clear all data | Type confirmation + password |

---

## Pattern 7: Empty State with Guidance

### Behavior
Empty states never show blank content — they guide the user to the first action.

### Template
```
┌──────────────────────────────────┐
│          [Illustration]          │
│                                  │
│      "No applications yet"       │
│                                  │
│  Start finding jobs that match   │
│  your skills and interests.      │
│                                  │
│  [Browse Jobs]  [Complete Profile]│
└──────────────────────────────────┘
```

---

## Pattern 8: AI Suggestion Interaction

### Behavior
AI suggestions appear inline, are clearly labeled, and include accept/modify/dismiss options.

### Template
```
┌─────────────────────────────────────────┐
│  ◉ AI Suggestion                        │
│                                         │
│  "Based on your experience, consider    │
│  adding 'Project Management' to your    │
│  skills."                               │
│                                         │
│  [Add] [Modify] [Dismiss]  Why? ▲       │
└─────────────────────────────────────────┘
```

---

## Pattern 9: Status Timeline

### Behavior
Progress through multi-step processes is shown as a visual timeline.

### Usage
| Context | Steps |
|---------|-------|
| Application Lifecycle | Submitted → Reviewed → Interview → Offer → Decision |
| CV Processing | Upload → Parsing → Analysis → Optimization → Ready |
| Onboarding | Welcome → Goal → Experience → Skills → Interests → Done |
| Document Version | Draft → Review → Final → Archived |

---

## Pattern 10: Slide-to-Act

### Behavior
On touch devices, horizontal swipe triggers quick actions.

### Actions
| Element | Swipe Left | Swipe Right |
|---------|------------|-------------|
| Notification | Dismiss | Mark read |
| Saved job | Remove | Share |
| Application | — | Open detail |
| Task | Complete | Snooze |
| Message | Delete | Archive |

---

## Pattern 11: Contextual Help

### Behavior
Help is available inline, not in a separate documentation portal.

### Forms
| Type | Trigger | Content |
|------|---------|---------|
| Tooltip | Hover/focus icon | Brief explanation (1-2 sentences) |
| Inline hint | Below field | Format guidance, example |
| Help panel | "?" button | Related help articles |
| AI explain | "Why?" button | AI reasoning breakdown |
| Command palette | Ctrl+K | All available actions |

---

## Pattern 12: Pull to Refresh

### Behavior
On mobile, pull down to refresh content.

### Usage
| Screen | Refresh Action |
|---------|----------------|
| Dashboard | Refresh all widgets |
| Job Search | Refresh job listings |
| Applications | Refresh statuses |
| Notifications | Refresh notification list |
| CV Manager | Refresh document list |

---

## Pattern 13: Focus Mode

### Behavior
Temporarily hide all non-essential UI to focus on content.

### Trigger
- Keyboard shortcut (Ctrl+Shift+F)
- Button in AI Workspace header
- Toggle in View settings

### Effect
- Sidebar collapses to icons
- Topbar reduces to essential items
- AI panel hides (can be re-opened)
- Only primary content region visible

---

## Pattern 14: Drag to Reorder

### Behavior
User configures order of items by drag-and-drop.

### Usage
| Screen | Reorderable Items |
|---------|-------------------|
| Dashboard | Widget positions |
| Profile | Experience order |
| CV Editor | Section order |
| Settings | Navigation sidebar items |
| Skills tab | Skill priority order |

### Accessibility
- Keyboard alternative: Move Up / Move Down buttons
- `aria-label` indicating current position and total
- Focus management after reorder

---

## Pattern 15: Command Palette Access

### Behavior
Every action is accessible via Ctrl+K command palette.

### Command Categories
| Category | Example Commands |
|----------|-----------------|
| Navigation | Go to Dashboard, Go to Jobs, Go to Profile |
| Actions | Upload CV, Create Cover Letter, Search Jobs |
| Settings | Open Settings, Change Theme, Manage Notifications |
| AI | Open AI Assistant, Analyze CV, Explain Match |
| Help | Keyboard Shortcuts, Help Center, Send Feedback |

---

## Pattern 16: Inline Edit

### Behavior
Content becomes editable in its context without navigating to a separate page.

### Usage
| Screen | Editable Content |
|---------|------------------|
| Profile | Bio, experience entries, skills |
| Dashboard | Widget configuration |
| Settings | Per-section controls |
| CV Editor | Section content |

### Behavior
- Click "Edit" → Content transforms to form fields
- Save/Cancel per section (no global save)
- Changes visible immediately after save
- Escape cancels edit, returns to view

---

## Pattern 17: Auto-Save

### Behavior
User data is saved automatically to prevent loss.

### Usage
| Context | Trigger | Feedback |
|---------|---------|----------|
| Form input | On field blur + 30s interval | Subtle "Saved" indicator |
| CV Editor | On each change + 15s debounce | "Saving..." → "Saved" |
| AI Conversation | Each message sent | Always persisted |
| Onboarding | On step change + each field | "Progress saved" |
| Settings | On toggle/select change | Instant save (no button) |

---

## Keyboard Shortcut Map

| Shortcut | Action | Context |
|----------|--------|---------|
| Ctrl+K / Cmd+K | Command palette | Global |
| Ctrl+1–6 | Navigate sections | Global |
| Ctrl+I | Toggle AI panel | Global |
| Ctrl+, | Open settings | Global |
| Ctrl+F | Find in page | Documents, lists |
| Ctrl+S | Save | Forms, editors |
| Ctrl+Z | Undo | Editors, forms |
| Ctrl+Shift+Z | Redo | Editors |
| / | Quick search | Global |
| ? | Show shortcuts | Global |
| Escape | Close/dismiss | Modals, panels, dropdowns |
| Enter | Confirm/submit | Forms |
| Arrow keys | Navigate lists | Results, menus |
| Tab / Shift+Tab | Focus forward/back | Global |

---

*These interaction patterns apply consistently across all MR:EGO screens and modules. Every pattern is designed for keyboard, mouse, and touch accessibility. Refer to [Accessibility.md](Accessibility.md) for accessibility requirements and [AI-Experience.md](AI-Experience.md) for AI-specific patterns.*
