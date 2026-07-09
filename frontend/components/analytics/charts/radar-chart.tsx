"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as ReRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarSeries {
  dataKey: string;
  name: string;
  color: string;
  fillOpacity?: number;
}

interface RadarChartProps {
  data: Record<string, string | number>[];
  angleKey: string;
  series: RadarSeries[];
}

export function RadarChart({ data, angleKey, series }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReRadarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
        <PolarGrid stroke="var(--border-default)" opacity={0.4} />
        <PolarAngleAxis
          dataKey={angleKey}
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }}
          tickCount={5}
          stroke="var(--border-default)"
          opacity={0.3}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload || payload.length === 0) return null;
            return (
              <div className="rounded-lg border border-border bg-surface-1 p-3 shadow-dropdown">
                <p className="text-caption font-medium text-primary mb-1">{label}</p>
                {payload.map((entry, index) => (
                  <p key={index} className="text-caption text-secondary">
                    {entry.name}: <span className="text-primary font-medium">{entry.value}</span>
                  </p>
                ))}
              </div>
            );
          }}
        />
        {series.map((s) => (
          <Radar
            key={s.dataKey}
            name={s.name}
            dataKey={s.dataKey}
            stroke={s.color}
            fill={s.color}
            fillOpacity={s.fillOpacity ?? 0.25}
          />
        ))}
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
