"use client";

import { Textarea } from "@/components/forms/textarea";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function SummarySection() {
  const summary = useCVBuilderStore((s) => s.cvData.summary);
  const updateSummary = useCVBuilderStore((s) => s.updateSummary);

  return (
    <section aria-label="Professional Summary">
      <div className="space-y-5">
        <div>
          <h3 className="text-heading-4 text-primary">Professional Summary</h3>
          <p className="text-body-small text-secondary mt-1">
            A brief overview of your experience, skills, and career goals
          </p>
        </div>
        <div>
          <label htmlFor="cv-summary" className="block text-label text-secondary mb-1.5">
            Summary
          </label>
          <Textarea
            id="cv-summary"
            value={summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Results-oriented professional with X years of experience in... Aim for 3-5 sentences that highlight your key achievements and career direction."
            rows={6}
          />
          <p className="text-caption text-tertiary mt-1.5 text-right">
            {summary.length} characters
          </p>
        </div>
      </div>
    </section>
  );
}
