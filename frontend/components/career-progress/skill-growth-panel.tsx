"use client";

import { Layers, Zap } from "lucide-react";
import { useMemo } from "react";
import { type HTMLAttributes, forwardRef } from "react";

import { SkillProgressCard } from "./skill-progress-card";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/types/career-progress";

export interface SkillGrowthPanelProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skill[];
  selectedCategory?: SkillCategory | "all";
  onCategoryChange?: (category: SkillCategory | "all") => void;
}

const categories: { value: SkillCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "technical", label: "Technical" },
  { value: "soft", label: "Soft" },
  { value: "language", label: "Languages" },
];

const SkillGrowthPanel = forwardRef<HTMLDivElement, SkillGrowthPanelProps>(
  (
    { className, skills, selectedCategory = "all", onCategoryChange, ...props },
    ref
  ) => {
    const filteredSkills = useMemo(() => {
      if (selectedCategory === "all") return skills;
      return skills.filter((s) => s.category === selectedCategory);
    }, [skills, selectedCategory]);

    const missingSkills = useMemo(
      () => skills.filter((s) => s.isMissing),
      [skills]
    );
    const prioritySkills = useMemo(
      () => skills.filter((s) => s.priority === "high" && !s.isMissing),
      [skills]
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Skill growth"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-info" aria-hidden="true" />
            <CardTitle>Skill Growth</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                type="button"
                variant={selectedCategory === category.value ? "secondary" : "ghost"}
                size="xs"
                onClick={() => onCategoryChange?.(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredSkills.map((skill) => (
              <SkillProgressCard key={skill.id} skill={skill} />
            ))}
          </div>

          {missingSkills.length > 0 && (
            <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-danger" aria-hidden="true" />
                <h4 className="text-label font-semibold text-danger">
                  Missing Skills
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <Badge key={skill.id} variant="danger" size="sm">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {prioritySkills.length > 0 && (
            <div className="rounded-xl border border-border bg-surface-0 p-4">
              <h4 className="text-label font-semibold text-primary mb-2">
                Priority Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {prioritySkills.map((skill) => (
                  <Badge key={skill.id} variant="warning" size="sm">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
SkillGrowthPanel.displayName = "SkillGrowthPanel";

export { SkillGrowthPanel };
