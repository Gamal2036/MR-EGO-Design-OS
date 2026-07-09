"use client";

import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { coachDecisionAnswerConfig, coachDifficultyConfig, coachImpactConfig } from "@/data/coach";
import { cn } from "@/lib/utils";
import type { CoachDecision } from "@/types/coach";

export interface CareerDecisionPanelProps extends HTMLAttributes<HTMLDivElement> {
  decisions: CoachDecision[];
  selectedDecisionId?: string | null;
  onSelectDecision?: (id: string | null) => void;
}

const answerIcons: Record<string, LucideIcon> = {
  yes: CheckCircle2,
  no: XCircle,
  maybe: HelpCircle,
};

const CareerDecisionPanel = forwardRef<HTMLDivElement, CareerDecisionPanelProps>(
  ({ className, decisions, selectedDecisionId, onSelectDecision, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="AI career decisions"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Career Decisions</CardTitle>
          </div>
          <CardDescription>
            AI guidance on key trade-offs for your career.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3" role="list" aria-label="Decisions">
            {decisions.map((decision) => {
              const answerConfig = coachDecisionAnswerConfig[decision.answer];
              const AnswerIcon = answerIcons[decision.answer] ?? Lightbulb;
              const difficulty = coachDifficultyConfig[decision.difficulty];
              const impact = coachImpactConfig[decision.careerImpact];
              const isSelected = selectedDecisionId === decision.id;

              return (
                <div
                  key={decision.id}
                  role="listitem"
                  className={cn(
                    "rounded-xl border p-4 transition-colors",
                    isSelected
                      ? "border-ai bg-ai/5"
                      : "border-border bg-card hover:border-hover"
                  )}
                  onClick={() => onSelectDecision?.(isSelected ? null : decision.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        answerConfig.bg
                      )}
                      aria-hidden="true"
                    >
                      <AnswerIcon className={cn("h-4 w-4", answerConfig.color)} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-label font-medium text-primary">
                          {decision.question}
                        </h4>
                        <Badge variant="outline" size="xs" className={answerConfig.color}>
                          {answerConfig.label}
                        </Badge>
                      </div>
                      {isSelected && (
                        <>
                          <p className="text-body-small text-secondary">
                            {decision.reason}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-caption">
                            <span className={impact.color}>{impact.label}</span>
                            <span className="text-tertiary">·</span>
                            <span className={difficulty.color}>
                              {difficulty.label} difficulty
                            </span>
                            <span className="text-tertiary">·</span>
                            <span className="text-success">
                              Value: {decision.estimatedValue}
                            </span>
                          </div>
                        </>
                      )}
                      {!isSelected && (
                        <div className="flex items-center gap-1 text-caption text-ai">
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Click to see reasoning</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerDecisionPanel.displayName = "CareerDecisionPanel";

export { CareerDecisionPanel };
