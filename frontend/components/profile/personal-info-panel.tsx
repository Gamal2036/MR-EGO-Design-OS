"use client";

import { Globe, Link, Mail, MapPin, Phone } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Input } from "@/components/forms/input";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { PersonalInfo } from "@/types/profile";

interface PersonalInfoPanelProps extends HTMLAttributes<HTMLDivElement> {
  personalInfo: PersonalInfo;
  isEditing?: boolean;
  onUpdate?: (info: Partial<PersonalInfo>) => void;
}

const PersonalInfoPanel = forwardRef<HTMLDivElement, PersonalInfoPanelProps>(
  ({ className, personalInfo, isEditing, onUpdate, ...props }, ref) => {
    const fields: {
      label: string;
      value: string;
      icon: React.ElementType;
      key: keyof PersonalInfo;
      href?: string;
    }[] = [
      { label: "Email", value: personalInfo.email, icon: Mail, key: "email" },
      { label: "Phone", value: personalInfo.phone, icon: Phone, key: "phone" },
      { label: "Location", value: personalInfo.location, icon: MapPin, key: "location" },
      { label: "Website", value: personalInfo.website, icon: Globe, key: "website", href: personalInfo.website },
      { label: "LinkedIn", value: personalInfo.linkedin, icon: Link, key: "linkedin", href: personalInfo.linkedin },
      { label: "GitHub", value: personalInfo.github, icon: Link, key: "github", href: personalInfo.github },
    ];

    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Personal Information"
        {...props}
      >
        <PanelHeader>
          <h2 className="text-heading-4 text-primary">Personal Information</h2>
        </PanelHeader>
        <PanelBody>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-caption text-secondary block mb-1.5">Full Name</label>
                  <Input
                    value={personalInfo.fullName}
                    onChange={(e) => onUpdate?.({ fullName: e.target.value })}
                    aria-label="Full name"
                  />
                </div>
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-caption text-secondary block mb-1.5">{field.label}</label>
                    <Input
                      value={field.value}
                      onChange={(e) => onUpdate?.({ [field.key]: e.target.value })}
                      aria-label={field.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className="flex items-start gap-3">
                    <div className="rounded-lg bg-cyan-500/10 p-2 mt-0.5" aria-hidden="true">
                      <Icon className="h-4 w-4 text-cyan" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-caption text-tertiary">{field.label}</p>
                      {field.href ? (
                        <a
                          href={field.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body text-primary hover:text-link truncate block transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {field.value}
                        </a>
                      ) : (
                        <p className="text-body text-primary truncate">{field.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </PanelBody>
      </Panel>
    );
  }
);
PersonalInfoPanel.displayName = "PersonalInfoPanel";

export { PersonalInfoPanel };
export type { PersonalInfoPanelProps };
