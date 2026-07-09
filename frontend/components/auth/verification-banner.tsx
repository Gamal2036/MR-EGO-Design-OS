"use client";

import { AlertTriangle, Info, X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface VerificationBannerProps {
  variant?: "info" | "warning";
  message: string;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function VerificationBanner({
  variant = "info",
  message,
  action,
  dismissible = false,
  onDismiss,
  className,
}: VerificationBannerProps) {
  const Icon = variant === "warning" ? AlertTriangle : Info;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 text-body-small",
        variant === "info" &&
          "bg-notification-info-bg border-notification-info-border text-notification-info-text",
        variant === "warning" &&
          "bg-notification-warning-bg border-notification-warning-border text-notification-warning-text",
        className
      )}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p>{message}</p>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
