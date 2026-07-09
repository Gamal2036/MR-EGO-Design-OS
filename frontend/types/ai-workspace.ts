export type MessageRole = "user" | "assistant" | "system" | "warning" | "error" | "thinking" | "success" | "suggestion";

export type MessageStatus = "sending" | "sent" | "streaming" | "complete" | "error" | "edited";

export interface MessageMetadata {
  model?: string;
  provider?: string;
  confidence?: number;
  tokens?: number;
  sources?: string[];
  thinking?: string;
}

export interface AIMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status: MessageStatus;
  bookmarked?: boolean;
  metadata?: MessageMetadata;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AIMessage[];
  pinned?: boolean;
  favorite?: boolean;
  archived?: boolean;
  folder?: string;
  model?: string;
  messageCount: number;
  tokenCount?: number;
}

export type SidebarView = "history" | "pinned" | "favorites" | "search";
export type RightPanelView = "context" | "files" | "memory" | "info";
export type PanelState = "open" | "closed" | "collapsed";

export interface AIWorkspaceState {
  conversations: Conversation[];
  activeConversationId: string | null;
  sidebarView: SidebarView;
  sidebarState: PanelState;
  rightPanelView: RightPanelView;
  rightPanelState: PanelState;
  searchQuery: string;
  isGenerating: boolean;
  showToolbar: boolean;
  showStatusBar: boolean;

  setActiveConversation: (id: string | null) => void;
  setSidebarView: (view: SidebarView) => void;
  setSidebarState: (state: PanelState) => void;
  toggleSidebar: () => void;
  setRightPanelView: (view: RightPanelView) => void;
  setRightPanelState: (state: PanelState) => void;
  toggleRightPanel: () => void;
  setSearchQuery: (query: string) => void;
  setIsGenerating: (generating: boolean) => void;
  setShowToolbar: (show: boolean) => void;
  setShowStatusBar: (show: boolean) => void;
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  duplicateConversation: (id: string) => string;
  togglePinned: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleArchived: (id: string) => void;
  addMessage: (conversationId: string, message: AIMessage) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<AIMessage>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  clearConversation: (id: string) => void;
  toggleBookmark: (conversationId: string, messageId: string) => void;
}
