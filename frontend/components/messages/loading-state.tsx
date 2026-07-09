"use client";

import { Loader2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface MessagesLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const MessagesLoadingState = forwardRef<HTMLDivElement, MessagesLoadingStateProps>(
  ({ className, message = "Loading messages...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-3 py-16", className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <p className="text-body text-secondary">{message}</p>
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);
MessagesLoadingState.displayName = "MessagesLoadingState";

export { MessagesLoadingState };
export type { MessagesLoadingStateProps };
