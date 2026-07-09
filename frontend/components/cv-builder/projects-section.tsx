"use client";

import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/foundation/button";
import { Card, CardHeader, CardTitle } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function ProjectsSection() {
  const projects = useCVBuilderStore((s) => s.cvData.projects);
  const addProject = useCVBuilderStore((s) => s.addProject);
  const updateProject = useCVBuilderStore((s) => s.updateProject);
  const removeProject = useCVBuilderStore((s) => s.removeProject);

  return (
    <section aria-label="Projects">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Projects</h3>
            <p className="text-body-small text-secondary mt-1">
              Notable projects you have worked on
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addProject} aria-label="Add project">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {projects.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No projects added yet. Click &ldquo;Add&rdquo; to showcase your work.
          </p>
        )}

        <div className="space-y-4">
          {projects.map((proj) => (
            <Card key={proj.id} variant="outline" padding="lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-body text-secondary font-medium">
                    {proj.name || "New Project"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeProject(proj.id)}
                    aria-label={`Remove ${proj.name || "project"}`}
                    className="text-danger hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={`proj-name-${proj.id}`} className="block text-label text-secondary mb-1.5">
                      Project Name
                    </label>
                    <Input
                      id={`proj-name-${proj.id}`}
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label htmlFor={`proj-role-${proj.id}`} className="block text-label text-secondary mb-1.5">
                      Role
                    </label>
                    <Input
                      id={`proj-role-${proj.id}`}
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, "role", e.target.value)}
                      placeholder="Lead Developer"
                    />
                  </div>
                  <div>
                    <label htmlFor={`proj-url-${proj.id}`} className="block text-label text-secondary mb-1.5">
                      URL (optional)
                    </label>
                    <Input
                      id={`proj-url-${proj.id}`}
                      value={proj.url}
                      onChange={(e) => updateProject(proj.id, "url", e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label htmlFor={`proj-start-${proj.id}`} className="block text-label text-secondary mb-1.5">
                      Start Date
                    </label>
                    <Input
                      id={`proj-start-${proj.id}`}
                      value={proj.startDate}
                      onChange={(e) => updateProject(proj.id, "startDate", e.target.value)}
                      placeholder="Jan 2023"
                    />
                  </div>
                  <div>
                    <label htmlFor={`proj-end-${proj.id}`} className="block text-label text-secondary mb-1.5">
                      End Date
                    </label>
                    <Input
                      id={`proj-end-${proj.id}`}
                      value={proj.endDate}
                      onChange={(e) => updateProject(proj.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`proj-desc-${proj.id}`} className="block text-label text-secondary mb-1.5">
                    Description
                  </label>
                  <Textarea
                    id={`proj-desc-${proj.id}`}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                    placeholder="Describe the project, your contributions, and impact"
                    rows={3}
                  />
                </div>

                <div>
                  <label htmlFor={`proj-tech-${proj.id}`} className="block text-label text-secondary mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <Input
                    id={`proj-tech-${proj.id}`}
                    value={proj.technologies.join(", ")}
                    onChange={(e) => updateProject(proj.id, "technologies", e.target.value.split(", ").filter(Boolean))}
                    placeholder="React, Node.js, TypeScript, PostgreSQL"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
