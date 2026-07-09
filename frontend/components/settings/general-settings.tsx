"use client";

import { SelectSetting } from "./select-setting";
import { SettingsCard } from "./settings-card";

import type { GeneralSettings } from "@/types/settings";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
];

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "US/Eastern", label: "Eastern Time (ET)" },
  { value: "US/Central", label: "Central Time (CT)" },
  { value: "US/Mountain", label: "Mountain Time (MT)" },
  { value: "US/Pacific", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
];

const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "DD.MM.YYYY", label: "DD.MM.YYYY" },
];

const sidebarBehaviors = [
  { value: "expanded", label: "Always Expanded" },
  { value: "collapsed", label: "Always Collapsed" },
  { value: "auto", label: "Auto (Collapse on small screens)" },
];

interface GeneralSettingsCardProps {
  settings: GeneralSettings;
  onUpdate: (settings: Partial<GeneralSettings>) => void;
}

export function GeneralSettingsCard({ settings, onUpdate }: GeneralSettingsCardProps) {
  return (
    <SettingsCard
      title="General"
      description="Configure your general preferences"
    >
      <div className="divide-y divide-border">
        <SelectSetting
          label="Language"
          description="Select your preferred language"
          value={settings.language}
          onValueChange={(value) => onUpdate({ language: value })}
          options={languages}
        />

        <SelectSetting
          label="Timezone"
          description="Set your local timezone"
          value={settings.timezone}
          onValueChange={(value) => onUpdate({ timezone: value })}
          options={timezones}
        />

        <SelectSetting
          label="Date Format"
          description="Choose how dates are displayed"
          value={settings.dateFormat}
          onValueChange={(value) => onUpdate({ dateFormat: value })}
          options={dateFormats}
        />

        <SelectSetting
          label="Sidebar Behavior"
          description="Control how the sidebar behaves by default"
          value={settings.sidebarBehavior}
          onValueChange={(value) => onUpdate({ sidebarBehavior: value as "expanded" | "collapsed" | "auto" })}
          options={sidebarBehaviors}
        />
      </div>
    </SettingsCard>
  );
}
