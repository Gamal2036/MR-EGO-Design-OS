"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import type { ProviderStatus as ProviderStatusType } from "@/types/ai-providers";

const statusDotVariants = cva("inline-block h-2 w-2 rounded-full shrink-0", {
  variants: {
    status: {
      connected: "bg-success",
      disconnected: "bg-neutral-400",
      disabled: "bg-neutral-300",
      testing: "bg-warning",
      offline: "bg-danger",
      "missing-api-key": "bg-warning",
      maintenance: "bg-info",
      error: "bg-danger",
    },
  },
  defaultVariants: {
    status: "disconnected",
  },
});

const statusLabelVariants = cva("", {
  variants: {
    status: {
      connected: "text-success",
      disconnected: "text-tertiary",
      disabled: "text-tertiary",
      testing: "text-warning",
      offline: "text-danger",
      "missing-api-key": "text-warning",
      maintenance: "text-info",
      error: "text-danger",
    },
  },
  defaultVariants: {
    status: "disconnected",
  },
});

interface StatusDotProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {
  status: ProviderStatusType;
}

const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusDotVariants({ status, className }))}
        aria-hidden="true"
        {...props}
      />
    );
  },
);
StatusDot.displayName = "StatusDot";

interface ProviderStatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: ProviderStatusType;
  showLabel?: boolean;
}

const statusLabels: Record<ProviderStatusType, string> = {
  connected: "Connected",
  disconnected: "Disconnected",
  disabled: "Disabled",
  testing: "Testing",
  offline: "Offline",
  "missing-api-key": "Missing API Key",
  maintenance: "Maintenance",
  error: "Error",
};

const ProviderStatusBadge = forwardRef<HTMLSpanElement, ProviderStatusBadgeProps>(
  ({ className, status, showLabel = true, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-smallest font-medium transition-colors duration-fast",
          status === "connected" && "bg-success/10 border border-success/20",
          status === "disconnected" && "bg-transparent border border-neutral-200 dark:border-neutral-700",
          status === "disabled" && "bg-transparent border border-neutral-200 dark:border-neutral-700 opacity-50",
          status === "testing" && "bg-warning/10 border border-warning/20",
          status === "offline" && "bg-danger/10 border border-danger/20",
          status === "missing-api-key" && "bg-warning/10 border border-warning/20",
          status === "maintenance" && "bg-info/10 border border-info/20",
          status === "error" && "bg-danger/10 border border-danger/20",
          className,
        )}
        role="status"
        {...props}
      >
        <span className={cn(statusDotVariants({ status }))} aria-hidden="true" />
        {showLabel && (
          <span className={cn(statusLabelVariants({ status }))}>
            {statusLabels[status]}
          </span>
        )}
      </span>
    );
  },
);
ProviderStatusBadge.displayName = "ProviderStatusBadge";

export { StatusDot, ProviderStatusBadge, statusLabels };
export type { StatusDotProps, ProviderStatusBadgeProps };
