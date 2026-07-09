export type MessageType =
  | "incoming"
  | "outgoing"
  | "system"
  | "ai"
  | "recruiter"
  | "career_coach"
  | "warning"
  | "success"
  | "information";

export type ConversationGroup =
  | "pinned"
  | "unread"
  | "ai_assistant"
  | "career_coach"
  | "applications"
  | "recruiters"
  | "support"
  | "archived"
  | "recent";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error" | "edited";

export type MessagingViewState = "loading" | "ready" | "error" | "empty";

export interface MessageSender {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  role: "user" | "ai" | "recruiter" | "career_coach" | "support" | "system";
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: "file" | "image" | "link";
  url?: string;
  size?: string;
  thumbnail?: string;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: string;
}

export interface Message {
  id: string;
  conversationId: string;
  type: MessageType;
  content: string;
  sender: MessageSender;
  timestamp: string;
  status: MessageStatus;
  attachments?: MessageAttachment[];
  metadata?: Record<string, string>;
  reactions?: MessageReaction[];
  replyTo?: string;
  editedAt?: string;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  role: string;
  online: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  name: string;
  group: ConversationGroup;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  muted: boolean;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export type ConversationFilter = "all" | ConversationGroup;

export interface MessagingState {
  conversations: Conversation[];
  activeConversationId: string | null;
  viewState: MessagingViewState;
  searchQuery: string;
  conversationFilter: ConversationFilter;
  showRightPanel: boolean;
  isTyping: boolean;
}

export interface MessagingStore extends MessagingState {
  setViewState: (state: MessagingViewState) => void;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setConversationFilter: (filter: ConversationFilter) => void;
  setShowRightPanel: (show: boolean) => void;
  setIsTyping: (typing: boolean) => void;

  togglePinned: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleArchived: (id: string) => void;
  toggleMuted: (id: string) => void;
  markAsRead: (id: string) => void;
  deleteConversation: (id: string) => void;

  sendMessage: (conversationId: string, content: string) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;

  getFilteredConversations: () => Conversation[];
  getActiveConversation: () => Conversation | undefined;
  getUnreadCount: () => number;
}
