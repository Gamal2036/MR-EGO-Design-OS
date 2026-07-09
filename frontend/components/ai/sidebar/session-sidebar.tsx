"use client";

import {
  Calendar,
  Clock,
  Copy,
  Heart,
  MessageSquare,
  PanelLeftClose,
  Pin,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

function groupConversationsByDate(conversations: Array<{
  id: string;
  title: string;
  updatedAt: string;
  pinned?: boolean;
  favorite?: boolean;
  messageCount: number;
}>) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const lastWeek = new Date(today.getTime() - 7 * 86400000);

  const groups: Record<string, typeof conversations> = {};
  groups["Pinned"] = [];
  groups["Favorites"] = [];
  groups["Today"] = [];
  groups["Yesterday"] = [];
  groups["Last 7 Days"] = [];
  groups["Older"] = [];

  for (const conv of conversations) {
    const date = new Date(conv.updatedAt);
    if (conv.pinned) {
      groups["Pinned"]!.push(conv);
    } else if (conv.favorite) {
      groups["Favorites"]!.push(conv);
    } else if (date >= today) {
      groups["Today"]!.push(conv);
    } else if (date >= yesterday) {
      groups["Yesterday"]!.push(conv);
    } else if (date >= lastWeek) {
      groups["Last 7 Days"]!.push(conv);
    } else {
      groups["Older"]!.push(conv);
    }
  }

  return Object.entries(groups).filter(([, items]) => items.length > 0);
}

interface DeleteConfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirm({ title, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-surface-0/80 backdrop-blur-sm"
      role="alertdialog"
      aria-label="Delete conversation"
    >
      <div className="mx-3 w-full max-w-xs rounded-lg border border-border bg-surface-1 p-4 shadow-dialog animate-scale-in">
        <h3 className="text-label font-semibold text-primary mb-1">Delete conversation?</h3>
        <p className="text-caption text-secondary mb-3 truncate">{title}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-3 py-1.5 text-caption font-medium text-secondary transition-colors hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-danger/10 px-3 py-1.5 text-caption font-medium text-danger transition-colors hover:bg-danger/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function SessionSidebar() {
  const sidebarState = useAIWorkspaceStore((s) => s.sidebarState);
  const conversations = useAIWorkspaceStore((s) => s.conversations);
  const activeConversationId = useAIWorkspaceStore((s) => s.activeConversationId);
  const setActiveConversation = useAIWorkspaceStore((s) => s.setActiveConversation);
  const deleteConversation = useAIWorkspaceStore((s) => s.deleteConversation);
  const duplicateConversation = useAIWorkspaceStore((s) => s.duplicateConversation);
  const togglePinned = useAIWorkspaceStore((s) => s.togglePinned);
  const toggleFavorite = useAIWorkspaceStore((s) => s.toggleFavorite);
  const toggleSidebar = useAIWorkspaceStore((s) => s.toggleSidebar);
  const createConversation = useAIWorkspaceStore((s) => s.createConversation);
  const searchQuery = useAIWorkspaceStore((s) => s.searchQuery);
  const setSearchQuery = useAIWorkspaceStore((s) => s.setSearchQuery);

  const [searchFocused, setSearchFocused] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter((c) =>
      c.title.toLowerCase().includes(q),
    );
  }, [conversations, searchQuery]);

  const groups = useMemo(
    () => groupConversationsByDate(filteredConversations),
    [filteredConversations],
  );

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      deleteConversation(deleteTarget);
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteConversation]);

  if (sidebarState === "closed") return null;

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-border bg-surface-0",
        "animate-slide-in-from-left",
      )}
      role="complementary"
      aria-label="Conversation history"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <h2 className="text-label font-semibold text-primary">History</h2>
        <IconButton
          icon={PanelLeftClose}
          variant="ghost"
          size="xs"
          label="Close sidebar"
          onClick={toggleSidebar}
        />
      </div>

      <div className="relative border-b border-border px-3 py-2">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border bg-surface-1 px-2.5 py-1.5 transition-colors",
            searchFocused
              ? "border-primary/50 ring-1 ring-primary/20"
              : "border-border",
          )}
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-tertiary" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search conversations..."
            className="min-w-0 flex-1 bg-transparent text-caption text-primary outline-none placeholder:text-tertiary"
            aria-label="Search conversations"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 text-tertiary hover:text-secondary"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
            <MessageSquare className="h-8 w-8 text-tertiary" aria-hidden="true" />
            <p className="text-caption text-tertiary">
              {searchQuery
                ? "No conversations found"
                : "No conversations yet"}
            </p>
          </div>
        ) : (
          groups.map(([groupName, items]) => (
            <div key={groupName} role="group" aria-label={groupName}>
              <div className="flex items-center gap-1.5 px-3 pt-4 pb-1">
                {groupName === "Pinned" && (
                  <Pin className="h-3 w-3 text-tertiary" aria-hidden="true" />
                )}
                {groupName === "Favorites" && (
                  <Star className="h-3 w-3 text-warning" aria-hidden="true" />
                )}
                {groupName === "Today" && (
                  <Clock className="h-3 w-3 text-tertiary" aria-hidden="true" />
                )}
                {groupName === "Older" && (
                  <Calendar className="h-3 w-3 text-tertiary" aria-hidden="true" />
                )}
                <span className="text-smallest font-medium uppercase tracking-wider text-tertiary">
                  {groupName}
                </span>
              </div>
              {items.map((conv) => (
                <div key={conv.id} className="relative">
                  {deleteTarget === conv.id && (
                    <DeleteConfirm
                      title={conv.title}
                      onConfirm={handleDeleteConfirm}
                      onCancel={() => setDeleteTarget(null)}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveConversation(conv.id)}
                    className={cn(
                      "group/conv relative flex w-full items-center gap-2 px-3 py-2 text-left transition-colors",
                      "hover:bg-accent",
                      conv.id === activeConversationId &&
                        "bg-accent border-l-2 border-primary",
                    )}
                    aria-current={
                      conv.id === activeConversationId ? "true" : undefined
                    }
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-tertiary" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-caption",
                          conv.id === activeConversationId
                            ? "font-semibold text-primary"
                            : "text-secondary",
                        )}
                      >
                        {conv.title}
                      </span>
                      <span className="text-smallest text-tertiary">
                        {conv.messageCount} messages
                      </span>
                    </div>

                    <div
                      className={cn(
                        "hidden shrink-0 items-center gap-0.5 group-hover/conv:flex",
                      )}
                    >
                      <IconButton
                        icon={Pin}
                        variant="ghost"
                        size="xs"
                        label={conv.pinned ? "Unpin" : "Pin"}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinned(conv.id);
                        }}
                        className={cn(conv.pinned && "text-primary")}
                      />
                      <IconButton
                        icon={Heart}
                        variant="ghost"
                        size="xs"
                        label={conv.favorite ? "Remove favorite" : "Favorite"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(conv.id);
                        }}
                        className={cn(conv.favorite && "text-danger")}
                      />
                      <IconButton
                        icon={Copy}
                        variant="ghost"
                        size="xs"
                        label="Duplicate"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newId = duplicateConversation(conv.id);
                          if (newId) setActiveConversation(newId);
                        }}
                      />
                      <IconButton
                        icon={Trash2}
                        variant="ghost"
                        size="xs"
                        label="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(conv.id);
                        }}
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-border p-2 space-y-1">
        <button
          type="button"
          onClick={() => createConversation()}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-label font-medium text-primary transition-colors hover:bg-accent"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          <span>New conversation</span>
        </button>
      </div>
    </aside>
  );
}
