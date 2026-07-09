# Micro Interactions

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-5 ([MicroInteractions.md](../06-Visual-Foundation/MicroInteractions/MicroInteractions.md)), DP-1 ([Interaction-Language.md](../02-Design-Language/Interaction-Language.md))
**Inherits:** All micro-interaction values from DP-5

---

## Micro-Interaction Rules

1. Every interactive element has hover, focus, active, and disabled states
2. No micro-interaction lasts longer than 300ms (excluding loading)
3. Micro-interactions never block user input — `pointer-events: none` during animation
4. All micro-interactions respect reduced-motion — maximum 50ms when enabled
5. No two micro-interaction types share the same pattern — press and hover feel distinct
6. Feedback is proportional to action importance
7. All micro-interactions use GPU-accelerated properties only
8. Every micro-interaction provides visual + (where appropriate) haptic + (where appropriate) audio feedback

---

## Buttons

### Primary Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Resting appearance | — | — |
| Hover | Background one step darker | 100ms | Ease-Out |
| Active/Press | Scale 0.97 + background darker | 50ms | Ease-Out |
| Focus | 2px focus ring with 2px offset | 100ms | Ease-Out |
| Loading | Spinner replaces text | 200ms cross-fade | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |
| Release from press | Scale 1.0 | 100ms | Ease-Out |

### Secondary Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Resting with border | — | — |
| Hover | Background tint + border darken | 100ms | Ease-Out |
| Active/Press | Scale 0.97 + background darker | 50ms | Ease-Out |
| Focus | 2px focus ring | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Ghost Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Resting (no background, no border) | — | — |
| Hover | Background appears (Neutral-100) | 100ms | Ease-Out |
| Active/Press | Background darkens + scale 0.97 | 50ms | Ease-Out |
| Focus | 2px focus ring | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Danger Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Danger background | — | — |
| Hover | Background darkens (Danger-600) | 100ms | Ease-Out |
| Active/Press | Scale 0.97 + background Danger-700 | 50ms | Ease-Out |
| Focus | 2px focus ring (Danger-500) | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Icon Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Icon only | — | — |
| Hover | Circular background tint appears behind icon | 100ms | Ease-Out |
| Active/Press | Background darkens | 50ms | Ease-Out |
| Focus | 2px focus ring (circular) | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Split Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Two parts: label + chevron | — | — |
| Hover (label) | Primary: background tint | 100ms | Ease-Out |
| Hover (chevron) | Separate background tint | 100ms | Ease-Out |
| Active | Scale 0.97 on pressed segment | 50ms | Ease-Out |
| Dropdown open | Chevron rotates 180° | 200ms | Ease-Out |

---

## Inputs

### Text Input

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Border Neutral-300 | — | — |
| Hover | Border darkens to Neutral-400 | 100ms | Ease-Out |
| Focus | Border Primary-500 + 2px ring | 100ms | Ease-Out |
| Typing | Cursor blink, no border change | — | — |
| Valid | Border Success-500 (optional) | 200ms | Ease-Out |
| Error | Border Danger-500 + message appear | 200ms | Ease-Out |
| Disabled | Background tint, opacity 0.4 | 100ms | Ease-Out |
| Filled | Neutral border, filled background | — | — |

### Textarea

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Border Neutral-300 | — | — |
| Hover | Border darkens | 100ms | Ease-Out |
| Focus | Border Primary-500 + ring | 100ms | Ease-Out |
| Resize | Grip icon in corner | — | — |
| Character count | Count updates | 100ms | — |

### Search Input

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Search icon + placeholder | — | — |
| Focus | Border Primary-500 + ring, cursor | 100ms | Ease-Out |
| Typing | Debounced 300ms | — | — |
| Results appear | Staggered fade in (50ms per item) | 300ms total | Ease-Out |
| Results update | Cross-fade | 200ms | Ease-Out |
| Clear | Fade out results | 150ms | Ease-In |
| Empty | Empty state with suggestion | — | — |

### Select / Dropdown

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Border + chevron down | — | — |
| Hover | Border darken | 100ms | Ease-Out |
| Focus | Border Primary-500 | 100ms | Ease-Out |
| Open | Chevron rotates 180° | 200ms | Ease-Out |
| List appear | Fade + slide down 8px | 200ms | Ease-Out |
| List disappear | Fade + slide up 8px | 150ms | Ease-In |
| Option hover | Background tint | 100ms | Ease-Out |
| Option selected | Checkmark + background | 100ms | Ease-Out |

### Multi-Select

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Tags in container | — | — |
| Tag add | Tag slides in from right | 200ms | Ease-Out |
| Tag remove | Tag fades out, compresses | 150ms | Ease-In |
| Focus | Container border Primary-500 | 100ms | Ease-Out |
| Dropdown open | List appears | 200ms | Ease-Out |

---

## Selection Controls

