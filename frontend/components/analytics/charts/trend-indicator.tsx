"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  direction: "up" | "down" | "flat";
  value: string;
  label?: string;
  className?: string;
}

export function TrendIndicator({ direction, value, label, className }: TrendIndicatorProps) {
  const isUp = direction === "up";
  const isDown = direction === "down";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-caption font-medium",
        isUp && "text-success",
        isDown && "text-danger",
        !isUp && !isDown && "text-tertiary",
        className
      )}
      aria-label={`Trend ${direction}: ${value}${label ? ` ${label}` : ""}`}
    >
      {isUp ? (
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      ) : isDown ? (
        <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{value}</span>
      {label && <span className="text-tertiary hidden sm:inline">{label}</span>}
    </div>
  );
}
