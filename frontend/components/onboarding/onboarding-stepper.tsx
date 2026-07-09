"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Welcome", short: "Welcome" },
  { label: "Career Goal", short: "Goal" },
  { label: "Profile", short: "Profile" },
  { label: "Skills", short: "Skills" },
  { label: "Upload CV", short: "CV" },
  { label: "AI Review", short: "AI" },
  { label: "Preferences", short: "Prefs" },
  { label: "Complete", short: "Done" },
];

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
}

export function OnboardingStepper({
  currentStep,
  totalSteps = STEPS.length,
  className,
}: OnboardingStepperProps) {
  const steps = STEPS.slice(0, totalSteps);

  return (
    <nav aria-label="Onboarding progress" className={cn("w-full", className)}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <li
              key={stepNumber}
              className={cn(
                "flex items-center gap-2",
                index < steps.length - 1 && "flex-1"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-normal",
                    isCompleted &&
                      "border-success bg-success text-success-foreground",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground shadow-soft",
                    isUpcoming &&
                      "border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-400 dark:text-neutral-500"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                  ) : (
                    <span className="text-smallest md:text-caption font-semibold">
                      {stepNumber}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "hidden md:inline text-caption font-medium transition-colors duration-normal",
                    isCompleted && "text-success",
                    isCurrent && "text-primary",
                    isUpcoming && "text-tertiary"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2 transition-colors duration-normal",
                    isCompleted
                      ? "bg-success"
                      : "bg-neutral-200 dark:bg-neutral-700"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
