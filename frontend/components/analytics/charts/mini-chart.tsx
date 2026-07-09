"use client";

import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  showFill?: boolean;
}

export function MiniChart({
  data,
  color = "var(--color-primary-500)",
  height = 40,
  showFill = true,
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="mini-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={showFill ? 0.3 : 0} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#mini-fill)"
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
