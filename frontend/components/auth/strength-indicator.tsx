"use client";

import { cn } from "@/lib/utils";

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

const strengthConfig = {
  0: { label: "Weak", color: "bg-danger", textColor: "text-danger", width: "w-0" },
  1: { label: "Weak", color: "bg-danger", textColor: "text-danger", width: "w-1/4" },
  2: { label: "Fair", color: "bg-warning", textColor: "text-warning", width: "w-2/4" },
  3: { label: "Good", color: "bg-info", textColor: "text-info", width: "w-3/4" },
  4: { label: "Strong", color: "bg-success", textColor: "text-success", width: "w-full" },
};

interface StrengthIndicatorProps {
  level: StrengthLevel;
  className?: string;
}

export function StrengthIndicator({ level, className }: StrengthIndicatorProps) {
  const config = strengthConfig[level];

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className={cn("rounded-full transition-all duration-normal", config.color, config.width)}
          role="progressbar"
          aria-valuenow={level * 25}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {level > 0 && (
        <p className={cn("text-smallest font-medium", config.textColor)}>
          {config.label}
        </p>
      )}
    </div>
  );
}

export type { StrengthLevel };
