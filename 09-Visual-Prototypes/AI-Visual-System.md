# AI Visual System — Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** DP-5 Visual Foundation (AI Visual Language), DP-8 Interaction & Motion

---

## 1. AI Visual Principles

### Principle 1: Identifiable at a Glance

Every AI-generated or AI-assisted element carries a discernible visual marker that users immediately recognize without reading labels.

| Mechanism | Implementation |
|-----------|---------------|
| AI Badge | "AI" or "AI Suggestion" chip on every AI component |
| Accent Bar | 3px Primary-400 left border on AI cards |
| Icon | Sparkle icon (20px) on headings, AI buttons, AI panel |
| Color | Primary scale exclusively for AI elements |
| Pattern | Consistent AI Zone styling across all pages |

### Principle 2: Never Mimics Human Content

AI output has distinct visual styling that differentiates it from user-generated or system content.

| Differentiation | Implementation |
|----------------|---------------|
| Background tint | Primary-50 (#EFF6FF) for AI cards and containers |
| Border style | Primary-200 dashed border for AI suggestions (vs solid for user content) |
| Typography | Same font family but with subtle tinted background |
| Accent bar | 3px left bar (never used on human content) |
| Avatar | AI avatar uses sparkle icon in Primary-500 circle (never a person photo) |
| Timestamp | AI messages show "AI · just now" vs "You · 2m ago" |

### Principle 3: Deferential Visual Weight

AI suggestions appear beside or below content, never over it. AI never obscures primary content.

| Hierarchy | Visual Weight | Position |
|-----------|---------------|----------|
| User content | 100% | Center, primary reading area |
| AI suggestions | 85% | Side panel, below content, inline but visually separated |
| AI recommendations | 75% | Cards with reduced shadow (Layer 1), no overlap |
| AI notifications | 70% | Non-intrusive chips, no popups unless critical |

### Principle 4: Transparent by Default

Confidence, sources, and thinking are always visible, never hidden behind a click unless the AI component is very small.

| Element | Always Visible | Expandable |
|---------|---------------|------------|
| Confidence indicator | Badge/chip on every AI suggestion | Full explanation on hover/tap |
| Sources | Cited inline (Caption text) | Full source list in reasoning panel |
| Thinking | 3-dot pulse while AI processes | Optional "Thinking..." label |
| Reasoning | Summary line below suggestion | Full reasoning in expandable panel |
| Model info | Hidden by default | In tooltip: "MR:EGO AI v2.4 · GPT-4o" |

### Principle 5: Consistent Visual Language

Every AI feature uses the same visual vocabulary. There is exactly one way to style AI content.

| Element | Consistent Treatment |
|---------|---------------------|
| AI Badge | Primary-100 bg, Primary-700 text, 4px radius, 16–20px height |
| Accent bar | 3px width, Primary-400, left edge |
| Background | Primary-50 for suggestion areas |
| Font | Inter, same as system (no italic, no decorative) |
| Icons | Sparkle (solid) for AI, Brain for deep analysis, Stars for suggestions |
| Motion | Slower than UI motion (2000ms thinking loop) |
| Border | Primary-200, 1px dashed for suggestion cards |
| Shadow | Layer 1 (same as regular cards) |

---

## 2. Core AI Component Prototypes

### 2.1 Thinking Indicator

```
[● ● ●]  "Thinking..."
 6px each
 gap 4px
 Primary-400
```

| Property | Spec |
|----------|------|
| Dots | 3 circles, 6px diameter each |
| Gap | 4px between dots |
| Color | Primary-400 (#60A5FA light mode, #93C5FD dark mode) |
| Animation | Opacity pulse sequence |
| Dot 1 | opacity: 15% → 100% → 15% |
| Dot 2 | offset +200ms from dot 1 |
| Dot 3 | offset +400ms from dot 1 |
| Light mode opacity range | 15% (dim) to 100% (full) |
| Dark mode opacity range | 30% (dim) to 100% (full) |
| Loop duration | 2000ms total cycle |
| Easing | ease-in-out |
| Label | "Thinking..." optional, 13px Caption, Text-Secondary, screen reader only on mobile |
| role | `role="status"` with `aria-label="AI is thinking"` |
| Wrapper | Inline-flex, align-items: center, gap: 8px |

**States:**

| State | Visual |
|-------|--------|
| Idle | Dots hidden, no indicator |
| Processing | Dots animating, label visible |
| Error | Dots stop, "Failed" text in error color (Red-500) |
| Cancel | Dots fade out (200ms), no indicator |

### 2.2 Streaming Message

```
┌─────────────────────────────────────────────┐
│ ▌  Based on your CV, I recommend focusing   │ ← accent bar 3px
│ │  on system design skills. The top compan-  │
│ │  ies hiring for AI engineers...▎           │ ← blinking cursor
│                                             │
│  [AI Suggestion]  High confidence  [Apply]  │
└─────────────────────────────────────────────┘
```

| Property | Spec |
|----------|------|
| Text appearance | Word-by-word, max 30 words per second |
| Cursor | Vertical bar, 2px width, 18px height |
| Cursor color | Primary-500 |
| Cursor blink | 500ms on/off, `step-end` |
| Cursor position | End of streamed text (insertion point) |
| Cursor removal | Fades out 300ms after stream completes |
| Accent bar | 3px Primary-400, left edge, full message height |
| Background | Primary-50 (#EFF6FF) only for AI messages |
| Border radius | 8px (message bubble) |
| Padding | 16px (Space-5) |
| Max width | 720px (content area) |
| aria-live | `aria-live="polite"` on container |
| aria-label | "AI-generated content" on message wrapper |

**States:**

| State | Behavior |
|-------|----------|
| Idle | No message |
| Streaming | Words appearing, cursor blinking |
| Paused | Cursor static (not blinking), text dimmed 80% |
| Complete | Cursor fades out, accent bar remains, actions appear |
| Error | Red accent bar instead of Primary, error text, retry button |
| Regenerating | Old content fades (200ms), new content streams in |

### 2.3 AI Suggestion Card

```
┌─── Primary-200 dashed border ─────────────────────┐
│  ┌──────────────────────────────┐  [AI Suggestion]│ ← badge top-right
│  │ ▌  We noticed your CV lacks  │                  │
│  │ │  quantifiable achievements.│                  │
│  │ │  Adding metrics could...   │                  │
│  └──────────────────────────────┘                  │
│                                             ═══╗   │ ← confidence bar
│  [Apply]  [Modify]  [Dismiss]                   │  │
└────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Card bg | Surface-1 with 2% Primary-500 tint |
| Border | 1px dashed Primary-200 |
| Radius | 8px (Radius-Md) |
| Shadow | Shadow-1 (Layer 1) |
| Padding | 16px (Space-5) |
| Accent bar | 3px Primary-400, left edge |
| Badge | Top-right, Primary-100 bg, Primary-700 text |
| Confidence | Bar or indicator below content |
| Actions | [Apply] [Modify] [Dismiss] Button-Small row |

**AI Badge on Card:**

| Property | Spec |
|----------|------|
| Background | Primary-100 (#DBEAFE) |
| Text color | Primary-700 (#1D4ED8) |
| Text | "AI" or "AI Suggestion" |
| Font | 11px weight 600 (when "AI"), 12px weight 500 (when "AI Suggestion") |
| Height | 16px ("AI") / 20px ("AI Suggestion") |
| Padding H | 6px |
| Border | 1px Primary-200 |
| Radius | 4px |
| Icon | Optional sparkle (12px) prepended |

**Confidence Indicator:**

| Level | Visual | Opacity |
|-------|--------|---------|
| High | Primary-500 solid fill bar + checkmark icon | 100% |
| Medium | Primary-300 dimmed fill bar + dash icon | 60% |
| Low | Primary-300 outline-only bar + question icon | 30% |
| Below 40% | Never shown (hidden entirely) | — |

**Confidence Bar Spec:**

| Property | Value |
|----------|-------|
| Height | 4px |
| Width | 80px (fixed) |
| Radius | 4px (pill) |
| Track bg | Neutral-200 |
| Fill | Primary-500 (High), Primary-300 (Medium), outline (Low) |
| Label | "High confidence" / "Medium" / "Low" text beside bar |

**States:**

| State | Behavior |
|-------|----------|
| Default | Card visible, actions enabled |
| Applied | Subtle success state: [Applied] replaces [Apply], checkmark, 60% opacity |
| Modified | "Open in editor" action, card minimized |
| Dismissed | Slide out right (200ms), undo option appears 3s |
| Loading | Skeleton variant, shimmer animation |
| Error | Red accent bar, "Could not generate suggestion" text |

### 2.4 Confidence Indicator (Standalone)

```
  ═══╗  High confidence
  or
  ───╚  Medium confidence
  or
  ═══╝  Low confidence
```

| Level | Icon | Bar | Hover Text |
|-------|------|-----|------------|
| High (80–100%) | Checkmark (Primary-500) | Solid bar, full width | "AI is confident in this suggestion" |
| Medium (60–79%) | Dash (Primary-300) | Dimmed 60%, partial width | "AI has moderate confidence" |
| Low (40–59%) | Question mark (Primary-300) | Outline only, 30% width | "AI has low confidence — review carefully" |
| Below 40% | Hidden | Hidden | — |

| Property | Spec |
|----------|------|
| Interactive | Hover/tap shows explanation tooltip |
| Width | 80–120px depending on context |
| Placement | Right of AI badge or below suggestion body |
| Font | 11px Caption, Text-Secondary |
| Accessibility | aria-label includes confidence level and percentage |

### 2.5 Reasoning Panel

```
┌────────────────────────────────────────────┐
│ ▼  Why MR:EGO suggests this        [AI]   │ ← Header clickable
│                                             │
│  1. Your CV contains 7 of 12 required      │ ← Bulleted steps
│     keywords for this role                  │
│     Source: CV Analysis (3 days ago)       │ ← Source citation
│                                             │
│  2. Your experience matches the seniority   │
│     level preferred (5+ years)             │
│     Source: Job Description Parsing        │
│                                             │
│  3. This company has hired from your        │
│     current employer previously             │
│     Source: Market Data (LinkedIn)         │
└────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Header text | Heading-4 "Why MR:EGO suggests this" or context-appropriate |
| Chevron | Rotates 180° on expand |
| Background | Surface-1 (same as card) |
| Border | 1px solid Neutral-300 |
| Radius | 8px |
| Padding | 16px |
| Steps | Numbered (1., 2., 3.), Body text, 8px gap between steps |
| Sources | Caption 13px, Text-Secondary, italic, below each step |
| AI Badge | In header, inline |
| Animation | Expand/collapse 300ms ease-out, slide + fade |
| Max height collapsed | 0px (overflow hidden) |
| Max height expanded | Auto (calculated) |
| Accessibility | `aria-expanded` on header button |

**States:**

| State | Behavior |
|-------|----------|
| Collapsed | Chevron down, body hidden, "Why MR:EGO suggests this" visible |
| Expanded | Chevron up, body visible with all steps |
| Loading | Steps grayed out, shimmer on text lines |
| Empty (no reasoning) | Hidden entirely, AI suggestion without reasoning panel |

### 2.6 Memory Indicator

```
 [🧠  Memory]    ← Chip, clickable
```

| Property | Spec |
|----------|------|
| Background | Neutral-100 (Surface-2) |
| Text | "Memory" or "Memory: 3 items" |
| Icon | 14px brain or bookmark icon, Neutral-500 |
| Height | 20px |
| Padding H | 8px |
| Radius | 4px |
| Border | 1px Neutral-300 |
| Placement | Above or beside AI suggestion, or in AI panel header |
| Hover | Tooltip: "MR:EGO remembers your preferences" |
| Click | Opens memory management (inline expand or slide-over) |

**States:**

| State | Visual |
|-------|--------|
| Active (has memory) | Normal chip, clickable |
| Empty (no memory) | Grayed out 50% opacity, "No saved memory" |
| Loading | Skeleton 20px × 60px |
| Error | Red dot, "Memory unavailable" |

### 2.7 Agent State Indicator

| State | Indicator | Animation | Color |
|-------|-----------|-----------|-------|
| Idle | Subtle AI icon (sparkle, 16px) | Static | Neutral-400 |
| Listening | Glow pulse 5% brightness | Pulse cycle 1500ms | Primary-400 |
| Thinking | 3-dot pulse 15–25% | 2000ms loop | Primary-400 |
| Responding | Glow pulse 15–30% | Pulse cycle 1500ms | Primary-500 |
| Error | Dimmed icon + error text | Static (no animation) | Red-500 |
| Offline | Gray "AI Offline" badge | Static | Neutral-400 |

```
Idle:        [✦]
Listening:   [✦]  (soft glow around icon)
Thinking:    [● ● ●]
Responding:  [✦]  (brighter glow)
Error:       [✦]  "Connection error"
Offline:     [AI Offline]
```

| Property | Spec |
|----------|------|
| Placement | AI panel header, bottom of AI messages, or topbar (compact) |
| Size | 16px icon (compact) or 24px icon + label (full) |
| Label | State text beside icon, 12px Caption |
| Role | `role="status"` with `aria-label` |

### 2.8 AI Match Score

**Variant A: Radial Gauge (56px)**

```
       ┌─────┐
      ╱  92%  ╲
     │   ═══  │      ← Primary-500 arc
     ╲        ╱
       └─────┘
    "Match Score"
```

| Property | Spec |
|----------|------|
| Diameter | 56px |
| Arc width | 4px |
| Track color | Neutral-200 |
| Fill color | Primary-500 |
| Animation | 0 → n score over 800ms, ease-out |
| Label | "92%", 20px weight 700, centered |
| Sub-label | "Match" or "Match Score", 11px Caption below |
| Accessibility | aria-valuenow dynamic |

**Variant B: Horizontal Bars**

```
  Skills:    ═══════════░░░░  85%
  Experience: ════════░░░░░░  70%
  Education:  ═════════════   100%
```

| Property | Spec |
|----------|------|
| Bar height | 8px |
| Track color | Neutral-200 |
| Fill color | Primary-500 |
| Animation | Stagger fill left-to-right, 100ms per bar |
| Labels | Left aligned, Body-Small, Text-Secondary |
| Percentage | Right aligned, Body-Small, Text-Primary |
| Gap between bars | 8px |

**States:**

| State | Behavior |
|-------|----------|
| Loading | Skeleton circle + text placeholder, shimmer |
| Animating | Number counts up 0→n, gauge fills clockwise |
| Complete | Full value displayed, static |
| Error | "Score unavailable" in Neutral-400 |

### 2.9 AI Recommendation List

```
┌───────────────────────────────────────────────┐
│  1. ●  Sr. Frontend Engineer at Cruise        │ ← numbered + confidence dot
│     92% match  ·  Apply by Friday              │ ← details
│     [View Details →]                           │ ← action
│                                                │
│  2. ○  AI Engineer at Google                   │ ← lower confidence
│     78% match  ·  Based on your latest search  │
│     [View Details →]                           │
│                                                │
│  3. ○  Staff Engineer at OpenAI                │
│     65% match  ·  New this week                │
│     [View Details →]                           │
└────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Numbering | 1., 2., 3. — 14px weight 600, Text-Secondary |
| Confidence dot | 8px circle, Primary-500 = high, Primary-300 = medium, outline = low |
| Item layout | Number + dot + title (row), details below |
| Title | Body weight 600, Text-Primary |
| Details | Caption, Text-Secondary |
| Action link | Text-Link, Primary-600 |
| Source citation | "Based on your profile" or "Based on your latest search" — Caption italic |
| Gap | 12px between items |
| Border | Optional 1px Neutral-200 between items |

### 2.10 AI Badge (Standalone)

```
        ┌──────────────┐
        │ ✦  AI        │  16px height variant
        └──────────────┘

        ┌──────────────────────┐
        │ ✦  AI Suggestion     │  20px height variant
        └──────────────────────┘
```

| Property | Small | Large |
|----------|-------|-------|
| Height | 16px | 20px |
| Text | "AI" | "AI Suggestion" |
| Font | 11px weight 600 | 12px weight 500 |
| Padding H | 6px | 8px |
| Icon | Optional sparkle 10px | Sparkle 12px |
| Background | Primary-100 | Primary-100 |
| Text color | Primary-700 | Primary-700 |
| Border | Primary-200, 1px | Primary-200, 1px |
| Radius | 4px | 4px |
| Placement | Top-left or top-right of AI component | Above AI component |

---

## 3. AI Zone Specifications

### 3.1 Dashboard AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| AI Summary Card | Full-width hero card | Top of content, below greeting | Primary-50 bg, Primary-200 border, dismissible |
| AI Recommendations | Widget card | Content area, column 1 | Suggestion card pattern |
| AI Insight | Mini widget | Content area, column 2 | Compact, single insight with confidence |
| Floating AI Button | Fixed circle | Bottom-right, 24px from edge | 56px circle (48px phone), Shadow-3 |
| AI Panel | Side panel (desktop) / bottom sheet (mobile) | Right side / bottom | 320px, Surface-1, left border |

### 3.2 AI Workspace Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| AI Context Panel | Persistent panel | Right side, 320px | Memory, context, sources, suggestions |
| AI Messages | Inline in conversation | Message area | Accent bar + Primary-50 bg |
| AI Input | Below conversation | Fixed bottom 52px bar | Input with AI context chip |
| Thinking Indicator | Inline in message area | Before AI response | 3-dot pulse |
| Streaming Message | Inline in message area | During generation | Word-by-word, cursor |
| Suggestion Chips | Below last message | Inside conversation | Primary-50 pill buttons |

### 3.3 CV Builder AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| AI Suggestions Panel | Side panel (desktop) / bottom sheet | Right side / bottom | Bullet suggestions, rephrase tools |
| Inline Suggestion | Ghost text in editor | Below user typing | Primary-400 text, lighter weight |
| Score Gauge | Dashboard area of builder | Top-right of preview | 56px radial, match score |
| AI Badge | On each suggestion | Top-right of suggestion card | "AI Suggestion" |

### 3.4 CV Analysis AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| Score Overview | Hero area, top of page | Centered, large | 64px radial gauge + breakdown bars |
| Suggestion Cards | Grid below score | 2–3 column grid | Full AI card with reasoning panel |
| Gap Analysis | Dedicated section | Middle of page | List with confidence per gap |
| Keyword Match | Side panel (desktop) | Right side | Horizontal bar chart |
| Comparison | Comparison panel | Side or expandable | Peer/industry comparison data |

### 3.5 Job Search AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| AI Match Filter | Toggle/filter in search | Top of results | "Show best matches only" |
| Match Score on Cards | Badge on each result | Top-right of card | Percentage with confidence indicator |
| AI Search Suggestions | Below search bar | Inline chips | "Try Senior AI roles" etc. |
| Saved Search Alerts | Below filters | Compact list | AI-managed alert preferences |
| AI Summary | Top of search results | Before result list | "We found 24 highly relevant matches" |

### 3.6 Job Details AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| Match Analysis | Side panel or tab | Right side or below description | Full breakdown by category |
| Application Tip | Below description | Inline suggestion | "Based on your CV, highlight your Python experience" |
| Salary Insight | Below compensation section | Inline card | AI-estimated range, confidence shown |
| Company Fit | Below culture section | Inline card | AI analysis of culture fit |

### 3.7 Messaging AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| AI Reply Suggestions | Above input bar | 3 suggestion chips | Generated based on conversation |
| Smart Reply | Inline in thread | Below last message | One-tap response |
| AI Context Panel | Right panel (desktop) | Right side | Conversation summary, action items |
| Compose Assistant | In compose view | Below compose area | Draft suggestions, tone adjustment |

### 3.8 Application Tracker AI Zone

| Zone | Element | Position | Spec |
|------|---------|----------|------|
| Status Prediction | On each application card | Below status badge | "Likely response in 5 days" with confidence |
| Next Best Action | Top of page | Banner/card | "Follow up with Cruise — 3 days since applied" |
| Pipeline Insight | Side panel (desktop) | Right side | "Your application is in top 25% of applicants" |
| Interview Prep | On interview items | Below interview card | "Common questions for this role" |

---

## 4. AI Motion Specifications

### 4.1 Motion Principles

| Principle | Implementation |
|-----------|---------------|
| Thoughtful motion | All AI motion is slower than UI motion |
| Thinking loop | 2000ms cycle (vs 200–300ms for UI animations) |
| Smooth | Ease-in-out, never linear |
| Non-distracting | No bounce, no elastic, no jitter |
| Purposeful | Every animation conveys state or progress |

### 4.2 Individual AI Motion Specs

| Component | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Thinking dots | Opacity cycle per dot | 2000ms loop | ease-in-out |
| Streaming text | Word appearance | 30 words/sec max | — |
| Streaming cursor | Blink | 500ms | step-end |
| Confidence bar fill | Width expansion | 400ms | ease-out |
| Radial score | Arc fill 0→n | 800ms | ease-out |
| Horizontal bars | Stagger fill per bar | 100ms offset | ease-out |
| Reasoning panel | Collapse/expand | 300ms | ease-out |
| AI suggestion dismiss | Slide right + fade | 200ms | ease-out |
| AI suggestion apply | Fade to success | 300ms | ease-out |
| AI panel slide-in | Slide from right | 250ms | ease-out |
| Bottom sheet (mobile) | Slide up | 300ms | ease-out |
| Memory chip appear | Fade in | 200ms | ease-out |
| AI badge appear | Fade in + scale 0.95→1 | 150ms | ease-out |
| Agent state change | Crossfade icon | 200ms | ease-out |

### 4.3 AI Motion vs UI Motion Comparison

| Motion | UI (Generic) | AI (Specific) |
|--------|-------------|---------------|
| Button hover | 100ms | — |
| Modal appear | 200ms | — |
| Page transition | 250ms | — |
| Sidebar toggle | 200ms | — |
| Thinking indicator | — | 2000ms loop |
| Message streaming | — | 30 words/sec |
| Score animation | — | 800ms |
| Reasoning panel | — | 300ms (intentionally slower than UI panel) |
| AI suggestion dismiss | — | 200ms |

---

## 5. AI Color Rules

### 5.1 Exclusive Palette

AI uses only the **Primary scale** for accents, indicators, and backgrounds. No green, teal, purple, or other colors are used for AI.

| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| Primary-50 | AI suggestion backgrounds | #EFF6FF | #1E3A5F |
| Primary-100 | AI badge background | #DBEAFE | #1E40AF |
| Primary-200 | AI card border (dashed) | #BFDBFE | #1D4ED8 |
| Primary-300 | Medium/low confidence | #93C5FD | #60A5FA |
| Primary-400 | Accent bar, thinking dots | #60A5FA | #93C5FD |
| Primary-500 | High confidence, cursor, fills | #3B82F6 | #60A5FA |
| Primary-600 | AI action links | #2563EB | #93C5FD |
| Primary-700 | AI badge text | #1D4ED8 | #BFDBFE |

### 5.2 Color Application Rules

| Element | Rule |
|---------|------|
| Backgrounds | Primary-50 only. Never Primary-100 or higher for backgrounds. |
| Accent bars | Primary-400 exclusively. Never use Primary-500 for accent bars. |
| Badges | Primary-100 bg with Primary-700 text. Fixed contrast. |
| Borders | Primary-200, dashed for suggestion cards. |
| Confidence | Primary-500 (high), Primary-300 (medium/low). |
| Text links | Primary-600, underline on hover. |
| Icons | Primary-500 for active/on state, Primary-300 for dimmed/off. |

### 5.3 Colors NOT Used for AI

| Color | Reason |
|-------|--------|
| Green / Emerald | Reserved for success states, not AI |
| Teal / Cyan | Avoids confusion with chat/communication |
| Purple / Violet | Not part of brand identity |
| Orange / Amber | Reserved for warnings |
| Red | Reserved for errors, destructive actions |
| Gradient | Never use gradients for AI elements |

---

## 6. Accessibility for AI Components

### 6.1 ARIA Roles & Properties

| Component | Role | aria-live | aria-label |
|-----------|------|-----------|------------|
| Thinking Indicator | status | — | "AI is thinking" |
| Streaming Message | — | polite | "AI-generated content" |
| AI Suggestion Card | region | — | "AI suggestion" |
| Confidence Indicator | img | — | "High confidence, 92 percent" |
| Reasoning Panel | region | — | "AI reasoning" |
| Reasoning toggle | button | — | "Toggle AI reasoning" |
| Match Score | img | — | "Match score: 92 percent" |
| AI Badge | status | — | "AI generated" |
| Memory Indicator | button | — | "Open AI memory" |
| Agent State | status | polite | "AI agent is [state]" |

### 6.2 Keyboard Navigation

| Component | Keyboard Behavior |
|-----------|------------------|
| AI Suggestion Card | Tab to enter, Tab through actions |
| Reasoning Panel | Enter/Space to toggle expand |
| Confidence Indicator | Enter to show detailed explanation |
| AI Panel | Tab navigation within panel, Escape to close |
| Floating AI Button | Tab to focus, Enter to open |
| Bottom Sheet (mobile) | Escape/Back to close |
| Memory Indicator | Enter/Space to open memory |
| AI Recommendations | Arrow keys to navigate list items |

### 6.3 Screen Reader Announcements

| Event | Announcement |
|-------|-------------|
| Thinking starts | "AI is thinking" (role="status") |
| Thinking complete | "AI has finished thinking" |
| Streaming starts | "AI is generating response" |
| Streaming complete | "Response complete" |
| Suggestion displayed | "AI suggestion available" |
| Suggestion applied | "Suggestion applied" |
| Suggestion dismissed | "Suggestion dismissed" |
| Error | "AI encountered an error" (role="alert") |
| Confidence low | "Low confidence recommendation, review carefully" |

### 6.4 Contrast & Readability

| Requirement | Spec |
|-------------|------|
| AI text on Primary-50 bg | Text-Body color (Neutral-800), 4.5:1 minimum |
| AI badge text | Primary-700 on Primary-100, 4.5:1 minimum |
| Confidence bar fill | Primary-500 on Neutral-200 track, visible difference |
| Focus indicator | 2px Primary-500 ring on all interactive AI elements |
| Reduced motion | Respect prefers-reduced-motion: pause all AI animations |
| Font size minimum | 14px Body minimum for AI content |
| Line height | 1.6 for AI body text |

---

## 7. AI Visual System Validation

### 7.1 Every AI Component Checklist

| Spec | Present |
|------|---------|
| AI Badge visible | ✓ |
| Accent bar present | ✓ |
| Confidence indicator shown | ✓ |
| Sources cited where applicable | ✓ |
| Thinking state handled | ✓ |
| Error state handled | ✓ |
| Empty/null state handled | ✓ |
| Loading/skeleton state handled | ✓ |
| Screen reader accessible | ✓ |
| Keyboard navigable | ✓ |
| Motion spec defined | ✓ |
| Dark mode compatible | ✓ |

### 7.2 AI Visual Language Compliance

| Rule | Status |
|------|--------|
| Primary scale exclusively | ✓ |
| Deferential visual weight | ✓ |
| Transparent by default | ✓ |
| Consistent across all pages | ✓ |
| Never mimics human content | ✓ |
| Identifiable at a glance | ✓ |
| Slower motion than UI | ✓ |

---

*End of AI Visual System specification. Inherits AI visual language from DP-5 and AI interaction patterns from DP-8. Every AI component is specified at prototype fidelity ready for frontend implementation.*
