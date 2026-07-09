"use client";

import {
  Activity,
  Cpu,
  Database,
  DollarSign,
  Gauge,
  Globe,
  Plug,
  X,
} from "lucide-react";

import { AssistantCapabilities } from "./assistant-capabilities";
import { statusColors } from "./assistant-card";
import { AssistantStats } from "./assistant-stats";
import { AssistantTools } from "./assistant-tools";

import { Badge } from "@/components/foundation/badge";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import { useAssistantStore } from "@/stores/assistant-store";

export function AssistantDetails() {
  const activeAssistant = useAssistantStore((s) => s.activeAssistant());
  const rightPanelOpen = useAssistantStore((s) => s.rightPanelOpen);
  const toggleRightPanel = useAssistantStore((s) => s.toggleRightPanel);

  if (!activeAssistant || !rightPanelOpen) return null;

  return (
    <aside
      className="w-80 border-l border-border bg-surface-1 flex flex-col overflow-hidden shrink-0"
      aria-label="Assistant details panel"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-heading-4 text-primary font-semibold truncate">
          {activeAssistant.name}
        </h2>
        <button
          type="button"
          onClick={toggleRightPanel}
          className="text-tertiary hover:text-primary transition-colors"
          aria-label="Close details panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ai/10 text-ai text-body font-semibold">
              {activeAssistant.initials}
            </div>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface-1",
                statusColors[activeAssistant.status],
              )}
            />
          </div>
          <div>
            <p className="text-body font-semibold text-primary">{activeAssistant.name}</p>
            <p className="text-caption text-tertiary line-clamp-2">{activeAssistant.description}</p>
          </div>
        </div>

        <Panel variant="default" padding="sm">
          <PanelHeader>
            <span className="flex items-center gap-2 text-label font-medium text-primary">
              <Cpu className="h-4 w-4 text-ai" aria-hidden="true" />
              Provider & Model
            </span>
          </PanelHeader>
          <PanelBody>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-caption text-tertiary">Provider</span>
                <Badge variant="outline" size="xs">{activeAssistant.provider}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption text-tertiary">Model</span>
                <span className="text-caption text-primary font-medium">{activeAssistant.model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption text-tertiary">Status</span>
                <span className="flex items-center gap-1.5 text-caption text-primary">
                  <span
                    className={cn(
                      "inline-block h-2 w-2 rounded-full",
                      statusColors[activeAssistant.status],
                    )}
                    aria-hidden="true"
                  />
                  {activeAssistant.status.charAt(0).toUpperCase() + activeAssistant.status.slice(1)}
                </span>
              </div>
            </div>
          </PanelBody>
        </Panel>

        <AssistantCapabilities capabilities={activeAssistant.capabilities} />

        <AssistantTools tools={activeAssistant.tools} />

        <Panel variant="default" padding="sm">
          <PanelHeader>
            <span className="flex items-center gap-2 text-label font-medium text-primary">
              <Globe className="h-4 w-4 text-ai" aria-hidden="true" />
              Supported Languages
            </span>
          </PanelHeader>
          <PanelBody>
            <div className="flex flex-wrap gap-1">
              {activeAssistant.supportedLanguages.map((lang) => (
                <Badge key={lang} variant="neutral" size="xs">{lang}</Badge>
              ))}
            </div>
          </PanelBody>
        </Panel>

        <AssistantStats stats={activeAssistant.stats} />

        <Panel variant="default" padding="sm">
          <PanelHeader>
            <span className="flex items-center gap-2 text-label font-medium text-primary">
              <Plug className="h-4 w-4 text-ai" aria-hidden="true" />
              Backend Integration
            </span>
          </PanelHeader>
          <PanelBody>
            <div className="space-y-3">
              <div className="rounded-lg bg-surface-2 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="h-3.5 w-3.5 text-info" aria-hidden="true" />
                  <span className="text-caption font-medium text-primary">API Hook</span>
                </div>
                <code className="text-smallest text-tertiary block break-all">
                  {activeAssistant.backendHook}
                </code>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-surface-2 p-2 text-center">
                  <DollarSign className="h-3.5 w-3.5 text-tertiary mx-auto mb-0.5" aria-hidden="true" />
                  <p className="text-smallest font-medium text-primary">${activeAssistant.cost.toFixed(2)}</p>
                  <p className="text-smallest text-tertiary">Cost</p>
                </div>
                <div className="rounded-lg bg-surface-2 p-2 text-center">
                  <Gauge className="h-3.5 w-3.5 text-tertiary mx-auto mb-0.5" aria-hidden="true" />
                  <p className="text-smallest font-medium text-primary">{activeAssistant.latency}ms</p>
                  <p className="text-smallest text-tertiary">Latency</p>
                </div>
                <div className="rounded-lg bg-surface-2 p-2 text-center">
                  <Activity className="h-3.5 w-3.5 text-tertiary mx-auto mb-0.5" aria-hidden="true" />
                  <p className="text-smallest font-medium text-primary">
                    {((activeAssistant.tokenUsage.used / activeAssistant.tokenUsage.limit) * 100).toFixed(0)}%
                  </p>
                  <p className="text-smallest text-tertiary">Tokens</p>
                </div>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </aside>
  );
}
