# AI Workspace — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (AI Conversation), DP-6:AI, DP-5:AI-Visual-Language, DP-1:All

---

## Purpose

Full conversational AI workspace for career guidance, document analysis, job search, and general assistance. Natural language interface with context awareness, memory, and reasoning transparency.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────┬───────────┐
│          │  TOPBAR (56px)                          │           │
│          │  "AI Workspace"    New Chat  ⋮         │           │
│ SIDEBAR  ├────────────────────────────────────────┤ AI PANEL  │
│ (240px)  │  CONVERSATION AREA (scrollable)        │ (320px)   │
│          │                                        │           │
│          │  ┌──────────────────────────────────┐  │ MEMORY    │
│          │  │ Context badge: "Helping with CV" │  │           │
│          │  └──────────────────────────────────┘  │ · Skills  │
│          │                                        │ · Goals   │
│          │  ┌──────────────────────────────────┐  │ · Apps    │
│          │  │ User message bubble              │  │           │
│          │  │ "Help me improve my CV"          │  │           │
│          │  └──────────────────────────────────┘  │ CONTEXT   │
│          │                                        │           │
│          │  ┌──────────────────────────────────┐  │ Current   │
│          │  │ AI response (streaming)          │  │ page: CV  │
│          │  │ "I can see your CV... Here are   │  │           │
│          │  │ 3 suggestions..."                │  │           │
│          │  │ [Apply] [Modify] [Dismiss]  Why? │  │ SOURCES   │
│          │  └──────────────────────────────────┘  │           │
│          │                                        │ 3 docs    │
│          │  ┌──────────────────────────────────┐  │ cited     │
│          │  │ Suggested prompts (3 chips)      │  │           │
│          │  └──────────────────────────────────┘  │           │
│          │                                        │           │
│          │  ┌──────────────────────────────────┐  │           │
│          │  │ INPUT AREA (fixed bottom)        │  │           │
│          │  │ "Ask MR:EGO anything..."   📎 📤 │  │           │
│          │  └──────────────────────────────────┘  │           │
│          └────────────────────────────────────────┘           │
├──────────┴────────────────────────────────────────────────────┤
│  SUGGESTION BAR (collapsible, below input area)               │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Conversation Header

| Property | Value |
|----------|-------|
| Height | 56px (below topbar) |
| Padding | 0 Space-5 |
| Border bottom | Border-Default |
| Background | Surface-1 |

### Elements:
| Element | Specification |
|---------|---------------|
| Title | "AI Workspace" — Heading-3 (22px) |
| Context badge | Body-Small, Primary-50 bg, radius-full, "Helping with: CV Optimization" |
| Actions | New Chat (icon button), More (⋮ menu) |

---

## 2. Context Badge

| Property | Value |
|----------|-------|
| Position | Below header, top of conversation |
| Padding | Space-3 (8px) Space-4 (12px) |
| Background | Primary-50, 1px Primary-200 border |
| Radius | radius-sm (6px) |
| Text | Caption, "AI has context from: CV Analysis, Job Search" |
| Icon | Info circle (14px) |

---

## 3. Message Area

| Property | Value |
|----------|-------|
| Flex | 1 (fills remaining space) |
| Padding | Space-5 (16px) horizontal |
| Overflow | Scroll |
| Background | Surface-0 |

### Message Types:

**User message:**
| Property | Value |
|----------|-------|
| Alignment | Right |
| Max width | 640px (80% of container) |
| Padding | Space-4 (12px) Space-5 (16px) |
| Background | Primary-600 |
| Text | White, Body (15px) |
| Radius | 12px top-right, 8px other corners |
| Margin bottom | Space-4 (12px) |
| Timestamp | Caption, right-aligned below bubble |

