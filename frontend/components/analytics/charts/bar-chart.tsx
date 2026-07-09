"use client";

import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "./chart-tooltip";

interface BarSeries {
  dataKey: string;
  name: string;
  color: string;
  radius?: number | [number, number, number, number];
}

interface BarChartProps {
  data: Record<string, string | number>[];
  xDataKey: string;
  series: BarSeries[];
  showGrid?: boolean;
  showLegend?: boolean;
  layout?: "vertical" | "horizontal";
}

export function BarChart({
  data,
  xDataKey,
  series,
  showGrid = true,
  showLegend = false,
  layout = "horizontal",
}: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 16, bottom: 8, left: isVertical ? 40 : -8 }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-default)"
            vertical={!isVertical}
            horizontal={isVertical}
            opacity={0.4}
          />
        )}
        <XAxis
          type={isVertical ? "number" : "category"}
          dataKey={isVertical ? undefined : xDataKey}
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
          axisLine={{ stroke: "var(--border-default)", opacity: 0.4 }}
          tickLine={false}
        />
        <YAxis
          type={isVertical ? "category" : "number"}
          dataKey={isVertical ? xDataKey : undefined}
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={isVertical ? 100 : undefined}
        />
        <Tooltip content={<ChartTooltip />} />
        {showLegend && <Legend wrapperStyle={{ color: "var(--color-text-secondary)" }} />}
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.name}
            fill={s.color}
            radius={s.radius ?? [4, 4, 0, 0]}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
}