### Checkbox

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Unchecked box | — | — |
| Hover | Box tint | 100ms | Ease-Out |
| Check | Box fills, checkmark draws | 200ms | Ease-Out |
| Uncheck | Box empties, checkmark fades | 150ms | Ease-In |
| Indeterminate | Dash in box | 200ms | Ease-Out |
| Focus | 2px ring around box | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Radio Button

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Outer circle empty | — | — |
| Hover | Outer circle tint | 100ms | Ease-Out |
| Select | Inner circle scales in from center | 200ms | Ease-Out |
| Deselect | Inner circle scales out | 150ms | Ease-In |
| Focus | 2px ring around outer circle | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Switch

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Track gray, knob left | — | — |
| Hover | Track slight tint | 100ms | Ease-Out |
| Toggle on | Knob slides right, track fills Primary-500 | 200ms | Ease-Out |
| Toggle off | Knob slides left, track returns to gray | 200ms | Ease-Out |
| Focus | 2px ring around track | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Slider

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Track + handle | — | — |
| Hover (handle) | Handle scales 1.1 | 100ms | Ease-Out |
| Active (handle) | Handle scales 1.15 | 50ms | Ease-Out |
| Value change | Track fill updates | 200ms | Ease-Out |
| Focus | 2px ring around handle | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

---

## Navigation Controls

### Tabs

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Tab label with bottom indicator hidden | — | — |
| Hover | Subtle background tint | 100ms | Ease-Out |
| Active | Bottom indicator slides to active tab | 200ms | Ease-Out |
| Content change | Cross-fade content | 200ms | Ease-In-Out |
| Focus | 2px focus ring | 100ms | Ease-Out |
| Disabled | Opacity 0.4 | 100ms | Ease-Out |

### Sidebar Item

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Icon + label | — | — |
| Hover | Background tint | 100ms | Ease-Out |
| Active | Left border + tinted background | 200ms | Ease-Out |
| Collapse | Width 240px → 64px | 200ms | Ease-Out |
| Expand | Width 64px → 240px | 200ms | Ease-Out |
| Focus | 2px focus ring | 100ms | Ease-Out |

### Breadcrumb

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Link text Text-Secondary | — | — |
| Hover (link) | Color shift to Text-Body | 100ms | Ease-Out |
| Active page | Text-Body, weight 500 | — | — |
| Collapse | Show "..." for deep paths | 200ms | — |

### Dropdown Menu

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Menu hidden | — | — |
| Open | Fade in + slide down 8px | 200ms | Ease-Out |
| Close | Fade out + slide up 8px | 150ms | Ease-In |
| Item hover | Background tint | 100ms | Ease-Out |
| Item focus | Background tint | 100ms | Ease-Out |
| Item select | Background Primary-100 | 100ms | Ease-Out |

### Accordion

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Header visible, content hidden | — | — |
| Hover (header) | Background tint | 100ms | Ease-Out |
| Expand | Chevron rotates 180° + content reveals | 200ms | Ease-Out |
| Collapse | Chevron rotates back + content hides | 150ms | Ease-In |
| Focus | 2px ring on header | 100ms | Ease-Out |

### Pagination

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Page number | — | — |
| Hover (page) | Background tint | 100ms | Ease-Out |
| Active (page) | Primary background, white text | 200ms | Ease-Out |
| Prev/Next hover | Icon tint | 100ms | Ease-Out |
| Disabled prev/next | Opacity 0.4 | 100ms | Ease-Out |

---

## Data Display

### Card

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Surface-1, Shadow-1 | — | — |
| Hover | Shadow-2, elevation Layer 1→2 | 200ms | Ease-Out |
| Active/Press | Background slight darken | 50ms | Ease-Out |
| Focus | 2px focus ring | 100ms | Ease-Out |
| Appear | Fade in + slide up 8px | 200ms | Ease-Out |
| Remove | Fade out | 150ms | Ease-In |

### Table Row

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | No background | — | — |
| Hover | Background tint (Neutral-50/100) | 100ms | Ease-Out |
| Selected | Background Primary-50 | 200ms | Ease-Out |
| Focus (cell) | Focus ring on cell | 100ms | Ease-Out |
| Row appear | Fade in + slide up | 200ms | Ease-Out |
| Row remove | Fade out + height compress | 200ms | Ease-In |

### Chip / Tag

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Colored background + label | — | — |
| Hover | Background darken | 100ms | Ease-Out |
| Active | Scale 0.95 | 50ms | Ease-Out |
| Remove | Fade out + compress | 150ms | Ease-In |
| Add | Fade in + expand | 200ms | Ease-Out |

### Avatar

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Image or initials | — | — |
| Hover (interactive) | Overlay tint | 100ms | Ease-Out |
| Active | Scale 0.97 | 50ms | Ease-Out |
| Status change | Badge transition | 200ms | Ease-Out |

### Badge

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Default | Number or dot | — | — |
| Count increase | Brief scale up + return | 200ms | Ease-Spring |
| Count decrease | Brief scale down + return | 200ms | Ease-Spring |
| Appear | Scale in from 0 | 200ms | Ease-Out |

---

## Feedback Components

