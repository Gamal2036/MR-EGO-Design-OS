"use client";

import { Sparkles, Lightbulb, ArrowRight, X } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { Card } from "@/components/foundation/card";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

const DEMO_SUGGESTIONS = [
  {
    id: "sug-1",
    type: "improve-summary",
    title: "Strengthen your summary",
    description: "Add quantifiable achievements and your career trajectory to make your summary more impactful.",
    section: "summary" as const,
    confidence: 0.88,
  },
  {
    id: "sug-2",
    type: "detect-skills",
    title: "Skills detected in experience",
    description: "Consider adding these skills: TypeScript, React, AWS, Docker, Kubernetes, GraphQL",
    section: "skills" as const,
    confidence: 0.92,
  },
  {
    id: "sug-3",
    type: "rewrite-bullet",
    title: "Use action verbs",
    description: "Start bullet points with strong verbs like 'Developed', 'Led', 'Optimized', 'Architected'.",
    section: "experience" as const,
    confidence: 0.75,
  },
];

export function AISuggestionPanel() {
  const aiPanelVisible = useCVBuilderStore((s) => s.aiPanelVisible);
  const toggleAIPanel = useCVBuilderStore((s) => s.toggleAIPanel);
  const setActiveSection = useCVBuilderStore((s) => s.setActiveSection);

  if (!aiPanelVisible) return null;

  return (
    <Card variant="ai" padding="md" className="relative">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
          <h3 className="text-label text-ai font-semibold">AI Suggestions</h3>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={toggleAIPanel}
          aria-label="Close AI suggestions"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="text-caption text-secondary mb-3">
        AI-powered suggestions to improve your CV
      </p>

      <div className="space-y-2">
        {DEMO_SUGGESTIONS.map((suggestion) => (
          <div
            key={suggestion.id}
            className="rounded-lg bg-ai/5 p-3 space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                <Lightbulb className="h-3.5 w-3.5 text-ai shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-caption font-medium text-primary">{suggestion.title}</p>
              </div>
            </div>
            <p className="text-smallest text-secondary">{suggestion.description}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-smallest text-ai">
                {(suggestion.confidence * 100).toFixed(0)}% confidence
              </span>
              <button
                onClick={() => setActiveSection(suggestion.section)}
                className="inline-flex items-center gap-1 text-smallest text-link hover:text-link-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Go to section
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-ai/10">
        <p className="text-smallest text-tertiary">
          Powered by MR:EGO AI engine. Future updates will enable real-time analysis and rewriting.
        </p>
      </div>
    </Card>
  );
}
