"use client";

import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Activity,
  BarChart3,
} from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Card, CardHeader, CardTitle, Badge } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { InterviewStats } from "@/types/interview";

interface InsightsPanelProps extends HTMLAttributes<HTMLDivElement> {
  stats: InterviewStats;
}

const InsightsPanel = forwardRef<HTMLDivElement, InsightsPanelProps>(
  ({ className, stats, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4 p-4", className)} {...props}>
        <div>
          <h3 className="text-heading-4 text-primary font-semibold mb-1">AI Insights</h3>
          <p className="text-caption text-tertiary">Powered by AI analysis</p>
        </div>

        <Card padding="sm">
          <CardHeader>
            <CardTitle className="text-body-small font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {stats.suggestedLearning.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg bg-surface-2 p-2"
              >
                <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0 text-ai" aria-hidden="true" />
                <span className="text-caption text-primary">{suggestion}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="sm">
          <CardHeader>
            <CardTitle className="text-body-small font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" aria-hidden="true" />
              Strong Areas
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {stats.strongAreas.map((area) => (
              <Badge key={area} variant="success" size="sm">
                {area}
              </Badge>
            ))}
          </div>
        </Card>

        <Card padding="sm">
          <CardHeader>
            <CardTitle className="text-body-small font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-warning" aria-hidden="true" />
              Weak Areas
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {stats.weakAreas.map((area) => (
              <Badge key={area} variant="warning" size="sm">
                {area}
              </Badge>
            ))}
          </div>
        </Card>

        <Card padding="sm">
          <CardHeader>
            <CardTitle className="text-body-small font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-info" aria-hidden="true" />
              Interview Statistics
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-caption text-tertiary">Total Interviews</span>
              <span className="text-caption font-medium text-primary">{stats.totalInterviews}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-tertiary">Completed</span>
              <span className="text-caption font-medium text-primary">{stats.completedInterviews}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-tertiary">Average Score</span>
              <span className="text-caption font-medium text-primary">{stats.averageScore}%</span>
            </div>
          </div>
        </Card>

        <Card padding="sm">
          <CardHeader>
            <CardTitle className="text-body-small font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-caption text-tertiary">
              <div className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              <span>Completed practice session &mdash; 82% score</span>
            </div>
            <div className="flex items-center gap-2 text-caption text-tertiary">
              <div className="h-1.5 w-1.5 rounded-full bg-info" aria-hidden="true" />
              <span>Added 3 new questions to library</span>
            </div>
            <div className="flex items-center gap-2 text-caption text-tertiary">
              <div className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
              <span>Interview at Quantum Dynamics in 3 days</span>
            </div>
          </div>
        </Card>
      </div>
    );
  },
);
InsightsPanel.displayName = "InsightsPanel";

export { InsightsPanel };
export type { InsightsPanelProps };
