"use client";

import { Loader2 } from "lucide-react";

export function SettingsLoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <div className="rounded-full bg-cyan-500/10 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" aria-hidden="true" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-heading-4 text-primary">Loading settings</p>
        <p className="text-body text-secondary">Preparing your preferences...</p>
      </div>
      <span className="sr-only">Loading settings...</span>
    </div>
  );
}
