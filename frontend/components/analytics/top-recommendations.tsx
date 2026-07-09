"use client";

import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import type { TopRecommendation } from "@/types/analytics";

interface TopRecommendationsProps {
  recommendations: TopRecommendation[];
}

export function TopRecommendations({ recommendations }: TopRecommendationsProps) {
  return (
    <Card variant="default" padding="md" role="region" aria-label="Top recommendations">
      <CardHeader
        action={
          <Badge variant="ai" size="sm">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
            AI Powered
          </Badge>
        }
      >
        <CardTitle>Top Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3" role="list">
          {recommendations.map((rec) => (
            <li
              key={rec.id}
              className="group rounded-lg border border-border bg-surface-1 p-4 transition-colors duration-fast hover:border-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-body font-semibold text-primary">{rec.title}</h3>
                    <Badge
                      variant={
                        rec.impact === "high" ? "danger" : rec.impact === "medium" ? "warning" : "info"
                      }
                      size="xs"
                    >
                      {rec.impact} impact
                    </Badge>
                  </div>
                  <p className="text-caption text-secondary">{rec.description}</p>
                  <p className="text-caption text-tertiary mt-2">{rec.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-fast focus-visible:opacity-100"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => {
                    // Placeholder for future routing
                  }}
                >
                  {rec.actionLabel}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
