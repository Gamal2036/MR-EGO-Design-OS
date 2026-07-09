"use client";

import { useCallback, useEffect, useMemo } from "react";

import {
  AnalyticsHeader,
  AnalyticsOverviewCards,
  WeeklyActivityChart,
  MonthlyActivityChart,
  ApplicationFunnelChart,
  CVPerformanceChart,
  SkillGrowthChart,
  LearningProgressChart,
  AIUsageChart,
  ProviderUsageChart,
  TopRecommendations,
  ProductivityHeatmap,
  Achievements,
  RecentActivityFeed,
  QuickActions,
  AnalyticsLoadingState,
  AnalyticsErrorState,
} from "@/components/analytics";
import { getAnalyticsDataByPeriod } from "@/data/analytics";
import { useAnalyticsStore } from "@/stores/analytics-store";
import type { AnalyticsPeriod, QuickAction } from "@/types/analytics";

export default function AnalyticsPage() {
  const { period, viewState, setPeriod, setViewState } = useAnalyticsStore();

  const loadData = useCallback(
    (_period: AnalyticsPeriod) => {
      setViewState("loading");
      window.setTimeout(() => {
        setViewState("ready");
      }, 700);
    },
    [setViewState]
  );

  useEffect(() => {
    if (viewState === "loading") {
      loadData(period);
    }
  }, [viewState, period, loadData]);

  const data = useMemo(() => getAnalyticsDataByPeriod(period), [period]);

  const handlePeriodChange = useCallback(
    (newPeriod: AnalyticsPeriod) => {
      setPeriod(newPeriod);
      setViewState("loading");
    },
    [setPeriod, setViewState]
  );

  const handleRetry = useCallback(() => {
    setViewState("loading");
  }, [setViewState]);

  const handleExport = useCallback(() => {
    // Placeholder for future export integration
  }, []);

  const handleQuickAction = useCallback((action: QuickAction) => {
    // Placeholder for future quick action routing
    window.console.log("Analytics quick action:", action.label);
  }, []);

  if (viewState === "loading") {
    return <AnalyticsLoadingState />;
  }

  if (viewState === "error") {
    return <AnalyticsErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8">
        <AnalyticsHeader
          period={period}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
        />

        <AnalyticsOverviewCards metrics={data.careerOverview} />

        <section aria-label="Activity trends" className="space-y-4">
          <h2 className="sr-only">Activity Trends</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WeeklyActivityChart data={data.weeklyActivity} />
            <MonthlyActivityChart data={data.monthlyActivity} />
          </div>
        </section>

        <section aria-label="Application funnel and CV performance" className="space-y-4">
          <h2 className="sr-only">Funnel and CV Performance</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ApplicationFunnelChart stages={data.applicationFunnel} />
            </div>
            <div className="lg:col-span-1">
              <CVPerformanceChart metrics={data.cvPerformance} />
            </div>
            <div className="lg:col-span-1">
              <SkillGrowthChart data={data.skillGrowth} />
            </div>
          </div>
        </section>

        <section aria-label="Learning, AI, and provider usage" className="space-y-4">
          <h2 className="sr-only">Learning and AI Usage</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <LearningProgressChart items={data.learningProgress} />
            </div>
            <div className="lg:col-span-1">
              <AIUsageChart data={data.aiUsage} />
            </div>
            <div className="lg:col-span-1">
              <ProviderUsageChart data={data.providerUsage} />
            </div>
          </div>
        </section>

        <section aria-label="Recommendations and productivity" className="space-y-4">
          <h2 className="sr-only">Recommendations and Productivity</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TopRecommendations recommendations={data.recommendations} />
            </div>
            <div className="lg:col-span-1">
              <ProductivityHeatmap weeks={data.productivityHeatmap} />
            </div>
          </div>
        </section>

        <section aria-label="Achievements and recent activity" className="space-y-4">
          <h2 className="sr-only">Achievements and Recent Activity</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Achievements badges={data.achievements} />
            </div>
            <div className="lg:col-span-2">
              <RecentActivityFeed items={data.recentActivity} />
            </div>
          </div>
        </section>

        <QuickActions actions={data.quickActions} onAction={handleQuickAction} />
      </div>
    </div>
  );
}
