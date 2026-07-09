"use client";

import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

const PROMPT_TEMPLATES = [
  { id: "analyze-cv", label: "Analyze my CV", icon: "📄" },
  { id: "job-search", label: "Find matching jobs", icon: "🔍" },
  { id: "career-advice", label: "Career advice", icon: "🎯" },
  { id: "skill-gaps", label: "Identify skill gaps", icon: "📊" },
  { id: "interview-prep", label: "Interview preparation", icon: "🎤" },
  { id: "salary-tips", label: "Salary negotiation tips", icon: "💡" },
];

interface PromptTemplatesProps {
  onSelect: (prompt: string) => void;
  className?: string;
}

export function PromptTemplates({ onSelect, className }: PromptTemplatesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (label: string) => {
      onSelect(label);
      setIsOpen(false);
    },
    [onSelect],
  );

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-smallest text-tertiary transition-colors hover:text-secondary"
        aria-label={isOpen ? "Close prompt templates" : "Open prompt templates"}
        aria-expanded={isOpen}
      >
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        <span className="hidden sm:inline">Prompts</span>
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 w-56 rounded-lg border border-border bg-surface-1 shadow-dropdown animate-scale-in"
          role="listbox"
          aria-label="Prompt templates"
        >
          <div className="border-b border-border px-3 py-1.5">
            <span className="text-smallest font-medium uppercase tracking-wider text-tertiary">
              Quick Prompts
            </span>
          </div>
          <div className="py-1">
            {PROMPT_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelect(template.label)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-caption text-secondary transition-colors hover:bg-accent"
                role="option"
                aria-selected={false}
              >
                <span aria-hidden="true">{template.icon}</span>
                <span>{template.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
