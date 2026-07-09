"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatusMessageProps {
  variant?: "success" | "error" | "info" | "warning";
  title?: string;
  message?: string;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
};

const variantStyles = {
  success:
    "bg-notification-success-bg border-notification-success-border text-notification-success-text",
  error: "bg-notification-error-bg border-notification-error-border text-notification-error-text",
  info: "bg-notification-info-bg border-notification-info-border text-notification-info-text",
  warning:
    "bg-notification-warning-bg border-notification-warning-border text-notification-warning-text",
};

export function StatusMessage({
  variant = "info",
  title,
  message,
  children,
  dismissible = false,
  onDismiss,
  className,
}: StatusMessageProps) {
  const Icon = iconMap[variant];

  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4",
        variantStyles[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="text-label font-semibold mb-1">{title}</h5>
          )}
          {message && <p className="text-body">{message}</p>}
          {children && <div className="text-body mt-1">{children}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
