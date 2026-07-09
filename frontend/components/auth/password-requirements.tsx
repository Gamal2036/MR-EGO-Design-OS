"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface Requirement {
  label: string;
  met: boolean;
}

interface PasswordRequirementsProps {
  requirements: Requirement[];
  className?: string;
}

export function PasswordRequirements({ requirements, className }: PasswordRequirementsProps) {
  if (requirements.length === 0) return null;

  return (
    <div className={cn("space-y-1.5", className)} role="list" aria-label="Password requirements">
      {requirements.map((req, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 text-caption transition-colors duration-fast",
            req.met ? "text-success" : "text-tertiary"
          )}
          role="listitem"
        >
          {req.met ? (
            <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
          ) : (
            <X className="h-3 w-3 shrink-0" aria-hidden="true" />
          )}
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
}

export type { Requirement };
