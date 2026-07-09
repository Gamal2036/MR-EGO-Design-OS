"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface AnalysisPhase {
  id: string;
  label: string;
  icon: typeof Brain;
  duration: number;
}

const PHASES: AnalysisPhase[] = [
  { id: "parsing", label: "Parsing document structure", icon: FileText, duration: 800 },
  { id: "extracting", label: "Extracting skills & experience", icon: Brain, duration: 1000 },
  { id: "analyzing", label: "Analyzing career trajectory", icon: TrendingUp, duration: 1200 },
  { id: "matching", label: "Matching to job market", icon: Target, duration: 900 },
  { id: "generating", label: "Generating recommendations", icon: Sparkles, duration: 700 },
];

interface InsightItem {
  icon: typeof Lightbulb;
  label: string;
  badge: string;
  badgeVariant: "success" | "info" | "ai" | "primary";
}

const INSIGHTS: InsightItem[] = [
  { icon: Lightbulb, label: "Strong technical skill foundation detected", badge: "Insight", badgeVariant: "ai" },
  { icon: CheckCircle2, label: "Experience aligned with senior roles", badge: "Match", badgeVariant: "success" },
  { icon: TrendingUp, label: "Career progression shows leadership potential", badge: "Trend", badgeVariant: "info" },
  { icon: Target, label: "Suggested focus: Cloud architecture skills", badge: "Action", badgeVariant: "primary" },
];

interface AIAnalysisPreviewProps {
  isAnalyzing: boolean;
  onComplete: () => void;
  className?: string;
}

export function AIAnalysisPreview({
  isAnalyzing,
  onComplete,
  className,
}: AIAnalysisPreviewProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentPhaseIndex(-1);
      setShowResults(false);
      return;
    }

    let cancelled = false;
    let totalDelay = 0;

    const runPhases = async () => {
      for (let i = 0; i < PHASES.length; i++) {
        if (cancelled) return;
        await new Promise((resolve) => {
          setTimeout(() => {
            if (!cancelled) {
              setCurrentPhaseIndex(i);
              resolve(null);
            }
          }, totalDelay);
        });
        totalDelay += PHASES[i]!.duration;
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      if (!cancelled) {
        setShowResults(true);
        onComplete();
      }
    };

    runPhases();

    return () => {
      cancelled = true;
    };
  }, [isAnalyzing, onComplete]);

  return (
    <div className={cn("space-y-5", className)}>
      {!showResults ? (
        <Card variant="ai" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <Brain
                className="h-6 w-6 text-ai animate-pulse"
                aria-hidden="true"
              />
              <span className="absolute inset-0 rounded-full bg-ai/20 animate-ping" />
            </div>
            <div>
              <h3 className="text-label font-semibold text-ai">
                AI Analysis in Progress
              </h3>
              <p className="text-caption text-secondary">
                MR:EGO AI is reviewing your profile
              </p>
            </div>
          </div>

          <ProgressBar
            value={currentPhaseIndex + 1}
            max={PHASES.length}
            size="sm"
            variant="ai"
            animated
            className="mb-4"
          />

          <div className="space-y-3">
            {PHASES.map((phase, index) => {
              const PhaseIcon = phase.icon;
              const isActive = index === currentPhaseIndex;
              const isDone = index < currentPhaseIndex;

              return (
                <motion.div
                  key={phase.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-colors duration-normal",
                    isActive && "bg-ai/5"
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PhaseIcon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-normal",
                      isDone && "text-success",
                      isActive && "text-ai",
                      !isActive && !isDone && "text-tertiary"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-body transition-colors duration-normal",
                      isDone && "text-success line-through",
                      isActive && "text-ai font-medium",
                      !isActive && !isDone && "text-tertiary"
                    )}
                  >
                    {phase.label}
                  </span>
                  {isDone && (
                    <CheckCircle2
                      className="h-4 w-4 text-success ml-auto shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {isActive && (
                    <span className="ml-auto flex gap-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
            <h3 className="text-label font-semibold text-primary">
              AI Analysis Complete
            </h3>
          </div>

          {INSIGHTS.map((insight, index) => {
            const InsightIcon = insight.icon;

            return (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card variant="ai" padding="sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <InsightIcon className="h-4 w-4 text-ai" aria-hidden="true" />
                      <CardTitle className="text-body-small font-medium">
                        {insight.label}
                      </CardTitle>
                      <Badge
                        variant={insight.badgeVariant}
                        size="xs"
                        className="ml-auto"
                      >
                        {insight.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
