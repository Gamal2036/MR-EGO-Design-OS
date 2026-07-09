"use client";

import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface ErrorSummaryProps {
  title?: string;
  errors: string[];
  className?: string;
}

export function ErrorSummary({
  title = "There was a problem",
  errors,
  className,
}: ErrorSummaryProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-danger/30 bg-danger/5 p-4",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-danger mt-0.5" aria-hidden="true" />
        <div>
          <h5 className="text-label font-semibold text-danger mb-2">{title}</h5>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li
                key={index}
                className="text-body-small text-danger flex items-start gap-2"
              >
                <span aria-hidden="true">&bull;</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