**AI message:**
| Property | Value |
|----------|-------|
| Alignment | Left |
| Max width | 640px (80% of container) |
| Padding | Space-4 (12px) Space-5 (16px) |
| Background | Surface-1 |
| Border | Border-Default |
| Text | Text-Body, Body (15px) |
| Radius | 12px top-left, 8px other corners |
| Margin bottom | Space-4 (12px) |
| AI icon | 20px sparkle, Primary-500, top-left of bubble |

**AI message actions:**
| Action | Type | Details |
|--------|------|---------|
| Apply | Button-Small primary | Applies suggestion |
| Modify | Button-Small secondary | Opens modification |
| Dismiss | Button-Small ghost | Hides suggestion |
| Why? | Text-Link | Opens reasoning panel |

**System message:**
| Property | Value |
|----------|-------|
| Alignment | Center |
| Text | Caption, Text-Secondary |
| Example | "AI is analyzing your CV..." with pulse dot |

**Suggested prompts:**
| Property | Value |
|----------|-------|
| Layout | Flex row, wrap |
| Gap | Space-2 (4px) |
| Max | 3 chips visible, scroll for more |
| Chip | Border-Default, radius-full, Body-Small, click to send |
| Animation | Fade in one-by-one (100ms stagger) |

---

## 4. Input Area

| Property | Value |
|----------|-------|
| Position | Fixed bottom of conversation |
| Padding | Space-4 (12px) Space-5 (16px) |
| Background | Surface-1 |
| Border top | Border-Default |
| z-index | Elevation-2 |

### Input row:
| Property | Value |
|----------|-------|
| Height | 52px |
| Radius | radius-md (8px) |
| Border | Border-Default |
| Background | Surface-0 |
| Layout | Flex row, centered |

| Element | Size | Details |
|---------|------|---------|
| Attachment icon | 20px | Left, neutral-400 |
| Text input | Flex 1 | No border, "Ask MR:EGO anything..." placeholder |
| Microphone icon | 20px | Right (future) |
| Send button | 36px x 36px | Primary-600, radius-full, arrow icon, white |

### Input states:
| State | Behavior |
|-------|----------|
| Empty | Placeholder visible, send disabled |
| Typing | Send enabled, character count (optional) |
| Sending | Input disabled, spinner on send button |
| Voice | Future: mic active indicator |

---

## 5. AI Context Panel (Right)

| Property | Value |
|----------|-------|
| Width | 320px |
| Background | Surface-1 |
| Border left | Border-Default |
| Padding | Space-5 (16px) |
| Overflow | Scroll |
| Visibility | Desktop: always visible, Tablet: toggle, Mobile: hidden |

### Sections:

**Memory section:**
| Property | Value |
|----------|-------|
| Heading | "What AI Knows" — Label (14px, 500 weight) |
| Items | Skills (5 badges), Goals (2 items), Applications (3 items) |
| Badge | Neutral-100 bg, radius-full, 28px h, body-small |
| Link | "Manage Memory" — Text-Link |

**Context section:**
| Property | Value |
|----------|-------|
| Heading | "Current Context" — Label |
| Item | "CV Analysis" with confidence dot (green) |
| Item | "Job Search: Senior Frontend" |
| Updated | Caption, Text-Secondary |

**Sources section:**
| Property | Value |
|----------|-------|
| Heading | "Sources Referenced" — Label |
| Item | File icon + name + date |
| Max | 3 items (expandable) |

**Suggestions section:**
| Property | Value |
|----------|-------|
| Heading | "Try Asking" — Label |
| Chips | 3-4 suggestion prompts, clickable |

---

## 6. Empty State (New Conversation)

| Element | Specification |
|---------|---------------|
| Illustration | AI sparkle illustration, 120px |
| Title | "How can I help you today?" — Heading-2 |
| Subtitle | "Ask me anything about your career, CV, or job search" |
| Suggestions | 4 prompt cards (140px w, 80px h, radius-md, Primary-50 bg, icon + label) |
| Prompt examples | "Analyze my CV", "Find jobs for me", "Improve my LinkedIn", "Practice interview" |

---

