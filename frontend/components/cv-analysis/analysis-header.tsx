"use client";

import { BarChart3, RefreshCw, Clock } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

export interface AnalysisHeaderProps extends HTMLAttributes<HTMLDivElement> {
  lastAnalyzed?: string | null;
  onReanalyze?: () => void;
}

const AnalysisHeader = forwardRef<HTMLDivElement, AnalysisHeaderProps>(
  ({ className, lastAnalyzed, onReanalyze, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-screen-2xl px-5 pt-6 md:pt-8 lg:px-8 lg:pt-10",
          className
        )}
        {...props}
      >
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "CV Intelligence", href: "/cv" },
              { label: "AI CV Analysis", icon: BarChart3 },
            ]}
          />

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-heading-1 text-primary">AI CV Analysis</h1>
              <p className="text-body-large text-secondary mt-1">
                Comprehensive analysis of your CV with AI-powered insights and
                recommendations
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {lastAnalyzed && (
                <div className="flex items-center gap-1.5 text-caption text-tertiary">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    Last analyzed{" "}
                    {new Date(lastAnalyzed).toLocaleDateString()}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className="h-4 w-4" />}
                onClick={onReanalyze}
              >
                Reanalyze
              </Button>
            </div>
          </div>

          <hr className="border-border" />
        </div>
      </div>
    );
  }
);
AnalysisHeader.displayName = "AnalysisHeader";

export { AnalysisHeader };
