"use client";

import { MessageCircleQuestion } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Button } from "@/components/foundation";
import { cn } from "@/lib/utils";

interface InterviewEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  type?: "interviews" | "questions" | "filtered";
  onAction?: () => void;
}

const config = {
  interviews: {
    icon: MessageCircleQuestion,
    title: "No interviews yet",
    description: "Start tracking your interviews to prepare effectively and never miss an opportunity.",
    actionLabel: "Create Interview",
  },
  questions: {
    icon: MessageCircleQuestion,
    title: "No questions saved",
    description: "Build your question library by adding common interview questions and your answer notes.",
    actionLabel: "Add Question",
  },
  filtered: {
    icon: MessageCircleQuestion,
    title: "No matching interviews",
    description: "Try adjusting your filters or search to find what you're looking for.",
    actionLabel: "Clear Filters",
  },
};

const InterviewEmptyState = forwardRef<HTMLDivElement, InterviewEmptyStateProps>(
  ({ className, type = "interviews", onAction, ...props }, ref) => {
    const { icon: Icon, title, description, actionLabel } = config[type];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-6 text-center",
          className,
        )}
        role="status"
        {...props}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-2">
          <Icon className="h-6 w-6 text-tertiary" aria-hidden="true" />
        </div>
        <h3 className="mb-1 text-heading-4 text-primary">{title}</h3>
        <p className="mb-6 max-w-xs text-body text-secondary">{description}</p>
        {onAction && (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    );
  },
);
InterviewEmptyState.displayName = "InterviewEmptyState";

export { InterviewEmptyState };
export type { InterviewEmptyStateProps };
