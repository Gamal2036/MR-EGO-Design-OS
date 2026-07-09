"use client";

import { useCallback } from "react";

import { ConversationDetails } from "./conversation-details";
import { ConversationHeader } from "./conversation-header";
import { ConversationList } from "./conversation-list";
import { MessageComposer } from "./message-composer";
import { MessageList } from "./message-list";

import { cn } from "@/lib/utils";
import type { Conversation, ConversationFilter } from "@/types/messages";

interface MessagesLayoutProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  viewState: string;
  searchQuery: string;
  activeFilter: ConversationFilter;
  showRightPanel: boolean;
  isTyping: boolean;
  onSelectConversation: (id: string) => void;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: ConversationFilter) => void;
  onToggleDetails: () => void;
  onSendMessage: (content: string) => void;
}

export function MessagesLayout({
  className,
  conversations,
  activeConversationId,
  searchQuery,
  activeFilter,
  showRightPanel,
  isTyping,
  onSelectConversation,
  onSearchChange,
  onFilterChange,
  onToggleDetails,
  onSendMessage,
}: MessagesLayoutProps & { className?: string }) {
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const handleBack = useCallback(() => {
    onSelectConversation("");
  }, [onSelectConversation]);

  const typingName = activeConversation
    ? activeConversation.participants.find((p) => p.role !== "user")?.name
    : undefined;

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-4rem)] overflow-hidden bg-background",
        className,
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-80 border-r border-border",
          "hidden md:flex flex-col",
          activeConversationId && "max-md:hidden",
        )}
      >
        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onSelect={onSelectConversation}
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col min-w-0",
          !activeConversationId && "max-md:hidden",
          activeConversationId ? "flex" : "hidden md:flex",
        )}
      >
        {activeConversation ? (
          <>
            <ConversationHeader
              conversation={activeConversation}
              onBack={handleBack}
              onToggleDetails={onToggleDetails}
            />
            <MessageList
              conversation={activeConversation}
              isTyping={isTyping}
              typingName={typingName}
            />
            <MessageComposer onSend={onSendMessage} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-1">
                <svg
                  className="h-8 w-8 text-tertiary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-heading-4 text-primary mb-1">Select a conversation</h3>
              <p className="text-body text-secondary max-w-sm">
                Choose a conversation from the left panel to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex-shrink-0 w-72",
          "hidden lg:flex flex-col",
          showRightPanel ? "max-lg:flex max-lg:absolute max-lg:inset-y-0 max-lg:right-0 max-lg:z-30 max-lg:w-80 max-lg:shadow-elevation-4" : "max-lg:hidden",
        )}
      >
        {activeConversation ? (
          <ConversationDetails
            conversation={activeConversation}
            onClose={onToggleDetails}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center">
            <p className="text-caption text-tertiary">Select a conversation to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export type { MessagesLayoutProps };
