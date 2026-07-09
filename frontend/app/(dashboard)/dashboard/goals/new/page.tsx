"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { GoalForm } from "@/components/goals/goal-form";
import { useSmartGoalStore } from "@/stores/smart-goal-store";
import type { SmartGoal } from "@/types/smart-goal";

export default function NewGoalPage() {
  const router = useRouter();
  const addGoal = useSmartGoalStore((s) => s.addGoal);
  const closeForm = useSmartGoalStore((s) => s.closeForm);

  const handleSubmit = useCallback(
    (goal: Partial<SmartGoal>) => {
      addGoal({
        ...(goal as SmartGoal),
        id: `goal-${Date.now()}`,
        progress: 0,
        currentStage: "Planning",
        estimatedCompletion: new Date().toISOString(),
        motivationScore: 72,
        consistencyScore: 64,
        riskScore: 20,
        aiConfidence: 84,
        nextRecommendation: "Break this goal into milestones this week.",
        status: "planning",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [],
        subGoals: [],
        tasks: [],
        dailyObjectives: [],
        weeklyObjectives: [],
        monthlyObjectives: [],
        dependencies: [],
        completionConditions: [],
        tags: (goal.tags ?? []).slice(0, 5),
        prediction: {
          chanceOfSuccess: 84,
          estimatedFinishDate: new Date().toISOString(),
          riskLevel: "low",
          delayWarning: null,
          motivationTrend: "stable",
          productivityTrend: "stable",
        },
      });
      closeForm();
      router.push("/dashboard/goals");
    },
    [addGoal, closeForm, router],
  );

  return (
    <div className="min-h-0 flex-1 bg-background">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="space-y-2">
          <h1 className="text-heading-2 text-primary font-semibold">Create a Smart Goal</h1>
          <p className="text-body-small text-secondary">
            Capture a new goal for your career growth and we will keep it visible in your dashboard.
          </p>
        </div>
        <GoalForm onSubmit={handleSubmit} onClose={() => router.push("/dashboard/goals")} />
      </div>
    </div>
  );
}
