"use client";

import { useCallback, useMemo } from "react";

import { AssessmentSummary } from "./assessment-summary";
import { CareerReadinessCard } from "./career-readiness-card";
import { CareerRecommendationGrid } from "./career-recommendation";
import { LearningRecommendationGrid } from "./learning-recommendation";
import { OverallReadiness } from "./overall-readiness";
import { SkillCategoryCard } from "./skill-category-card";
import { SkillFilter } from "./skill-filter";
import { SkillGapTable } from "./skill-gap-table";
import { SkillRadarChart } from "./skill-radar-chart";
import { SkillTimeline } from "./skill-timeline";

import { useSkillStore } from "@/stores/skill-store";
import type { Skill, SkillFilterState } from "@/types/skills";

function filterSkills(skills: Skill[], filters: SkillFilterState) {
  return skills.filter((skill) => {
    if (filters.category !== "all" && skill.category !== filters.category) return false;
    if (filters.difficulty !== "all" && skill.currentLevel !== filters.difficulty) return false;
    if (filters.priority !== "all" && skill.priority !== filters.priority) return false;
    if (filters.status !== "all" && skill.status !== filters.status) return false;
    if (filters.search && !skill.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}

export function SkillsDashboard() {
  const overallScore = useSkillStore((s) => s.overallScore);
  const careerReadiness = useSkillStore((s) => s.careerReadiness);
  const summary = useSkillStore((s) => s.summary);
  const timeline = useSkillStore((s) => s.timeline);
  const careerMappings = useSkillStore((s) => s.careerMappings);
  const recommendations = useSkillStore((s) => s.recommendations);
  const filters = useSkillStore((s) => s.filters);
  const allSkills = useSkillStore((s) => s.skills);
  const setFilter = useSkillStore((s) => s.setFilter);
  const resetFilters = useSkillStore((s) => s.resetFilters);

  const skills = useMemo(() => filterSkills(allSkills, filters), [allSkills, filters]);

  const handleFilterChange = useCallback(
    (filter: Partial<SkillFilterState>) => setFilter(filter),
    [setFilter]
  );

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-2 text-primary font-bold">Skill Assessment</h1>
          <p className="text-body text-secondary">
            Comprehensive analysis of your current skills, gaps, and career readiness
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <OverallReadiness score={overallScore} />
          </div>
          <div className="lg:col-span-3">
            <CareerReadinessCard data={careerReadiness} />
          </div>
        </div>

        <AssessmentSummary summary={summary} />

        <SkillFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        <section aria-label="Skill Categories" className="space-y-4">
          <h2 className="text-heading-4 text-primary">Skill Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {skills.map((skill) => (
              <SkillCategoryCard key={skill.id} skill={skill} />
            ))}
          </div>
          {skills.length === 0 && (
            <p className="text-body text-secondary text-center py-8">
              No skills match the current filters.
            </p>
          )}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SkillRadarChart skills={allSkills} />
          <SkillTimeline data={timeline} />
        </div>

        <SkillGapTable skills={allSkills} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CareerRecommendationGrid careerMappings={careerMappings} />
          <LearningRecommendationGrid recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}
