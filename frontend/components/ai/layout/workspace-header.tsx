"use client";

import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

export function WorkspaceHeader() {
  const {
    sidebarState,
    rightPanelState,
    toggleSidebar,
    toggleRightPanel,
  } = useAIWorkspaceStore();

  const sidebarOpen = sidebarState === "open";
  const rightOpen = rightPanelState === "open";

  return (
    <div
      className={cn(
        "flex h-11 items-center justify-between border-b border-border bg-surface-0 px-3",
      )}
      role="banner"
      aria-label="Workspace header"
    >
      <div className="flex items-center gap-1">
        <IconButton
          icon={sidebarOpen ? PanelLeftClose : PanelLeftOpen}
          variant="ghost"
          size="xs"
          label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={toggleSidebar}
        />
        <span className="ml-1 text-label font-semibold text-primary">AI Workspace</span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          icon={rightOpen ? PanelRightClose : PanelRightOpen}
          variant="ghost"
          size="xs"
          label={rightOpen ? "Close inspector" : "Open inspector"}
          onClick={toggleRightPanel}
        />
      </div>
    </div>
  );
}
