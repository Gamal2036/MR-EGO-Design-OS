"use client";

import { cn } from "@/lib/utils";

interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export function CharacterCounter({ current, max, className }: CharacterCounterProps) {
  const remaining = max - current;
  const percentage = (current / max) * 100;

  let colorClass = "text-tertiary";
  if (percentage > 90) {
    colorClass = "text-danger";
  } else if (percentage > 75) {
    colorClass = "text-warning";
  }

  if (current === 0) return null;

  return (
    <span
      className={cn("text-smallest tabular-nums", colorClass, className)}
      aria-label={`${remaining} characters remaining`}
      role="status"
    >
      {remaining}
    </span>
  );
}
