# AI Workspace — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Screen:** AI Conversation Workspace
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** Constitution, Design Language, Design System, Component Library, Application Shell, Visual Foundation, UX Architecture, High-Fidelity Wireframes, Interaction & Motion

---

## 1. Layout Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              TOPBAR (56px, glass)                                     │
│  [Logo] [Breadcrumb] [Global Search] [Notifications] [Avatar]                        │
├──────────┬────────────────────────────────────────────────────┬───────────────────────┤
│          │                                                    │                       │
│ SIDEBAR  │           CONVERSATION AREA (flex:1)              │  AI CONTEXT PANEL     │
│ (240px)  │                                                    │  (320px, Surface-1)   │
│          │  ┌─ CONVERSATION HEADER (56px) ─────────────────┐  │                       │
│ Surface-2│  │ "AI Workspace" H3 · [Context Badge] · [•••] │  │  ┌─ MEMORY ────────┐ │
│          │  └──────────────────────────────────────────────┘  │  │ Skills │ Goals  │ │
│ Nav      │                                                    │  │ Apps badges      │ │
│ items    │  ┌─ MESSAGE AREA (scrollable) ──────────────────┐  │  └─────────────────┘ │
│ (14px)   │  │                                               │  │  ┌─ CONTEXT ──────┐ │
│          │  │  ┌───────────────────────────── User msg ──┐  │  │ │ Current page    │ │
│ Active   │  │  │ I need help optimizing my CV for AI     │  │  │ │ ● high conf     │ │
│ ───────  │  │  │ roles at top tech companies            │  │  │ └─────────────────┘ │
│          │  │  └─────────────────────────────────────────┘  │  │  ┌─ SOURCES ─────┐ │
│          │  │                                               │  │  │ CV_Analysis   │ │
│          │  │  ┌─ AI msg ───────────────────────────────┐  │  │  │ Job_Search    │ │
│          │  │  │ ⚡ I've analyzed your CV against 50+   │  │  │  │ Document_3    │ │
│          │  │  │ AI roles at Google, OpenAI, and        │  │  │ └─────────────────┘ │
│          │  │  │ Anthropic. Here are the key gaps...    │  │  │  ┌─ SUGGESTIONS ─┐ │
│          │  │  │                                         │  │  │ │ "Ask about    │ │
│          │  │  │ [Apply] [Modify] [Dismiss] [Why?]      │  │  │ │  skill gaps"  │ │
│          │  │  └─────────────────────────────────────────┘  │  │ │ "Improve      │ │
│          │  │                                               │  │ │  summary"     │ │
│          │  │  ┌─ System ────────────────────────────────┐  │  │ └─────────────────┘ │
│          │  │  │ ── Context updated: CV Analysis ────   │  │  │                       │
│          │  │  └─────────────────────────────────────────┘  │  │                       │
│          │  │                                               │  │                       │
│          │  │  ┌─ Suggested ─────────────────────────────┐  │  │                       │
│          │  │  │ [What skills are in demand?] [Optimize  │  │  │                       │
│          │  │  │  my summary] [Find salary ranges]       │  │  │                       │
│          │  │  └─────────────────────────────────────────┘  │  │                       │
│          │  └───────────────────────────────────────────────┘  │                       │
│          │                                                    │                       │
│          │  ┌─ INPUT AREA (fixed bottom, 52px) ────────────┐  │                       │
│          │  │ [📎]  Type a message...              [➤]     │  │                       │
│          │  │  Surface-0 bg, radius-md, border top         │  │                       │
│          │  └──────────────────────────────────────────────┘  │                       │
│          └────────────────────────────────────────────────────┘                       │
├──────────┴────────────────────────────────────────────────────────────────────────────┤
│                      FOOTER (optional)                                                │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Layout Tokens

| Element | Token | Value |
|---------|-------|-------|
| Sidebar width | — | 240px |
| Sidebar background | Surface-2 | Neutral-100 |
| Conversation area | — | flex: 1, min-width: 0 |
| AI Context Panel width | — | 320px |
| AI Context Panel bg | Surface-1 | #FFFFFF |
| AI Context Panel border-left | Border-Default | Neutral-300 |
| Topbar height | — | 56px |
| Topbar background | Glass-Navigation | rgba(255,255,255,0.72), blur 12px |
| Message area max width | — | 720px (centered within conversation area) |
| Message area padding | Space-8 | 32px horizontal |

### 1.2 Elevation Map

| Layer | Element | Shadow Token |
|-------|---------|-------------|
| 0 | Page background | Shadow-0 |
| 0 | Sidebar | Shadow-0 |
| 1 | Topbar (glass) | Shadow-1 |
| 1 | Context panel | Shadow-0 (border-left only) |
| 1 | Input area | Shadow-1 (top), Layer 1 |
| 1 | AI message cards | Shadow-1 |
| 2 | Message hover actions | Shadow-2 |
| 3 | Context panel on tablet drawer | Shadow-3 |
| 4 | Tooltip | Shadow-4 |

---

## 2. Section Walkthrough

