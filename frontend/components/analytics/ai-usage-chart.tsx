"use client";

import { ChartContainer, PieChart } from "@/components/analytics/charts";
import type { AIUsageMetric } from "@/types/analytics";

interface AIUsageChartProps {
  data: AIUsageMetric[];
}

export function AIUsageChart({ data }: AIUsageChartProps) {
  const pieData = data.map((item) => ({
    name: item.label,
    value: item.value,
    color: item.color,
  }));

  return (
    <ChartContainer title="AI Usage" ariaLabel="AI usage distribution">
      <PieChart data={pieData} innerRadius={55} outerRadius={85} />
    </ChartContainer>
  );
}