## 7. Loading State

| State | Behavior |
|-------|----------|
| AI thinking | Pulsing dots animation (3 dots, 400ms cycle) within AI message area |
| Streaming | Text appears character-by-character (smooth, not typewriter jerky) |
| Sources loading | Skeleton lines in Sources section |
| Context loading | Skeleton badges (3 x 60px x 28px) |

---

## 8. Error States

| Error | Behavior |
|-------|----------|
| AI unavailable | Message: "AI services temporarily unavailable" + retry button |
| Timeout | "Taking longer than expected" + cancel option |
| Low confidence | "I'm not very confident about this" + explanation |
| Safety filter | "I can't help with that request" + alternative suggestion |
| Network | "Working offline — AI responses limited" |

---

## 9. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Full-screen conversation | Conversation + context drawer | Full tri-panel |
| AI Panel | Hidden (toggle) | Right drawer overlay | Persistent 320px |
| Context panel | Hidden | Bottom sheet | Side panel |
| Message width | 90% | 80% | 80% (640px max) |
| Input area | Full width, bottom fixed | Full width, bottom fixed | Full width |
| Suggested prompts | 2 chips (scroll) | 3 chips | 3-4 chips |
| Conversation header | Compact | Full | Full with context badge |

---

## 10. Accessibility

| Element | Requirement |
|---------|-------------|
| Message list | `role="log"`, `aria-label="Conversation with AI"`, `aria-live="polite"` |
| Input | `<input>` or `<textarea>` with `aria-label="Ask MR:EGO AI"` |
| Send button | `aria-label="Send message"` |
| AI thinking | `aria-live="polite"` "AI is thinking" announcement |
| Streaming | Accessible live region for incremental content |
| Suggestions | `aria-label="Suggested prompt: [text]"` |
| Context panel | `role="complementary"`, `aria-label="AI context and memory"` |
| Keyboard | Enter to send, Shift+Enter for new line, Escape to close panel |
| Focus management | Focus stays in input after send, moves to AI response on complete |

---

## 11. Visual Hierarchy

1. **Primary Focus:** Active AI response (streaming or complete) — highest weight
2. **Secondary Focus:** Input area — where user engages
3. **Tertiary Focus:** Suggested prompts — quick actions
4. **Supporting:** Context panel — peripheral awareness

---

## 12. AI Integration Details

| Feature | Specification |
|---------|---------------|
| Streaming | Character-by-character with smooth reveal |
| Sources | Clickable citations in AI responses |
| Confidence | Shown per suggestion (High/Medium/Low) |
| Reasoning | "Why?" expands detailed breakdown panel |
| Memory | Persistent across sessions (user-managed) |
| Context-aware | AI knows current page, recent activity, profile data |
| Actions | "Apply" buttons that execute suggestions directly |

---

## 13. Keyboard Navigation

| Key | Action |
|-----|--------|
| Enter | Send message |
| Shift+Enter | New line in input |
| Escape | Close context panel, dismiss suggestions |
| Ctrl+I | Toggle AI panel (from any page) |
| Tab | Input → Suggested prompts → Message history → Context panel |
| Up/Down | Navigate message history (within session) |
| Ctrl+Shift+F | Focus mode (hide panels, full conversation) |

---

## 14. Future Expansion

| Feature | Phase |
|---------|-------|
| Voice input/output | Phase 14 |
| Multi-modal responses (charts, images) | Phase 14 |
| Collaborative AI sessions (share with mentor) | Phase 6 |
| Custom AI model selection | Phase 14 |
| AI workflow automation | Phase 14 |
| Video analysis (interview practice) | Phase 7 |
| Screen context awareness | Phase 8 |
| Proactive suggestions (AI-initiated) | Phase 4 |

---

*Cross-references: DP-6:Screen (AI Conversation), DP-6:AI, DP-5:AI-Visual-Language, DP-6:Pattern (AI Suggestion), DP-1:All*
