"use client";

import {
  Database,
  FileText,
  HardDrive,
  Info,
  PanelRightClose,
} from "lucide-react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

const viewConfig = {
  context: { icon: Info, label: "Context" },
  files: { icon: FileText, label: "Files" },
  memory: { icon: Database, label: "Memory" },
  info: { icon: HardDrive, label: "Info" },
} as const;

export function RightPanel() {
  const {
    rightPanelView,
    rightPanelState,
    setRightPanelView,
    toggleRightPanel,
  } = useAIWorkspaceStore();

  if (rightPanelState === "closed") return null;

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-l border-border bg-surface-0",
        "animate-slide-in-from-right",
      )}
      role="complementary"
      aria-label="Context panel"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <h2 className="text-label font-semibold text-primary">
          {viewConfig[rightPanelView].label}
        </h2>
        <IconButton
          icon={PanelRightClose}
          variant="ghost"
          size="xs"
          label="Close panel"
          onClick={toggleRightPanel}
        />
      </div>

      <div className="flex border-b border-border" role="tablist" aria-label="Panel tabs">
        {(Object.entries(viewConfig) as Array<[keyof typeof viewConfig, typeof viewConfig[keyof typeof viewConfig]]>).map(
          ([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={rightPanelView === key}
                onClick={() => setRightPanelView(key)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 py-2 text-caption transition-colors",
                  rightPanelView === key
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-tertiary hover:text-secondary",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden md:inline">{config.label}</span>
              </button>
            );
          },
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {rightPanelView === "context" && <ContextView />}
        {rightPanelView === "files" && <FilesView />}
        {rightPanelView === "memory" && <MemoryView />}
        {rightPanelView === "info" && <InfoView />}
      </div>
    </aside>
  );
}

function ContextView() {
  return (
    <div className="space-y-4">
      <Section label="Active Context">
        <p className="text-caption text-tertiary">
          No active context. Start a conversation to see context details.
        </p>
      </Section>
      <Section label="Provider">
        <div className="flex items-center gap-2">
          <span className="text-caption text-tertiary">Claude Sonnet</span>
        </div>
      </Section>
    </div>
  );
}

function FilesView() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
      <FileText className="h-8 w-8 text-tertiary" aria-hidden="true" />
      <p className="text-caption text-tertiary">No files attached</p>
      <p className="text-smallest text-tertiary">
        Drag and drop files to attach them to the conversation
      </p>
    </div>
  );
}

function MemoryView() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
      <Database className="h-8 w-8 text-tertiary" aria-hidden="true" />
      <p className="text-caption text-tertiary">Memory placeholder</p>
      <p className="text-smallest text-tertiary">
        AI memory features coming soon
      </p>
    </div>
  );
}

function InfoView() {
  return (
    <div className="space-y-3">
      <Section label="Workspace">
        <p className="text-caption text-secondary">MR:EGO AI Workspace</p>
      </Section>
      <Section label="Version">
        <p className="text-caption text-tertiary">DP-20A Foundation</p>
      </Section>
      <Section label="Model">
        <p className="text-caption text-tertiary">Not selected</p>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-smallest font-medium uppercase tracking-wider text-tertiary">
        {label}
      </h3>
      <div className="rounded-lg border border-border bg-surface-1 p-2.5">
        {children}
      </div>
    </div>
  );
}
