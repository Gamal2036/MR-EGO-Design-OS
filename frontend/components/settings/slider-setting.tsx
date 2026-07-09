"use client";

import { useCallback, useId, useState } from "react";

import { cn } from "@/lib/utils";

interface SliderSettingProps {
  label: string;
  description?: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatLabel?: (value: number) => string;
  disabled?: boolean;
}

export function SliderSetting({
  label,
  description,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatLabel,
  disabled,
}: SliderSettingProps) {
  const id = useId();
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(Number(e.target.value));
    },
    [onValueChange],
  );

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="py-3">
      <div className="flex items-center justify-between gap-4 mb-2">
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
        <span className="text-body font-medium text-cyan-500 shrink-0">
          {formatLabel ? formatLabel(value) : value}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          disabled={disabled}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
            "disabled:cursor-not-allowed",
          )}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        <div className="relative w-full h-2 rounded-full bg-surface-2 overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-cyan-500 transition-[width] duration-fast",
              isDragging && "bg-cyan-400",
            )}
            style={{ width: `${percent}%` }}
            aria-hidden="true"
          />
        </div>
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-cyan-500 shadow-soft pointer-events-none transition-transform duration-fast",
            isDragging && "scale-110 border-cyan-400",
          )}
          style={{ left: `calc(${percent}% - 8px)` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
