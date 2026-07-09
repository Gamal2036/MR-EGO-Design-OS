"use client";

import { ArrowRight, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { NextBestAction } from "@/types/career-progress";

export interface NextBestActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: NextBestAction;
  onDismiss?: () => void;
}

const NextBestActionCard = forwardRef<HTMLDivElement, NextBestActionCardProps>(
  ({ className, action, onDismiss, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="ai"
        padding="lg"
        className={cn("border-ai/30 shadow-ai-card", className)}
        role="region"
        aria-label="Next best action"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-ai/10 p-1.5">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
            </div>
            <Badge variant="ai" size="sm">
              AI Recommended
            </Badge>
            <Badge variant="success" size="xs">
              {Math.round(action.confidence * 100)}% confidence
            </Badge>
          </div>
          <CardTitle className="mt-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-ai" aria-hidden="true" />
            {action.title}
          </CardTitle>
          <CardDescription>{action.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            {action.actionHref ? (
              <Button asChild variant="primary" size="md">
                <Link href={action.actionHref}>
                  {action.actionLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <Button variant="primary" size="md" disabled>
                {action.actionLabel}
              </Button>
            )}
            {onDismiss && (
              <Button variant="ghost" size="md" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
NextBestActionCard.displayName = "NextBestActionCard";

export { NextBestActionCard };
