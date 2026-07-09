"use client";

import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieDataItem[];
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
}

export function PieChart({
  data,
  innerRadius = 60,
  outerRadius = 80,
  showLabels = true,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) return null;
            const item = payload[0]?.payload as PieDataItem | undefined;
            if (!item) return null;
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div className="rounded-lg border border-border bg-surface-1 p-3 shadow-dropdown">
                <p className="text-caption font-medium text-primary">{item.name}</p>
                <p className="text-caption text-secondary">
                  {item.value} ({percent}%)
                </p>
              </div>
            );
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          stroke="var(--color-surface-1)"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {showLabels && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current"
            style={{ fill: "var(--color-text-primary)", fontSize: 18, fontWeight: 700 }}
          >
            {total}
          </text>
        )}
      </RePieChart>
    </ResponsiveContainer>
  );
}
