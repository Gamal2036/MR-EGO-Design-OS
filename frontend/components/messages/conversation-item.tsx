"use client";

import { Archive, BellOff, Pin, Star, Trash2 } from "lucide-react";
import { forwardRef, useCallback, type KeyboardEvent, type MouseEvent, useState } from "react";

import { MessageAvatar } from "./message-avatar";

import { Badge } from "@/components/foundation/badge";
import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/messages";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onTogglePinned: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchived: (id: string) => void;
  onToggleMuted: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - date.getTime();
  const MS_DAY = 86400000;

  if (diff < MS_DAY) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (diff < 2 * MS_DAY) return "Yesterday";
  if (diff < 7 * MS_DAY) {
    return date.toLocaleDateString([], { weekday: "short" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function getLastMessagePreview(msg: { content: string; type: string; sender: { name: string } }): string {
  const prefix = msg.type === "outgoing" ? "You: " : "";
  const content = msg.content.replace(/[#*`\[\]]/g, "").trim();
  return prefix + (content.length > 60 ? content.slice(0, 60) + "..." : content);
}

const roleMap: Record<string, "ai" | "user" | "system" | "recruiter" | "career_coach" | "support"> = {
  ai: "ai",
  user: "user",
  system: "system",
  recruiter: "recruiter",
  career_coach: "career_coach",
  support: "support",
};

const ConversationItem = forwardRef<HTMLDivElement, ConversationItemProps>(
  (
    {
      conversation,
      isActive,
      onSelect,
      onTogglePinned,
      onToggleFavorite,
      onToggleArchived,
      onToggleMuted,
      onDelete,
    },
    ref,
  ) => {
    const [showActions, setShowActions] = useState(false);
    const participant = conversation.participants.find((p) => p.role !== "user") ?? conversation.participants[0];

    const handleSelect = useCallback(() => {
      onSelect(conversation.id);
    }, [conversation.id, onSelect]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      },
      [handleSelect],
    );

    const avatarRole = participant ? (roleMap[participant.role] ?? "system") : "system";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer items-start gap-3 border-b border-border px-4 py-3 transition-colors duration-fast",
          isActive ? "bg-primary/5" : "hover:bg-surface-1",
          conversation.unreadCount > 0 && "bg-primary/[0.02]",
        )}
        onClick={handleSelect}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Conversation with ${conversation.name}`}
        aria-current={isActive ? "page" : undefined}
      >
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

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="truncate text-label font-medium text-primary">
                {conversation.name}
              </span>
              {conversation.pinned && (
                <Pin className="h-3 w-3 shrink-0 text-primary/60" aria-label="Pinned" />
              )}
              {conversation.favorite && (
                <Star className="h-3 w-3 shrink-0 fill-warning text-warning" aria-label="Favorite" />
              )}
              {conversation.muted && (
                <BellOff className="h-3 w-3 shrink-0 text-tertiary" aria-label="Muted" />
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {conversation.unreadCount > 0 && (
                <Badge variant="danger" size="xs" className="min-w-[18px] px-1">
                  {conversation.unreadCount}
                </Badge>
              )}
              <span className="text-smallest text-tertiary whitespace-nowrap">
                {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
              </span>
            </div>
          </div>

          {conversation.lastMessage && (
            <span
              className={cn(
                "truncate text-caption",
                conversation.unreadCount > 0 ? "text-primary font-medium" : "text-secondary",
              )}
            >
              {getLastMessagePreview(conversation.lastMessage)}
            </span>
          )}
        </div>

        <div
          className={cn(
            "absolute right-2 top-1 flex items-center gap-0.5 rounded-lg bg-background/90 p-0.5 opacity-0 transition-opacity duration-fast backdrop-blur-sm",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            showActions && "opacity-100",
          )}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          role="group"
          aria-label="Conversation actions"
        >
          <IconButton
            icon={Pin}
            variant="ghost"
            size="xs"
            label={conversation.pinned ? "Unpin" : "Pin"}
            onClick={(e: MouseEvent) => { e.stopPropagation(); onTogglePinned(conversation.id); }}
            className={cn(conversation.pinned && "text-primary")}
          />
          <IconButton
            icon={Star}
            variant="ghost"
            size="xs"
            label={conversation.favorite ? "Unfavorite" : "Favorite"}
            onClick={(e: MouseEvent) => { e.stopPropagation(); onToggleFavorite(conversation.id); }}
            className={cn(conversation.favorite && "text-warning")}
          />
          <IconButton
            icon={Archive}
            variant="ghost"
            size="xs"
            label={conversation.archived ? "Unarchive" : "Archive"}
            onClick={(e: MouseEvent) => { e.stopPropagation(); onToggleArchived(conversation.id); }}
          />
          <IconButton
            icon={BellOff}
            variant="ghost"
            size="xs"
            label={conversation.muted ? "Unmute" : "Mute"}
            onClick={(e: MouseEvent) => { e.stopPropagation(); onToggleMuted(conversation.id); }}
          />
          <IconButton
            icon={Trash2}
            variant="ghost"
            size="xs"
            label="Delete"
            className="text-danger hover:text-danger"
            onClick={(e: MouseEvent) => { e.stopPropagation(); onDelete(conversation.id); }}
          />
        </div>
      </div>
    );
  },
);
ConversationItem.displayName = "ConversationItem";

export { ConversationItem };
export type { ConversationItemProps };
