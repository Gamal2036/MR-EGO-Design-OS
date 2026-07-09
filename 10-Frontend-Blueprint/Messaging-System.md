# Messaging System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Interaction-Patterns.md](../06-UX-Architecture/Interaction-Patterns.md)), DP-7 ([Messaging.md](../07-High-Fidelity-Wireframes/Messaging.md))

---

## Purpose

Defines the messaging system architecture — conversation model, threading, real-time delivery, read status, notifications, and future expansion.

---

## Messaging Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  MESSAGING SYSTEM                         │
├─────────────────────────────────────────────────────────┤
│  Conversation Engine                                     │
│  Direct, group, thread, context-linked conversations     │
├─────────────────────────────────────────────────────────┤
│  Message Pipeline                                        │
│  Send → Queue → Deliver → Read receipt → Store          │
├─────────────────────────────────────────────────────────┤
│  Real-Time Layer                                         │
│  WebSocket connection, presence, typing indicators       │
├─────────────────────────────────────────────────────────┤
│  Integration Hooks                                       │
│  Application messages, AI conversation, notifications   │
└─────────────────────────────────────────────────────────┘
```

---

## Conversation Model

```typescript
// Pseudocode
interface Conversation {
  id: string;
  type: ConversationType;
  participants: Participant[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata: ConversationMetadata;
}

enum ConversationType {
  Direct,              // 1-on-1 messaging
  Group,               // Multi-participant
  Application,         // Linked to a job application
  AI,                  // AI conversation
  System,              // System notifications
}

interface Participant {
  userId: string;
  name: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  lastReadAt: Date;
  isOnline: boolean;
  isTyping: boolean;
}
```

---

## Message Model

```typescript
// Pseudocode
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string;
  attachments: Attachment[];
  replyTo?: string;              // Thread parent
  createdAt: Date;
  editedAt?: Date;
  readBy: string[];              // User IDs
  status: MessageStatus;
  metadata: MessageMetadata;
}

enum MessageType {
  Text,
  File,
  Image,
  System,            // "User joined the conversation"
  AI,                // AI-generated message
  Template,          // Structured message (e.g. application update)
}

enum MessageStatus {
  Sending,
  Sent,
  Delivered,
  Read,
  Failed,
}
```

---

## Real-Time Delivery

```typescript
// Pseudocode
interface MessagingSocket {
  connect(): void;
  disconnect(): void;
  send(message: OutgoingMessage): void;
  onMessage(handler: (message: Message) => void): void;
  onTyping(handler: (data: TypingIndicator) => void): void;
  onPresence(handler: (presence: PresenceUpdate) => void): void;
}

// Delivery flow
User sends message
     ↓
Message optimistically added to UI
     ↓
WebSocket send
     ↓
┌──────────────┐      ┌───────────────┐
│ DELIVERED    │      │ FAILED         │
│ Server       │      │ Show error     │
│ acknowledges │      │ Allow retry    │
│ Update       │      │ Status: Failed │
│ status: Sent │      │                │
│              │      │                │
│ Recipient    │      │                │
│ receives via │      │                │
│ WebSocket    │      │                │
│ Status:      │      │                │
│ Delivered    │      │                │
└──────────────┘      └───────────────┘
```

---

## Threading

```
Message A (parent)
├── Reply A1 (to A)
├── Reply A2 (to A)
│   └── Reply A2.1 (to A2, nested)
└── Reply A3 (to A)

Message B (parent)
└── Reply B1 (to B)
```

Thread rules:
1. Threads are nested to a maximum depth of 3 levels.
2. Replying to a message creates a thread under that message.
3. Thread preview shows last 3 messages.
4. Clicking "View thread" opens the full thread in a panel.
5. Thread participants are notified of replies.

---

## Notifications

| Event | Channel | Priority |
|-------|---------|----------|
| New message | Toast + badge + push | Normal |
| @mention | Toast + badge + push | High |
| Direct reply | Toast + badge + push | Normal |
| Thread reply | Badge + push | Low |
| File shared | Badge | Low |

---

## Future Expansion

| Feature | Phase | Description |
|---------|-------|-------------|
| Video/voice calls | Future | WebRTC integration |
| Message reactions | Future | Emoji reactions |
| Message search | Future | Full-text search across conversations |
| Message forwarding | Future | Forward to other conversations |
| Scheduled messages | Future | Send at specified time |
| Read receipts toggle | Future | Privacy control |
| Auto-translate | Future | On-device translation |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Notification-System.md](Notification-System.md) | Message notifications |
| [Application-Tracker.md](Application-Tracker.md) | Application-linked conversations |
| [AI-Integration-Layer.md](AI-Integration-Layer.md) | AI conversation integration |

---

## Validation Notes

1. Messages are delivered in real-time via WebSocket with optimistic UI updates.
2. Threading supports nested replies up to 3 levels for organised discussions.
3. Read status is tracked per participant per message.
4. Failed messages are clearly indicated with retry capability.
5. Application-linked conversations provide context between recruiters and candidates.
