"use client";

import { Brain, Loader2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Skeleton } from "@/components/feedback/skeleton";
import { cn } from "@/lib/utils";

interface AILoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const AILoadingState = forwardRef<HTMLDivElement, AILoadingStateProps>(
  ({ className, message = "Loading...", size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-12",
          className,
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Loader2
          className={cn(
            "animate-spin text-ai",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-6 w-6",
            size === "lg" && "h-8 w-8",
          )}
          aria-hidden="true"
        />
        {message && <p className="text-body text-secondary">{message}</p>}
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);
AILoadingState.displayName = "AILoadingState";

export function ConversationSkeleton() {
  return (
    <div className="space-y-4 p-4" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton variant="circular" className="h-8 w-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-6 p-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-16" />
          {Array.from({ length: 2 }).map((__, j) => (
            <div key={j} className="flex items-center gap-2">
              <Skeleton variant="circular" className="h-3 w-3" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StreamingPlaceholder() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ai/5 border border-ai/10"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <Brain className="h-5 w-5 text-ai animate-pulse" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-body text-ai font-medium">AI is responding</span>
        <span className="flex gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
      <span className="sr-only">AI is generating a response</span>
    </div>
  );
}

export function ThinkingSkeleton() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ai/5 border border-ai/10 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-6 w-6 items-center justify-center">
        <Brain className="h-5 w-5 text-ai animate-pulse" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-body text-ai font-medium">Thinking</span>
        <span className="flex gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2"
      role="status"
      aria-live="polite"
      aria-label="Someone is typing"
    >
      <div className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-ai/40 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-ai/40 animate-bounce" style={{ animationDelay: "200ms" }} />
        <span className="h-2 w-2 rounded-full bg-ai/40 animate-bounce" style={{ animationDelay: "400ms" }} />
      </div>
      <span className="text-caption text-tertiary">AI is typing...</span>
    </div>
  );
}

export { AILoadingState };