### Dialog

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Backdrop appear | Opacity 0→1 | 200ms | Ease-Out |
| Content appear | Scale 1.05→1 + opacity 0→1 | 200ms | Ease-Out |
| Backdrop dismiss | Opacity 1→0 | 150ms | Ease-In |
| Content dismiss | Scale 1→0.95 + opacity 1→0 | 150ms | Ease-In |

### Toast

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Slide from right + fade in | 300ms | Ease-Out |
| Dismiss | Fade out + slide | 200ms | Ease-In |
| Stack adjust | Smooth vertical reposition | 200ms | Ease-Out |
| Action taken | Brief checkmark + compression | 200ms | Ease-Spring |

### Alert / Banner

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Slide down from top | 300ms | Ease-Out |
| Dismiss | Slide up + fade | 200ms | Ease-In |
| Content change | Cross-fade | 200ms | Ease-Out |

### Confirmation Dialog

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Backdrop + content scale | 200ms | Ease-Out |
| Confirm action | Button press + content dismiss | 50ms + 150ms | Ease-Out |
| Cancel action | Content fade, backdrop fade | 150ms | Ease-In |

### Progress Bar

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Start | Bar appears at 0% | 200ms | Ease-Out |
| Progress | Width fills smoothly | 200ms per segment | Ease-Out |
| Complete | Bar fills to 100%, checkmark | 300ms | Ease-Spring |
| Indeterminate | Animated stripe | 1000ms loop | Linear |

---

## AI Components

### AI Suggestion Card

| State | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Fade in from below content | 300ms | Ease-Out |
| Dismiss | Fade out | 150ms | Ease-In |
| Accept | Card compresses, element updates | 200ms | Ease-Spring |
| Modify | Card transitions to editor | 200ms | Ease-Out |

### AI Thinking

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Idle | Static icon | — | — |
| Thinking | Gentle pulse animation | 2000ms loop | Ease-In-Out |
| Complete | Pulse stops, result appears | 300ms | Ease-Out |
| Error | Pulse stops, error state | 200ms | Ease-In |

### Streaming Message

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Start | AI icon activates | 200ms | Ease-Out |
| Streaming | Words appear progressively | Variable | — |
| Complete | Final message, sources appear | 300ms | Ease-Out |
| Error | Streaming stops, error shown | 150ms | — |

### Match Score

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Load | Score fills from 0 to value | 800ms | Ease-Out |
| Update | Score transitions to new value | 400ms | Ease-Smooth |
| Hover | Breakdown tooltip appears | 200ms | Ease-Out |

---

## Content Display

### Empty State

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Illustration fades in | 300ms | Ease-Out |
| Text appear | Text slides up | 200ms | Ease-Out |
| Action appear | Button fades in | 100ms delay | Ease-Out |

### Error State

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Illustration fades in | 200ms | Ease-Out |
| Message appear | Text fades in | 100ms delay | Ease-Out |
| Retry button | Button appears | 50ms delay | Ease-Out |

### List Item

| Phase | Visual Change | Duration | Easing |
|-------|---------------|----------|--------|
| Appear | Fade in + slide up 4px | 200ms | Ease-Out |
| Remove | Fade out + height compress | 200ms | Ease-In |
| Reorder | Smooth position transition | 200ms | Ease-Out |
| Select | Background tint | 100ms | Ease-Out |

---

## Micro-Interaction Map

| Component | Default | Hover | Active/Focus | Animation |
|-----------|---------|-------|--------------|-----------|
| Primary Button | Primary-500 | Primary-600 | Scale 0.97 | 50ms press, 100ms release |
| Secondary Button | Border + transparent | Background tint | Scale 0.97 | 50ms press, 100ms release |
| Ghost Button | No style | Background tint | Scale 0.97 | 50ms press, 100ms release |
| Icon Button | Icon only | Circular tint | Circular darker | 50ms press, 100ms release |
| Text Input | Gray border | Darker border | Primary border + ring | 100ms focus/border |
| Checkbox | Empty box | Box tint | Check mark | 200ms toggle |
| Radio | Empty circle | Circle tint | Inner circle fill | 200ms select |
| Switch | Off track | Track tint | Knob slides | 200ms toggle |
| Select | Gray border | Darker border | Open dropdown | 200ms open |
| Tabs | Text only | Text + tint | Indicator slide | 200ms indicator |
| Accordion | Header | Tint header | Content reveal | 200ms expand |
| Card | Shadow-1 | Shadow-2 | Darken | 200ms hover lift |
| Table Row | No bg | Tint row | Selected tint | 100ms hover |
| Dialog | Hidden | — | Scale + fade | 200ms open / 150ms close |
| Toast | Hidden | — | Slide in | 300ms appear |
| Tooltip | Hidden | Fade in | Fade out | 300ms delay, 200ms appear |

---

*This Micro-Interactions document provides component-level specifications. Refer to [Interaction-System.md](Interaction-System.md) for global interaction rules, [Animation-System.md](Animation-System.md) for animation patterns, and [Feedback-System.md](Feedback-System.md) for feedback animations.*
