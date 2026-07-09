"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SettingsCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
  variant?: "default" | "danger" | "glass";
}

export function SettingsCard({
  title,
  description,
  action,
  variant = "default",
  className,
  children,
  ...props
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-soft transition-shadow duration-normal",
        variant === "default" && "border-border",
        variant === "danger" && "border-danger/30 bg-danger/[0.03]",
        variant === "glass" && "glass border-glass-border",
        className,
      )}
      {...props}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div className="flex-1 min-w-0 space-y-1">
            {title && (
              <h3 className="text-heading-4 text-primary">{title}</h3>
            )}
            {description && (
              <p className="text-body-small text-tertiary">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
