"use client";

import {
  Briefcase,
  Calendar,
  Clock,
  Globe,
  Target,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Input } from "@/components/forms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select";
import { Badge } from "@/components/foundation/badge";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type {
  Availability,
  CareerIdentity,
  ContractType,
  CurrentLevel,
  WorkPreference,
} from "@/types/profile";

interface CareerIdentityPanelProps extends HTMLAttributes<HTMLDivElement> {
  careerIdentity: CareerIdentity;
  isEditing?: boolean;
  onUpdate?: (identity: Partial<CareerIdentity>) => void;
}

const levelLabels: Record<CurrentLevel, string> = {
  junior: "Junior",
  mid: "Mid-Level",
  senior: "Senior",
  lead: "Lead",
  manager: "Manager",
  executive: "Executive",
  freelancer: "Freelancer",
};

const availabilityLabels: Record<Availability, string> = {
  immediately: "Immediately",
  "2-weeks": "2 Weeks Notice",
  "1-month": "1 Month Notice",
  "3-months": "3 Months Notice",
  "not-searching": "Not Searching",
};

const workPreferenceLabels: Record<WorkPreference, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  "on-site": "On-Site",
  flexible: "Flexible",
};

const contractTypeLabels: Record<ContractType, string> = {
  permanent: "Permanent",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
  any: "Any",
};

const CareerIdentityPanel = forwardRef<HTMLDivElement, CareerIdentityPanelProps>(
  ({ className, careerIdentity, isEditing, onUpdate, ...props }, ref) => {
    const identityFields: {
      label: string;
      value: string;
      icon: React.ElementType;
    }[] = [
      {
        label: "Current Level",
        value: levelLabels[careerIdentity.currentLevel],
        icon: Briefcase,
      },
      {
        label: "Availability",
        value: availabilityLabels[careerIdentity.availability],
        icon: Clock,
      },
      {
        label: "Work Preference",
        value: workPreferenceLabels[careerIdentity.workPreference],
        icon: Globe,
      },
      {
        label: "Contract Type",
        value: contractTypeLabels[careerIdentity.contractTypePreference],
        icon: Calendar,
      },
    ];

    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Career Identity"
        {...props}
      >
        <PanelHeader>
          <h2 className="text-heading-4 text-primary">Career Identity</h2>
        </PanelHeader>
        <PanelBody>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-caption text-secondary block mb-1.5">Target Role</label>
                <Input
                  value={careerIdentity.targetRole}
                  onChange={(e) => onUpdate?.({ targetRole: e.target.value })}
                  aria-label="Target role"
                />
              </div>
              <div>
                <label className="text-caption text-secondary block mb-1.5">Current Level</label>
                <Select
                  value={careerIdentity.currentLevel}
                  onValueChange={(v) => onUpdate?.({ currentLevel: v as CurrentLevel })}
                >
                  <SelectTrigger aria-label="Current level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(levelLabels) as [CurrentLevel, string][]).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-caption text-secondary block mb-1.5">Availability</label>
                <Select
                  value={careerIdentity.availability}
                  onValueChange={(v) => onUpdate?.({ availability: v as Availability })}
                >
                  <SelectTrigger aria-label="Availability">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(availabilityLabels) as [Availability, string][]).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-caption text-secondary block mb-1.5">Work Preference</label>
                <Select
                  value={careerIdentity.workPreference}
                  onValueChange={(v) => onUpdate?.({ workPreference: v as WorkPreference })}
                >
                  <SelectTrigger aria-label="Work preference">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(workPreferenceLabels) as [WorkPreference, string][]).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-caption text-secondary block mb-1.5">Contract Type</label>
                <Select
                  value={careerIdentity.contractTypePreference}
                  onValueChange={(v) => onUpdate?.({ contractTypePreference: v as ContractType })}
                >
                  <SelectTrigger aria-label="Contract type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(contractTypeLabels) as [ContractType, string][]).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-2 mt-0.5" aria-hidden="true">
                  <Target className="h-4 w-4 text-cyan" />
                </div>
                <div className="min-w-0">
                  <p className="text-caption text-tertiary">Target Role</p>
                  <p className="text-body text-primary font-medium">
                    {careerIdentity.targetRole}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-caption text-tertiary mr-1 self-center">Industries:</span>
                {careerIdentity.preferredIndustries.map((industry) => (
                  <Badge key={industry} variant="neutral" size="xs">
                    {industry}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {identityFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.label} className="flex items-start gap-3">
                      <div className="rounded-lg bg-cyan-500/10 p-2 mt-0.5" aria-hidden="true">
                        <Icon className="h-4 w-4 text-cyan" />
                      </div>
                      <div>
                        <p className="text-caption text-tertiary">{field.label}</p>
                        <p className="text-body text-primary">{field.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PanelBody>
      </Panel>
    );
  }
);
CareerIdentityPanel.displayName = "CareerIdentityPanel";

export { CareerIdentityPanel };
export type { CareerIdentityPanelProps };
