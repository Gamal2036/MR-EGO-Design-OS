"use client";

import { Calendar, Github, Globe, Linkedin, Smartphone } from "lucide-react";

import { SettingsCard } from "./settings-card";

import { Switch } from "@/components/forms/switch";
import { cn } from "@/lib/utils";
import type { IntegrationSettings } from "@/types/settings";

interface IntegrationCardProps {
  settings: IntegrationSettings;
  onUpdate: (settings: Partial<IntegrationSettings>) => void;
}

const integrationDefs: {
  key: keyof IntegrationSettings;
  label: string;
  icon: typeof Linkedin;
  description: string;
  color: string;
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    description: "Sync your profile and job preferences",
    color: "text-[#0A66C2]",
  },
  {
    key: "github",
    label: "GitHub",
    icon: Github,
    description: "Showcase your repositories and contributions",
    color: "text-foreground",
  },
  {
    key: "google",
    label: "Google",
    icon: Globe,
    description: "Sign in and sync your calendar",
    color: "text-[#4285F4]",
  },
  {
    key: "calendar",
    label: "Calendar",
    icon: Calendar,
    description: "Schedule interviews and reminders",
    color: "text-[#34A853]",
  },
  {
    key: "drive",
    label: "Drive",
    icon: Smartphone,
    description: "Store and access your documents",
    color: "text-[#FBBC05]",
  },
];

export function IntegrationCard({ settings, onUpdate }: IntegrationCardProps) {
  return (
    <SettingsCard
      title="Integrations"
      description="Connect your accounts to unlock more features"
    >
      <div className="divide-y divide-border">
        {integrationDefs.map((integration) => {
          const Icon = integration.icon;
          const isConnected = settings[integration.key];

          return (
            <div
              key={integration.key}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 shrink-0">
                  <Icon className={cn("h-4 w-4", integration.color)} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-body font-medium text-foreground">
                    {integration.label}
                  </p>
                  <p className="text-caption text-tertiary truncate">
                    {isConnected ? "Connected" : integration.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={isConnected}
                onCheckedChange={(checked) => onUpdate({ [integration.key]: checked })}
                aria-label={`${isConnected ? "Disconnect" : "Connect"} ${integration.label}`}
              />
            </div>
          );
        })}
      </div>
    </SettingsCard>
  );
}
