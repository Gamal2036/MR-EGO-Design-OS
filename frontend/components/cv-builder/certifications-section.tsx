"use client";

import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/forms/input";
import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/foundation/button";
import { Card, CardHeader, CardTitle } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function CertificationsSection() {
  const certifications = useCVBuilderStore((s) => s.cvData.certifications);
  const addCertification = useCVBuilderStore((s) => s.addCertification);
  const updateCertification = useCVBuilderStore((s) => s.updateCertification);
  const removeCertification = useCVBuilderStore((s) => s.removeCertification);

  return (
    <section aria-label="Certifications">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-heading-4 text-primary">Certifications</h3>
            <p className="text-body-small text-secondary mt-1">
              Professional certifications and licenses
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addCertification} aria-label="Add certification">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>

        {certifications.length === 0 && (
          <p className="text-body text-tertiary py-8 text-center border border-dashed border-border rounded-xl">
            No certifications added yet. Click &ldquo;Add&rdquo; to include your credentials.
          </p>
        )}

        <div className="space-y-4">
          {certifications.map((cert) => (
            <Card key={cert.id} variant="outline" padding="lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-body text-secondary font-medium">
                    {cert.name || "New Certification"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeCertification(cert.id)}
                    aria-label={`Remove ${cert.name || "certification"}`}
                    className="text-danger hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={`cert-name-${cert.id}`} className="block text-label text-secondary mb-1.5">
                      Certification Name
                    </label>
                    <Input
                      id={`cert-name-${cert.id}`}
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div>
                    <label htmlFor={`cert-issuer-${cert.id}`} className="block text-label text-secondary mb-1.5">
                      Issuer
                    </label>
                    <Input
                      id={`cert-issuer-${cert.id}`}
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <label htmlFor={`cert-date-${cert.id}`} className="block text-label text-secondary mb-1.5">
                      Date
                    </label>
                    <Input
                      id={`cert-date-${cert.id}`}
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      placeholder="Jun 2024"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`cert-url-${cert.id}`} className="block text-label text-secondary mb-1.5">
                      Credential URL (optional)
                    </label>
                    <Input
                      id={`cert-url-${cert.id}`}
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
                      placeholder="https://credential.example.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`cert-desc-${cert.id}`} className="block text-label text-secondary mb-1.5">
                    Description (optional)
                  </label>
                  <Textarea
                    id={`cert-desc-${cert.id}`}
                    value={cert.description}
                    onChange={(e) => updateCertification(cert.id, "description", e.target.value)}
                    placeholder="Brief description of the certification"
                    rows={2}
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
