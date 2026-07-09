"use client";

import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

export function StatusBar() {
  const { showStatusBar, showToolbar, setShowToolbar, setShowStatusBar } = useAIWorkspaceStore();

  if (!showStatusBar) return null;

  return (
    <div
      className={cn(
        "flex h-8 items-center justify-between border-t border-border bg-surface-0 px-4",
        "text-smallest text-tertiary",
      )}
      role="status"
      aria-label="Workspace status"
    >
      <div className="flex items-center gap-3">
        <span>AI Workspace</span>
        <span className="text-disabled">&middot;</span>
        <span>Ready</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowToolbar(!showToolbar)}
          className="transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
          aria-label={showToolbar ? "Hide toolbar" : "Show toolbar"}
        >
          {showToolbar ? "Toolbar" : "Toolbar hidden"}
        </button>
        <button
          type="button"
          onClick={() => setShowStatusBar(false)}
          className="transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
          aria-label="Hide status bar"
        >
          Hide
        </button>
      </div>
    </div>
  );
}
