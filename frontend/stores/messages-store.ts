import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Conversation,
  ConversationFilter,
  MessagingStore,
  MessagingViewState,
  Message,
  MessageSender,
  MessageType,
} from "@/types/messages";

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createSender(): MessageSender {
  return {
    id: "user_1",
    name: "You",
    initials: "YO",
    role: "user",
  };
}

const currentUser = createSender();

function getDateGroup(timestamp: string): "today" | "yesterday" | "older" {
  const now = Date.now();
  const date = new Date(timestamp).getTime();
  const diff = now - date;
  const MS_DAY = 86400000;

  if (diff < MS_DAY) return "today";
  if (diff < 2 * MS_DAY) return "yesterday";
  return "older";
}

export const useMessagesStore = create<MessagingStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      viewState: "loading",
      searchQuery: "",
      conversationFilter: "all",
      showRightPanel: false,
      isTyping: false,

      setViewState: (viewState: MessagingViewState) => set({ viewState }),

      setConversations: (conversations: Conversation[]) => set({ conversations }),

      setActiveConversation: (id: string | null) => set({ activeConversationId: id }),

      setSearchQuery: (searchQuery: string) => set({ searchQuery }),

      setConversationFilter: (conversationFilter: ConversationFilter) =>
        set({ conversationFilter }),

      setShowRightPanel: (showRightPanel: boolean) => set({ showRightPanel }),

      setIsTyping: (isTyping: boolean) => set({ isTyping }),

      togglePinned: (id: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, pinned: !c.pinned } : c,
          ),
        })),

      toggleFavorite: (id: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, favorite: !c.favorite } : c,
          ),
        })),

      toggleArchived: (id: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? { ...c, archived: !c.archived, group: !c.archived ? "archived" as const : "recent" as const }
              : c,
          ),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        })),

      toggleMuted: (id: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, muted: !c.muted } : c,
          ),
        })),

      markAsRead: (id: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, unreadCount: 0 } : c,
          ),
        })),

      deleteConversation: (id: string) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        })),

      sendMessage: (conversationId: string, content: string) => {
        const { conversations, markAsRead } = get();
        const conversation = conversations.find((c) => c.id === conversationId);
        if (!conversation) return;

        const message: Message = {
          id: generateId(),
          conversationId,
          type: "outgoing",
          content,
          sender: currentUser,
          timestamp: new Date().toISOString(),
          status: "sent",
        };

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  lastMessage: message,
                  updatedAt: new Date().toISOString(),
                }
              : c,
          ),
        }));

        if (conversation.unreadCount > 0) {
          markAsRead(conversationId);
        }
      },

      deleteMessage: (conversationId: string, messageId: string) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.filter((m) => m.id !== messageId),
                }
              : c,
          ),
        })),

      getFilteredConversations: () => {
        const { conversations, searchQuery, conversationFilter } = get();
        let filtered = conversations;

        if (conversationFilter !== "all") {
          filtered = filtered.filter((c) => c.group === conversationFilter);
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.messages.some((m) => m.content.toLowerCase().includes(q)),
          );
        }

        return [...filtered].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      },

      getActiveConversation: () => {
        const { conversations, activeConversationId } = get();
        return conversations.find((c) => c.id === activeConversationId);
      },

      getUnreadCount: () => {
        return get().conversations.reduce(
          (sum, c) => sum + (c.archived ? 0 : c.unreadCount),
          0,
        );
      },
    }),
    {
      name: "mr-ego-messages",
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    },
  ),
);