### 2.1 Conversation Header

```
┌────────────────────────────────────────────────────────────────────┐
│  Heading-3: "AI Workspace"          [Context Badge]    [•••] [×] │
│  Surface-1 bg, border-bottom Border-Default                       │
│  Height: 56px, padding Space-5 horizontal                         │
└────────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Title | Heading-3 | 22px, weight 600, line-height 1.25, Text-Primary |
| Context badge | Primary-50 bg, Primary-600 text | 13px Caption, radius-sm (4px), padding Space-3 horizontal |
| Actions menu | — | Icon button "•••", 24px, Neutral-400, on hover Neutral-600 |
| Close button | — | Icon button "×", 24px, Neutral-400, visible on mobile |
| Container | — | Flex row, align-items center, justify-content space-between |
| Container background | Surface-0 | Neutral-50 (blends with message area) |
| Container border-bottom | Border-Default | 1px Neutral-300 |

### 2.2 Context Badge

```
┌────────────────────────────────────────────────────────────────────┐
│  ⚡ Primary-50 background, Primary-200 border, radius-sm          │
│  "AI has context from: CV Analysis, Job Search"                    │
│  Body-Small (14px), Text-Body                                      │
│  Close button (×) on right to dismiss                             │
└────────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-50 | #EFF6FF |
| Border | Primary-200 | #BFDBFE, 1px |
| Radius | Radius-Sm | 4px |
| Padding | Space-3 | 8px vertical, Space-4 (12px) horizontal |
| Icon | Sparkle | 16px × 16px, Primary-500 |
| Text | Body-Small | 14px, weight 400, line-height 1.5, Text-Body |
| Sources list | Primary-600 | #2563EB, medium weight |
| Dismiss | — | 16px icon, Neutral-400 |
| Margin bottom | Space-5 | 16px |

**States:**

| State | Behavior |
|-------|----------|
| Default | Shows 2–3 most relevant context sources |
| No context | Hidden entirely |
| Many sources | Truncated: "AI has context from: CV Analysis, Job Search, +2 more" |
| Dismissed | Collapses to a small "Context available" chip that expands on click |
| Updated | Brief pulse animation on icon (200ms) when context changes |

### 2.3 Message Area

