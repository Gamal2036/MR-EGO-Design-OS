"use client";

import { FileText, Image, User } from "lucide-react";

import { SettingsCard } from "./settings-card";

import { cn } from "@/lib/utils";
import type { StorageInfo } from "@/types/settings";

interface StorageCardProps {
  settings: StorageInfo;
}

export function StorageCard({ settings }: StorageCardProps) {
  const totalPercent = Math.round((settings.total.used / settings.total.total) * 100);

  return (
    <SettingsCard
      title="Storage"
      description={`${totalPercent}% of storage used — ${formatSize(settings.total.used)} of ${formatSize(settings.total.total)}`}
    >
      <div className="space-y-4 pt-2">
        <div className="relative h-2 w-full rounded-full bg-surface-2 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-cyan-500 transition-all duration-normal"
            style={{ width: `${totalPercent}%` }}
            role="progressbar"
            aria-valuenow={totalPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Storage usage: ${totalPercent}%`}
          />
        </div>

        <div className="space-y-3 pt-2">
          <StorageBar
            icon={FileText}
            label="Documents"
            used={settings.documents.used}
            total={settings.documents.total}
            color="bg-cyan-500"
          />
          <StorageBar
            icon={User}
            label="Profile"
            used={settings.profile.used}
            total={settings.profile.total}
            color="bg-primary-500"
          />
          <StorageBar
            icon={Image}
            label="Uploads"
            used={settings.uploads.used}
            total={settings.uploads.total}
            color="bg-ai-500"
          />
        </div>
      </div>
    </SettingsCard>
  );
}

interface StorageBarProps {
  icon: typeof FileText;
  label: string;
  used: number;
  total: number;
  color: string;
}

function StorageBar({ icon: Icon, label, used, total, color }: StorageBarProps) {
  const percent = Math.round((used / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 shrink-0">
        <Icon className="h-4 w-4 text-tertiary" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-body-small font-medium text-foreground">{label}</span>
          <span className="text-caption text-tertiary">
            {formatSize(used)} / {formatSize(total)}
          </span>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-normal", color)}
            style={{ width: `${percent}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
      <span className="text-caption text-tertiary w-10 text-right shrink-0">{percent}%</span>
    </div>
  );
}

function formatSize(mb: number): string {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb} MB`;
}
