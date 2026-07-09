"use client";

import { ChartContainer, BarChart } from "@/components/analytics/charts";
import type { ProviderUsageMetric } from "@/types/analytics";

interface ProviderUsageChartProps {
  data: ProviderUsageMetric[];
}

export function ProviderUsageChart({ data }: ProviderUsageChartProps) {
  const chartData = data.map((item) => ({
    label: item.label,
    usage: item.value,
  }));

  return (
    <ChartContainer title="Provider Usage" ariaLabel="AI provider usage chart">
      <BarChart
        data={chartData}
        xDataKey="label"
        series={[{ dataKey: "usage", name: "Usage %", color: "var(--color-analytics-500)" }]}
      />
    </ChartContainer>
  );
}
