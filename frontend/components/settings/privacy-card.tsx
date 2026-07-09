"use client";

import { Download } from "lucide-react";

import { SettingsCard } from "./settings-card";
import { ToggleSetting } from "./toggle-setting";

import { Button } from "@/components/foundation/button";
import type { PrivacySettings } from "@/types/settings";

interface PrivacyCardProps {
  settings: PrivacySettings;
  onUpdate: (settings: Partial<PrivacySettings>) => void;
}

export function PrivacyCard({ settings, onUpdate }: PrivacyCardProps) {
  return (
    <SettingsCard
      title="Privacy"
      description="Manage your privacy and visibility settings"
    >
      <div className="divide-y divide-border">
        <ToggleSetting
          label="Public Profile"
          description="Allow recruiters and employers to discover your profile"
          checked={settings.publicProfile}
          onCheckedChange={(checked) => onUpdate({ publicProfile: checked })}
        />
        <ToggleSetting
          label="Recruiter Visibility"
          description="Make your profile visible to recruiters for job opportunities"
          checked={settings.recruiterVisibility}
          onCheckedChange={(checked) => onUpdate({ recruiterVisibility: checked })}
        />
        <ToggleSetting
          label="Analytics Sharing"
          description="Help improve MR:EGO by sharing anonymous usage data"
          checked={settings.analyticsSharing}
          onCheckedChange={(checked) => onUpdate({ analyticsSharing: checked })}
        />
        <ToggleSetting
          label="Activity Visibility"
          description="Show your recent activity to your network"
          checked={settings.activityVisibility}
          onCheckedChange={(checked) => onUpdate({ activityVisibility: checked })}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-body font-medium text-foreground">Data Export</p>
            <p className="text-caption text-tertiary">Download all your data in a portable format</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            disabled
          >
            Export Data
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
}