```
┌────────────────────────────────────────────────────────────────────┐
│  Surface-0 background, scrollable, padding Space-8 horizontal     │
│  Max-width: 720px centered                                         │
│                                                                    │
│  ┌──────────────────────────────────────────────────── User ──┐   │
│  │  Body: "I need help optimizing my CV for AI roles at       │   │
│  │  top tech companies like Google and OpenAI."               │   │
│  │  Caption: "10:32 AM"                                       │   │
│  │  Primary-600 bg, white text, radius-lg (12px)             │   │
│  │  max-width 70%, margin-left auto                           │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌──────────────────────────────────────────────── AI ──────────┐ │
│  │  ⚡ (sparkle icon, 16px, Primary-500, position absolute       │ │
│  │       top-left of message)                                     │ │
│  │                                                               │ │
│  │  Body: "I've analyzed your CV against 50+ AI roles at        │ │
│  │  Google, OpenAI, Anthropic, and Meta. Here are the top       │ │
│  │  3 gaps I found:                                              │ │
│  │                                                               │ │
│  │  1. **Research publications** — Only 12% of matched roles    │ │
│  │     require this, but it's a differentiator at top labs      │ │
│  │  2. **Multimodal experience** — 68% of senior roles mention  │ │
│  │     this, your CV shows none                                  │ │
│  │  3. **Production ML systems** — 82% require experience with  │ │
│  │     deployed models at scale                                  │ │
│  │                                                               │ │
│  │  Would you like me to help rewrite specific sections?"        │ │
│  │                                                               │ │
│  │  [Apply Changes] [Modify] [Dismiss] [Why?]                    │ │
│  │                                                               │ │
│  │  Caption: "10:33 AM · 2 sources"                              │ │
│  │  Surface-1 bg, border, radius-lg (12px)                       │ │
│  │  max-width 70%, margin-right auto                             │ │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌────────────────────────────────────────── System ──────────┐   │
│  │  ── Context updated: Included CV Analysis results ──      │   │
│  │  Caption, Text-Tertiary, text-align center                  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ Suggested ───────────────────────────────────────────────┐   │
│  │  [What skills are in demand for AI roles?]                │   │
│  │  [Rewrite my professional summary]                       │   │
│  │  [Show me salary ranges for AI/ML positions]             │   │
│  │  Body-Small (14px), Primary-50 bg, radius-md              │   │
│  │  Fade in with stagger (100ms each)                       │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

#### 2.3.1 User Messages

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-600 | #2563EB |
| Text color | Text-Inverse | #FFFFFF |
| Radius | Radius-Lg | 12px |
| Padding | Space-5 | 16px |
| Max width | — | 70% of container |
| Alignment | — | margin-left: auto (right-aligned) |
| Margin bottom | Space-5 | 16px |
| Timestamp | Caption | 13px, weight 400, Text-Secondary (white at 70% opacity within bubble) |
| Shadow | Shadow-1 | Layer 1 |
| Font | Body | 15px, weight 400, line-height 1.6 |

**States:**

| State | Behavior |
|-------|----------|
| Sent | Shows message + timestamp immediately |
| Failed | Message red border + "Failed to send" + [Retry] [Delete]. Background Danger-50. |
| Edited | Shows "(edited)" after timestamp |
| Long (>500 chars) | Message bubble scrollable internally |

#### 2.3.2 AI Messages

| Property | Token | Value |
|----------|-------|-------|
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | 1px Neutral-300 |
| Radius | Radius-Lg | 12px |
| Padding | Space-5 | 16px |
| Max width | — | 70% of container |
| Alignment | — | margin-right: auto (left-aligned) |
| Margin bottom | Space-5 | 16px |
| Sparkle icon | — | 16px × 16px, Primary-500, position absolute top-left (-8px offset) |
| Timestamp | Caption | 13px, weight 400, Text-Tertiary |
| Sources link | Caption | Primary-600, underlined on hover |
| Action buttons | Button-Small | 14px, 32px height, radius-md, ghost style |
| Shadow | Shadow-1 | Layer 1 |
| Font | Body | 15px, weight 400, line-height 1.6 |

**AI Action Buttons:**

| Button | Label | Action | Color |
|--------|-------|--------|-------|
| Apply | "Apply Changes" | Applies AI suggestion directly (e.g., update CV) | Primary-600 text |
| Modify | "Modify" | Opens modification prompt | Neutral-600 text |
| Dismiss | "Dismiss" | Removes this suggestion, stores as dismissed | Neutral-500 text |
| Why? | "Why?" | Expands to show AI reasoning + sources | Primary-600 text |

**States:**

| State | Behavior |
|-------|----------|
| Streaming | Character-by-character reveal. Action buttons disabled until complete. |
| Complete | Full message displayed. Action buttons enabled. Timestamp shown. |
| Contains code | Code block within message: radius-md, Surface-2 bg, monospace font, copy button |
| Contains table | Table within message: responsive, striped rows, Border-Default |
| Long message | Expandable: show first 300px + "Show more" link. Full message on click. |
| With sources | Source count in timestamp: "3 sources". Click opens context panel sources section. |
| Regenerated | Cross-fade old → new message content (200ms ease-in-out) |

#### 2.3.3 System Messages

| Property | Token | Value |
|----------|-------|-------|
| Text | Caption | 13px, weight 400, Text-Tertiary |
| Alignment | — | text-align: center |
| Margin | Space-5 | 16px top/bottom |
| Style | — | "── " prefix/suffix, " ──" centered |
| Types | — | Context updated, conversation started, tool used, error recovery |

**System message types:**

| Type | Prefix | Icon |
|------|--------|------|
| Context updated | "Context updated: " | — |
| Conversation started | "Conversation started" | — |
| Tool used | "Used: CV Analysis tool" | ⚡ |
| Error recovery | "Reconnected. Last response may be incomplete." | ⚠ |
| Rate limit | "You've reached the rate limit. Resumes in 30s." | ⏳ |

#### 2.3.4 Suggested Prompts

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-50 | #EFF6FF |
| Radius | Radius-Md | 8px |
| Padding | Space-3 | 8px horizontal, Space-4 (12px) vertical |
| Text | Body-Small | 14px, weight 500, Primary-600 |
| Gap | Space-3 | 8px between chips |
| Alignment | — | margin-right: auto (left-aligned) |
| Container margin | Space-5 | 16px bottom |
| Hover | — | Primary-100 bg, cursor pointer |
| Max chips | — | 3 per row, wrap to new line |

**States:**

| State | Behavior |
|-------|----------|
| Default | 3 contextual prompt chips based on conversation history |
| Empty (new chat) | 3 generic chips: "Optimize my CV", "Find jobs", "Career advice" |
| Loading | 3 skeleton chips (80px × 32px each), pulse |
| No suggestions | Hidden entirely |
| Clicked | Chip cross-fades to "Thinking..." (Body-Small, italic, Text-Secondary) |
| Exhausted | "No more suggestions" — chips hidden after all clicked |

### 2.4 Input Area

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  Surface-1 bg, border-top Border-Default, fixed bottom      │ │
│  │  padding Space-5 (16px)                                     │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ [📎]  │  Type a message...              │ [➤]        │ │ │
│  │  │ 24px  │  Surface-0 bg, radius-md       │ 36px circle  │ │ │
│  │  │       │  Body (15px), placeholder: Text-Tertiary  │ Primary-600 │ │
│  │  │       │  Text-Primary when typing         │           │ │ │
│  │  │       │  52px height                      │           │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Container bg | Surface-1 | #FFFFFF |
| Container border-top | Border-Default | 1px Neutral-300 |
| Container padding | Space-5 | 16px |
| Input bg | Surface-0 | Neutral-50 |
| Input radius | Radius-Md | 8px |
| Input height | — | 52px |
| Input padding | Space-4 | 12px horizontal |
| Input text | Body | 15px, weight 400, color Text-Primary |
| Input placeholder | — | "Type a message..." Text-Tertiary |
| Attachment icon | — | 24px × 24px, Neutral-400, hover Primary-500 |
| Send button size | — | 36px × 36px |
| Send button shape | Radius-Full | Circle |
| Send button bg | Primary-600 | #2563EB |
| Send button hover | Primary-500 | #3B82F6 |
| Send button disabled | Neutral-300 | 40% opacity, not clickable |
| Send icon | — | 16px × 16px arrow up, white |
| Send button margin-left | Space-3 | 8px |

**States:**

| State | Behavior |
|-------|----------|
| Empty | Send button disabled (40% opacity, Neutral-300). Placeholder visible. |
| Typing | Send button enabled (Primary-600). Character count shown at 400+ chars. |
| Sending | Input disabled, send button shows spinner (16px, white). Disabled for 300ms debounce. |
| Voice (future) | Microphone icon replaces attachment icon. Pulse animation when recording. |
| Rate limited | Input shows warning below: "Rate limit reached. Wait 30s." in Caption, Warning-500. |
| Offline | Input shows "You're offline" placeholder. Send button disabled. Offline indicator below. |
| Multi-line | Input expands to max 120px (3 lines), then scrolls. Min height 52px. |

**Keyboard shortcuts:**

| Shortcut | Action |
|----------|--------|
| Enter | Send message (single line) |
| Shift+Enter | New line in message |
| / | Focus input area (global) |
| Escape | Clear input / blur input |
| Ctrl+Enter | Send from any focus state |

### 2.5 AI Context Panel (Right, 320px)

```
┌──────────────────────────────────────────────────────────────────┐
│                      AI CONTEXT PANEL (320px)                    │
│  Surface-1 bg, border-left Border-Default                        │
│  Scrollable sections                                              │
│                                                                  │
│  ┌─ MEMORY ──────────────────────────────────────────────────┐  │
│  │  Heading-4: "Memory"                                      │  │
│  │                                                           │  │
│  │  [Skills: Python, ML, System Design]  (badge row)        │  │
│  │  [Goals: Senior IC → Staff]          (badge row)         │  │
│  │  [Apps: CV Builder, Job Search used]  (badge row)        │  │
│  │                                                           │  │
│  │  Badges: Caption (13px), radius-sm (4px), Surface-2 bg   │  │
│  │  Gap Space-3 (8px) between badges                        │  │
│  │  Padding Space-5 (16px) section padding                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ CONTEXT ─────────────────────────────────────────────────┐  │
│  │  Heading-4: "Context"                                     │  │
│  │                                                           │  │
│  │  Current page: Dashboard                                  │  │
│  │  ● Confidence: High (green dot)                           │  │
│  │  Last sync: 2 min ago                                     │  │
│  │                                                           │  │
│  │  Body-Small (14px), Text-Body                              │  │
│  │  Confidence dot: 8px circle, Success-500 / Warning-500    │  │
│  │  / Danger-500                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SOURCES ────────────────────────────────────────────────┐  │
│  │  Heading-4: "Referenced Sources"                         │  │
│  │                                                           │  │
│  │  • CV Analysis Report (2m ago)      ⚡ Primary-600        │  │
│  │  • Job Search: Sr. Frontend (5m ago) ⚡ Primary-600       │  │
│  │  • Document: resume_v3.pdf (1h ago) ⚡ Neutral-600        │  │
│  │                                                           │  │
│  │  Each source: Body-Small, clickable, icon left            │  │
│  │  Active sources show Primary-500 dot                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SUGGESTIONS ────────────────────────────────────────────┐  │
│  │  Heading-4: "Try Asking"                                 │  │
│  │                                                           │  │
│  │  [What are my skill gaps?]                               │  │
│  │  [How to improve my summary?]                            │  │
│  │  [Compare my CV to job reqs]                             │  │
│  │  [Find companies hiring AI roles]                        │  │
│  │                                                           │  │
│  │  Button-Small, Primary-50 bg, radius-md                  │  │
│  │  Caption (13px), Primary-600 text                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SETTINGS (bottom) ──────────────────────────────────────┐  │
│  │  [Model: Claude Sonnet 4.8] [⚙️ Configure]            │  │
│  │  Caption, Text-Secondary                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

