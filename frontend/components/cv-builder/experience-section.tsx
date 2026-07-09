"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/foundation/button";
import { Card, CardHeader, CardTitle } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function ExperienceSection() {
  const experience = useCVBuilderStore((s) => s.cvData.experience);
  const addExperience = useCVBuilderStore((s) => s.addExperience);
  const updateExperience = useCVBuilderStore((s) => s.updateExperience);
  const updateExperienceHighlight = useCVBuilderStore((s) => s.updateExperienceHighlight);
  const addExperienceHighlight = useCVBuilderStore((s) => s.addExperienceHighlight);
  const removeExperienceHighlight = useCVBuilderStore((s) => s.removeExperienceHighlight);
  const removeExperience = useCVBuilderStore((s) => s.removeExperience);

  return (
    <section aria-label="Experience">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Experience</h3>
            <p className="text-body-small text-secondary mt-1">
              Your work history, from most recent
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addExperience} aria-label="Add experience">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {experience.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No experience added yet. Click &ldquo;Add&rdquo; to include your work history.
          </p>
        )}

        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.id} variant="outline" padding="lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-body text-secondary font-medium">
                    {exp.position || "New Position"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeExperience(exp.id)}
                    aria-label={`Remove ${exp.position || "experience"}`}
                    className="text-danger hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`exp-company-${exp.id}`} className="block text-label text-secondary mb-1.5">
                      Company
                    </label>
                    <Input
                      id={`exp-company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor={`exp-position-${exp.id}`} className="block text-label text-secondary mb-1.5">
                      Position
                    </label>
                    <Input
                      id={`exp-position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <label htmlFor={`exp-location-${exp.id}`} className="block text-label text-secondary mb-1.5">
                      Location
                    </label>
                    <Input
                      id={`exp-location-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label htmlFor={`exp-start-${exp.id}`} className="block text-label text-secondary mb-1.5">
                        Start Date
                      </label>
                      <Input
                        id={`exp-start-${exp.id}`}
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor={`exp-end-${exp.id}`} className="block text-label text-secondary mb-1.5">
                        End Date
                      </label>
                      <Input
                        id={`exp-end-${exp.id}`}
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder="Present"
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`exp-current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <label htmlFor={`exp-current-${exp.id}`} className="text-body-small text-secondary">
                    I currently work here
                  </label>
                </div>

                <div>
                  <label htmlFor={`exp-desc-${exp.id}`} className="block text-label text-secondary mb-1.5">
                    Description
                  </label>
                  <Textarea
                    id={`exp-desc-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Brief description of your role and responsibilities"
                    rows={3}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-label text-secondary">Key Achievements</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => addExperienceHighlight(exp.id)}
                      aria-label="Add achievement"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <GripVertical className="h-4 w-4 mt-2.5 text-tertiary shrink-0" aria-hidden="true" />
                        <Input
                          value={highlight}
                          onChange={(e) => updateExperienceHighlight(exp.id, idx, e.target.value)}
                          placeholder="Describe an achievement or responsibility"
                          className="flex-1"
                          aria-label={`Achievement ${idx + 1}`}
                        />
                        {exp.highlights.length > 1 && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => removeExperienceHighlight(exp.id, idx)}
                            aria-label={`Remove achievement ${idx + 1}`}
                            className="text-danger hover:text-danger mt-0.5"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
