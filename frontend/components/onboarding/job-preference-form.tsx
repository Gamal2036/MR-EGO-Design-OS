"use client";

import { useId } from "react";

import {
  FormField,
  FormLabel,
} from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select";
import { cn } from "@/lib/utils";

interface JobPreferenceFormData {
  jobType: string;
  workLocation: string;
  salaryMin: string;
  salaryMax: string;
  industry: string;
}

interface JobPreferenceFormProps {
  value: JobPreferenceFormData;
  onChange: (value: JobPreferenceFormData) => void;
  className?: string;
}

export function JobPreferenceForm({
  value,
  onChange,
  className,
}: JobPreferenceFormProps) {
  const formId = useId();

  const updateField = (field: keyof JobPreferenceFormData, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className={cn("space-y-5", className)}>
      <FormField name="jobType">
        <FormLabel>Preferred Job Type</FormLabel>
        <Select
          value={value.jobType}
          onValueChange={(v) => updateField("jobType", v)}
        >
          <SelectTrigger id={`${formId}-jobType`}>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="open">Open to all</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField name="workLocation">
        <FormLabel>Work Location Preference</FormLabel>
        <Select
          value={value.workLocation}
          onValueChange={(v) => updateField("workLocation", v)}
        >
          <SelectTrigger id={`${formId}-location`}>
            <SelectValue placeholder="Select location preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="on-site">On-site</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField name="industry">
        <FormLabel>Industry Preference</FormLabel>
        <Select
          value={value.industry}
          onValueChange={(v) => updateField("industry", v)}
        >
          <SelectTrigger id={`${formId}-industry`}>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="media">Media & Entertainment</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField name="salaryMin">
          <FormLabel>Salary Min</FormLabel>
          <Input
            id={`${formId}-salaryMin`}
            type="text"
            placeholder="e.g. 80000"
            value={value.salaryMin}
            onChange={(e) => updateField("salaryMin", e.target.value)}
          />
        </FormField>

        <FormField name="salaryMax">
          <FormLabel>Salary Max</FormLabel>
          <Input
            id={`${formId}-salaryMax`}
            type="text"
            placeholder="e.g. 150000"
            value={value.salaryMax}
            onChange={(e) => updateField("salaryMax", e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
}

export type { JobPreferenceFormData };
