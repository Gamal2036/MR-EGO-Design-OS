"use client";

import { useCallback, useEffect, useMemo } from "react";

import {
  ActionPlan,
  CareerAdvisor,
  CareerDecisionPanel,
  CoachEmptyState,
  CoachErrorState,
  CoachHeader,
  CoachInsights,
  CoachLayout,
  CoachLoadingState,
  CoachProgress,
  CoachRecommendations,
  CoachSummary,
  MotivationCard,
  NextSteps,
} from "@/components/coach";
import { demoCoachData } from "@/data/coach";
import { useCoachStore } from "@/stores/coach-store";

export default function CoachPage() {
  const {
    data,
    viewState,
    selectedTimeframe,
    selectedInsightId,
    selectedDecisionId,
    completedActionIds,
    setData,
    setViewState,
    selectTimeframe,
    selectInsight,
    selectDecision,
    toggleActionCompleted,
    markAllDailyComplete,
    resetCoach,
  } = useCoachStore();

  const loadData = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setData(data ?? demoCoachData);
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

  const coachData = useMemo(() => data ?? demoCoachData, [data]);

  const handleRetry = useCallback(() => {
    loadData();
  }, [loadData]);

  const handleStart = useCallback(() => {
    resetCoach();
  }, [resetCoach]);

  if (viewState === "loading") {
    return <CoachLoadingState />;
  }

  if (viewState === "error") {
    return <CoachErrorState onRetry={handleRetry} />;
  }

  if (viewState === "empty" || !coachData) {
    return <CoachEmptyState onStart={handleStart} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <CoachLayout
        header={
          <CoachHeader
            targetRole={coachData.targetRole}
            readinessScore={coachData.readiness.readinessScore}
            headline={coachData.summary.headline}
          />
        }
        summary={<CoachSummary summary={coachData.summary} />}
        advisor={<CareerAdvisor advice={coachData.todayAdvice} />}
        progress={<CoachProgress progress={coachData.progress} />}
        insights={
          <CoachInsights
            insights={coachData.insights}
            selectedInsightId={selectedInsightId}
            onSelectInsight={selectInsight}
          />
        }
        recommendations={<CoachRecommendations recommendations={coachData.recommendations} />}
        actionPlan={
          <ActionPlan
            actionPlan={coachData.actionPlan}
            selectedTimeframe={selectedTimeframe}
            completedActionIds={completedActionIds}
            onToggleAction={toggleActionCompleted}
            onMarkAllDailyComplete={markAllDailyComplete}
            onSelectTimeframe={selectTimeframe}
          />
        }
        decisions={
          <CareerDecisionPanel
            decisions={coachData.decisions}
            selectedDecisionId={selectedDecisionId}
            onSelectDecision={selectDecision}
          />
        }
        nextSteps={<NextSteps goal={coachData.nextGoal} />}
        motivation={<MotivationCard motivation={coachData.motivation} />}
      />
    </div>
  );
}
