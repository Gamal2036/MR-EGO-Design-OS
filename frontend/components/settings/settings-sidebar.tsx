"use client";

import {
  Bell,
  Brain,
  Fingerprint,
  Globe,
  HardDrive,
  Palette,
  Plug,
  ScrollText,
  ShieldAlert,
  UserCog,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { SettingsCategory } from "@/types/settings";

interface CategoryEntry {
  id: SettingsCategory;
  label: string;
  icon: LucideIcon;
}

const categories: CategoryEntry[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Fingerprint },
  { id: "ai-preferences", label: "AI Preferences", icon: Brain },
  { id: "career-preferences", label: "Career Preferences", icon: UserCog },
  { id: "security", label: "Security", icon: ShieldAlert },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "danger-zone", label: "Danger Zone", icon: ScrollText },
];

interface SettingsSidebarProps {
  activeCategory: SettingsCategory;
  onCategoryChange: (category: SettingsCategory) => void;
}

export function SettingsSidebar({
  activeCategory,
  onCategoryChange,
}: SettingsSidebarProps) {
  return (
    <nav
      className="w-full shrink-0 space-y-1"
      aria-label="Settings categories"
      role="tablist"
      aria-orientation="vertical"
    >
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        const isDanger = cat.id === "danger-zone";

        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`settings-panel-${cat.id}`}
            id={`settings-tab-${cat.id}`}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive && !isDanger && "bg-cyan-500/10 text-cyan-500 font-medium",
              isActive && isDanger && "bg-danger/10 text-danger font-medium",
              !isActive && "text-tertiary hover:text-foreground hover:bg-accent",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate text-body-small">{cat.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
