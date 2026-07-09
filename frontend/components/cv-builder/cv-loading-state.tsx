"use client";

import { Loader2 } from "lucide-react";

export function CVLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16" role="status" aria-live="polite">
      <Loader2 className="h-8 w-8 animate-spin text-cv" aria-hidden="true" />
      <p className="text-body text-secondary mt-4">Loading CV Builder...</p>
    </div>
  );
}
