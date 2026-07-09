"use client";

import { Loader2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, message, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-8",
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Loader2
          className={cn("animate-spin text-primary", sizeMap[size])}
          aria-hidden="true"
        />
        {message && (
          <p className="text-body text-secondary">{message}</p>
        )}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
LoadingState.displayName = "LoadingState";

export { LoadingState };
export type { LoadingStateProps };
