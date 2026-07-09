"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface TypingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
}

const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, name = "Someone", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 px-4 py-2", className)}
        role="status"
        aria-live="polite"
        aria-label={`${name} is typing`}
        {...props}
      >
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: "300ms" }} />
        </div>
        <span className="text-caption text-tertiary">
          {name} is typing
        </span>
      </div>
    );
  },
);
TypingIndicator.displayName = "TypingIndicator";

export { TypingIndicator };
export type { TypingIndicatorProps };
