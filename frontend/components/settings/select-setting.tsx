"use client";

import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectSettingProps {
  label: string;
  description?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export function SelectSetting({
  label,
  description,
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  disabled,
}: SelectSettingProps) {
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
      <div className="w-44 shrink-0">
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger id={id} aria-label={label}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
