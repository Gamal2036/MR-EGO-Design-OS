"use client";

import type { TooltipProps } from "recharts";

interface ChartTooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, number | string>;
}

export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-surface-1 p-3 shadow-dropdown">
      <p className="text-caption font-medium text-primary mb-2">{label}</p>
      <ul className="space-y-1">
        {payload.map((entry, index) => {
          const item = entry as unknown as ChartTooltipPayloadItem;
          return (
            <li key={index} className="flex items-center gap-2 text-caption">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color ?? "var(--color-primary-500)" }}
              />
              <span className="text-secondary">{item.name}:</span>
              <span className="font-medium text-primary">{item.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
