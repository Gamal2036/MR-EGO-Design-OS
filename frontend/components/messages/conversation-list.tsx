"use client";

import { forwardRef } from "react";

import { ConversationFilters } from "./conversation-filters";
import { ConversationItem } from "./conversation-item";
import { ConversationSearch } from "./conversation-search";

import { useMessagesStore } from "@/stores/messages-store";
import type { Conversation, ConversationFilter } from "@/types/messages";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  searchQuery: string;
  activeFilter: ConversationFilter;
  onSelect: (id: string) => void;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: ConversationFilter) => void;
}

const ConversationList = forwardRef<HTMLDivElement, ConversationListProps>(
  (
    {
      conversations,
      activeId,
      searchQuery,
      activeFilter,
      onSelect,
      onSearchChange,
      onFilterChange,
    },
    ref,
  ) => {
    const togglePinned = useMessagesStore((s) => s.togglePinned);
    const toggleFavorite = useMessagesStore((s) => s.toggleFavorite);
    const toggleArchived = useMessagesStore((s) => s.toggleArchived);
    const toggleMuted = useMessagesStore((s) => s.toggleMuted);
    const deleteConversation = useMessagesStore((s) => s.deleteConversation);

    return (
      <div
        ref={ref}
        className="flex h-full flex-col border-r border-border bg-surface-0"
      >
        <div className="flex flex-col gap-3 border-b border-border p-3">
          <h2 className="text-heading-4 text-primary px-1">Messages</h2>
          <ConversationSearch value={searchQuery} onChange={onSearchChange} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col overflow-y-auto scrollbar-thin" style={{ width: searchQuery ? "100%" : "auto" }}>
            {!searchQuery && (
              <div className="border-b border-border p-2">
                <ConversationFilters activeFilter={activeFilter} onFilterChange={onFilterChange} />
              </div>
            )}
            <div className="flex-1 overflow-y-auto scrollbar-thin" role="list" aria-label="Conversations">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <p className="text-body text-tertiary">No conversations found</p>
                </div>
              ) : (
                conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeId}
                    onSelect={onSelect}
                    onTogglePinned={togglePinned}
                    onToggleFavorite={toggleFavorite}
                    onToggleArchived={toggleArchived}
                    onToggleMuted={toggleMuted}
                    onDelete={deleteConversation}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ConversationList.displayName = "ConversationList";

export { ConversationList };
export type { ConversationListProps };
