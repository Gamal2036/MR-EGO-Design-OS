"use client";

import { ChartContainer, BarChart } from "@/components/analytics/charts";
import type { SkillGrowthPoint } from "@/types/analytics";

interface SkillGrowthChartProps {
  data: SkillGrowthPoint[];
}

export function SkillGrowthChart({ data }: SkillGrowthChartProps) {
  const chartData = data.map((item) => ({
    label: item.label,
    previous: item.previous,
    current: item.current,
    target: item.target,
  }));

  return (
    <ChartContainer title="Skill Growth" ariaLabel="Skill growth chart">
      <BarChart
        data={chartData}
        xDataKey="label"
        series={[
          { dataKey: "previous", name: "Previous", color: "var(--color-text-tertiary)" },
          { dataKey: "current", name: "Current", color: "var(--color-cyan-500)" },
          { dataKey: "target", name: "Target", color: "var(--color-success-500)" },
        ]}
        showLegend
      />
    </ChartContainer>
  );
}
