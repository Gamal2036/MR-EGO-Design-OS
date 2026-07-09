"use client";

import {
  Briefcase,
  Award,
  Wrench,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CareerSuggestion } from "@/types/cv-analysis";

export interface CareerSuggestionCardProps
  extends HTMLAttributes<HTMLDivElement> {
  suggestions: CareerSuggestion[];
}

interface TypeConfig {
  icon: LucideIcon;
  label: string;
  variant: "ai" | "success" | "info" | "warning";
}

const typeConfigs: Record<string, TypeConfig> = {
  role: { icon: Briefcase, label: "Role", variant: "ai" },
  certification: { icon: Award, label: "Certification", variant: "success" },
  skill: { icon: Wrench, label: "Skill", variant: "info" },
  industry: { icon: Building2, label: "Industry", variant: "warning" },
};

const CareerSuggestionCard = forwardRef<
  HTMLDivElement,
  CareerSuggestionCardProps
>(({ className, suggestions, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      variant="default"
      padding="lg"
      className={cn("", className)}
      role="region"
      aria-label="Career suggestions"
      {...props}
    >
      <CardHeader>
        <CardTitle>Career Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((s) => {
            const config: TypeConfig = (typeConfigs[s.type] ?? typeConfigs["role"])!;
            const Icon = config.icon;
            const variantClass =
              config.variant === "ai"
                ? "bg-ai/10 text-ai"
                : config.variant === "success"
                  ? "bg-success/10 text-success"
                  : config.variant === "info"
                    ? "bg-info/10 text-info"
                    : "bg-warning/10 text-warning";

            return (
              <div
                key={s.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface-0 p-3"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    variantClass
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-label font-medium text-primary">
                      {s.title}
                    </span>
                    <Badge variant={config.variant} size="xs">
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-caption text-secondary mt-0.5">
                    {s.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-smallest text-tertiary">
                      Relevance:
                    </span>
                    <span
                      className={cn(
                        "text-smallest font-medium",
                        s.relevance >= 80
                          ? "text-success"
                          : s.relevance >= 60
                            ? "text-warning"
                            : "text-tertiary"
                      )}
                    >
                      {s.relevance}%
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="xs">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});
CareerSuggestionCard.displayName = "CareerSuggestionCard";

export { CareerSuggestionCard };
