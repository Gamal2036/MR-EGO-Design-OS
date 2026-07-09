"use client";

import { BookOpen, FileText, MessageSquare, Sparkles, TrendingUp, Zap } from "lucide-react";

import { useAssistantStore } from "@/stores/assistant-store";
import type { AssistantId } from "@/types/assistant";

interface AssistantActionsProps {
  assistantId: AssistantId;
}

const actionConfig: Record<string, { label: string; icon: typeof Zap }[]> = {
  "career-coach": [
    { label: "Career Roadmap", icon: TrendingUp },
    { label: "Industry Insights", icon: Sparkles },
    { label: "Goal Setting", icon: BookOpen },
  ],
  "cv-expert": [
    { label: "Optimize CV", icon: FileText },
    { label: "ATS Check", icon: Zap },
    { label: "Rewrite Section", icon: BookOpen },
  ],
  "job-hunter": [
    { label: "Find Jobs", icon: MessageSquare },
    { label: "Track Applications", icon: FileText },
    { label: "Company Research", icon: Sparkles },
  ],
  "interview-coach": [
    { label: "Mock Interview", icon: MessageSquare },
    { label: "Question Prep", icon: BookOpen },
    { label: "Feedback", icon: Sparkles },
  ],
  "learning-mentor": [
    { label: "Study Plan", icon: BookOpen },
    { label: "Find Resources", icon: Sparkles },
    { label: "Track Progress", icon: TrendingUp },
  ],
  "skill-advisor": [
    { label: "Skill Assessment", icon: Zap },
    { label: "Gap Analysis", icon: FileText },
    { label: "Recommendations", icon: Sparkles },
  ],
  "salary-advisor": [
    { label: "Market Check", icon: TrendingUp },
    { label: "Negotiation Prep", icon: MessageSquare },
    { label: "Equity Analysis", icon: FileText },
  ],
  "recruiter-assistant": [
    { label: "Write JD", icon: FileText },
    { label: "Screen Criteria", icon: Zap },
    { label: "Interview Questions", icon: BookOpen },
  ],
  "document-assistant": [
    { label: "Create Document", icon: FileText },
    { label: "Formatting", icon: Zap },
    { label: "Template", icon: BookOpen },
  ],
  "writing-assistant": [
    { label: "Proofread", icon: FileText },
    { label: "Rewrite", icon: BookOpen },
    { label: "Summarize", icon: Sparkles },
  ],
  "general-ai": [
    { label: "Ask Anything", icon: MessageSquare },
    { label: "Research", icon: Sparkles },
    { label: "Brainstorm", icon: BookOpen },
  ],
};

export function AssistantActions({ assistantId }: AssistantActionsProps) {
  const addHistoryItem = useAssistantStore((s) => s.addHistoryItem);
  const actions = actionConfig[assistantId] ?? actionConfig["general-ai"]!;

  const handleAction = (label: string) => {
    addHistoryItem(assistantId, {
      id: `action_${Date.now()}`,
      query: `Run quick action: ${label}`,
      response: `Quick action "${label}" executed. Backend integration will provide real responses.`,
      timestamp: new Date().toISOString(),
      favorite: false,
    });
  };

  return (
    <div className="space-y-1.5">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type="button"
            onClick={() => handleAction(action.label)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-caption text-secondary hover:bg-ai/10 hover:text-ai transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
