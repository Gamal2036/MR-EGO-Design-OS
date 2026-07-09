"use client";

import { useId } from "react";

import { Switch } from "@/components/forms/switch";

interface ToggleSettingProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function ToggleSetting({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: ToggleSettingProps) {
  const id = useId();

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1 min-w-0 space-y-1">
        <label
          htmlFor={id}
          className="text-body font-medium text-foreground cursor-pointer select-none"
        >
          {label}
        </label>
        {description && (
          <p className="text-caption text-tertiary">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
}
