"use client";

import { FileText, Download, Save, Eye, EyeOff } from "lucide-react";

import { CVCompletionScore } from "./cv-completion-score";

import { Button } from "@/components/foundation/button";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function CVBuilderHeader() {
  const isDirty = useCVBuilderStore((s) => s.isDirty);
  const togglePreview = useCVBuilderStore((s) => s.togglePreview);
  const previewVisible = useCVBuilderStore((s) => s.previewVisible);
  const markSaved = useCVBuilderStore((s) => s.markSaved);

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cv/10">
          <FileText className="h-5 w-5 text-cv" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="text-heading-3 text-primary truncate">CV Builder</h1>
          <p className="text-body-small text-secondary">Create and edit your professional CV</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <CVCompletionScore />

        <div className="hidden sm:flex h-6 w-px bg-border" role="separator" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePreview}
            aria-label={previewVisible ? "Hide preview" : "Show preview"}
          >
            {previewVisible ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
            {previewVisible ? "Hide" : "Preview"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={markSaved}
            disabled={!isDirty}
            aria-label={isDirty ? "Save draft (not yet functional)" : "No changes to save"}
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled
            aria-label="Export PDF (coming soon)"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
