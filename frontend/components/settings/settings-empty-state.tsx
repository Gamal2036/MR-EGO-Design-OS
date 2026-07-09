"use client";

import { Settings } from "lucide-react";

import { Button } from "@/components/foundation/button";

interface SettingsEmptyStateProps {
  onInitialize?: () => void;
}

export function SettingsEmptyState({ onInitialize }: SettingsEmptyStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="rounded-full bg-surface-2 p-4">
        <Settings className="h-8 w-8 text-tertiary" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h4 className="text-heading-4 text-primary">No settings configured</h4>
        <p className="text-body text-secondary max-w-md">
          Your settings are not yet initialized. Get started by configuring your preferences.
        </p>
      </div>
      {onInitialize && (
        <Button variant="primary" size="sm" onClick={onInitialize}>
          Initialize Settings
        </Button>
      )}
    </div>
  );
}
