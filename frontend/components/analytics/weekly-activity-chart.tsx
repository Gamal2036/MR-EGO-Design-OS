"use client";

import { ChartContainer, LineChart } from "@/components/analytics/charts";
import type { WeeklyActivityData } from "@/types/analytics";

interface WeeklyActivityChartProps {
  data: WeeklyActivityData;
}

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  const chartData = data.labels.map((label, index) => ({
    label,
    applications: data.applications[index] ?? 0,
    interviews: data.interviews[index] ?? 0,
    ai: data.aiInteractions[index] ?? 0,
  }));

  return (
    <ChartContainer title="Weekly Activity" ariaLabel="Weekly activity chart">
      <LineChart
        data={chartData}
        xDataKey="label"
        series={[
          { dataKey: "applications", name: "Applications", color: "var(--color-primary-500)" },
          { dataKey: "interviews", name: "Interviews", color: "var(--color-success-500)" },
          { dataKey: "ai", name: "AI Interactions", color: "var(--color-cyan-500)" },
        ]}
        showLegend
      />
    </ChartContainer>
  );
}
