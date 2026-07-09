"use client";

import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { Card } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
] as const;

export function SkillsSection() {
  const skills = useCVBuilderStore((s) => s.cvData.skills);
  const addSkill = useCVBuilderStore((s) => s.addSkill);
  const updateSkill = useCVBuilderStore((s) => s.updateSkill);
  const removeSkill = useCVBuilderStore((s) => s.removeSkill);

  return (
    <section aria-label="Skills">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Skills</h3>
            <p className="text-body-small text-secondary mt-1">
              Technical and professional skills
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addSkill} aria-label="Add skill">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {skills.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No skills added yet. Click &ldquo;Add&rdquo; to list your skills.
          </p>
        )}

        <div className="space-y-3">
          {skills.map((skill) => (
            <Card key={skill.id} variant="outline" padding="md">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <div>
                      <label htmlFor={`skill-name-${skill.id}`} className="sr-only">
                        Skill name
                      </label>
                      <Input
                        id={`skill-name-${skill.id}`}
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        placeholder="e.g. React, Python,项目管理"
                        size="sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`skill-category-${skill.id}`} className="sr-only">
                        Category
                      </label>
                      <Input
                        id={`skill-category-${skill.id}`}
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                        placeholder="e.g. Frontend, Backend"
                        size="sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`skill-level-${skill.id}`} className="sr-only">
                        Proficiency level
                      </label>
                      <select
                        id={`skill-level-${skill.id}`}
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                        className="flex h-input-sm w-full rounded-lg border border-input bg-background px-3 text-caption ring-offset-background transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="Proficiency level"
                      >
                        {SKILL_LEVELS.map((l) => (
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
                  onClick={() => removeSkill(skill.id)}
                  aria-label={`Remove ${skill.name || "skill"}`}
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
