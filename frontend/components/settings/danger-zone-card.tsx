"use client";

import { LogOut, RefreshCw, Trash2 } from "lucide-react";

import { SettingsCard } from "./settings-card";

import { Button } from "@/components/foundation/button";

export function DangerZoneCard() {
  return (
    <SettingsCard
      title="Danger Zone"
      description="Irreversible and destructive actions"
      variant="danger"
    >
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-danger/20 bg-danger/[0.02] p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-danger" aria-hidden="true" />
              <p className="text-body font-medium text-foreground">Reset Local Data</p>
            </div>
            <p className="text-caption text-tertiary pl-6">
              Remove all locally stored settings and preferences. This cannot be undone.
            </p>
          </div>
          <Button variant="danger" size="sm">
            Reset
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-danger/20 bg-danger/[0.02] p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-danger" aria-hidden="true" />
              <p className="text-body font-medium text-foreground">Clear Cache</p>
            </div>
            <p className="text-caption text-tertiary pl-6">
              Clear all cached data and temporary files to free up space.
            </p>
          </div>
          <Button variant="danger" size="sm">
            Clear
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-danger/20 bg-danger/[0.02] p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-danger" aria-hidden="true" />
              <p className="text-body font-medium text-foreground">Logout</p>
            </div>
            <p className="text-caption text-tertiary pl-6">
              Sign out of your account on all devices.
            </p>
          </div>
          <Button variant="danger" size="sm" disabled>
            Logout
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
}
