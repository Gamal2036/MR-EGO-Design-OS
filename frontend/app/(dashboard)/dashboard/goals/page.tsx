"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DashboardErrorState,
  DashboardLoadingState,
} from "@/components/dashboard";
import {
  GoalAIPanel,
  GoalCalendar,
  GoalDashboard,
  GoalEmpty,
  GoalStats,
  GoalTree,
  GoalsFilters,
  GoalsHeader,
  GoalsLayout,
  GoalsList,
} from "@/components/goals";
import { demoSmartGoals } from "@/data/smart-goals";
import { useSmartGoalStore } from "@/stores/smart-goal-store";
import type { SmartGoal } from "@/types/smart-goal";

type PageState = "loading" | "ready" | "error";

export default function GoalsPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("loading");

  const goals = useSmartGoalStore((s) => s.goals);
  const viewMode = useSmartGoalStore((s) => s.viewMode);
  const filters = useSmartGoalStore((s) => s.filters);
  const sort = useSmartGoalStore((s) => s.sort);

  const setGoals = useSmartGoalStore((s) => s.setGoals);
  const setViewState = useSmartGoalStore((s) => s.setViewState);
  const setViewMode = useSmartGoalStore((s) => s.setViewMode);
  const setFilter = useSmartGoalStore((s) => s.setFilter);
  const resetFilters = useSmartGoalStore((s) => s.resetFilters);
  const setSort = useSmartGoalStore((s) => s.setSort);
  const selectGoal = useSmartGoalStore((s) => s.selectGoal);
  const openForm = useSmartGoalStore((s) => s.openForm);
  const getSortedGoals = useSmartGoalStore((s) => s.getSortedGoals);
  const getStats = useSmartGoalStore((s) => s.getStats);
  const getDashboardData = useSmartGoalStore((s) => s.getDashboardData);
  const getRecommendations = useSmartGoalStore((s) => s.getRecommendations);
  const getHeatmapData = useSmartGoalStore((s) => s.getHeatmapData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoals(demoSmartGoals);
      setViewState("ready");
      setPageState("ready");
    }, 500);
    return () => clearTimeout(timer);
  }, [setGoals, setViewState]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setGoals(demoSmartGoals);
      setViewState("ready");
      setPageState("ready");
    }, 800);
  }, [setGoals, setViewState]);

  const sortedGoals = useMemo(() => getSortedGoals(), [getSortedGoals]);
  const stats = useMemo(() => getStats(), [getStats]);
  const dashboardData = useMemo(() => getDashboardData(), [getDashboardData]);
  const recommendations = useMemo(() => getRecommendations(), [getRecommendations]);
  const heatmapData = useMemo(() => getHeatmapData(), [getHeatmapData]);

  const handleCreate = useCallback(() => {
    selectGoal(null);
    router.push("/dashboard/goals/new");
  }, [router, selectGoal]);

  const handleEdit = useCallback(
    (goal: SmartGoal) => {
      selectGoal(goal.id);
      openForm(goal.id);
    },
    [openForm, selectGoal]
  );

  const handleSelect = useCallback(
    (goal: SmartGoal) => {
      selectGoal(goal.id);
    },
    [selectGoal]
  );

  if (pageState === "loading") {
    return <DashboardLoadingState />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  const sidebar = (
    <>
      <GoalAIPanel recommendations={recommendations} featured={dashboardData.aiRecommendation} />
      <GoalCalendar data={heatmapData} />
      <GoalTree goals={goals} onSelect={(id) => selectGoal(id)} />
    </>
  );

  return (
    <GoalsLayout
      header={
        <GoalsHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Goals" },
          ]}
          onCreate={handleCreate}
        />
      }
      filters={
        <GoalsFilters
          filters={filters}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onReset={resetFilters}
        />
      }
      content={
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("dashboard")}
              className={viewMode === "dashboard" ? "font-semibold text-primary" : "text-tertiary"}
            >
              Dashboard
            </button>
            <span className="text-tertiary">·</span>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "font-semibold text-primary" : "text-tertiary"}
            >
              All Goals
            </button>
          </div>

          {viewMode === "dashboard" && (
            <>
              <GoalStats stats={stats} />
              <GoalDashboard
                data={dashboardData}
                onSelectGoal={(id) => selectGoal(id)}
              />
            </>
          )}

          {viewMode === "list" && (
            <>
              {sortedGoals.length === 0 ? (
                <GoalEmpty onCreate={handleCreate} />
              ) : (
                <GoalsList
                  goals={sortedGoals}
                  viewMode="grid"
                  onSelect={handleSelect}
                  onEdit={handleEdit}
                  onCreate={handleCreate}
                />
              )}
            </>
          )}
        </div>
      }
      sidebar={sidebar}
    />
  );
}
