# Accessibility Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-1 ([Accessibility.md](../02-Design-Language/Accessibility.md)), DP-4 ([Accessibility/](../05-Application-Shell/Accessibility/))

---

## Purpose

Defines the accessibility architecture — ARIA model, keyboard engine, focus management, screen reader support, reduced motion, and accessibility testing infrastructure.

---

## Accessibility Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 ACCESSIBILITY ENGINE                      │
├─────────────────────────────────────────────────────────┤
│  ARIA Model                                              │
│  Landmark structure, live regions, role mapping          │
├─────────────────────────────────────────────────────────┤
│  Keyboard Engine                                         │
│  Focus management, keyboard navigation, shortcuts        │
├─────────────────────────────────────────────────────────┤
│  Screen Reader Layer                                     │
│  Announcements, descriptions, navigation hints           │
├─────────────────────────────────────────────────────────┤
│  Motion Controller                                       │
│  Reduced motion, animation alternatives, timing          │
├─────────────────────────────────────────────────────────┤
│  Testing Infrastructure                                  │
│  CI a11y checks, component audits, e2e screen reader     │
└─────────────────────────────────────────────────────────┘
```

---

## ARIA Landmark Structure

```
<ApplicationShell>
  <SkipLink href="#main-content" />
  
  <Header role="banner" aria-label="Application header">
    <nav aria-label="Quick actions" />
  </Header>
  
  <Sidebar role="navigation" aria-label="Primary navigation" />
  
  <RegionSystem>
    <PrimaryRegion role="main" aria-label="Main content" id="main-content" />
    <SecondaryRegion role="complementary" aria-label="Related content" />
    <ContextRegion role="region" aria-label="Context panel" />
    <AIRegion role="region" aria-label="AI assistance" aria-live="polite" />
    <InspectorRegion role="region" aria-label="Inspector" />
  </RegionSystem>
  
  <Footer role="contentinfo" aria-label="Page footer" />
</ApplicationShell>
```

---

## Focus Management

### Focus Order

```
1. Skip link (first focusable element)
2. Header navigation (search, quick actions)
3. Sidebar navigation (primary nav items)
4. Primary region (main content)
5. Secondary region (related content)
6. Context region (context panel)
7. AI region (AI panel)
8. Footer
9. Floating elements (modals, toasts, overlays)
```

### Focus Traps

```
Modal opens
     ↓
Save last focused element
     ↓
Set focus to first focusable element in modal
     ↓
Trap focus within modal (Tab cycles within)
     ↓
Modal closes
     ↓
Restore focus to saved element
```

### Focus Indicators

| Element | Indicator | Width | Offset | Colour |
|---------|-----------|-------|--------|--------|
| All interactive | Solid ring | 2px | 2px | Primary.500 |
| Focused input | Solid ring | 2px | 0px | Primary.500 |
| Focused button | Solid ring | 2px | 2px | Primary.500 |
| Focused link | Underline | 2px | — | Primary.500 |

---

## Keyboard Engine

```typescript
// Pseudocode
interface KeyboardEngine {
  registerShortcut(shortcut: ShortcutDefinition): void;
  unregisterShortcut(id: string): void;
  getShortcuts(context?: string): ShortcutDefinition[];
}

interface ShortcutDefinition {
  id: string;
  keys: string[];            // ['Ctrl', 'K']
  handler: () => void;
  description: string;
  scope: 'global' | 'module' | 'page';
  preventDefault: boolean;
  enabled: boolean;          // Can be disabled
}
```

### Keyboard Navigation Patterns

| Pattern | Keys | Usage |
|---------|------|-------|
| Arrow navigation | ↑ ↓ ← → | Lists, grids, trees, tabs |
| Tab navigation | Tab, Shift+Tab | Form fields, interactive elements |
| Action | Enter, Space | Activate buttons, links, toggles |
| Close | Escape | Modals, dropdowns, panels |
| Select | Ctrl+Click, Space | Multi-select lists |
| Context menu | Shift+F10 | Context actions |
| Command palette | Ctrl+K | Global commands |
| Region cycle | F6 | Cycle through regions |

---

## Screen Reader Support

### Live Regions

| Region | aria-live | Role | Purpose |
|--------|-----------|------|---------|
| Notifications | polite | status | Toast and alert announcements |
| AI suggestions | polite | status | AI suggestion availability |
| Loading state | polite | status | Loading completion |
| Error state | assertive | alert | Error announcements |
| Search results | polite | status | Result count changes |
| Form validation | assertive | alert | Validation errors |

### ARIA Descriptions

| Element | Attribute | Content |
|---------|-----------|---------|
| Navigation items | aria-label | Item name + badge count if applicable |
| Icons | aria-hidden="true" | Icons are decorative |
| Buttons with icons | aria-label | Button action description |
| Form inputs | aria-label or aria-labelledby | Input purpose |
| Loading regions | aria-busy="true" | Content being loaded |
| Live region updates | aria-atomic="true"/"false" | Partial vs full update |
| Dialogs | role="dialog" + aria-modal="true" | Modal state |

---

## Reduced Motion

### Animation Reduction Rules

```
prefers-reduced-motion: reduce detected
     ↓
All animations reduced to ≤ 50ms duration
     ↓
All decorative animations removed
     ↓
All parallax and scroll-driven animations removed
     ↓
All auto-play animations paused
     ↓
Transition animations replaced with instant switch
     ↓
Skeleton shimmer replaced with static skeleton
```

### Reduced Motion Specifics

| Animation | Normal | Reduced Motion |
|-----------|--------|---------------|
| Page transition | 300ms ease | Instant |
| Sidebar collapse | 250ms ease | Instant |
| Modal open | 200ms scale+fade | 100ms opacity only |
| Skeleton shimmer | 1500ms loop | Static |
| AI typing indicator | 2000ms loop | Static dots |
| Hover effects | 100ms | 50ms |
| Theme switch | 300ms | Instant |

---

## Testing Infrastructure

### Automated Tests

| Test Type | Frequency | Tool | Scope |
|-----------|-----------|------|-------|
| Unit a11y | Per component | jest-axe | Individual components |
| Integration a11y | Per PR | axe-core + Playwright | Page-level |
| E2E keyboard | Per PR | Playwright | Full keyboard flow |
| E2E screen reader | Per release | VoiceOver/Script | Critical paths |
| Colour contrast | Per PR | Custom check | All colour pairs |
| Focus order | Per PR | Playwright | All pages |
| Touch targets | Per PR | Playwright | Touch devices |

### Accessibility CI Gates

| Gate | Threshold | Action |
|------|-----------|--------|
| axe violations | 0 | Block PR |
| Colour contrast | All AA, 80% AAA | Block PR |
| Keyboard navigable | All interactive | Block PR |
| Touch targets | Minimum 44x44px | Block PR |
| Focus visible | All interactive | Block PR |
| Labels | All form controls | Block PR |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Animation-Architecture.md](Animation-Architecture.md) | Reduced motion implementation |
| [Component-Hierarchy.md](Component-Hierarchy.md) | Component a11y contracts |
| [DP-4 Accessibility](../05-Application-Shell/Accessibility/Keyboard-Navigation.md) | Source accessibility rules |

---

## Validation Notes

1. Every interactive element is keyboard accessible — no mouse-only interactions.
2. All form controls have associated labels — no unlabeled inputs.
3. Colour is never the sole means of conveying information.
4. All animations respect `prefers-reduced-motion` at the system and app level.
5. CI blocks merge on any accessibility violation — zero tolerance.
