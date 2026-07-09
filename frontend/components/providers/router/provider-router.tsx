"use client";

import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Lightbulb,
  Route,
  Shuffle,
} from "lucide-react";
import { forwardRef, useCallback, type HTMLAttributes } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderId, ProviderRouterConfig, RoutingMode } from "@/types/ai-providers";

interface ProviderRouterPanelProps extends HTMLAttributes<HTMLDivElement> {
  providers: ProviderConfig[];
  router: ProviderRouterConfig;
  onSetDefaultProvider?: (id: ProviderId | null) => void;
  onSetFallbackProvider?: (id: ProviderId | null) => void;
  onSetPriorityList?: (list: ProviderId[]) => void;
  onSetRoutingMode?: (mode: RoutingMode) => void;
}

const routingModeLabels: Record<RoutingMode, string> = {
  automatic: "Automatic Selection",
  manual: "Manual Selection",
  smart: "Smart Routing",
};

const routingModeDescriptions: Record<RoutingMode, string> = {
  automatic: "Automatically selects the best provider based on availability and performance",
  manual: "Always use the default provider unless it fails",
  smart: "Route requests based on task type and provider capabilities",
};

const connectedProviders = (providers: ProviderConfig[]) =>
  providers.filter((p) => p.status === "connected" || p.status === "testing");

const ProviderRouterPanel = forwardRef<HTMLDivElement, ProviderRouterPanelProps>(
  (
    {
      className,
      providers,
      router,
      onSetDefaultProvider,
      onSetFallbackProvider,
      onSetPriorityList,
      onSetRoutingMode,
      ...props
    },
    ref,
  ) => {
    const available = connectedProviders(providers);

    const moveItem = useCallback(
      (index: number, direction: "up" | "down") => {
        const list = [...router.priorityList];
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= list.length) return;
        const a = list[index];
        const b = list[newIndex];
        if (!a || !b) return;
        list[index] = b;
        list[newIndex] = a;
        onSetPriorityList?.(list);
      },
      [router.priorityList, onSetPriorityList],
    );

    const removeFromPriority = useCallback(
      (id: ProviderId) => {
        onSetPriorityList?.(router.priorityList.filter((pid) => pid !== id));
      },
      [router.priorityList, onSetPriorityList],
    );

    return (
      <div
        ref={ref}
        className={cn("space-y-6", className)}
        role="region"
        aria-label="Provider router configuration"
        {...props}
      >
        <div className="flex items-center gap-2">
          <Route className="h-5 w-5 text-primary" aria-hidden="true" />
          <h4 className="text-heading-4 text-primary">Provider Router</h4>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-label text-primary font-medium block" htmlFor="routing-mode">
              Routing Mode
            </label>
            <Select
              value={router.routingMode}
              onValueChange={(value) => onSetRoutingMode?.(value as RoutingMode)}
            >
              <SelectTrigger id="routing-mode" aria-label="Routing mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["automatic", "manual", "smart"] as RoutingMode[]).map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {routingModeLabels[mode]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-caption text-tertiary mt-1">
              {routingModeDescriptions[router.routingMode]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="default-provider">
                Default Provider
              </label>
              <Select
                value={router.defaultProvider ?? ""}
                onValueChange={(value) => onSetDefaultProvider?.(value === "" ? null : value as ProviderId)}
              >
                <SelectTrigger id="default-provider" aria-label="Default provider">
                  <SelectValue placeholder="None selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {providers.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className="flex items-center gap-2">
                        {p.name}
                        {p.status === "connected" && (
                          <Badge variant="success" size="xs">Connected</Badge>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="fallback-provider">
                Fallback Provider
              </label>
              <Select
                value={router.fallbackProvider ?? ""}
                onValueChange={(value) => onSetFallbackProvider?.(value === "" ? null : value as ProviderId)}
              >
                <SelectTrigger id="fallback-provider" aria-label="Fallback provider">
                  <SelectValue placeholder="None selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {providers
                    .filter((p) => p.id !== router.defaultProvider)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        <span className="flex items-center gap-2">{p.name}</span>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-label text-primary font-medium">
                Priority List
              </label>
              {router.routingMode === "smart" && (
                <Badge variant="info" size="xs" className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" aria-hidden="true" />
                  Smart
                </Badge>
              )}
            </div>

            {available.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center rounded-lg border border-dashed border-border">
                <Shuffle className="h-6 w-6 text-tertiary mb-2" aria-hidden="true" />
                <p className="text-body text-tertiary">
                  No connected providers available
                </p>
                <p className="text-caption text-tertiary mt-1">
                  Connect a provider to configure routing
                </p>
              </div>
            ) : (
              <div className="space-y-1" role="list" aria-label="Provider priority order">
                {router.priorityList.length > 0
                  ? router.priorityList.map((pid, index) => {
                      const provider = providers.find((p) => p.id === pid);
                      if (!provider) return null;
                      return (
                        <PriorityItem
                          key={pid}
                          provider={provider}
                          index={index}
                          total={router.priorityList.length}
                          onMoveUp={() => moveItem(index, "up")}
                          onMoveDown={() => moveItem(index, "down")}
                          onRemove={() => removeFromPriority(pid)}
                        />
                      );
                    })
                  : available.map((p, index) => (
                      <PriorityItem
                        key={p.id}
                        provider={p}
                        index={index}
                        total={available.length}
                        onMoveUp={() => moveItem(index, "up")}
                        onMoveDown={() => moveItem(index, "down")}
                        onRemove={() => removeFromPriority(p.id)}
                      />
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
ProviderRouterPanel.displayName = "ProviderRouterPanel";

interface PriorityItemProps {
  provider: ProviderConfig;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

const PriorityItem = forwardRef<HTMLDivElement, PriorityItemProps>(
  ({ provider, index, total, onMoveUp, onMoveDown, onRemove }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
        role="listitem"
      >
        <span className="text-smallest text-tertiary font-mono w-5 shrink-0">
          #{index + 1}
        </span>
        <GripVertical className="h-4 w-4 text-tertiary shrink-0" aria-hidden="true" />

        <div className="flex-1 min-w-0">
          <span className="text-body text-primary font-medium truncate block">
            {provider.name}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="rounded p-1 text-tertiary hover:text-primary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Move up"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="rounded p-1 text-tertiary hover:text-primary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Move down"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded p-1 text-tertiary hover:text-danger hover:bg-danger/10 transition-colors ml-1"
            aria-label={`Remove ${provider.name} from priority`}
          >
            <span className="h-3.5 w-3.5 flex items-center justify-center text-smallest font-bold">
              ×
            </span>
          </button>
        </div>
      </div>
    );
  },
);
PriorityItem.displayName = "PriorityItem";

export { ProviderRouterPanel };
export type { ProviderRouterPanelProps };
