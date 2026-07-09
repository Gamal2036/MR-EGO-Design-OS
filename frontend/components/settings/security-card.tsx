"use client";

import { KeyRound, Laptop, LogIn, MonitorSmartphone } from "lucide-react";

import { SettingsCard } from "./settings-card";
import { ToggleSetting } from "./toggle-setting";

import { cn } from "@/lib/utils";
import type { SecuritySettings } from "@/types/settings";

interface SecurityCardProps {
  settings: SecuritySettings;
  onUpdate: (settings: Partial<SecuritySettings>) => void;
}

export function SecurityCard({ settings, onUpdate }: SecurityCardProps) {
  return (
    <SettingsCard
      title="Security"
      description="Manage your account security and active sessions"
    >
      <div className="divide-y divide-border">
        <SecurityRow
          icon={KeyRound}
          label="Password"
          value="Last changed Dec 15, 2025"
          placeholder
        />

        <SecurityRow
          icon={MonitorSmartphone}
          label="Active Sessions"
          value={`${settings.sessions.active} active sessions — Last activity: ${settings.sessions.lastActivity}`}
          placeholder
        />

        <SecurityRow
          icon={Laptop}
          label="Devices"
          value={`${settings.devices.count} devices — ${settings.devices.lastDevice}`}
          placeholder
        />

        <div className="py-3">
          <ToggleSetting
            label="Two-Factor Authentication (MFA)"
            description="Add an extra layer of security to your account"
            checked={settings.mfaEnabled}
            onCheckedChange={(checked) => onUpdate({ mfaEnabled: checked })}
          />
        </div>

        <SecurityRow
          icon={LogIn}
          label="Login History"
          value={`${settings.loginHistory} logins recorded`}
          placeholder
        />
      </div>
    </SettingsCard>
  );
}

interface SecurityRowProps {
  icon: typeof KeyRound;
  label: string;
  value: string;
  placeholder?: boolean;
}

function SecurityRow({ icon: Icon, label, value, placeholder }: SecurityRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 py-3",
        placeholder && "opacity-60",
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 shrink-0">
        <Icon className="h-4 w-4 text-tertiary" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body font-medium text-foreground">{label}</p>
        <p className="text-caption text-tertiary truncate">{value}</p>
      </div>
      {placeholder && (
        <span className="text-caption text-tertiary italic shrink-0">Coming soon</span>
      )}
    </div>
  );
}
