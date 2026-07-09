"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CoachAdvice } from "@/types/coach";

export interface CareerAdvisorProps extends HTMLAttributes<HTMLDivElement> {
  advice: CoachAdvice;
}

const CareerAdvisor = forwardRef<HTMLDivElement, CareerAdvisorProps>(
  ({ className, advice, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="ai"
        padding="lg"
        className={cn("h-full border-ai/30 shadow-ai-card", className)}
        role="region"
        aria-label="Today's coaching advice"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-ai/10 p-1.5">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
            </div>
            <Badge variant="ai" size="sm">
              {advice.category}
            </Badge>
          </div>
          <CardTitle className="mt-2">{advice.title}</CardTitle>
          <CardDescription>{advice.message}</CardDescription>
        </CardHeader>
        <CardContent>
          {advice.actionHref ? (
            <Button asChild variant="primary" size="md">
              <Link href={advice.actionHref}>
                {advice.actionLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button variant="primary" size="md" disabled>
              {advice.actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
);
CareerAdvisor.displayName = "CareerAdvisor";

export { CareerAdvisor };
