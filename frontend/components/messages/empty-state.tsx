"use client";

import { MessageSquare } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface MessagesEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const MessagesEmptyState = forwardRef<HTMLDivElement, MessagesEmptyStateProps>(
  ({ className, title = "No messages yet", description = "Start a conversation to begin messaging.", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-3 py-16 px-6 text-center", className)}
        {...props}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800" aria-hidden="true">
          <MessageSquare className="h-6 w-6 text-tertiary" />
        </div>
        <h4 className="text-heading-4 text-primary">{title}</h4>
        <p className="text-body text-secondary max-w-sm">{description}</p>
      </div>
    );
  },
);
MessagesEmptyState.displayName = "MessagesEmptyState";

export { MessagesEmptyState };
export type { MessagesEmptyStateProps };
