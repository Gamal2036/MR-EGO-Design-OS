"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "./chart-tooltip";

interface LineSeries {
  dataKey: string;
  name: string;
  color: string;
  strokeWidth?: number;
}

interface LineChartProps {
  data: Record<string, string | number>[];
  xDataKey: string;
  series: LineSeries[];
  showGrid?: boolean;
  showLegend?: boolean;
}

export function LineChart({
  data,
  xDataKey,
  series,
  showGrid = true,
  showLegend = false,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
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
        {showLegend && <Legend wrapperStyle={{ color: "var(--color-text-secondary)" }} />}
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={s.color}
            strokeWidth={s.strokeWidth ?? 2}
            dot={{ r: 3, strokeWidth: 0, fill: s.color }}
            activeDot={{ r: 5 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
}
