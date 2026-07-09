"use client";

import { useCallback, useEffect, useMemo } from "react";

import {
  CareerProgressHeader,
  CareerScoreCard,
  CareerScoreOverview,
  CareerRoadmap,
  GoalMilestonePanel,
  SkillGrowthPanel,
  LearningProgressPanel,
  AchievementBadges,
  CareerRecommendationPanel,
  NextBestActionCard,
  CareerTimeline,
  CareerProgressLoadingState,
  CareerProgressErrorState,
  CareerProgressEmptyState,
} from "@/components/career-progress";
import { demoCareerProgressData } from "@/data/career-progress";
import { useCareerProgressStore } from "@/stores/career-progress-store";

export default function CareerProgressPage() {
  const {
    data,
    viewState,
    selectedGoalId,
    selectedSkillCategory,
    selectedLearningType,
    setData,
    setViewState,
    toggleGoalStatus,
    toggleMilestoneStatus,
    selectGoal,
    setSkillCategoryFilter,
    setLearningTypeFilter,
    resetProgress,
  } = useCareerProgressStore();

  const loadData = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setData(data ?? demoCareerProgressData);
    }, 800);
  }, [data, setData, setViewState]);

  useEffect(() => {
    if (!data && viewState === "loading") {
      loadData();
      return;
    }
    if (data && viewState === "loading") {
      setViewState("ready");
    }
  }, [data, viewState, loadData, setViewState]);

  const careerData = useMemo(() => data ?? demoCareerProgressData, [data]);

  const overallProgress = useMemo(() => {
    const { careerScore } = careerData;
    return Math.round(
      (careerScore.overall +
        careerScore.jobReadiness +
        careerScore.cvReadiness +
        careerScore.skillReadiness +
        careerScore.applicationReadiness) /
        5
    );
  }, [careerData]);

  const completedMilestonesCount = useMemo(
    () => careerData.milestones.filter((m) => m.status === "completed").length,
    [careerData.milestones]
  );

  const handleRetry = useCallback(() => {
    loadData();
  }, [loadData]);

  const handleStart = useCallback(() => {
    resetProgress();
  }, [resetProgress]);

  if (viewState === "loading") {
    return <CareerProgressLoadingState />;
  }

  if (viewState === "error") {
    return <CareerProgressErrorState onRetry={handleRetry} />;
  }

  if (viewState === "empty" || !careerData) {
    return <CareerProgressEmptyState onStart={handleStart} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8">
        <CareerProgressHeader
          targetRole={careerData.targetRole}
          overallProgress={overallProgress}
          nextBestAction={careerData.nextBestAction.description}
        />

        <NextBestActionCard action={careerData.nextBestAction} />

        <section aria-label="Career score overview" className="space-y-4">
          <h2 className="text-heading-4 text-primary">Career Score Overview</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <CareerScoreCard
              score={careerData.careerScore.overall}
              label="Career Score"
              size="md"
            />
            <div className="lg:col-span-2">
              <CareerScoreOverview scores={careerData.careerScore} />
            </div>
          </div>
        </section>

        <section aria-label="Roadmap and recommendations" className="space-y-4">
          <h2 className="text-heading-4 text-primary">Roadmap & Recommendations</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <CareerRoadmap steps={careerData.roadmap} />
            </div>
            <div className="lg:col-span-1">
              <CareerRecommendationPanel recommendations={careerData.recommendations} />
            </div>
            <div className="lg:col-span-1">
              <CareerTimeline events={careerData.timeline} />
            </div>
          </div>
        </section>

        <section aria-label="Goals, skills, and learning" className="space-y-4">
          <h2 className="text-heading-4 text-primary">Goals, Skills & Learning</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <GoalMilestonePanel
                goals={careerData.goals}
                milestones={careerData.milestones}
                weeklySummary={careerData.weeklyGoalSummary}
                monthlySummary={careerData.monthlyGoalSummary}
                onToggleGoal={toggleGoalStatus}
                onToggleMilestone={toggleMilestoneStatus}
                selectedGoalId={selectedGoalId}
                onSelectGoal={selectGoal}
              />
            </div>
            <div className="lg:col-span-1">
              <SkillGrowthPanel
                skills={careerData.skills}
                selectedCategory={selectedSkillCategory}
                onCategoryChange={setSkillCategoryFilter}
              />
            </div>
            <div className="lg:col-span-1">
              <LearningProgressPanel
                items={careerData.learningItems}
                selectedType={selectedLearningType}
                onTypeChange={setLearningTypeFilter}
              />
            </div>
          </div>
        </section>

        <section aria-label="Achievements" className="space-y-4">
          <h2 className="text-heading-4 text-primary">Achievements</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <AchievementBadges badges={careerData.badges} />
            </div>
            <div className="lg:col-span-2 rounded-xl border border-border bg-surface-0 p-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-heading-1 font-bold text-primary">
                    {careerData.goals.filter((g) => g.status === "completed").length}
                  </p>
                  <p className="text-caption text-tertiary">Goals Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-heading-1 font-bold text-primary">
                    {completedMilestonesCount}
                  </p>
                  <p className="text-caption text-tertiary">Milestones</p>
                </div>
                <div className="text-center">
                  <p className="text-heading-1 font-bold text-primary">
                    {careerData.learningItems.filter((i) => i.status === "completed").length}
                  </p>
                  <p className="text-caption text-tertiary">Courses Done</p>
                </div>
                <div className="text-center">
                  <p className="text-heading-1 font-bold text-primary">
                    {careerData.badges.filter((b) => b.earned).length}
                  </p>
                  <p className="text-caption text-tertiary">Badges Earned</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
