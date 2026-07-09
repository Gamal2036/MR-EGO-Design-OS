"use client";

import { Moon, Sun, type LucideIcon } from "lucide-react";

import { SettingsCard } from "./settings-card";
import { ToggleSetting } from "./toggle-setting";

import { cn } from "@/lib/utils";
import type { AppearanceSettings } from "@/types/settings";

interface AppearanceCardProps {
  settings: AppearanceSettings;
  onUpdate: (settings: Partial<AppearanceSettings>) => void;
}

export function AppearanceCard({ settings, onUpdate }: AppearanceCardProps) {
  return (
    <SettingsCard title="Appearance" description="Customize how MR:EGO looks and feels">
      <div className="space-y-4 pt-2">
        <div>
          <p className="text-body-small font-medium text-secondary mb-3">Theme Mode</p>
          <div className="grid grid-cols-3 gap-3">
            <ThemeOption
              icon={Moon}
              label="Dark"
              isActive={settings.mode === "dark"}
              onClick={() => onUpdate({ mode: "dark" })}
            />
            <ThemeOption
              icon={Sun}
              label="Light"
              isActive={settings.mode === "light"}
              onClick={() => onUpdate({ mode: "light" })}
              disabled
              badge="Soon"
            />
            <ThemeOption
              icon={Sun}
              label="System"
              isActive={settings.mode === "system"}
              onClick={() => onUpdate({ mode: "system" })}
            />
          </div>
        </div>

        <div className="border-t border-border pt-2">
          <ToggleSetting
            label="Compact Mode"
            description="Reduce spacing and font sizes for a denser UI"
            checked={settings.compactMode}
            onCheckedChange={(checked) => onUpdate({ compactMode: checked })}
          />
        </div>

        <div className="border-t border-border pt-2">
          <p className="text-body-small font-medium text-secondary mb-2">UI Density</p>
          <div className="flex gap-2">
            {(["comfortable", "compact", "cozy"] as const).map((density) => (
              <button
                key={density}
                type="button"
                onClick={() => onUpdate({ uiDensity: density })}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-caption font-medium transition-all duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  settings.uiDensity === density
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-500"
                    : "border-border text-tertiary hover:border-hover hover:text-secondary",
                )}
                aria-pressed={settings.uiDensity === density}
              >
                {density.charAt(0).toUpperCase() + density.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

interface ThemeOptionProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  badge?: string;
}

function ThemeOption({
  icon: Icon,
  label,
  isActive,
  onClick,
  disabled,
  badge,
}: ThemeOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "border-cyan-500 bg-cyan-500/10"
          : "border-border hover:border-hover",
        disabled && "opacity-40 cursor-not-allowed",
      )}
      aria-pressed={isActive}
      aria-label={`${label} theme${disabled ? " (coming soon)" : ""}`}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          isActive ? "text-cyan-500" : "text-tertiary",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-caption font-medium",
          isActive ? "text-cyan-500" : "text-tertiary",
        )}
      >
        {label}
      </span>
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 rounded-full bg-cyan-500 px-1.5 py-0.5 text-smallest font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
