"use client";

import { Brain } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface ThinkingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  variant?: "default" | "glow";
}

const ThinkingIndicator = forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({ className, message = "Thinking...", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg",
          variant === "default" &&
            "bg-ai/5 border border-ai/10",
          variant === "glow" &&
            "bg-ai/10 border border-ai/20 shadow-ai-card",
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        <div className="relative flex h-6 w-6 items-center justify-center">
          <Brain
            className="h-5 w-5 text-ai animate-pulse"
            aria-hidden="true"
          />
          <span className="absolute inset-0 rounded-full bg-ai/20 animate-ping" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-body text-ai font-medium">{message}</span>
          <span className="flex gap-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
        <span className="sr-only">AI is thinking</span>
      </div>
    );
  }
);
ThinkingIndicator.displayName = "ThinkingIndicator";

export { ThinkingIndicator };
export type { ThinkingIndicatorProps };
