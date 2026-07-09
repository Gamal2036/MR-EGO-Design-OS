# Messaging — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-7:Messaging, DP-6:IA (Messaging)

---

## Purpose

Complete visual prototype for in-app messaging with recruiters, mentors, and career connections. Thread-based conversations with AI-suggested replies, smart sorting, and tri-panel layout. Implementation-ready.

---

## Layout Diagram

```
┌──────────┬───────────────────────┬─────────────────────────────────────┐
│          │  TOPBAR (56px, glass)                                       │
│          │  ← Messages                       New Msg  ⋮  [Compose]    │
│ SIDEBAR  ├──────────┬────────────┼──────────────────────────────────────┤
│ (240px)  │  THREAD  │            │  CONVERSATION AREA                   │
│ EXPANDED │  LIST    │            │                                      │
│          │  (360px) │            │  HEADER (56px)                       │
│          │          │            │  ┌─────────────────────────────┐    │
│          │  SEARCH  │            │  │ Name (Body/600)             │    │
│          │  ┌──────┐│            │  │ Company (Caption)           │    │
│          │  │🔍    ││            │  │                      ☎ 📹 ℹ │    │
│          │  └──────┘│            │  └─────────────────────────────┘    │
│          │          │            │                                      │
│          │  THREADS │            │  MESSAGES (scrollable, flex 1)     │
│          │  ┌──────┐│            │  ┌──────────────────────────────┐  │
│          │  │●Name ││            │  │ ┌────────────────────────┐   │  │
│          │  │ Prev ││            │  │ │ Received message (max  │   │  │
│          │  │ 2h   ││            │  │ │ 640px/80%, left align) │   │  │
│          │  ├──────┤│            │  │ └────────────────────────┘   │  │
│          │  │ Name ││            │  │ ┌────────────────────────┐   │  │
│          │  │ Prev ││            │  │ │  Sent message (right)  │   │  │
│          │  │ 1d   ││            │  │ └────────────────────────┘   │  │
│          │  ├──────┤│            │  │                              │  │
│          │  │ Name ││            │  │ ✨ AI SUGGESTED REPLY        │  │
│          │  │ ...  ││            │  │ ┌────────────────────────┐   │  │
│          │  └──────┘│            │  │ │ "Thank you for the..." │   │  │
│          │          │            │  │ │ [Use] [Edit] [Dismiss] │   │  │
│          │          │            │  │ └────────────────────────┘   │  │
│          │          │            │  └──────────────────────────────┘  │
│          │          │            │                                      │
│          │          │            │  INPUT (52px, fixed bottom)          │
│          │          │            │  ┌─────────────────────────────┐    │
│          │          │            │  │ Type a message...   📎 📤  │    │
│          │          │            │  └─────────────────────────────┘    │
│          └──────────┴────────────┴──────────────────────────────────────┘
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Thread List Panel

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 360px |
| Border right | Border-Default | 1px solid Neutral-200 (#E5E7EB) |
| Background | Surface-1 | #FFFFFF |
| Overflow-y | Scroll | auto |
| Flex | — | Shrink 0 |

### Search

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 40px |
| Margin | Space-3 | 8px |
| Padding horizontal | Space-4 | 12px |
| Radius | radius-md | 8px |
| Background | Surface-2 | Neutral-100 (#F3F4F6) |
| Border | — | None |
| Font | Body 14px | Inter 400 |
| Placeholder | — | "Search messages..." |

**Elements:**
- Search icon: 16px magnifier, Neutral-400 (#9CA3AF)
- Clear button: ×, visible on input

### Thread Item

| Property | Token | Value |
|----------|-------|-------|
| Min height | — | 64px |
| Padding | Space-4 Space-5 | 12px 16px |
| Border bottom | Border-Default | 1px solid Neutral-200 |
| Hover bg | Surface-2 | Neutral-100 (#F3F4F6) |
| Active bg | Primary-50 | #EFF6FF |
| Active left border | 3px solid Primary-500 | #3B82F6 |

### Thread Layout

```
┌─────────────────────────────────────┐
│  ┌────┐  Sender Name (Body/600)    ●│
│  │ 40 │  Message preview line...    │
│  └────┘  truncated to 1 line    2h │
│           Company · Recruiter       │
└─────────────────────────────────────┘
```

### Thread Elements

| Element | Spec |
|---------|------|
| Avatar | 40px × 40px, radius-full (20px), Surface-2 placeholder |
| Name | Body 15px, weight 600, Text-Primary (#1A202C) |
| Preview | Body-Small 14px, Text-Secondary (#5B6770), 1-line truncation |
| Timestamp | Caption 13px, Text-Secondary, right-aligned |
| Unread dot | 8px diameter, Primary-500 (#3B82F6), radius-full |
| Company badge | Caption, Primary-50 bg, optional |
| Attachment indicator | 📎 icon, 12px, when applicable |

### Thread States

| State | Visual |
|-------|--------|
| Default | Surface-1 bg, Border-Default bottom |
| Hover | Surface-2 bg (#F3F4F6) |
| Active / Selected | Primary-50 bg (#EFF6FF), 3px Primary-500 left border |
| Unread | Name in weight 700, Primary-500 dot visible |
| Focus | 2px Primary-400 ring inside |
| Read | Name in weight 400, no dot |

---

## Conversation Area

| Property | Token | Value |
|----------|-------|-------|
| Background | Surface-0 | Neutral-50 (#F9FAFB) |
| Flex | — | 1 |
| Display | Flex column | — |

### Conversation Header

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 56px |
| Padding | 0 Space-5 | 0 16px |
| Border bottom | Border-Default | 1px solid Neutral-200 |
| Background | Surface-1 | #FFFFFF |
| Flex | — | Row, items center, space-between |

**Left:**
| Element | Spec |
|---------|------|
| Name | Body 15px, weight 600, Text-Primary |
| Company | Caption 13px, Text-Secondary, margin-left Space-2 |
| Online indicator | 8px green dot (when online), Neutral-300 (offline) |

**Right actions:**
| Action | Icon | Size | Behavior |
|--------|------|------|----------|
| Phone | ☎ | 32px | Start audio call (future) |
| Video | 📹 | 32px | Start video call (future) |
| Info | ℹ | 32px | Open contact info panel |
| More | ⋮ | 32px | Dropdown: Block, Report, Archive |

### Messages Container

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Overflow-y | Scroll | auto |
| Flex | — | 1 |
| Display | Flex column | Reverse (newest at bottom) |

### Message Bubble — Received

| Property | Token | Value |
|----------|-------|-------|
| Max width | — | 640px (80% of container) |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | 1px solid Neutral-200 |
| Padding | Space-4 | 12px |
| Radius | — | 12px top-left, 8px other corners |
| Margin bottom | Space-3 | 8px |
| Align self | — | Flex-start |

### Message Bubble — Sent

| Property | Token | Value |
|----------|-------|-------|
| Max width | — | 640px (80% of container) |
| Background | Primary-600 | #2563EB |
| Text color | White | #FFFFFF |
| Padding | Space-4 | 12px |
| Radius | — | 12px top-right, 8px other corners |
| Margin bottom | Space-3 | 8px |
| Align self | — | Flex-end |

### Message Content

| Element | Received | Sent |
|---------|----------|------|
| Text | Body 15px, Text-Primary | Body 15px, white |
| Timestamp | Caption 13px, Text-Secondary, bottom-left | Caption 13px, white/0.7 opacity, bottom-left |
| Read receipt | — | "Read" Caption, white/0.5 opacity |
| Attachments | File card below text | File card below text |

### Date Separator

| Property | Token | Value |
|----------|-------|-------|
| Text | Caption | 13px |
| Color | Text-Secondary | #5B6770 |
| Alignment | Center | — |
| Margin | Space-5 vertical | 16px |
| Line | Horizontal rule on both sides | 1px Neutral-200 |

### Typing Indicator

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 32px |
| Animation | 3 dots bounce | 1.2s infinite |
| Text | Caption | "[Name] is typing..." |
| Color | Text-Secondary | #5B6770 |

---

## AI Suggested Reply

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-50 | #EFF6FF |
| Border | Primary-200 | 1px solid #BFDBFE |
| Radius | radius-sm | 6px |
| Padding | Space-4 | 12px |
| Margin bottom | Space-4 | 12px |
| Max width | — | 640px (80%) |
| Align self | — | Flex-start |

### AI Reply Layout

```
┌──────────────────────────────────────┐
│ ✨ AI Suggested Reply               │
│                                      │
│ "Thank you for the opportunity. I'm │
│ looking forward to discussing how my│
│ experience aligns with this role."  │
│                                      │
│ [Use] — [Edit] — [Dismiss]          │
└──────────────────────────────────────┘
```

### Elements

| Element | Spec |
|---------|------|
| Sparkle icon | 16px, Primary-500 |
| Header | "AI Suggested Reply" — Caption 13px, 600 weight, Primary-600 |
| Preview text | Body-Small 14px, Text-Primary, 2-3 lines |
| Actions row | [Use] [Edit] [Dismiss] — Button-Small, Body-Small 14px |
| [Use] | Button-Small-Primary, inserts into input |
| [Edit] | Button-Small-Ghost, opens in input for editing |
| [Dismiss] | Text link, Neutral-500 |

### States

| State | Visual |
|-------|--------|
| Loading | Skeleton: 3 text lines (60%, 80%, 40%) + shimmer |
| Available | Standard Primary-50 bg, Primary-200 border |
| Dismissed | Slide out right, 200ms ease, removed from DOM |
| Error | "AI suggestion unavailable" — Neutral-200 bg |
| Streaming | Text appears character by character, 30ms per char |

---

## Input Area

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 52px |
| Padding | Space-3 Space-5 | 8px 16px |
| Background | Surface-1 | #FFFFFF |
| Border top | Border-Default | 1px solid Neutral-200 |
| Radius | radius-md (inner) | 8px |

### Input Layout

```
┌──────────────────────────────────────────────┐
│ Type a message...                     📎 📤  │
└──────────────────────────────────────────────┘
```

### Elements

| Element | Spec |
|---------|------|
| Text input | Flex 1, Body 15px, placeholder "Type a message..." |
| Attachment button | 📎 icon, 24px, triggers file picker |
| Send button | 36px circle, Primary-600 bg, white arrow icon, disabled when empty |
| Send hover | Primary-700 bg (#1D4ED8) |
| Send active | Scale 0.95 |
| Character limit | Caption, right of send, shown at >500 chars |
| Max height | 120px (scroll after) |

### States

| State | Visual |
|-------|--------|
| Empty | Placeholder text, send disabled (opacity 0.5) |
| Typing | Standard input, send enabled |
| Attaching | Attachment icon replaced with filename chip |
| Sending | Brief disabled state, 200ms |
| Error | Message stays in input, "Could not send" toast |
| Offline | "Messages will send when connected" — Caption |

---

## Empty States

### No Conversations (All)

| Element | Spec |
|---------|------|
| Illustration | Chat bubble with lines, 140px |
| Title | "No messages yet" — Heading-3 |
| Description | "Messages from recruiters and connections will appear here" |
| CTA | "Find Jobs to Apply" — Button-Primary |

### No Selection (Split View)

| Element | Spec |
|---------|------|
| Layout | Centered in conversation area |
| Icon | 64px, Neutral-300, message icon |
| Title | "Select a conversation" — Body, 600 weight |
| Description | "Choose a thread from the left to view messages" — Body-Small |

### No Results (Search)

| Element | Spec |
|---------|------|
| Icon | 48px search, Neutral-300 |
| Title | "No messages found" |
| Description | "Try a different search term" — Body-Small |

---

## Loading State

| Element | Skeleton | Behavior |
|---------|----------|----------|
| Thread list | 5 thread items (64px h each) | shimmer, stagger 50ms |
| Thread avatar | 40px circle | — |
| Thread lines | 2 lines: 60% + 40% width | — |
| Conversation header | 56px solid skeleton | — |
| Messages | 3-4 message bubbles alternating | shimmer per bubble |
| AI reply | 3-line skeleton | appears after message load |
| Full page | Thread skeleton + message skeleton | <2s total |

---

## Error State

| Scenario | Visual | Action |
|----------|--------|--------|
| Threads fail | Error in thread list area + [Retry] | Retry loads threads |
| Message load fail | "Could not load messages" in conversation + [Retry] | Retry per thread |
| Send fail | Toast bottom: "Could not send message" + [Try Again] | Toast tap retry |
| Attachment fail | "Upload failed" inline in input area | Remove + retry |
| AI reply fail | "AI suggestion unavailable" low-opacity card | Auto-dismiss |

---

## Offline State

| Element | Behavior |
|---------|----------|
| Banner | "You're offline. Messages will send when reconnected." |
| Thread list | Cached threads shown, grey border |
| Message send | Queued, shows "Sending..." with clock icon |
| AI replies | "AI suggestions unavailable offline" |
| New message | Disabled, tooltip |
| Search | Works on cached threads only |

---

## Motion & Animation

### Thread List Entry
| Property | Value |
|----------|-------|
| Initial | translateX(-20px), opacity 0 |
| Active | translateX(0), opacity 1 |
| Duration | 300ms |
| Stagger | 40ms per item |

### Message Entry (New)
| Property | Value |
|----------|-------|
| Received | translateY(10px) → 0, opacity 0 → 1, 250ms ease-out |
| Sent | Same, 200ms |
| Incoming real-time | Slide up from bottom, 300ms ease-out |

### AI Reply Entry
| Property | Value |
|----------|-------|
| Initial | scale(0.95), opacity 0 |
| Active | scale(1), opacity 1 |
| Duration | 350ms, spring easing |

### Send Animation
| Property | Value |
|----------|-------|
| Send button | Scale 1→0.9→1, 200ms |
| Message sent | Brief flash at input, message appears above |
| Scroll to bottom | 200ms smooth scroll |

### Typing Indicator
| Property | Value |
|----------|-------|
| Dots | TranslateY bounce, staggered 200ms per dot |
| Duration | 1.2s infinite loop |

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Thread list OR conversation (not both) | Icon rail + thread list + conversation | Full tri-panel |
| Thread list | Full width when active | 320px | 360px |
| Thread search | Collapsible | Inline | Inline |
| Conversation header | Compact (48px) | Standard (56px) | Standard (56px) |
| Message width | 90% max | 80% max | 640px max |
| AI reply | Full width card | Full width | Full width |
| Actions (phone/video) | Hidden (moved to contact info) | Icon only | Icon + label |
| Input area | 48px height | 52px | 52px |
| New message | FAB bottom-right | Topbar button | Topbar button |
| Contact info | Bottom sheet | Right drawer 320px | Right drawer 360px |
| Thread list toggle | Back button in header | Back button | Persistent |

---

## Visual Hierarchy

1. **Primary Focus:** Active conversation — message bubbles, highest contrast area
2. **Secondary Focus:** Thread list — sender names + unread indicators (scan for new)
3. **Tertiary Focus:** AI Suggested Reply — tinted card, sparkle icon draws attention
4. **Supporting:** Header actions (phone/video/info), search, timestamps

### Eye Movement
```
Thread List → [scan unread dots → names → previews]
    ↓
