"use client";

import {
  Code2,
  Layers,
  TrendingUp,
  GraduationCap,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Strength } from "@/types/cv-analysis";

export interface StrengthCardProps extends HTMLAttributes<HTMLDivElement> {
  strengths: Strength[];
}

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  TrendingUp,
  GraduationCap,
  Zap,
};

const StrengthCard = forwardRef<HTMLDivElement, StrengthCardProps>(
  ({ className, strengths, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="success"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Strengths"
        {...props}
      >
        <CardHeader>
          <CardTitle>Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strengths.map((s) => {
              const Icon = iconMap[s.icon] || Zap;
              return (
                <div
                  key={s.id}
                  className="flex gap-3 rounded-lg bg-success/5 p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
                    <Icon
                      className="h-4 w-4 text-success"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-label font-medium text-primary">
                      {s.title}
                    </p>
                    <p className="text-caption text-secondary mt-0.5">
                      {s.description}
                    </p>
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
StrengthCard.displayName = "StrengthCard";

export { StrengthCard };
