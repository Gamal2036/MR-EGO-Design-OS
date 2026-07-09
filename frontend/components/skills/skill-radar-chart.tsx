"use client";

import { type HTMLAttributes, forwardRef } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skills";

interface SkillRadarChartProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skill[];
}

const categoryMap: Record<string, string> = {
  networking: "Networking",
  linux: "Linux",
  windows: "Windows",
  python: "Python",
  cybersecurity: "Security",
  cloud: "Cloud",
  docker: "Docker",
  virtualization: "Virtualization",
  git: "Git",
  communication: "Soft Skills",
  "problem-solving": "Problem Solving",
  english: "English",
  french: "French",
};

function aggregateByCategory(skills: Skill[]): { category: string; value: number; fullMark: number }[] {
  const grouped: Record<string, number[]> = {};
  for (const skill of skills) {
    const label = categoryMap[skill.category] || skill.category;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(skill.currentValue);
  }
  return Object.entries(grouped).map(([category, values]) => ({
    category,
    value: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
    fullMark: 100,
  }));
}

const SkillRadarChart = forwardRef<HTMLDivElement, SkillRadarChartProps>(
  ({ className, skills, ...props }, ref) => {
    const data = aggregateByCategory(skills);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Skill Radar Chart"
        {...props}
      >
        <CardHeader>
          <CardTitle>Skill Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  tickCount={5}
                />
                <Radar
                  name="Skill Level"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }
);
SkillRadarChart.displayName = "SkillRadarChart";

export { SkillRadarChart };
export type { SkillRadarChartProps };
