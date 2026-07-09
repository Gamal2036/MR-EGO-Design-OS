"use client";

import { Wrench, ToggleLeft, ToggleRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AssistantTool } from "@/types/assistant";

interface AssistantToolsProps {
  tools: AssistantTool[];
}

export function AssistantTools({ tools }: AssistantToolsProps) {
  if (tools.length === 0) return null;

  return (
    <Card variant="default" padding="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-label font-medium">
          <Wrench className="h-4 w-4 text-ai" aria-hidden="true" />
          Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface-1 p-2.5"
            >
              <div className="min-w-0">
                <p className="text-caption font-medium text-primary">{tool.name}</p>
                <p className="text-smallest text-tertiary">{tool.description}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 ml-2",
                  tool.enabled ? "text-success" : "text-tertiary",
                )}
                aria-label={tool.enabled ? "Enabled" : "Disabled"}
              >
                {tool.enabled ? (
                  <ToggleRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ToggleLeft className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
