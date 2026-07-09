# Messaging — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:IA, DP-1:All

---

## Purpose

In-app messaging for communication with recruiters, mentors, and connections. Thread-based conversations with AI-suggested replies.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Messages                        New Msg  ⋮    │
│ SIDEBAR  ├──────────────┬─────────────────────────────────────┤
│ (240px)  │  THREAD LIST │  CONVERSATION                       │
│          │  (360px)     │                                     │
│          │              │  Header: Recruiter @ Acme          │
│          │  Search msgs │                                     │
│          │  ┌──────────┐│  Message history (scrollable)      │
│          │  │Search... ││  ┌──────────────────────────────┐  │
│          │  └──────────┘│  │ Recruiter message            │  │
│          │              │  │ "Thanks for applying..."     │  │
│          │  ┌──────────┐│  └──────────────────────────────┘  │
│          │  │ Thread 1 ││  ┌──────────────────────────────┐  │
│          │  │ Acme     ││  │ Your reply                   │  │
│          │  │ "Thanks" ││  │ "Thank you for the..."      │  │
│          │  │ ● 2h ago ││  └──────────────────────────────┘  │
│          │  ├──────────┤│                                     │
│          │  │ Thread 2 ││  AI SUGGESTED REPLY                │
│          │  │ Beta Inc ││  ┌──────────────────────────────┐  │
│          │  │ "Interview││  │ ✨ Suggested reply:          │  │
│          │  │  scheduled"│  │ "I'm excited about..."      │  │
│          │  │ 1d ago   ││  │ [Use] [Edit] [Dismiss]      │  │
│          │  └──────────┘│  └──────────────────────────────┘  │
│          │              │                                     │
│          │              │  INPUT (fixed bottom)               │
│          │              │  ┌──────────────────────────────┐  │
│          │              │  │ Type a message...     📎 📤 │  │
│          │              │  └──────────────────────────────┘  │
│          └──────────────┴─────────────────────────────────────┘
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Thread List

| Property | Value |
|----------|-------|
| Width | 360px |
| Border right | Border-Default |
| Background | Surface-1 |
| Overflow | Scroll |

### Search:
| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | Space-3 (8px) Space-4 (12px) |
| Placeholder | "Search messages..." |

### Thread Item:
| Property | Value |
|----------|-------|
| Padding | Space-4 (12px) Space-5 (16px) |
| Min height | 64px |
| Hover | Surface-2 bg |
| Active | Primary-50 bg, left border Primary |

### Elements:
| Element | Size | Details |
|---------|------|---------|
| Avatar | 40px x 40px, radius-full | |
| Name | Body, 600 weight | |
| Preview | Body-Small, Text-Secondary, 1 line truncated | |
| Time | Caption, Text-Secondary | |
| Unread dot | 8px circle, Primary-500 | |
| Company badge | Caption, Primary-50 (for recruiter messages) | |

---

## 2. Conversation Area

| Property | Value |
|----------|-------|
| Background | Surface-0 |
| Flex | 1 |

### Header:
| Property | Value |
|----------|-------|
| Height | 56px |
| Padding | 0 Space-5 |
| Border bottom | Border-Default |
| Name | Body, 600 weight |
| Company | Caption, Text-Secondary |
| Actions | Phone, Video, Info (icon buttons) |

### Messages:
| Property | Value |
|----------|-------|
| Max width | 640px (80% container) |
| Spacing bottom | Space-3 (8px) |

**Received message:**
| Property | Value |
|----------|-------|
| Background | Surface-1 |
| Border | Border-Default |
| Padding | Space-4 (12px) |
| Radius | 12px top-left, 8px other |
| Text | Body (15px) |
| Time | Caption, below left |

**Sent message:**
| Property | Value |
|----------|-------|
| Background | Primary-600 |
| Text | White |
| Radius | 12px top-right, 8px other |

### AI Suggested Reply:
| Property | Value |
|----------|-------|
| Background | Primary-50 |
| Border | Primary-200 |
| Padding | Space-4 (12px) |
| Radius | radius-sm (6px) |
| Sparkle | AI icon |
| Text preview | Body-Small |
| Actions | [Use] [Edit] [Dismiss] — Button-Small row |

---

## 3. Input Area

Same specification as AI Workspace input area. Height 52px, radius-md, send button.

---

## 4. Empty State

| State | Behavior |
|-------|----------|
| No conversations | "No messages yet. Messages from recruiters will appear here." |
| No selection | "Select a conversation to view messages" (split view) |

---

## 5. AI Integration

| Feature | Behavior |
|---------|----------|
| Suggested replies | AI reads incoming message, drafts 1-2 context-aware replies |
| Smart sorting | AI prioritizes important recruiter messages |
| Auto-categorization | AI tags messages by type (application, interview, offer) |
| Follow-up reminders | AI flags conversations needing response >3 days |

---

*Cross-references: DP-6:IA, DP-6:Pattern, DP-1:All*
