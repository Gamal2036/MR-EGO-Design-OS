"use client";

import {
  FileText,
  Briefcase,
  Send,
  UserCheck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

import {
  DashboardHeader,
  DashboardHero,
  CareerScoreCard,
  MetricCard,
  QuickActionGrid,
  JobMatchCard,
  ApplicationPipeline,
  ActivityTimeline,
  InsightPanel,
  DashboardLoadingState,
  DashboardErrorState,
} from "@/components/dashboard";
import {
  demoMetrics,
  demoAIRecommendation,
  demoQuickActions,
  demoJobMatches,
  demoApplicationPipeline,
  demoActivity,
  demoInsights,
  type QuickAction,
} from "@/data/dashboard";

type DashboardState = "loading" | "ready" | "error";

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>("ready");
  const router = useRouter();

  const handleQuickAction = useCallback((action: QuickAction) => {
    const navigableRoutes = [
      "/dashboard/documents",
      "/dashboard/career-progress",
      "/dashboard/analytics",
      "/dashboard/tasks",
      "/dashboard/calendar",
      "/dashboard/skills",
      "/dashboard/coach",
    ];
    if (navigableRoutes.includes(action.href)) {
      router.push(action.href);
      return;
    }
    console.log("Quick action:", action.label);
  }, [router]);

  const handleRetry = useCallback(() => {
    setState("loading");
    setTimeout(() => setState("ready"), 1000);
  }, []);

  if (state === "loading") {
    return <DashboardLoadingState />;
  }

  if (state === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8">
        <DashboardHeader />

        <DashboardHero recommendation={demoAIRecommendation} />

        <section aria-label="Career Overview" className="space-y-4">
          <h2 className="sr-only">Career Overview</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="md:col-span-2 lg:col-span-1">
              <CareerScoreCard score={demoMetrics.careerScore} />
            </div>
            <MetricCard
              icon={<FileText className="h-5 w-5" />}
              value={`${demoMetrics.cvReadiness}%`}
              label="CV Readiness"
              description="How ready your CV is for target roles"
              variant={demoMetrics.cvReadiness >= 70 ? "success" : demoMetrics.cvReadiness >= 50 ? "warning" : "danger"}
              trend={{ direction: "up", value: "+5%" }}
            />
            <MetricCard
              icon={<Briefcase className="h-5 w-5" />}
              value={demoMetrics.jobMatches}
              label="Job Matches"
              description="Roles matching your profile"
              variant="info"
              trend={{ direction: "up", value: "+3" }}
            />
            <MetricCard
              icon={<Send className="h-5 w-5" />}
              value={demoMetrics.applications}
              label="Applications"
              description="Active job applications"
              variant="ai"
            />
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              value={demoMetrics.interviews}
              label="Interviews"
              description="Scheduled interviews"
              variant="success"
              trend={{ direction: "up", value: "+1" }}
            />
            <MetricCard
              icon={<UserCheck className="h-5 w-5" />}
              value={`${demoMetrics.profileCompletion}%`}
              label="Profile"
              description="Your profile completeness"
              variant={demoMetrics.profileCompletion >= 80 ? "success" : demoMetrics.profileCompletion >= 50 ? "warning" : "danger"}
              trend={{ direction: "up", value: "+10%" }}
            />
          </div>
        </section>

        <QuickActionGrid
          actions={demoQuickActions}
          onAction={handleQuickAction}
        />

        <section aria-label="Job Matches and Applications" className="space-y-4">
          <h2 className="sr-only">Job Matches and Applications</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-heading-4 text-primary">Recommended Jobs</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {demoJobMatches.slice(0, 4).map((job) => (
                  <JobMatchCard key={job.id} job={job} />
                ))}
              </div>
            </div>
            <div>
              <ApplicationPipeline
                stages={demoApplicationPipeline}
                total={demoApplicationPipeline.reduce((sum, s) => sum + s.count, 0)}
              />
            </div>
          </div>
        </section>

        <section aria-label="Activity and Insights" className="space-y-4">
          <h2 className="sr-only">Activity and Insights</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ActivityTimeline activities={demoActivity} />
            <InsightPanel insights={demoInsights} />
          </div>
        </section>
      </div>
    </div>
  );
}
