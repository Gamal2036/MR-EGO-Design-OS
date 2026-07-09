"use client";

import { type HTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-12 px-6 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="text-muted-foreground mb-2" aria-hidden="true">
            {icon}
          </div>
        )}
        <h4 className="text-heading-4 text-primary">{title}</h4>
        {description && (
          <p className="text-body text-secondary max-w-md">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };
