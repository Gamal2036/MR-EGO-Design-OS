"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { type HTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 transition-all duration-normal",
  {
    variants: {
      variant: {
        info: "bg-notification-info-bg border-notification-info-border text-notification-info-text",
        success:
          "bg-notification-success-bg border-notification-success-border text-notification-success-text",
        warning:
          "bg-notification-warning-bg border-notification-warning-border text-notification-warning-text",
        error:
          "bg-notification-error-bg border-notification-error-border text-notification-error-text",
        neutral:
          "bg-notification-neutral-bg border-notification-neutral-border text-notification-neutral-text",
        ai: "bg-notification-ai-bg border-notification-ai-border text-notification-ai-text",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  neutral: Info,
  ai: Info,
};

interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  title?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      icon,
      dismissible = false,
      onDismiss,
      title,
      children,
      ...props
    },
    ref
  ) => {
    const DefaultIcon = variant ? iconMap[variant] : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            {icon || (DefaultIcon && <DefaultIcon className="h-5 w-5" aria-hidden="true" />)}
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="text-label font-semibold mb-1">{title}</h5>
            )}
            <div className="text-body">{children}</div>
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
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
export type { AlertProps };
