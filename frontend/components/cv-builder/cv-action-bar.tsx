"use client";

import { Save, Download, Sparkles, RotateCcw } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function CVActionBar() {
  const isDirty = useCVBuilderStore((s) => s.isDirty);
  const markSaved = useCVBuilderStore((s) => s.markSaved);
  const toggleAIPanel = useCVBuilderStore((s) => s.toggleAIPanel);
  const resetCV = useCVBuilderStore((s) => s.resetCV);
  const getCompletionScore = useCVBuilderStore((s) => s.getCompletionScore);

  const score = getCompletionScore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-sticky border-t border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-12 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-cv-500 transition-all duration-x-slow"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-caption text-secondary tabular-nums">{score}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={toggleAIPanel} aria-label="Toggle AI suggestions">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="sm" disabled aria-label="Export (coming soon)">
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={markSaved}
            disabled={!isDirty}
            aria-label="Save draft"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetCV} aria-label="Reset CV">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
