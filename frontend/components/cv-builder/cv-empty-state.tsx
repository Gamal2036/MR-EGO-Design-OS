"use client";

import { FileText } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function CVEmptyState() {
  const addExperience = useCVBuilderStore((s) => s.addExperience);
  const addEducation = useCVBuilderStore((s) => s.addEducation);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cv/10 mb-5">
        <FileText className="h-8 w-8 text-cv" aria-hidden="true" />
      </div>
      <h2 className="text-heading-4 text-primary mb-2">Start Building Your CV</h2>
      <p className="text-body text-secondary max-w-sm mb-6">
        Fill in your information section by section. Your CV preview will update in real time.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="primary" size="sm" onClick={addExperience}>
          Add Experience
        </Button>
        <Button variant="outline" size="sm" onClick={addEducation}>
          Add Education
        </Button>
      </div>
    </div>
  );
}
