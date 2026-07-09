"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { useCVBuilderStore } from "@/stores/cv-builder-store";
import { CV_SECTION_LABELS } from "@/types/cv-builder";

export function CVMissingChecklist() {
  const getMissingSections = useCVBuilderStore((s) => s.getMissingSections);
  const getCompletionScore = useCVBuilderStore((s) => s.getCompletionScore);
  const setActiveSection = useCVBuilderStore((s) => s.setActiveSection);
  const missing = getMissingSections();
  const score = getCompletionScore();

  if (score >= 100) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cv/5 text-cv-600 text-caption">
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>All sections complete</span>
      </div>
    );
  }

  if (missing.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-overline text-tertiary uppercase tracking-wider px-3">
        Missing Sections
      </h3>
      <div className="space-y-0.5">
        {missing.map((id) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-caption text-secondary hover:bg-accent hover:text-accent-foreground transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-warning-500" aria-hidden="true" />
            <span className="truncate">{CV_SECTION_LABELS[id]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
