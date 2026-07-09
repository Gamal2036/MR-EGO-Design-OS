"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

import { ConversationArea } from "@/components/ai/chat/conversation-area";
import { ConversationHeader } from "@/components/ai/chat/conversation-header";
import { AIInput } from "@/components/ai/input/ai-input";
import { AIWorkspaceLayout } from "@/components/ai/layout/ai-workspace-layout";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

const DynamicNoConversation = dynamic(
  () => import("@/components/ai/empty/empty-states").then((m) => ({ default: m.NoConversation })),
  { ssr: false },
);

export default function AIWorkspacePage() {
  const activeConversationId = useAIWorkspaceStore((s) => s.activeConversationId);
  const createConversation = useAIWorkspaceStore((s) => s.createConversation);
  const addMessage = useAIWorkspaceStore((s) => s.addMessage);
  const setIsGenerating = useAIWorkspaceStore((s) => s.setIsGenerating);
  const updateMessage = useAIWorkspaceStore((s) => s.updateMessage);

  const hasActiveConversation = activeConversationId !== null;

  const handleSend = useCallback(
    (content: string) => {
      const targetId = activeConversationId ?? createConversation();
      const time = new Date().toISOString();

      addMessage(targetId, {
        id: `msg_${Date.now()}`,
        role: "user",
        content,
        timestamp: time,
        status: "sent",
      });

      setIsGenerating(true);
      const assistantId = `msg_assist_${Date.now()}`;
      addMessage(targetId, {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
        status: "streaming",
      });

      setTimeout(() => {
        setIsGenerating(false);
        updateMessage(targetId, assistantId, {
          status: "complete",
          content: "Thank you for your message! I've received your input and I'm ready to help. In production, this response would come from an AI provider. Your request has been noted and will be processed when a provider is connected.",
        });
      }, 2000);
    },
    [activeConversationId, createConversation, addMessage, setIsGenerating, updateMessage],
  );

  const handleStop = useCallback(() => {
    setIsGenerating(false);
    if (activeConversationId) {
      const conv = useAIWorkspaceStore.getState().conversations.find(
        (c) => c.id === activeConversationId,
      );
      if (conv) {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (lastMsg && lastMsg.status === "streaming") {
          updateMessage(activeConversationId, lastMsg.id, {
            status: "complete",
            content: lastMsg.content + "\n\n*Generation stopped*",
          });
        }
      }
    }
  }, [activeConversationId, setIsGenerating, updateMessage]);

  return (
    <AIWorkspaceLayout>
      {hasActiveConversation ? (
        <>
          <ConversationHeader />
          <ConversationArea />
          <AIInput onSend={handleSend} onStop={handleStop} />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <DynamicNoConversation />
          <div className="w-full max-w-3xl px-4 mt-4">
            <AIInput onSend={handleSend} onStop={handleStop} />
          </div>
        </div>
      )}
    </AIWorkspaceLayout>
  );
}