#### 2.5.1 Memory Section

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Section padding | Space-5 | 16px |
| Badge bg | Surface-2 | Neutral-100 |
| Badge text | Caption | 13px, weight 400, Text-Body |
| Badge radius | Radius-Sm | 4px |
| Badge padding | Space-3 | 6px horizontal, 4px vertical |
| Badge gap | Space-3 | 8px |
| Section divider | Border-Default | 1px Neutral-300 |

#### 2.5.2 Context Section

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Current page | Body-Small | 14px, weight 500, Text-Body |
| Confidence dot | — | 8px circle |
| Confidence dot high | Success-500 | #10B981 |
| Confidence dot medium | Warning-500 | #F59E0B |
| Confidence dot low | Danger-500 | #EF4444 |
| Last sync | Caption | 13px, weight 400, Text-Secondary |

#### 2.5.3 Sources Section

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Source item | Body-Small | 14px, weight 400, Text-Body |
| Source icon | — | 12px × 12px, Primary-500 (active) or Neutral-400 (inactive) |
| Source timestamp | Caption | 13px, weight 400, Text-Tertiary |
| Source click | — | Opens source in new view / highlights in source |
| Max sources | — | 5 (expandable with "View all") |

#### 2.5.4 Suggestions Section

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Suggestion chip | Button-Small | 14px, 32px height |
| Chip bg | Primary-50 | #EFF6FF |
| Chip text | Caption | 13px, weight 500, Primary-600 |
| Chip radius | Radius-Md | 8px |
| Chip gap | Space-3 | 8px |
| Max chips | — | 6 (wrap to new line) |

