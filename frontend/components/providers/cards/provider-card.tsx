"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Activity,
  Cable,
  Clock,
  Coins,
  Cpu,
  FlaskConical,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { ProviderStatusBadge } from "@/components/providers/status/provider-status";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderId, ProviderStatus } from "@/types/ai-providers";

const providerIconMap: Record<ProviderId, string> = {
  "openai": "◇",
  "openrouter": "◈",
  "anthropic": "◆",
  "google-gemini": "◉",
  "groq": "▣",
  "ollama": "◌",
  "azure-openai": "◐",
  "custom": "⚙",
};

const providerCardVariants = cva(
  "relative rounded-xl border bg-card text-card-foreground shadow-soft transition-all duration-normal p-5",
  {
    variants: {
      status: {
        connected: "border-success/20",
        disconnected: "border-border",
        disabled: "border-border opacity-60",
        testing: "border-warning/20",
        offline: "border-danger/20",
        "missing-api-key": "border-warning/20",
        maintenance: "border-info/20",
        error: "border-danger/20",
      },
      expanded: {
        true: "shadow-medium",
        false: "",
      },
    },
    defaultVariants: {
      status: "disconnected",
      expanded: false,
    },
  },
);

interface ProviderCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof providerCardVariants> {
  provider: ProviderConfig;
  onEdit?: (id: ProviderId) => void;
  onDelete?: (id: ProviderId) => void;
  onSettings?: (id: ProviderId) => void;
  onTest?: (id: ProviderId) => void;
}

const ProviderCard = forwardRef<HTMLDivElement, ProviderCardProps>(
  (
    {
      className,
      provider,
      onEdit,
      onDelete,
      onSettings,
      onTest,
      ...props
    },
    ref,
  ) => {
    const status = provider.status;
    const isExpanded = props.expanded as boolean | undefined;

    return (
      <div
        ref={ref}
        className={cn(
          providerCardVariants({ status: status as ProviderStatus, expanded: isExpanded, className }),
        )}
        role="region"
        aria-label={`${provider.name} provider`}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-heading-4"
              aria-hidden="true"
            >
              {providerIconMap[provider.id] ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-body font-semibold text-primary truncate">
                  {provider.name}
                </h3>
                <ProviderStatusBadge status={status as ProviderStatus} />
              </div>
              <p className="text-caption text-secondary mt-0.5 line-clamp-1">
                {provider.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-smallest text-tertiary">
                {provider.currentModel && (
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3 w-3" aria-hidden="true" />
                    {provider.models.find((m) => m.id === provider.currentModel)?.name ?? provider.currentModel}
                  </span>
                )}
                {provider.latency !== null && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {provider.latency}ms
                  </span>
                )}
                {provider.tokenUsage > 0 && (
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" aria-hidden="true" />
                    {provider.tokenUsage.toLocaleString()} tokens
                  </span>
                )}
                {provider.health.status !== "unknown" && (
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      provider.health.status === "healthy" && "text-success",
                      provider.health.status === "degraded" && "text-warning",
                      provider.health.status === "unhealthy" && "text-danger",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full",
                        provider.health.status === "healthy" && "bg-success",
                        provider.health.status === "degraded" && "bg-warning",
                        provider.health.status === "unhealthy" && "bg-danger",
                      )}
                      aria-hidden="true"
                    />
                    Health: {provider.health.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onTest && (status as string) !== "disabled" && (
              <IconButton
                icon={FlaskConical}
                variant="ghost"
                size="xs"
                label={`Test ${provider.name} connection`}
                onClick={() => onTest(provider.id)}
              />
            )}
            {onSettings && (status as string) !== "disabled" && (
              <IconButton
                icon={Settings}
                variant="ghost"
                size="xs"
                label={`${provider.name} settings`}
                onClick={() => onSettings(provider.id)}
              />
            )}
            {onEdit && (
              <IconButton
                icon={Pencil}
                variant="ghost"
                size="xs"
                label={`Edit ${provider.name}`}
                onClick={() => onEdit(provider.id)}
              />
            )}
            {onDelete && provider.id !== "custom" && (
              <IconButton
                icon={Trash2}
                variant="ghost"
                size="xs"
                label={`Remove ${provider.name}`}
                onClick={() => onDelete(provider.id)}
              />
            )}
          </div>
        </div>

        {status === "missing-api-key" && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-warning/5 border border-warning/20 px-3 py-2">
            <Cable className="h-4 w-4 text-warning shrink-0" aria-hidden="true" />
            <p className="text-smallest text-warning">
              API key not configured. Connect your provider in settings.
            </p>
          </div>
        )}

        {status === "error" && provider.health.error && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-danger/5 border border-danger/20 px-3 py-2">
            <span className="h-4 w-4 text-danger shrink-0" aria-hidden="true">
              !
            </span>
            <p className="text-smallest text-danger">{provider.health.error}</p>
          </div>
        )}

        {provider.models.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <Coins className="h-3 w-3 text-tertiary" aria-hidden="true" />
            <span className="text-smallest text-tertiary mr-1">Models:</span>
            {provider.models.slice(0, 4).map((m) => (
              <span
                key={m.id}
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-smallest border",
                  provider.currentModel === m.id
                    ? "border-primary/30 bg-primary/10 text-primary font-medium"
                    : "border-border text-tertiary",
                )}
              >
                {m.name}
                {m.recommended && (
                  <span className="ml-1 text-warning" aria-label="recommended">★</span>
                )}
              </span>
            ))}
            {provider.models.length > 4 && (
              <span className="text-smallest text-tertiary">
                +{provider.models.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
ProviderCard.displayName = "ProviderCard";

export { ProviderCard, providerCardVariants };
export type { ProviderCardProps };
