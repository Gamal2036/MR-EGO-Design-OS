"use client";

import {
  Archive,
  BellOff,
  ChevronLeft,
  Info,
  MoreVertical,
  Pin,
  Star,
  Trash2,
} from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { MessageAvatar } from "./message-avatar";

import { IconButton } from "@/components/foundation/icon-button";
import { useMessagesStore } from "@/stores/messages-store";
import type { Conversation } from "@/types/messages";

interface ConversationHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
  onToggleDetails?: () => void;
}

const roleMap: Record<string, "ai" | "user" | "system" | "recruiter" | "career_coach" | "support"> = {
  ai: "ai",
  user: "user",
  system: "system",
  recruiter: "recruiter",
  career_coach: "career_coach",
  support: "support",
};

const ConversationHeader = forwardRef<HTMLDivElement, ConversationHeaderProps>(
  ({ conversation, onBack, onToggleDetails }, ref) => {
    const [showMenu, setShowMenu] = useState(false);
    const togglePinned = useMessagesStore((s) => s.togglePinned);
    const toggleFavorite = useMessagesStore((s) => s.toggleFavorite);
    const toggleArchived = useMessagesStore((s) => s.toggleArchived);
    const toggleMuted = useMessagesStore((s) => s.toggleMuted);
    const deleteConversation = useMessagesStore((s) => s.deleteConversation);
    const setActiveConversation = useMessagesStore((s) => s.setActiveConversation);

    const participant = conversation.participants.find((p) => p.role !== "user") ?? conversation.participants[0];
    const onlineCount = conversation.participants.filter((p) => p.online).length;

    const handleDelete = useCallback(() => {
      deleteConversation(conversation.id);
      setActiveConversation(null);
    }, [conversation.id, deleteConversation, setActiveConversation]);

    const avatarRole = participant ? (roleMap[participant.role] ?? "system") : "system";

    return (
      <div
        ref={ref}
        className="flex items-center justify-between border-b border-border bg-surface-0 px-4 py-3"
        role="banner"
        aria-label="Conversation header"
      >
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center rounded-lg p-1 text-secondary hover:bg-surface-1 hover:text-primary md:hidden"
              aria-label="Back to conversations"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {participant && (
            <MessageAvatar
              src={participant.avatar}
              initials={participant.initials}
              role={avatarRole}
              name={participant.name}
              size="md"
              online={participant.online}
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-label font-semibold text-primary">
                {conversation.name}
              </h3>
              {conversation.pinned && (
                <Pin className="h-3 w-3 shrink-0 text-primary/60" aria-label="Pinned" />
              )}
              {conversation.favorite && (
                <Star className="h-3 w-3 shrink-0 fill-warning text-warning" aria-label="Favorite" />
              )}
            </div>
            <p className="truncate text-caption text-tertiary">
              {onlineCount > 0
                ? `${onlineCount} online`
                : `${conversation.participants.length} participants`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <IconButton
            icon={Info}
            variant="ghost"
            size="sm"
            label="Conversation details"
            onClick={onToggleDetails}
            className="hidden sm:flex"
          />
          <div className="relative">
            <IconButton
              icon={MoreVertical}
              variant="ghost"
              size="sm"
              label="More options"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} aria-hidden="true" />
                <div
                  className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-border bg-surface-1 p-1 shadow-dropdown"
                  role="menu"
                  aria-label="Conversation options"
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-body text-secondary hover:bg-surface-2 hover:text-primary"
                    role="menuitem"
                    onClick={() => { togglePinned(conversation.id); setShowMenu(false); }}
                  >
                    <Pin className="h-4 w-4" />
                    {conversation.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-body text-secondary hover:bg-surface-2 hover:text-primary"
                    role="menuitem"
                    onClick={() => { toggleFavorite(conversation.id); setShowMenu(false); }}
                  >
                    <Star className="h-4 w-4" />
                    {conversation.favorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-body text-secondary hover:bg-surface-2 hover:text-primary"
                    role="menuitem"
                    onClick={() => { toggleArchived(conversation.id); setShowMenu(false); }}
                  >
                    <Archive className="h-4 w-4" />
                    {conversation.archived ? "Unarchive" : "Archive"}
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-body text-secondary hover:bg-surface-2 hover:text-primary"
                    role="menuitem"
                    onClick={() => { toggleMuted(conversation.id); setShowMenu(false); }}
                  >
                    <BellOff className="h-4 w-4" />
                    {conversation.muted ? "Unmute" : "Mute"}
                  </button>
                  <div className="my-1 border-t border-border" />
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-body text-danger hover:bg-danger/10"
                    role="menuitem"
                    onClick={() => { handleDelete(); setShowMenu(false); }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);
ConversationHeader.displayName = "ConversationHeader";

export { ConversationHeader };
export type { ConversationHeaderProps };
