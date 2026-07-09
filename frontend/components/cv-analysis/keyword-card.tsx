"use client";

import { Hash, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { KeywordAnalysis } from "@/types/cv-analysis";

export interface KeywordCardProps extends HTMLAttributes<HTMLDivElement> {
  keywords: KeywordAnalysis;
}

const KeywordCard = forwardRef<HTMLDivElement, KeywordCardProps>(
  ({ className, keywords, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Keyword analysis"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle>Keyword Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 text-label font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Matched ({keywords.matched.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.matched.map((kw) => (
                    <Badge key={kw} variant="success" size="xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 text-label font-medium text-danger">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  Missing ({keywords.missing.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.missing.map((kw) => (
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
                Industry Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {keywords.industryKeywords.map((kw) => (
                  <Badge key={kw} variant="ai" size="xs">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-label font-medium text-warning">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Suggested Additions
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {keywords.suggestedKeywords.map((kw) => (
                  <Badge key={kw} variant="warning" size="xs">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
KeywordCard.displayName = "KeywordCard";

export { KeywordCard };
