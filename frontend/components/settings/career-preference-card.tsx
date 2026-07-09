"use client";

import { useState } from "react";

import { SelectSetting } from "./select-setting";
import { SettingsCard } from "./settings-card";
import { SliderSetting } from "./slider-setting";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { Chip } from "@/components/foundation/chip";
import type { CareerPreferences } from "@/types/settings";

const workTypes = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const remoteOptions = [
  { value: "remote", label: "Fully Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on-site", label: "On-Site" },
  { value: "flexible", label: "Flexible" },
];

const seniorityOptions = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
  { value: "executive", label: "Executive" },
];

interface CareerPreferenceCardProps {
  settings: CareerPreferences;
  onUpdate: (settings: Partial<CareerPreferences>) => void;
}

export function CareerPreferenceCard({ settings, onUpdate }: CareerPreferenceCardProps) {
  const [newRole, setNewRole] = useState("");
  const [newIndustry, setNewIndustry] = useState("");

  const addRole = () => {
    const trimmed = newRole.trim();
    if (trimmed && !settings.preferredRoles.includes(trimmed)) {
      onUpdate({ preferredRoles: [...settings.preferredRoles, trimmed] });
      setNewRole("");
    }
  };

  const removeRole = (role: string) => {
    onUpdate({ preferredRoles: settings.preferredRoles.filter((r) => r !== role) });
  };

  const addIndustry = () => {
    const trimmed = newIndustry.trim();
    if (trimmed && !settings.industries.includes(trimmed)) {
      onUpdate({ industries: [...settings.industries, trimmed] });
      setNewIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    onUpdate({ industries: settings.industries.filter((i) => i !== industry) });
  };

  return (
    <SettingsCard
      title="Career Preferences"
      description="Define your career goals and job preferences"
    >
      <div className="divide-y divide-border">
        <div className="py-3">
          <label className="text-body font-medium text-foreground block mb-1">
            Preferred Roles
          </label>
          <p className="text-caption text-tertiary mb-2">
            Add job titles you are interested in
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="e.g. AI Engineer"
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addRole(); } }}
              aria-label="Add preferred role"
            />
            <Button variant="secondary" size="sm" onClick={addRole} type="button">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {settings.preferredRoles.map((role) => (
              <Chip key={role} variant="neutral" onRemove={() => removeRole(role)}>
                {role}
              </Chip>
            ))}
          </div>
        </div>

        <SliderSetting
          label="Salary Range"
          description={`$${settings.salaryRange.min.toLocaleString()} - $${settings.salaryRange.max.toLocaleString()}`}
          value={settings.salaryRange.min}
          min={50000}
          max={500000}
          step={10000}
          onValueChange={(value) => onUpdate({ salaryRange: { ...settings.salaryRange, min: value } })}
          formatLabel={(v) => `$${(v / 1000).toFixed(0)}k`}
        />

        <SelectSetting
          label="Work Type"
          description="Preferred employment type"
          value={settings.workType}
          onValueChange={(value) => onUpdate({ workType: value })}
          options={workTypes}
        />

        <SelectSetting
          label="Remote Preference"
          description="How you prefer to work location-wise"
          value={settings.remotePreference}
          onValueChange={(value) => onUpdate({ remotePreference: value })}
          options={remoteOptions}
        />

        <div className="py-3">
          <label className="text-body font-medium text-foreground block mb-1">
            Industries
          </label>
          <p className="text-caption text-tertiary mb-2">
            Industries you are interested in
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              placeholder="e.g. AI/ML"
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIndustry(); } }}
              aria-label="Add industry"
            />
            <Button variant="secondary" size="sm" onClick={addIndustry} type="button">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {settings.industries.map((industry) => (
              <Chip key={industry} variant="neutral" onRemove={() => removeIndustry(industry)}>
                {industry}
              </Chip>
            ))}
          </div>
        </div>

        <SelectSetting
          label="Seniority Level"
          description="Your current career level"
          value={settings.seniority}
          onValueChange={(value) => onUpdate({ seniority: value })}
          options={seniorityOptions}
        />
      </div>
    </SettingsCard>
  );
}
