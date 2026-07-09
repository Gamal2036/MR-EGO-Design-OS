"use client";

import {
  History,
  MessageSquarePlus,
  Search,
  Settings,
  SlidersHorizontal,
  UserCircle,
} from "lucide-react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

export function AIToolbar() {
  const { showToolbar, createConversation } =
    useAIWorkspaceStore();

  if (!showToolbar) return null;

  return (
    <div
      className={cn(
        "flex h-12 items-center justify-between border-b border-border bg-surface-1/80 backdrop-blur-sm px-3",
      )}
      role="toolbar"
      aria-label="AI workspace toolbar"
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => createConversation()}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-label font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="New conversation"
        >
          <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

        <div className="mx-2 h-5 w-px bg-border" role="separator" />

        <IconButton
          icon={Search}
          variant="ghost"
          size="sm"
          label="Search conversations"
        />

        <IconButton
          icon={SlidersHorizontal}
          variant="ghost"
          size="sm"
          label="Model settings"
          disabled
          aria-disabled="true"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-caption text-tertiary">Workspace</span>
          <span className="text-caption font-medium text-primary">MR:EGO AI</span>
        </div>

        <span className="hidden text-caption text-tertiary md:inline-block">
          &mdash;
        </span>

        <span className="hidden text-caption font-medium text-ai md:inline-block">
          Claude Sonnet
        </span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          icon={History}
          variant="ghost"
          size="sm"
          label="Conversation history"
        />

        <IconButton
          icon={Settings}
          variant="ghost"
          size="sm"
          label="Settings"
        />

        <div className="mx-1 h-5 w-px bg-border" role="separator" />

        <IconButton
          icon={UserCircle}
          variant="ghost"
          size="sm"
          label="Profile"
        />
      </div>
    </div>
  );
}
