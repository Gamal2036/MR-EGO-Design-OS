"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center w-full" role="list">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <li
              key={step.label}
              className={cn(
                "relative flex-1",
                index !== steps.length - 1 && "pr-2 sm:pr-4"
              )}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full text-caption font-semibold transition-all duration-normal",
                    isComplete && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary-200 dark:ring-primary-800",
                    isUpcoming && "bg-neutral-100 dark:bg-neutral-800 text-tertiary"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 sm:mx-4",
                      isComplete
                        ? "bg-primary"
                        : "bg-neutral-200 dark:bg-neutral-700"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="mt-2">
                <span
                  className={cn(
                    "text-caption font-medium",
                    isComplete && "text-primary",
                    isCurrent && "text-foreground",
                    isUpcoming && "text-tertiary"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <p className="text-smallest text-tertiary hidden sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type { Step };
