"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SettingsSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function SettingsSection({
  title,
  description,
  action,
  className,
  children,
  ...props
}: SettingsSectionProps) {
  return (
    <section
      className={cn("space-y-4", className)}
      aria-label={title}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h2 className="text-heading-3 text-primary">{title}</h2>
            )}
            {description && (
              <p className="text-body text-tertiary max-w-2xl">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
