"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { QuickActionCard } from "./quick-action-card";

import type { QuickAction } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface QuickActionGridProps extends HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
  onAction?: (action: QuickAction) => void;
}

const QuickActionGrid = forwardRef<HTMLDivElement, QuickActionGridProps>(
  ({ className, actions, onAction, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("", className)} aria-label="Quick Actions" {...props}>
        <h2 className="text-heading-4 text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {actions.map((action) => (
            <QuickActionCard
              key={action.id}
              action={action}
              onAction={() => onAction?.(action)}
            />
          ))}
        </div>
      </section>
    );
  }
);
QuickActionGrid.displayName = "QuickActionGrid";

export { QuickActionGrid };
export type { QuickActionGridProps };