---

## 3. Empty State (New Conversation)

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                   │
│                    ┌─────────────────────┐                        │
│                    │     ⚡ (120px)      │                        │
│                    │  AI sparkle         │                        │
│                    │  illustration       │                        │
│                    │  Primary-100 →      │                        │
│                    │  Primary-500        │                        │
│                    │  gradient circles   │                        │
│                    └─────────────────────┘                        │
│                                                                   │
│              Heading-2: "How can I help you today?"               │
│              Body: Text-Secondary (centered)                      │
│              "I'm your career AI. Ask me anything about           │
│              your job search, CV, or career growth."              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────┐  │
│  │ ✏️ Optimize  │  │ 🔍 Find Jobs │  │ 📊 Analyze   │  │ 🎯   │  │
│  │ My CV       │  │  Matching Me │  │ My Profile   │  │Career│  │
│  │              │  │              │  │              │  │ Plan │  │
│  │ 140×80px     │  │ 140×80px     │  │ 140×80px     │  │140×80│  │
│  │ Primary-50   │  │ Primary-50   │  │ Primary-50   │  │Prim- │  │
│  │ radius-md    │  │ radius-md    │  │ radius-md    │  │ary-50│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────┘  │
│                                                                   │
│  Prompt cards: gap Space-5 (16px), flex-wrap                      │
│  Heading-4 (18px/600) text + Caption (13px/400) subtitle          │
│  Hover: shadow-2, slight -1px Y, cursor pointer                   │
│                                                                   │
└────────────────────────────────────────────────────────────────────┘
```

**Prompt Card Specs:**

| Property | Token | Value |
|----------|-------|-------|
| Card size | — | 140px × 80px |
| Background | Primary-50 | #EFF6FF |
| Radius | Radius-Md | 8px |
| Padding | Space-4 | 12px |
| Icon | — | 20px × 20px, Primary-500 |
| Title | Heading-4 | 18px, weight 600, Text-Primary |
| Subtitle | Caption | 13px, weight 400, Text-Secondary |
| Hover | Layer 2 | Shadow-2, -1px translateY, 200ms ease-out |
| Gap | Space-5 | 16px |

**Empty state transitions:**
- On first visit: sparkle animation (scale 0.8 → 1, 500ms ease-spring)
- Prompt cards stagger in (100ms each, 300ms ease-out)
- After first message: empty state fades out (200ms ease-in), context panel populates

---

## 4. Thinking State (AI Generating)

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  ⚡ (sparkle, 16px)                                       │    │
│  │                                                           │    │
│  │  ● ● ●  (pulsing dots)                                   │    │
│  │  │ │ │                                                    │    │
│  │  Dot 1: opacity 0.3 → 1 → 0.3 (2000ms loop)             │    │
│  │  Dot 2: opacity 0.3 → 1 → 0.3 (2000ms loop, 200ms delay) │    │
│  │  Dot 3: opacity 0.3 → 1 → 0.3 (2000ms loop, 400ms delay) │    │
│  │                                                           │    │
│  │  Caption: "Thinking..." (italic, Text-Secondary)          │    │
│  │                                                           │    │
│  │  Surface-1 bg, Border-Default, radius-lg                  │    │
│  │  max-width 70%, margin-right auto                         │    │
│  │  padding Space-5 (16px)                                   │    │
│  └───────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

**Thinking indicator specs:**

| Property | Token | Value |
|----------|-------|-------|
| Dot size | — | 8px circle |
| Dot color | Primary-500 | #3B82F6 |
| Dot gap | — | 6px |
| Animation | — | Pulse opacity 0.3 → 1, 2000ms loop |
| Stagger | — | 200ms each dot |
| Label | Caption | 13px, italic, weight 400, Text-Secondary |
| Card bg | Surface-1 | #FFFFFF |
| Card border | Border-Default | 1px Neutral-300 |
| Card radius | Radius-Lg | 12px |
| Card padding | Space-5 | 16px |
| Card max-width | — | 70% |

---

## 5. Streaming State

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  ⚡ "I've analyzed your CV against 50+ AI roles at       │    │
│  │  Google, OpenAI, Anthropic, | (blinking cursor)          │    │
│  │                                                           │    │
│  │  [Character-by-character reveal]                          │    │
│  │  Each character arrives at ~30ms (adjustable per model)   │    │
│  │                                                           │    │
│  │  Cursor: "|" vertical bar, Primary-500                    │    │
│  │  Blink: 500ms on / 500ms off (loop)                      │    │
│  │                                                           │    │
│  │  Surface-1 bg, radius-lg, max-width 70%, left-aligned     │    │
│  │  No action buttons until streaming complete               │    │
│  └───────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

**Streaming specs:**

| Property | Token | Value |
|----------|-------|-------|
| Character interval | — | 30ms (configurable per model) |
| Word interval | — | 150ms (space-separated) |
| Cursor character | — | "|" vertical bar |
| Cursor color | Primary-500 | #3B82F6 |
| Cursor blink | — | 500ms on, 500ms off, infinite loop |
| Scroll behavior | — | Auto-scroll to bottom as content streams |
| Action buttons | — | Hidden during stream, fade in (200ms) on complete |
| aria-live | — | "polite" during streaming |
| User can interrupt | — | "Stop generating" button replaces send button during stream |

---

## 6. Error States

### 6.1 AI Unavailable Error

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  ⚠  (Warning icon, 20px, Warning-500)                    │    │
│  │                                                           │    │
│  │  Heading-4: "AI service temporarily unavailable"          │    │
│  │  Body: "Our AI service is experiencing issues. Your       │    │
│  │  conversation has been saved. Please try again."          │    │
│  │                                                           │    │
│  │  [Try Again] [Dismiss]                                    │    │
│  │  Surface-1 bg, Warning-500 left border (3px), radius-md   │    │
│  └───────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

### 6.2 Timeout Error

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  ⏳  (Clock icon, 20px, Warning-500)                      │    │
│  │                                                           │    │
│  │  Body: "The response took too long. You can try again     │    │
│  │  or rephrase your question."                              │    │
│  │                                                           │    │
│  │  [Try Again] [Rephrase] [Dismiss]                         │    │
│  │  Surface-1 bg, radius-md, Shadow-1                        │    │
│  └───────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

### 6.3 Low Confidence Response

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  ⚡ (sparkle icon)                                        │    │
│  │  "Based on available information..."                      │    │
│  │                                                           │    │
│  │  ┌── Confidence Banner ───────────────────────────────┐  │    │
│  │  │  ⚠ Low confidence (42%). I'm not very certain      │  │    │
│  │  │  about this answer. Consider verifying with         │  │    │
│  │  │  additional sources. [Dismiss]                      │  │    │
│  │  │  Warning-50 bg, Warning-500 left border             │  │    │
│  │  └────────────────────────────────────────────────────┘  │    │
│  │                                                           │    │
│  │  [Accept] [Dismiss]                                       │    │
│  └───────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

### 6.4 Rate Limit Error

| Property | Token | Value |
|----------|-------|-------|
| Banner bg | Warning-50 | #FFFBEB |
| Border left | Warning-500 | 3px |
| Radius | Radius-Md | 8px |
| Icon | Hourglass | 20px, Warning-500 |
| Text | Body | 15px, weight 400, Text-Body |
| Countdown | Caption | 13px, weight 600, Text-Primary |
| Dismiss | — | Not dismissible (auto-dismiss on reset) |

---

## 7. Motion Specifications

| Element | Trigger | Animation | Duration | Easing | Delay |
|---------|---------|-----------|----------|--------|-------|
| Page enter | Navigation | Fade in | 200ms | Ease-Out | 0ms |
| Conversation header | Page enter | Slide down 8px + fade | 300ms | Ease-Out | 0ms |
| Empty state illustration | First visit | Scale 0.8 → 1 | 500ms | Ease-Spring | 0ms |
| Prompt cards (empty) | Page enter | Stagger fade in + slide up | 300ms | Ease-Out | 100ms each |
| User message send | Enter press | Slide from bottom 20px + fade | 200ms | Ease-Out | 0ms |
| AI message appear | Stream start | Fade in | 150ms | Ease-Out | 0ms |
| AI character stream | Token arrival | Opacity reveal | 30ms per char | Instant | 0ms |
| Thinking dots | AI processing | Pulse opacity 0.3→1→0.3 | 2000ms loop | Ease-In-Out | 0ms (200ms stagger) |
| Streaming cursor | While streaming | Opacity 1→0→1 | 1000ms loop | Linear | 0ms |
| AI actions appear | Stream complete | Fade in + slide down 4px | 200ms | Ease-Out | 100ms |
| Suggested prompts | After AI msg | Fade in with stagger | 300ms | Ease-Out | 100ms each |
| System message | Context update | Fade in | 200ms | Ease-Out | 0ms |
| Input focus | User focus | Border color shift to Primary-500 | 100ms | Ease-Out | 0ms |
| Send button enable | Text detected | Scale 1, bg shift Neutral→Primary | 100ms | Ease-Out | 0ms |
| Send button click | Click | Scale 0.95 → 1 | 50ms | Ease-Out | 0ms |
| Context panel enter | Desktop | Slide from right 320px | 300ms | Ease-Out | 100ms |
| Context panel section | Scroll | Staggered content reveal | 300ms | Ease-Out | 50ms each |
| Error message | Error | Shake (5px, 3 cycles) | 300ms | Ease-In-Out | 0ms |
| Badge update | Context change | Pulse on icon | 200ms | Ease-Out | 0ms |

### Stagger Table (Conversation Load Sequence)

| Element | Delay |
|---------|-------|
| Conversation header | 0ms |
| Last 3 messages (cached) | 50ms (per message, reversed) |
| Suggested prompts | 400ms |
| Context panel | 100ms |
| Input area | 200ms |

---

## 8. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Message area landmark | `role="log"` on message container, `aria-label="Conversation"` |
| Streaming updates | `aria-live="polite"` on AI message during streaming |
| Send button | `aria-label="Send message"`, disabled state properly announced |
| Message timestamps | `aria-label` includes time (e.g., "Sent at 10:32 AM") |
| User messages | `role="user"`, `aria-label="Your message"` |
| AI messages | `role="assistant"`, `aria-label="AI response"` |
| System messages | `role="status"` |
| AI actions | `aria-label` per button: "Apply these changes", "Modify this suggestion", etc. |
| Context panel | `role="complementary"`, `aria-label="AI context panel"` |
| Memory section | `aria-label="Memory: skills, goals, applications"` |
| Sources section | `aria-label="Referenced sources"` |
| Suggestions | `aria-label="Suggested questions"` |
| Input field | `aria-label="Message input"`, `aria-describedby` for errors |
| Error messages | `role="alert"`, `aria-live="assertive"` |
| Thinking indicator | `aria-label="AI is thinking"`, `aria-live="polite"` |
| Reduced motion | All animations reduced to 50ms or disabled |
| Keyboard navigation | Full keyboard support (see keyboard section) |
| Focus management | After send: focus stays on input. After error: focus moves to retry button. |
| Screen reader announcements | New messages announced. Context changes announced. |
| Color contrast | All text meets WCAG AA (4.5:1) minimum |

---

## 9. Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| Enter | Input area | Send message |
| Shift+Enter | Input area | New line |
| Tab | Input area | Move to send button → context panel → header |
| Shift+Tab | Any | Reverse tab |
| Escape | Any | Clear input / close panel / dismiss error |
| Arrow Up | Message list | Move focus to previous message |
| Arrow Down | Message list | Move focus to next message |
| Arrow Up (input) | Empty input | Edit last user message |
| Ctrl+Z | Input area | Undo (undo last message send if within 5s) |
| / | Global | Focus input |
| ? | Any | Show keyboard shortcuts modal |
| Ctrl+Shift+C | Global | Toggle context panel |
| Escape | Context panel | Close panel (mobile/tablet) |
| Enter | Prompt chip | Send that prompt |
| Tab | Message actions | Tab through action buttons: Apply → Modify → Dismiss → Why? |

**Focus Order:**
1. Sidebar navigation items (top to bottom)
2. Conversation header (back button, title, badge, actions)
3. Message area (last message → previous messages → suggested prompts)
4. Input area (attachment button → text input → send button)
5. Context panel (memory → context → sources → suggestions → settings)
6. AI chat button (if floating version)

---

## 10. Responsive Behavior

### Mobile (<768px) — Full-Screen Conversation

| Element | Adaptation |
|---------|-----------|
| Sidebar | Hidden — bottom tab bar (5 items) |
| Context panel | Hidden — accessible via drawer toggle (slide from right) |
| Topbar | Reduced: back button + "AI Workspace" + panel toggle icon |
| Message area | Full width (max-width: 100%), padding Space-5 |
| Input area | Full width, no left/right sidebar margins |
| AI Floating Button | Hidden (bottom tab replaces) |

### Tablet (768px–1023px) — Drawer Toggle

| Element | Adaptation |
|---------|-----------|
| Sidebar | Icon rail (64px collapsed), expandable overlay |
| Context panel | Hidden by default. Drawer toggle button in topbar. Slides from right (320px, Shadow-3) |
| Topbar | Full with panel toggle icon |
| Message area | Max-width 85%, padded normally |
| Input area | Normal width |

### Desktop (1024px+) — Tri-Panel

Full layout as specified.

### Ultra-Wide (1600px+)

| Element | Adaptation |
|---------|-----------|
| Context panel | 380px (expanded) |
| Message max-width | 800px (more room for code blocks) |
| Sidebar | 240px fixed |
| Whitespace | Increased padding on message area edges |

### Responsive Breakpoint Reference

| Property | Mobile | Tablet | Desktop | Ultra-Wide |
|----------|--------|--------|---------|------------|
| Sidebar | Bottom tabs | Icon rail (64px) | Full (240px) | Full (240px) |
| Context panel | Hidden (drawer) | Hidden (drawer) | Visible (320px) | Visible (380px) |
| Message max-width | 100% | 85% | 720px | 800px |
| Page padding | Space-5 | Space-7 | Space-8 | Space-10 |
| Empty state cards | 2 per row | 4 per row | 4 per row | 4 per row |
| Input height | 48px | 52px | 52px | 56px |
| Send button | 32px | 36px | 36px | 40px |

---

## 11. Future Expansion Items

| Item | Priority | Notes |
|------|----------|-------|
| Voice input mode | High | Microphone toggle, speech-to-text, voice waveform visualization |
| Message search | Medium | Search within conversation history |
| Conversation branching | Medium | Branch conversation at any point, compare responses |
| Multi-model selector | High | Dropdown in context panel: Claude, GPT, Gemini models |
| Message reactions | Low | Emoji reactions on AI messages (helpful, incorrect, etc.) |
| Markdown rendering | Medium | Full markdown: tables, code blocks, lists, images |
| File/image upload | Medium | Upload CV screenshots, job descriptions as images |
| Web search results | Medium | Inline citations with expandable web previews |
| Conversation export | Low | Export as PDF, Markdown, or JSON |
| Shared conversations | Future | Share conversation link with read-only view |
| Templates | Medium | Saved prompt templates for common tasks |
| AI personas | Low | "Recruiter", "Career Coach", "Interviewer" personas |
| Multi-turn tool use | Medium | Visible tool calls with expandable results |
| Conversation summaries | Low | Auto-generated summary after 50+ messages |
| Code diff view | Low | Side-by-side diff for CV changes suggested by AI |
| Push notifications | Medium | AI completes long-running task, notifies user |
| Conversation history | High | Left sidebar list of saved conversations |
| Suggested follow-ups | Medium | AI proposes 2–3 follow-up questions after each response |
| Real-time collaboration | Future | Multiple users in same conversation |

---

## 12. Token Reference Summary

### Color Tokens Used

| Token | Value (Light) | Elements |
|-------|---------------|----------|
| Surface-0 | Neutral-50 | Message area, input bg |
| Surface-1 | #FFFFFF | AI messages, context panel, input container |
| Surface-2 | Neutral-100 | Sidebar, memory badges |
| Primary-50 | #EFF6FF | Context badge, suggestion chips, prompt cards |
| Primary-100 | #DBEAFE | Empty state illustration |
| Primary-200 | #BFDBFE | Context badge border |
| Primary-500 | #3B82F6 | Sparkle icon, streaming cursor, thinking dots |
| Primary-600 | #2563EB | User message bg, send button, links |
| Primary-700 | #1D4ED8 | Send button hover |
| Text-Primary | Neutral-900 | Title, headings |
| Text-Body | Neutral-800 | Message content, descriptions |
| Text-Secondary | Neutral-600 | Labels, metadata |
| Text-Tertiary | Neutral-500 | Placeholders, timestamps, system messages |
| Text-Inverse | #FFFFFF | User message text |
| Text-Link | Primary-600 | Source links |
| Border-Default | Neutral-300 | Panel borders, message borders |
| Border-Hover | Neutral-400 | Input hover border |
| Border-Focus | Primary-500 | Input focus ring |
| Success-500 | #10B981 | High confidence |
| Warning-50 | #FFFBEB | Rate limit banner, low confidence |
| Warning-500 | #F59E0B | Medium confidence, error icons |
| Danger-500 | #EF4444 | Low confidence, errors |

### Typography Tokens Used

| Token | Size | Weight | Line Height | Elements |
|-------|------|--------|-------------|----------|
| Heading-2 | 28px | 650 | 1.2 | Empty state title |
| Heading-3 | 22px | 600 | 1.25 | Conversation header title |
| Heading-4 | 18px | 600 | 1.3 | Section titles, prompt card titles |
| Body | 15px | 400 | 1.6 | Message content, descriptions, error text |
| Body-Small | 14px | 400 | 1.5 | Context badge, sources, current page |
| Caption | 13px | 400 | 1.4 | Timestamps, badges, suggestions, system messages |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Badge padding, chip gap, input-to-button gap |
| Space-4 | 12px | Input padding, section nested padding |
| Space-5 | 16px | Card/message padding, section padding, button padding |
| Space-7 | 24px | Section vertical spacing |
| Space-8 | 32px | Page margins, message area padding |

### Elevation Tokens Used

| Token | Usage |
|-------|-------|
| Layer 0 | Message area, sidebar |
| Layer 1 | Topbar glass, AI messages, input area, context panel |
| Layer 2 | Message hover, prompt card hover |
| Layer 3 | Context panel drawer (tablet) |
| Layer 4 | Tooltips |

### Glass Tokens Used

| Type | Opacity | Blur | Usage |
|------|---------|------|-------|
| Navigation | 0.85 | 12px | Topbar |

---

*End of AI-Workspace.md — Visual Prototype Specification for MR:EGO Design OS DP-9.*
