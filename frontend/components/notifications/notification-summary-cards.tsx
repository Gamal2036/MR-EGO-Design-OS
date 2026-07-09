"use client";

import {
  AlertTriangle,
  Bell,
  Calendar,
  Clock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { NotificationSummary } from "@/types/notifications";

interface SummaryCard {
  icon: LucideIcon;
  label: string;
  value: number;
  variant: "danger" | "warning" | "info" | "neutral" | "ai";
  description?: string;
}

interface NotificationSummaryCardsProps extends HTMLAttributes<HTMLDivElement> {
  summary: NotificationSummary;
}

const variantStyles: Record<string, string> = {
  danger: "bg-danger/5 border-danger/20 text-danger",
  warning: "bg-warning/5 border-warning/20 text-warning",
  info: "bg-info/5 border-info/20 text-info",
  neutral: "bg-surface-1 border-border text-secondary",
  ai: "bg-ai/5 border-ai/20 text-ai",
};

const NotificationSummaryCards = forwardRef<HTMLDivElement, NotificationSummaryCardsProps>(
  ({ className, summary, ...props }, ref) => {
    const cards: SummaryCard[] = [
      {
        icon: Bell,
        label: "Unread",
        value: summary.unread,
        variant: "danger",
        description: summary.unread > 0 ? "Requires attention" : "All clear",
      },
      {
        icon: AlertTriangle,
        label: "Urgent",
        value: summary.urgent,
        variant: "warning",
      },
      {
        icon: Calendar,
        label: "Today",
        value: summary.today,
        variant: "info",
      },
      {
        icon: Clock,
        label: "This Week",
        value: summary.thisWeek,
        variant: "neutral",
      },
      {
        icon: Sparkles,
        label: "AI Suggestions",
        value: summary.aiSuggestions,
        variant: "ai",
        description: "AI-powered recommendations",
      },
    ];

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", className)}
        role="group"
        aria-label="Notification summary"
        {...props}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={cn(
                "flex flex-col gap-1.5 rounded-xl border p-3 transition-shadow duration-fast",
                variantStyles[card.variant],
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-caption font-medium">{card.label}</span>
              </div>
              <span className="text-heading-3 font-bold">{card.value}</span>
              {card.description && (
                <span className="text-smallest text-tertiary">{card.description}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);
NotificationSummaryCards.displayName = "NotificationSummaryCards";

export { NotificationSummaryCards };
export type { NotificationSummaryCardsProps };
