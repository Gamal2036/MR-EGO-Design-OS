"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({
  visible,
  message = "Please wait...",
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-overlay flex flex-col items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm",
        className
      )}
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      {message && (
        <p className="mt-3 text-body-small text-secondary">{message}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
