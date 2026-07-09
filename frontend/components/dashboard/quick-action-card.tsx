"use client";

import {
  Upload,
  Search,
  FileText,
  Brain,
  Briefcase,
  FolderOpen,
  Route,
  BarChart3,
  CheckSquare,
  Calendar,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent } from "@/components/foundation/card";
import type { QuickAction } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Upload,
  Search,
  FileText,
  Brain,
  Briefcase,
  FolderOpen,
  Route,
  BarChart3,
  CheckSquare,
  Calendar,
  Activity,
};

interface QuickActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: QuickAction;
  onAction?: () => void;
}

const QuickActionCard = forwardRef<HTMLDivElement, QuickActionCardProps>(
  ({ className, action, onAction, ...props }, ref) => {
    const Icon = iconMap[action.icon] || Briefcase;

    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="sm"
        className={cn("group", className)}
        role="button"
        tabIndex={0}
        aria-label={action.label}
        onClick={onAction}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onAction?.();
          }
        }}
        {...props}
      >
        <CardContent className="flex items-center gap-3">
          <div className="rounded-lg bg-surface-1 p-2.5 text-primary transition-colors group-hover:bg-primary/10 group-hover:text-primary" aria-hidden="true">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-label font-medium text-primary group-hover:text-primary">
              {action.label}
            </p>
            <p className="text-smallest text-tertiary truncate-single">
              {action.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);
QuickActionCard.displayName = "QuickActionCard";

export { QuickActionCard };
export type { QuickActionCardProps };
