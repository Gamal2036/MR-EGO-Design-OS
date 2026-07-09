"use client";

import { FileSearch, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { ATSAnalysis } from "@/types/cv-analysis";

export interface ATSCardProps extends HTMLAttributes<HTMLDivElement> {
  ats: ATSAnalysis;
}

const ATSCard = forwardRef<HTMLDivElement, ATSCardProps>(
  ({ className, ats, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="ATS compatibility analysis"
        {...props}
      >
        <CardHeader
          action={
            <Badge
              variant={
                ats.score >= 70
                  ? "success"
                  : ats.score >= 50
                    ? "warning"
                    : "danger"
              }
              size="sm"
            >
              {ats.compatibility}
            </Badge>
          }
        >
          <div className="flex items-center gap-2">
            <FileSearch
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <CardTitle>ATS Compatibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label text-secondary">
                  Overall ATS Score
                </span>
                <span
                  className={cn(
                    "text-label font-semibold",
                    ats.score >= 70
                      ? "text-success"
                      : ats.score >= 50
                        ? "text-warning"
                        : "text-danger"
                  )}
                >
                  {ats.score}%
                </span>
              </div>
              <ProgressBar
                value={ats.score}
                variant={
                  ats.score >= 70
                    ? "success"
                    : ats.score >= 50
                      ? "warning"
                      : "danger"
                }
                size="lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-caption text-tertiary">
                  Keyword Match
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {ats.keywordMatch}%
                </p>
                <ProgressBar
                  value={ats.keywordMatch}
                  variant={
                    ats.keywordMatch >= 70
                      ? "success"
                      : ats.keywordMatch >= 50
                        ? "warning"
                        : "danger"
                  }
                  size="sm"
                />
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Formatting Score
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {ats.formattingScore}%
                </p>
                <ProgressBar
                  value={ats.formattingScore}
                  variant={
                    ats.formattingScore >= 70
                      ? "success"
                      : "warning"
                  }
                  size="sm"
                />
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Section Completeness
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {ats.sectionCompleteness}%
                </p>
                <ProgressBar
                  value={ats.sectionCompleteness}
                  variant="info"
                  size="sm"
                />
              </div>
              <div>
                <span className="text-caption text-tertiary">
                  Bullet Optimization
                </span>
                <p className="text-heading-4 font-semibold text-primary">
                  {ats.bulletOptimization}%
                </p>
                <ProgressBar
                  value={ats.bulletOptimization}
                  variant={
                    ats.bulletOptimization >= 70
                      ? "success"
                      : "warning"
                  }
                  size="sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 text-label font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Matched Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {ats.matchedKeywords.map((kw) => (
                    <Badge key={kw} variant="success" size="xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 text-label font-medium text-danger">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {ats.missingKeywords.map((kw) => (
                    <Badge key={kw} variant="danger" size="xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-label font-medium text-ai">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Suggestions
              </h4>
              <ul className="space-y-1">
                {ats.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-caption text-secondary"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ATSCard.displayName = "ATSCard";

export { ATSCard };
