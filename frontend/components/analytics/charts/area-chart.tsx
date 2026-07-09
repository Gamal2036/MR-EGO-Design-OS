"use client";

import {
  Area,
  AreaChart as ReAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "./chart-tooltip";

interface AreaSeries {
  dataKey: string;
  name: string;
  color: string;
  fillOpacity?: number;
}

interface AreaChartProps {
  data: Record<string, string | number>[];
  xDataKey: string;
  series: AreaSeries[];
  showGrid?: boolean;
}

export function AreaChart({
  data,
  xDataKey,
  series,
  showGrid = true,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReAreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.dataKey} id={`fill-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-default)"
            vertical={false}
            opacity={0.4}
          />
        )}
        <XAxis
          dataKey={xDataKey}
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
          axisLine={{ stroke: "var(--border-default)", opacity: 0.4 }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} />
        {series.map((s) => (
          <Area
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#fill-${s.dataKey})`}
            fillOpacity={s.fillOpacity ?? 1}
          />
        ))}
      </ReAreaChart>
    </ResponsiveContainer>
  );
}
