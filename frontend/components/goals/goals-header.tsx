"use client";

import { Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { Breadcrumb, type BreadcrumbItem } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

export interface GoalsHeaderProps {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  onCreate?: () => void;
  onAIAssist?: () => void;
}

export function GoalsHeader({
  title = "Smart Goals",
  description = "Define, track, and achieve your career, learning, and personal objectives with AI guidance.",
  breadcrumbs,
  className,
  onCreate,
  onAIAssist,
}: GoalsHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-heading-2 text-primary font-semibold">{title}</h1>
          <p className="max-w-2xl text-body-small text-secondary">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {onAIAssist && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="h-4 w-4" />}
              onClick={onAIAssist}
            >
              AI Assist
            </Button>
          )}
          {onCreate && (
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={onCreate}>
              New Goal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
