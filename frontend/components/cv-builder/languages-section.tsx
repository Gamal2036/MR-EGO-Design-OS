"use client";

import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { Card } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

const PROFICIENCY_LEVELS = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
] as const;

export function LanguagesSection() {
  const languages = useCVBuilderStore((s) => s.cvData.languages);
  const addLanguage = useCVBuilderStore((s) => s.addLanguage);
  const updateLanguage = useCVBuilderStore((s) => s.updateLanguage);
  const removeLanguage = useCVBuilderStore((s) => s.removeLanguage);

  return (
    <section aria-label="Languages">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Languages</h3>
            <p className="text-body-small text-secondary mt-1">
              Languages you speak and your proficiency level
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addLanguage} aria-label="Add language">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {languages.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No languages added yet. Click &ldquo;Add&rdquo; to list your languages.
          </p>
        )}

        <div className="space-y-3">
          {languages.map((lang) => (
            <Card key={lang.id} variant="outline" padding="md">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                    <div>
                      <label htmlFor={`lang-name-${lang.id}`} className="sr-only">
                        Language name
                      </label>
                      <Input
                        id={`lang-name-${lang.id}`}
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                        placeholder="e.g. English, Spanish"
                        size="sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`lang-prof-${lang.id}`} className="sr-only">
                        Proficiency
                      </label>
                      <select
                        id={`lang-prof-${lang.id}`}
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                        className="flex h-input-sm w-full rounded-lg border border-input bg-background px-3 text-caption ring-offset-background transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="Proficiency level"
                      >
                        {PROFICIENCY_LEVELS.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => removeLanguage(lang.id)}
                  aria-label={`Remove ${lang.name || "language"}`}
                  className="text-danger hover:text-danger shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
