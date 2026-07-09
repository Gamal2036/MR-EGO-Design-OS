"use client";

import { Award, Calendar, GraduationCap, Plus } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { EducationCertifications } from "@/types/profile";

interface EducationCertificationPanelProps extends HTMLAttributes<HTMLDivElement> {
  educationCertifications: EducationCertifications;
}

const EducationCertificationPanel = forwardRef<HTMLDivElement, EducationCertificationPanelProps>(
  ({ className, educationCertifications, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Education and Certifications"
        {...props}
      >
        <PanelHeader>
          <h2 className="text-heading-4 text-primary">Education & Certifications</h2>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Education</h3>
              </div>
              <div className="space-y-3">
                {educationCertifications.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-lg border border-border bg-surface-0 p-3 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-body font-medium text-primary">{edu.institution}</p>
                        <p className="text-body-small text-secondary">
                          {edu.degree} in {edu.field}
                        </p>
                      </div>
                      {edu.gpa && (
                        <Badge variant="success" size="xs">GPA: {edu.gpa}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-smallest text-tertiary">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  leftIcon={<Plus className="h-3 w-3" />}
                  disabled
                  title="Coming Soon"
                >
                  Add Education
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Certifications</h3>
              </div>
              <div className="space-y-3">
                {educationCertifications.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-lg border border-border bg-surface-0 p-3 space-y-1"
                  >
                    <div className="min-w-0">
                      <p className="text-body font-medium text-primary">{cert.name}</p>
                      <p className="text-body-small text-secondary">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-2 text-smallest text-tertiary">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      Obtained: {cert.date}
                      {cert.expiryDate && ` · Expires: ${cert.expiryDate}`}
                    </div>
                    {cert.credentialId && (
                      <p className="text-smallest text-tertiary">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  leftIcon={<Plus className="h-3 w-3" />}
                  disabled
                  title="Coming Soon"
                >
                  Add Certification
                </Button>
              </div>
            </div>
          </div>
        </PanelBody>
      </Panel>
    );
  }
);
EducationCertificationPanel.displayName = "EducationCertificationPanel";

export { EducationCertificationPanel };
export type { EducationCertificationPanelProps };
