"use client";

import {
  Bolt,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { useCallback, useState } from "react";

import { AssistantActions } from "./assistant-actions";
import { AssistantCapabilities } from "./assistant-capabilities";
import { AssistantHeader } from "./assistant-header";
import { AssistantHistory } from "./assistant-history";
import { AssistantMemory } from "./assistant-memory";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { IconButton } from "@/components/foundation/icon-button";
import { useAssistantStore } from "@/stores/assistant-store";

export function AssistantWorkspace() {
  const activeAssistant = useAssistantStore((s) => s.activeAssistant());
  const addHistoryItem = useAssistantStore((s) => s.addHistoryItem);
  const [inputValue, setInputValue] = useState("");

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || !activeAssistant) return;
    addHistoryItem(activeAssistant.id, {
      id: `h_${Date.now()}`,
      query: inputValue,
      response: "This is a mock response. Backend integration will provide real AI responses.",
      timestamp: new Date().toISOString(),
      favorite: false,
    });
    setInputValue("");
  }, [inputValue, activeAssistant, addHistoryItem]);

  if (!activeAssistant) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <Sparkles className="h-12 w-12 text-tertiary mb-4" aria-hidden="true" />
        <h2 className="text-heading-3 text-primary font-semibold mb-2">Select an Assistant</h2>
        <p className="text-body text-secondary max-w-md">
          Choose an AI assistant from the sidebar to start working with it.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AssistantHeader />

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scrollbar-thin">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-6">
            <AssistantCapabilities capabilities={activeAssistant.capabilities} compact />

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-ai" aria-hidden="true" />
                  Conversation Preview
                </CardTitle>
                <CardDescription>
                  Recent interactions with {activeAssistant.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssistantHistory history={activeAssistant.recentHistory} compact />
              </CardContent>
            </Card>

            {activeAssistant.prompts.length > 0 && (
              <Card variant="default" padding="md">
                <CardHeader
                  action={
                    <Button variant="ghost" size="xs" leftIcon={<Plus className="h-4 w-4" />}>
                      New
                    </Button>
                  }
                >
                  <CardTitle className="flex items-center gap-2 text-body-small">
                    <Star className="h-4 w-4 text-ai" aria-hidden="true" />
                    Pinned Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activeAssistant.prompts
                      .filter((p) => p.pinned)
                      .map((prompt) => (
                        <button
                          key={prompt.id}
                          type="button"
                          className="w-full text-left rounded-lg border border-border bg-surface-1 p-3 hover:border-ai/30 hover:bg-ai/[0.02] transition-colors"
                          onClick={() => setInputValue(prompt.content)}
                        >
                          <p className="text-caption font-medium text-primary">{prompt.title}</p>
                          <p className="text-smallest text-tertiary mt-0.5 line-clamp-1">
                            {prompt.content}
                          </p>
                        </button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card variant="ai" padding="md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-body-small">
                  <Bolt className="h-4 w-4" aria-hidden="true" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AssistantActions assistantId={activeAssistant.id} />
              </CardContent>
            </Card>

            <AssistantMemory memory={activeAssistant.memory} />

            {activeAssistant.workflows.length > 0 && (
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle className="text-body-small">
                    Suggested Workflows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activeAssistant.workflows.map((wf, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left rounded-lg border border-border p-3 hover:border-ai/30 transition-colors"
                      >
                        <p className="text-caption font-medium text-primary">{wf.title}</p>
                        <p className="text-smallest text-tertiary mt-0.5">{wf.description}</p>
                        <span className="text-smallest text-ai mt-1 inline-block">
                          {wf.steps} steps
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-body-small">
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeAssistant.prompts.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      className="block w-full text-left rounded-lg bg-surface-1 px-3 py-2 text-caption text-secondary hover:bg-surface-2 transition-colors"
                      onClick={() => setInputValue(prompt.content)}
                    >
                      {prompt.title}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4 bg-surface-1">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/10 text-ai absolute left-2 top-1/2 -translate-y-1/2 text-label font-semibold">
              {activeAssistant.initials}
            </div>
            <textarea
              id="ai-assistant-composer"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask ${activeAssistant.name} something...`}
              rows={1}
              className="w-full rounded-xl border border-border bg-surface-2 pl-12 pr-4 py-3 text-body text-primary placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-ai/50 transition-shadow"
              aria-label="Message input"
            />
          </div>
          <IconButton
            icon={Send}
            variant="primary"
            size="md"
            label="Send message"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
