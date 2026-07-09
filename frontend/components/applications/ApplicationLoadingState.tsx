"use client";

import { Loader2 } from "lucide-react";
import type { HTMLAttributes } from "react";

interface ApplicationLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export function ApplicationLoadingState({
  message = "Loading applications...",
  className,
  ...props
}: ApplicationLoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-16 ${className || ""}`}
      role="status"
      aria-live="polite"
      {...props}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-body text-secondary">{message}</p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
