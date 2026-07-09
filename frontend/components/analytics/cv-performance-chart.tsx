"use client";

import { ChartContainer, RadarChart } from "@/components/analytics/charts";
import type { CVPerformanceMetric } from "@/types/analytics";

interface CVPerformanceChartProps {
  metrics: CVPerformanceMetric[];
}

export function CVPerformanceChart({ metrics }: CVPerformanceChartProps) {
  const chartData = metrics.map((m) => ({
    subject: m.label,
    score: m.score,
    target: m.max,
  }));

  return (
    <ChartContainer title="CV Performance" ariaLabel="CV performance radar chart">
      <RadarChart
        data={chartData}
        angleKey="subject"
        series={[
          { dataKey: "score", name: "Your CV", color: "var(--color-cv-500)", fillOpacity: 0.3 },
          { dataKey: "target", name: "Target", color: "var(--color-text-tertiary)", fillOpacity: 0.05 },
        ]}
      />
    </ChartContainer>
  );
}
