import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AIMessage, AIWorkspaceState, Conversation } from "@/types/ai-workspace";

function generateIdFn(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function msgIdFn(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createWelcomeConversation(): Conversation {
  return {
    id: generateIdFn(),
    title: "Welcome to MR:EGO AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messageCount: 0,
    messages: [],
    pinned: false,
    favorite: false,
    archived: false,
  };
}

export const useAIWorkspaceStore = create<AIWorkspaceState>()(
  persist(
    (set, get) => ({
      conversations: [createWelcomeConversation()],
      activeConversationId: null,
      sidebarView: "history",
      sidebarState: "open",
      rightPanelView: "context",
      rightPanelState: "closed",
      searchQuery: "",
      isGenerating: false,
      showToolbar: true,
      showStatusBar: true,

      setActiveConversation: (id) => set({ activeConversationId: id }),

      setSidebarView: (view) => set({ sidebarView: view }),

      setSidebarState: (state) => set({ sidebarState: state }),

      toggleSidebar: () =>
        set((s) => ({
          sidebarState: s.sidebarState === "open" ? "closed" : "open",
        })),

      setRightPanelView: (view) => set({ rightPanelView: view }),

      setRightPanelState: (state) => set({ rightPanelState: state }),

      toggleRightPanel: () =>
        set((s) => ({
          rightPanelState: s.rightPanelState === "open" ? "closed" : "open",
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setIsGenerating: (generating) => set({ isGenerating: generating }),

      setShowToolbar: (show) => set({ showToolbar: show }),

      setShowStatusBar: (show) => set({ showStatusBar: show }),

      createConversation: () => {
        const id = generateIdFn();
        const conversation: Conversation = {
          id,
          title: "New Conversation",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messageCount: 0,
          messages: [],
          pinned: false,
          favorite: false,
          archived: false,
        };
        set((s) => ({
          conversations: [conversation, ...s.conversations],
          activeConversationId: id,
        }));
        return id;
      },

      deleteConversation: (id) =>
        set((s) => ({
          conversations: s.conversations.filter((c) => c.id !== id),
          activeConversationId:
            s.activeConversationId === id ? null : s.activeConversationId,
        })),

      renameConversation: (id, title) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c,
          ),
        })),

      duplicateConversation: (id) => {
        const source = get().conversations.find((c) => c.id === id);
        if (!source) return "";
        const newId = generateIdFn();
        const dup: Conversation = {
          ...source,
          id: newId,
          title: `${source.title} (copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pinned: false,
          favorite: false,
          archived: false,
          messages: source.messages.map((m) => ({ ...m, id: msgIdFn() })),
        };
        set((s) => ({
          conversations: [dup, ...s.conversations],
        }));
        return newId;
      },

      togglePinned: (id) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, pinned: !c.pinned } : c,
          ),
        })),

      toggleFavorite: (id) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, favorite: !c.favorite } : c,
          ),
        })),

      toggleArchived: (id) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, archived: !c.archived } : c,
          ),
        })),

      addMessage: (conversationId, message) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  messageCount: c.messageCount + 1,
                  updatedAt: new Date().toISOString(),
                }
              : c,
          ),
        })),

      updateMessage: (conversationId, messageId, updates) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, ...updates } : m,
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : c,
          ),
        })),

      deleteMessage: (conversationId, messageId) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.filter((m) => m.id !== messageId),
                  messageCount: c.messageCount - 1,
                  updatedAt: new Date().toISOString(),
                }
              : c,
          ),
        })),

      clearConversation: (id) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id
              ? { ...c, messages: [], messageCount: 0, updatedAt: new Date().toISOString() }
              : c,
          ),
        })),

      toggleBookmark: (conversationId, messageId) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, bookmarked: !m.bookmarked } : m,
                  ),
                }
              : c,
          ),
        })),
    }),
    {
      name: "mr-ego-ai-workspace",
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
        sidebarState: state.sidebarState,
        rightPanelState: state.rightPanelState,
      }),
    },
  ),
);
