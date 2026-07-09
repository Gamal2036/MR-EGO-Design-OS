"use client";

import { ProgressBar } from "@/components/feedback/progress-bar";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  className,
}: OnboardingProgressProps) {
  return (
    <div className={className}>
      <ProgressBar
        value={currentStep - 1}
        max={totalSteps - 1}
        size="sm"
        variant="primary"
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      />
    </div>
  );
}
