"use client";

import { Input } from "@/components/forms/input";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function PersonalInfoSection() {
  const personalInfo = useCVBuilderStore((s) => s.cvData.personalInfo);
  const updatePersonalInfo = useCVBuilderStore((s) => s.updatePersonalInfo);

  const fields = [
    { key: "fullName", label: "Full Name", placeholder: "John Doe", type: "text" },
    { key: "title", label: "Professional Title", placeholder: "Senior Software Engineer", type: "text" },
    { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", type: "tel" },
    { key: "location", label: "Location", placeholder: "San Francisco, CA", type: "text" },
    { key: "linkedIn", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/johndoe", type: "url" },
    { key: "website", label: "Website", placeholder: "https://johndoe.com", type: "url" },
    { key: "github", label: "GitHub URL", placeholder: "https://github.com/johndoe", type: "url" },
  ] as const;

  return (
    <section aria-label="Personal Information">
      <div className="space-y-5">
        <div>
          <h3 className="text-heading-4 text-primary">Personal Information</h3>
          <p className="text-body-small text-secondary mt-1">
            Your basic contact details and online presence
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.key === "fullName" || field.key === "title" ? "sm:col-span-2" : ""}>
              <label
                htmlFor={`pi-${field.key}`}
                className="block text-label text-secondary mb-1.5"
              >
                {field.label}
              </label>
              <Input
                id={`pi-${field.key}`}
                type={field.type}
                value={personalInfo[field.key as keyof typeof personalInfo] as string}
                onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                placeholder={field.placeholder}
                autoComplete={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "off"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
