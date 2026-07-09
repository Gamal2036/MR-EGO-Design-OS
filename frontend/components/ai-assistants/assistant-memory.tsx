"use client";

import { Brain, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import type { AssistantMemory as AssistantMemoryType } from "@/types/assistant";

interface AssistantMemoryProps {
  memory: AssistantMemoryType[];
}

export function AssistantMemory({ memory }: AssistantMemoryProps) {
  if (memory.length === 0) return null;

  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-body-small">
          <Brain className="h-4 w-4 text-ai" aria-hidden="true" />
          AI Memory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {memory.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-surface-1 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-caption font-medium text-primary">{item.key}</p>
                  <p className="text-smallest text-secondary mt-0.5">{item.value}</p>
                </div>
                <span className="flex items-center gap-1 text-smallest text-tertiary shrink-0">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
