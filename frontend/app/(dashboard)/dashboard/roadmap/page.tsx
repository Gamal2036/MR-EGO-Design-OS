"use client";

import { useCallback, useEffect, useMemo } from "react";

import {
  CareerPathSelector,
  DailyPlan,
  LearningPath,
  MonthlyGoals,
  RoadmapEmptyState,
  RoadmapErrorState,
  RoadmapHeader,
  RoadmapLayout,
  RoadmapLoadingState,
  RoadmapPhaseCard,
  RoadmapProgress,
  RoadmapRecommendation,
  RoadmapTimeline,
  WeeklyPlan,
} from "@/components/roadmap";
import { demoAIRoadmapData, demoCareerPaths } from "@/data/roadmaps";
import { useRoadmapStore } from "@/stores/roadmap-store";

export default function RoadmapPage() {
  const {
    data,
    viewState,
    selectedCareerPathId,
    selectedPhaseId,
    setData,
    setViewState,
    selectCareerPath,
    selectPhase,
    toggleTask,
    resetRoadmap,
  } = useRoadmapStore();

  const loadData = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setData(data ?? demoAIRoadmapData);
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

  const roadmapData = useMemo(() => data ?? demoAIRoadmapData, [data]);

  const currentPhase = useMemo(() => {
    if (selectedPhaseId) {
      return (
        roadmapData.phases.find((p) => p.id === selectedPhaseId) ??
        roadmapData.phases.find((p) => p.status === "in-progress") ??
        roadmapData.phases[0]
      );
    }
    return (
      roadmapData.phases.find((p) => p.status === "in-progress") ??
      roadmapData.phases[0]
    );
  }, [roadmapData.phases, selectedPhaseId]);

  const handleRetry = useCallback(() => {
    loadData();
  }, [loadData]);

  const handleStart = useCallback(() => {
    resetRoadmap();
  }, [resetRoadmap]);

  if (viewState === "loading") {
    return <RoadmapLoadingState />;
  }

  if (viewState === "error") {
    return <RoadmapErrorState onRetry={handleRetry} />;
  }

  if (viewState === "empty" || !roadmapData) {
    return <RoadmapEmptyState onStart={handleStart} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <RoadmapLayout
        header={
          <RoadmapHeader
            targetRole={roadmapData.careerPath.targetRole}
            overallProgress={roadmapData.overallCompletion}
            aiConfidence={roadmapData.aiConfidence}
          />
        }
        progress={
          <RoadmapProgress
            overallCompletion={roadmapData.overallCompletion}
            estimatedFinishDate={roadmapData.estimatedFinishDate}
            currentStage={roadmapData.currentStage}
            targetCareer={roadmapData.careerPath.targetRole}
            learningHoursRemaining={roadmapData.learningHoursRemaining}
            aiConfidence={roadmapData.aiConfidence}
          />
        }
        careerSelector={
          <CareerPathSelector
            paths={demoCareerPaths}
            selectedId={selectedCareerPathId ?? demoCareerPaths[0]?.id ?? ""}
            onPathSelect={selectCareerPath}
          />
        }
        timeline={
          <RoadmapTimeline
            phases={roadmapData.phases}
            selectedPhaseId={selectedPhaseId}
            onSelectPhase={selectPhase}
          />
        }
        phaseDetails={
          currentPhase ? <RoadmapPhaseCard phase={currentPhase} /> : null
        }
        learningPath={<LearningPath items={roadmapData.learningPath} />}
        dailyPlan={
          <DailyPlan
            plan={roadmapData.dailyPlan}
            onToggleTask={toggleTask}
          />
        }
        weeklyPlan={
          <WeeklyPlan
            plan={roadmapData.weeklyPlan}
            onToggleTask={toggleTask}
          />
        }
        monthlyGoals={<MonthlyGoals goals={roadmapData.monthlyGoals} />}
        recommendations={
          <RoadmapRecommendation
            recommendations={roadmapData.recommendations}
          />
        }
      />
    </div>
  );
}
