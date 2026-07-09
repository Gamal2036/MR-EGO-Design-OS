"use client";

import { BarChart3, Download } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { PageHeader } from "@/components/layout-primitives/page-header";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ANALYTICS_PERIODS } from "@/data/analytics";
import type { AnalyticsPeriod } from "@/types/analytics";

interface AnalyticsHeaderProps {
  period: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
  onExport?: () => void;
}

export function AnalyticsHeader({ period, onPeriodChange, onExport }: AnalyticsHeaderProps) {
  return (
    <PageHeader
      title="Analytics"
      description="Intelligence center for your career growth, productivity, and AI-powered recommendations."
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analytics", icon: BarChart3 },
          ]}
        />
      }
      action={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <div
            className="inline-flex rounded-lg border border-border bg-surface-1 p-1"
            role="radiogroup"
            aria-label="Analytics period"
          >
            {ANALYTICS_PERIODS.map((p) => (
              <button
                key={p.value}
                type="button"
                role="radio"
                aria-checked={period === p.value}
                onClick={() => onPeriodChange(p.value)}
                className={`rounded-md px-3 py-1.5 text-caption font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  period === p.value
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary hover:text-primary hover:bg-surface-2"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      }
    />
  );
}
