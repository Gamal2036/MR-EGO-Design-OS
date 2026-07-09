"use client";

import { AssistantDetails } from "@/components/ai-assistants/assistant-details";
import { AssistantSidebar } from "@/components/ai-assistants/assistant-sidebar";
import { AssistantWorkspace } from "@/components/ai-assistants/assistant-workspace";

export default function AIAssistantsPage() {
  return (
    <div
      className="flex h-full flex-col bg-background"
      role="main"
      aria-label="AI Assistants Hub"
    >
      <div className="flex flex-1 overflow-hidden">
        <AssistantSidebar />

        <main
          id="ai-assistants-workspace"
          className="flex flex-1 flex-col overflow-hidden"
          role="region"
          aria-label="Assistant workspace"
          tabIndex={-1}
        >
          <AssistantWorkspace />
        </main>

        <AssistantDetails />
      </div>
    </div>
  );
}
