"use client";

import { Cpu } from "lucide-react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import type { Assistant } from "@/types/assistant";

interface AssistantProviderProps {
  assistant: Assistant;
}

export function AssistantProvider({ assistant }: AssistantProviderProps) {
  return (
    <Card variant="default" padding="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-label font-medium">
          <Cpu className="h-4 w-4 text-ai" aria-hidden="true" />
          Provider
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-caption text-tertiary">Provider</span>
            <Badge variant="outline" size="xs">{assistant.provider}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-caption text-tertiary">Model</span>
            <span className="text-caption text-primary font-medium">{assistant.model}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-caption text-tertiary">Status</span>
            <Badge
              variant={
                assistant.status === "online" ? "success"
                  : assistant.status === "busy" ? "warning"
                  : assistant.status === "away" ? "info"
                  : "neutral"
              }
              size="xs"
            >
              {assistant.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
