"use client";

import { Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { ProfessionalSummary } from "@/types/profile";

interface ProfessionalSummaryPanelProps extends HTMLAttributes<HTMLDivElement> {
  summary: ProfessionalSummary;
  isEditing?: boolean;
  onUpdate?: (summary: Partial<ProfessionalSummary>) => void;
}

const ProfessionalSummaryPanel = forwardRef<HTMLDivElement, ProfessionalSummaryPanelProps>(
  ({ className, summary, isEditing, onUpdate, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Professional Summary"
        {...props}
      >
        <PanelHeader
          action={
            <Button
              variant="ghost"
              size="xs"
              leftIcon={<Sparkles className="h-3.5 w-3.5" />}
              disabled
              title="Coming Soon"
            >
              AI Improve
            </Button>
          }
        >
          <h2 className="text-heading-4 text-primary">Professional Summary</h2>
        </PanelHeader>
        <PanelBody>
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={summary.bio}
                onChange={(e) => onUpdate?.({ bio: e.target.value })}
                rows={5}
                aria-label="Professional summary bio"
              />
              <div className="flex items-center justify-between">
                <span className="text-smallest text-tertiary">
                  Tone: {summary.tone}
                </span>
                <span className="text-smallest text-tertiary">
                  {summary.bio.length} characters
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-body text-secondary leading-relaxed">
                {summary.bio}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-smallest text-tertiary bg-surface-0 px-2 py-0.5 rounded">
                  Tone: {summary.tone}
                </span>
                <span className="text-smallest text-tertiary bg-surface-0 px-2 py-0.5 rounded">
                  {summary.bio.split(" ").length} words
                </span>
              </div>
            </div>
          )}
        </PanelBody>
      </Panel>
    );
  }
);
ProfessionalSummaryPanel.displayName = "ProfessionalSummaryPanel";

export { ProfessionalSummaryPanel };
export type { ProfessionalSummaryPanelProps };