Conversation → [newest message → scroll up for context]
    ↓
AI Reply Card → [sparkle draws eye → preview → actions]
    ↓
Input Area → [bottom fixed, peripheral]
```

---

## Accessibility

| Element | Role | ARIA |
|---------|------|------|
| Thread list | `role="listbox"` | `aria-label="Message threads"` |
| Thread items | `role="option"` | `aria-selected`, `aria-label="Thread with [name]"` |
| Unread indicator | `aria-label="Unread messages"` | — |
| Conversation | `role="log"` | `aria-label="Conversation with [name]"`, `aria-live="polite"` |
| Messages | `role="article"` | `aria-label="Message from [sender]"` |
| Send button | `role="button"` | `aria-label="Send message"` |
| Input | `role="textbox"` | `aria-label="Message input"`, `aria-multiline="true"` |
| AI reply | `role="region"` | `aria-label="AI suggested reply"` |
| Use AI reply | `role="button"` | `aria-label="Use suggested reply"` |
| Attachment | `role="button"` | `aria-label="Attach file"` |
| New message | `role="button"` | `aria-label="Compose new message"` |
| Empty state | `role="status"` | `aria-label="No messages"` |

### Keyboard Navigation Table

| Key | Context | Action |
|-----|---------|--------|
| Tab | Global | Thread list → Conversation → AI reply → Input → Header → Topbar/Sidebar |
| Shift+Tab | Global | Reverse focus |
| Up/Down | Thread list | Navigate between threads |
| Enter | Thread item | Open selected thread |
| Escape | Detail | Deselect thread (show "Select a conversation") |
| Tab | Messages | Focus next actionable (AI reply → input → header) |
| Enter | AI reply | Use suggested reply (inserts into input) |
| Ctrl+Enter | Input | Send message |
| Escape | AI reply | Dismiss AI suggestion |
| / | Global | Focus thread search |
| Alt+Up | Global | Go to previous thread |
| Alt+Down | Global | Go to next thread |
| Ctrl/Cmd+K | Global | Command palette |

---

## AI Integration

| Feature | Location | Behavior | Trigger |
|---------|----------|----------|---------|
| Suggested replies | Conversation (above input) | AI analyzes incoming message, drafts 1-2 contextual replies | After new message received |
| Smart sorting | Thread list | AI prioritizes recruiter/urgent messages to top | On thread list load |
| Auto-categorization | Background | AI tags threads: "Application", "Interview", "Offer", "Networking" | On thread arrival |
| Follow-up reminders | Top of thread list | "3 conversations need a response" banner with sparkle | Periodic check |
| Sentiment analysis | AI reply card | AI adjusts tone: "Professional" / "Friendly" / "Enthusiastic" | On reply generation |
| Response timing | AI reply footer | "Best to reply within 24 hours" — Caption | On reply card |
| Smart attachments | Input area | AI suggests relevant documents to attach | When typing about specific topics |
| Conversation summary | Thread list tooltip | AI 1-line summary on hover | On thread hover |
| Quick replies | Thread list | AI generates 3 quick-action buttons per thread | On thread long-press (mobile) |
| Schedule detection | Message text | AI detects meeting suggestions, offers to add to calendar | On message render |
| Language tuning | AI reply | "Make this [More Professional] / [Warmer] / [Shorter]" | On reply preview |

### AI Confidence Levels
| Level | Visual | Fallback |
|-------|--------|----------|
| High | Standard Primary-50 card | Direct insert |
| Medium | Card has "Suggesting:" prefix | Show 2 options |
| Low | Card has "AI draft:" prefix, grey tint | Always require edit |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Audio/video calling (WebRTC) | Phase 3 |
| Message search history (full-text) | Phase 2 |
| Message reactions (like, thumbs up) | Phase 2 |
| Read receipts toggle | Phase 3 |
| Scheduled messages | Phase 4 |
| Message templates (quick replies library) | Phase 4 |
| Group conversations (multiple participants) | Phase 5 |
| Message pinning / bookmarks | Phase 3 |
| Email integration (sync recruiter emails) | Phase 5 |
| AI conversation coach (real-time suggestions) | Phase 6 |
| Message analytics (response time, engagement) | Phase 4 |
| End-to-end encryption | Phase 5 |

---

*Cross-references: DP-7:Messaging, DP-6:IA (Messaging), DP-1:All, DP-8:All*
