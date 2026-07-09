"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 96,
  strokeWidth = 8,
  color = "var(--color-primary-500)",
  trackColor = "var(--color-surface-3)",
  label,
  sublabel,
  className,
}: ProgressRingProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("inline-flex flex-col items-center justify-center gap-2", className)}
      role="img"
      aria-label={`${label ?? "Progress"}: ${Math.round(percentage)}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          opacity={0.4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-slow ease-out-custom"
        />
      </svg>
      {(label || sublabel) && (
        <div className="text-center">
          {label && <p className="text-heading-4 text-primary">{label}</p>}
          {sublabel && <p className="text-caption text-tertiary">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
