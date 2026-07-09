"use client";

import { Download, RefreshCw, Share2, Target } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { QuickAction } from "@/types/analytics";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Download,
  Share2,
  Target,
  RefreshCw,
};

interface QuickActionsProps {
  actions: QuickAction[];
  onAction?: (action: QuickAction) => void;
}

export function QuickActions({ actions, onAction }: QuickActionsProps) {
  return (
    <Card variant="default" padding="md" role="region" aria-label="Quick actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => {
            const Icon = ICONS[action.icon] ?? Target;
            return (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className={cn(
                  "h-auto flex-col items-start gap-1 whitespace-normal p-4 text-left",
                  "border-border bg-surface-1 hover:bg-surface-2 hover:border-hover"
                )}
                leftIcon={<Icon className="h-5 w-5 text-analytics" aria-hidden="true" />}
                onClick={() => onAction?.(action)}
              >
                <span className="text-body-small font-semibold text-primary block">{action.label}</span>
                <span className="text-caption text-tertiary font-normal">{action.description}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
