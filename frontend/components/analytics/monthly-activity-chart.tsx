"use client";

import { AreaChart, ChartContainer } from "@/components/analytics/charts";
import type { MonthlyActivityData } from "@/types/analytics";

interface MonthlyActivityChartProps {
  data: MonthlyActivityData;
}

export function MonthlyActivityChart({ data }: MonthlyActivityChartProps) {
  const chartData = data.labels.map((label, index) => ({
    label,
    saved: data.jobsSaved[index] ?? 0,
    applied: data.jobsApplied[index] ?? 0,
    improved: data.cvsImproved[index] ?? 0,
  }));

  return (
    <ChartContainer title="Monthly Activity" ariaLabel="Monthly activity chart">
      <AreaChart
        data={chartData}
        xDataKey="label"
        series={[
          { dataKey: "saved", name: "Jobs Saved", color: "var(--color-analytics-500)" },
          { dataKey: "applied", name: "Jobs Applied", color: "var(--color-primary-500)" },
          { dataKey: "improved", name: "CVs Improved", color: "var(--color-cv-500)" },
        ]}
      />
    </ChartContainer>
  );
}
