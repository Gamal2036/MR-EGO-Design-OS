"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCVBuilderStore } from "@/stores/cv-builder-store";
import { CV_TEMPLATES } from "@/types/cv-builder";

export function CVTemplateSelector() {
  const selectedTemplate = useCVBuilderStore((s) => s.selectedTemplate);
  const setSelectedTemplate = useCVBuilderStore((s) => s.setSelectedTemplate);

  return (
    <div className="space-y-3">
      <h3 className="text-label text-secondary">Template</h3>
      <div className="grid grid-cols-2 gap-2">
        {CV_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={cn(
              "relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selectedTemplate === template.id
                ? "border-cv-500 bg-cv/5 ring-1 ring-cv-500"
                : "border-border hover:border-hover hover:bg-accent"
            )}
            aria-label={`Select ${template.name} template`}
            aria-pressed={selectedTemplate === template.id}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2">
                <Check className="h-3.5 w-3.5 text-cv-500" aria-hidden="true" />
              </div>
            )}
            <div className="h-8 w-6 rounded border border-current opacity-40" aria-hidden="true" />
            <div>
              <p className="text-caption font-medium text-primary">{template.name}</p>
              <p className="text-smallest text-tertiary">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
