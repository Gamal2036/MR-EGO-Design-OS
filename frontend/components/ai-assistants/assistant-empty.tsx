"use client";

import { Bot } from "lucide-react";

import { EmptyState } from "@/components/feedback/empty-state";

export function AssistantEmpty() {
  return (
    <EmptyState
      icon={<Bot className="h-12 w-12" />}
      title="No assistants available"
      description="No AI assistants match your current filters. Try adjusting your search or filter criteria."
    />
  );
}
