"use client";

import {
  Clock,
  Heart,
  Pin,
  PanelRightOpen,
  PanelRightClose,
  Menu,
} from "lucide-react";

import { statusColors } from "./assistant-card";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAssistantStore } from "@/stores/assistant-store";

export function AssistantHeader() {
  const activeAssistant = useAssistantStore((s) => s.activeAssistant());
  const toggleFavorite = useAssistantStore((s) => s.toggleFavorite);
  const togglePinned = useAssistantStore((s) => s.togglePinned);
  const rightPanelOpen = useAssistantStore((s) => s.rightPanelOpen);
  const toggleRightPanel = useAssistantStore((s) => s.toggleRightPanel);
  const toggleSidebar = useAssistantStore((s) => s.toggleSidebar);

  if (!activeAssistant) return null;

  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-1">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex lg:hidden text-tertiary hover:text-primary transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative shrink-0 hidden sm:block">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/10 text-ai text-label font-semibold">
            {activeAssistant.initials}
          </div>
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-1",
              statusColors[activeAssistant.status],
            )}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-heading-4 text-primary font-semibold truncate">
              {activeAssistant.name}
            </h1>
            {activeAssistant.favorite && (
              <Heart className="h-4 w-4 fill-danger text-danger shrink-0" aria-hidden="true" />
            )}
            {activeAssistant.pinned && (
              <Pin className="h-4 w-4 text-ai shrink-0" aria-hidden="true" />
            )}
          </div>
          <div className="flex items-center gap-2 text-caption text-tertiary">
            <span className="flex items-center gap-1">
              <span
                className={cn(
                  "inline-block h-2 w-2 rounded-full",
                  statusColors[activeAssistant.status],
                )}
                aria-hidden="true"
              />
              {activeAssistant.status.charAt(0).toUpperCase() + activeAssistant.status.slice(1)}
            </span>
            <span>·</span>
            <span>{activeAssistant.provider}</span>
            <span>·</span>
            <span>{activeAssistant.model}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {activeAssistant.lastActivity}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          icon={Heart}
          variant="ghost"
          size="sm"
          label={activeAssistant.favorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => toggleFavorite(activeAssistant.id)}
          className={cn(
            activeAssistant.favorite && "text-danger",
          )}
        />
        <IconButton
          icon={Pin}
          variant="ghost"
          size="sm"
          label={activeAssistant.pinned ? "Unpin" : "Pin"}
          onClick={() => togglePinned(activeAssistant.id)}
          className={cn(
            activeAssistant.pinned && "text-ai",
          )}
        />
        <IconButton
          icon={rightPanelOpen ? PanelRightClose : PanelRightOpen}
          variant="ghost"
          size="sm"
          label={rightPanelOpen ? "Close details panel" : "Open details panel"}
          onClick={toggleRightPanel}
          className="hidden lg:flex"
        />
      </div>
    </div>
  );
}
