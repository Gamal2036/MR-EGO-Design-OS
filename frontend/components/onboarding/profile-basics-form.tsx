"use client";

import { useId } from "react";

import { FormField, FormLabel, FormMessage } from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { cn } from "@/lib/utils";

interface ProfileBasicsFormData {
  fullName: string;
  professionalTitle: string;
  location: string;
}

interface ProfileBasicsFormProps {
  value: ProfileBasicsFormData;
  onChange: (value: ProfileBasicsFormData) => void;
  className?: string;
}

export function ProfileBasicsForm({
  value,
  onChange,
  className,
}: ProfileBasicsFormProps) {
  const formId = useId();

  const updateField = (field: keyof ProfileBasicsFormData, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className={cn("space-y-5", className)}>
      <FormField name="fullName">
        <FormLabel required>Full Name</FormLabel>
        <Input
          id={`${formId}-fullName`}
          type="text"
          placeholder="e.g. Jane Smith"
          autoComplete="name"
          value={value.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          required
        />
        <FormMessage />
      </FormField>

      <FormField name="professionalTitle">
        <FormLabel>Professional Title</FormLabel>
        <Input
          id={`${formId}-title`}
          type="text"
          placeholder="e.g. Senior Software Engineer"
          autoComplete="organization-title"
          value={value.professionalTitle}
          onChange={(e) => updateField("professionalTitle", e.target.value)}
        />
        <FormMessage />
      </FormField>

      <FormField name="location">
        <FormLabel>Location</FormLabel>
        <Input
          id={`${formId}-location`}
          type="text"
          placeholder="e.g. San Francisco, CA"
          autoComplete="country-name"
          value={value.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
        <FormMessage />
      </FormField>
    </div>
  );
}

export type { ProfileBasicsFormData };
