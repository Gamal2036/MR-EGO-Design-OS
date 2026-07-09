"use client";

import { useCallback, useEffect } from "react";

import {
  MessagesEmptyState,
  MessagesErrorState,
  MessagesLayout,
  MessagesLoadingState,
} from "@/components/messages";
import { demoConversations } from "@/data/messages";
import { useMessagesStore } from "@/stores/messages-store";

export default function MessagesPage() {
  const {
    conversations,
    activeConversationId,
    viewState,
    searchQuery,
    conversationFilter,
    showRightPanel,
    isTyping,
    setViewState,
    setConversations,
    setActiveConversation,
    setSearchQuery,
    setConversationFilter,
    setShowRightPanel,
    setIsTyping,
    sendMessage,
    markAsRead,
    getFilteredConversations,
    getUnreadCount,
  } = useMessagesStore();

  useEffect(() => {
    setViewState("loading");
    const timer = setTimeout(() => {
      setConversations(demoConversations);
      setViewState("ready");
    }, 400);
    return () => clearTimeout(timer);
  }, [setViewState, setConversations]);

  useEffect(() => {
    const count = getUnreadCount();
    if (count > 0) {
    }
  }, [conversations, getUnreadCount]);

  const handleSelectConversation = useCallback(
    (id: string) => {
      if (!id) {
        setActiveConversation(null);
        return;
      }
      setActiveConversation(id);
      markAsRead(id);
      setShowRightPanel(false);
    },
    [setActiveConversation, markAsRead, setShowRightPanel],
  );

  const handleRetry = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setConversations(demoConversations);
      setViewState("ready");
    }, 400);
  }, [setViewState, setConversations]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!activeConversationId) return;
      sendMessage(activeConversationId, content);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    },
    [activeConversationId, sendMessage, setIsTyping],
  );

  const filteredConversations = getFilteredConversations();

  if (viewState === "loading") {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background">
        <MessagesLoadingState message="Loading messages..." />
      </div>
    );
  }

  if (viewState === "error") {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background">
        <MessagesErrorState onRetry={handleRetry} />
      </div>
    );
  }

  if (viewState === "empty") {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background">
        <MessagesEmptyState
          title="No conversations yet"
          description="Start a new conversation to begin messaging."
        />
      </div>
    );
  }

  return (
    <MessagesLayout
      conversations={filteredConversations}
      activeConversationId={activeConversationId}
      viewState={viewState}
      searchQuery={searchQuery}
      activeFilter={conversationFilter}
      showRightPanel={showRightPanel}
      isTyping={isTyping}
      onSelectConversation={handleSelectConversation}
      onSearchChange={setSearchQuery}
      onFilterChange={setConversationFilter}
      onToggleDetails={() => setShowRightPanel(!showRightPanel)}
      onSendMessage={handleSendMessage}
    />
  );
}
