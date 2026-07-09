"use client";

import { SettingsCard } from "./settings-card";
import { ToggleSetting } from "./toggle-setting";

import type { NotificationSettings } from "@/types/settings";

interface NotificationCardProps {
  settings: NotificationSettings;
  onUpdate: (settings: Partial<NotificationSettings>) => void;
}

export function NotificationCard({ settings, onUpdate }: NotificationCardProps) {
  return (
    <SettingsCard
      title="Notifications"
      description="Control how and when you receive notifications"
    >
      <div className="divide-y divide-border">
        <ToggleSetting
          label="Email Notifications"
          description="Receive notifications via email"
          checked={settings.email}
          onCheckedChange={(checked) => onUpdate({ email: checked })}
        />
        <ToggleSetting
          label="Push Notifications"
          description="Receive push notifications on your devices"
          checked={settings.push}
          onCheckedChange={(checked) => onUpdate({ push: checked })}
        />
        <ToggleSetting
          label="In-App Notifications"
          description="Show notifications within the application"
          checked={settings.inApp}
          onCheckedChange={(checked) => onUpdate({ inApp: checked })}
        />
        <ToggleSetting
          label="Job Alerts"
          description="Get notified about new job opportunities matching your profile"
          checked={settings.jobAlerts}
          onCheckedChange={(checked) => onUpdate({ jobAlerts: checked })}
        />
        <ToggleSetting
          label="AI Recommendations"
          description="Receive personalized AI-powered career recommendations"
          checked={settings.aiRecommendations}
          onCheckedChange={(checked) => onUpdate({ aiRecommendations: checked })}
        />
        <ToggleSetting
          label="Weekly Summary"
          description="Receive a weekly email summary of your activity and insights"
          checked={settings.weeklySummary}
          onCheckedChange={(checked) => onUpdate({ weeklySummary: checked })}
        />
      </div>
    </SettingsCard>
  );
}
