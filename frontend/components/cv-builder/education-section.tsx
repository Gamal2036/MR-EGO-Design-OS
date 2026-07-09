"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { Card, CardHeader, CardTitle } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function EducationSection() {
  const education = useCVBuilderStore((s) => s.cvData.education);
  const addEducation = useCVBuilderStore((s) => s.addEducation);
  const updateEducation = useCVBuilderStore((s) => s.updateEducation);
  const updateEducationAchievement = useCVBuilderStore((s) => s.updateEducationAchievement);
  const addEducationAchievement = useCVBuilderStore((s) => s.addEducationAchievement);
  const removeEducationAchievement = useCVBuilderStore((s) => s.removeEducationAchievement);
  const removeEducation = useCVBuilderStore((s) => s.removeEducation);

  return (
    <section aria-label="Education">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Education</h3>
            <p className="text-body-small text-secondary mt-1">
              Your academic background and qualifications
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addEducation} aria-label="Add education">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {education.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No education added yet. Click &ldquo;Add&rdquo; to include your academic background.
          </p>
        )}

        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} variant="outline" padding="lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-body text-secondary font-medium">
                    {edu.degree || "New Education"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeEducation(edu.id)}
                    aria-label={`Remove ${edu.degree || "education"}`}
                    className="text-danger hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={`edu-inst-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      Institution
                    </label>
                    <Input
                      id={`edu-inst-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University or school name"
                    />
                  </div>
                  <div>
                    <label htmlFor={`edu-degree-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      Degree
                    </label>
                    <Input
                      id={`edu-degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label htmlFor={`edu-field-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      Field of Study
                    </label>
                    <Input
                      id={`edu-field-${edu.id}`}
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label htmlFor={`edu-start-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      Start Date
                    </label>
                    <Input
                      id={`edu-start-${edu.id}`}
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      placeholder="Sep 2016"
                    />
                  </div>
                  <div>
                    <label htmlFor={`edu-end-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      End Date
                    </label>
                    <Input
                      id={`edu-end-${edu.id}`}
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      placeholder="Jun 2020"
                    />
                  </div>
                  <div>
                    <label htmlFor={`edu-gpa-${edu.id}`} className="block text-label text-secondary mb-1.5">
                      GPA (optional)
                    </label>
                    <Input
                      id={`edu-gpa-${edu.id}`}
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="3.8 / 4.0"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-label text-secondary">Achievements</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => addEducationAchievement(edu.id)}
                      aria-label="Add achievement"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <GripVertical className="h-4 w-4 mt-2.5 text-tertiary shrink-0" aria-hidden="true" />
                        <Input
                          value={achievement}
                          onChange={(e) => updateEducationAchievement(edu.id, idx, e.target.value)}
                          placeholder="Honors, awards, or notable achievements"
                          className="flex-1"
                          aria-label={`Achievement ${idx + 1}`}
                        />
                        {edu.achievements.length > 1 && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => removeEducationAchievement(edu.id, idx)}
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
