"use client";

import { Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProfileSuggestionPanelProps extends HTMLAttributes<HTMLDivElement> {}

const suggestions = [
  {
    title: "Strengthen your summary",
    description: "Add specific metrics and achievements to make your professional summary more impactful.",
  },
  {
    title: "Add missing skills",
    description: "Kubernetes and MLOps are highly sought after in your target roles.",
  },
  {
    title: "Update your certifications",
    description: "Adding recent certifications can boost your profile strength by 15%.",
  },
];

const ProfileSuggestionPanel = forwardRef<HTMLDivElement, ProfileSuggestionPanelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Profile Suggestions"
        {...props}
      >
        <CardHeader>
          <CardTitle>AI Profile Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-ai/5 border border-ai/20 p-3">
              <Sparkles className="h-5 w-5 text-ai shrink-0" aria-hidden="true" />
              <p className="text-body-small text-secondary">
                AI-powered suggestions will analyze your profile and recommend improvements.
              </p>
            </div>

            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-surface-0 p-3 space-y-1"
                >
                  <p className="text-body-small font-medium text-primary">{suggestion.title}</p>
                  <p className="text-smallest text-tertiary">{suggestion.description}</p>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="sm"
              disabled
              title="Coming Soon"
              className="w-full"
              leftIcon={<Sparkles className="h-4 w-4" />}
            >
              Get AI Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProfileSuggestionPanel.displayName = "ProfileSuggestionPanel";

export { ProfileSuggestionPanel };
export type { ProfileSuggestionPanelProps };
