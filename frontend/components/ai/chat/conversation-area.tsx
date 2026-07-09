"use client";

import { useRef, useEffect, useCallback } from "react";

import { ChatMessage } from "./chat-message";

import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

function formatTimestamp(ts: string): string {
  try {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return ts;
  }
}

export function ConversationArea() {
  const conversations = useAIWorkspaceStore((s) => s.conversations);
  const activeConversationId = useAIWorkspaceStore((s) => s.activeConversationId);
  const toggleBookmark = useAIWorkspaceStore((s) => s.toggleBookmark);
  const isGenerating = useAIWorkspaceStore((s) => s.isGenerating);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  const messages = activeConversation?.messages ?? [];

  const scrollToBottom = useCallback((smooth = false) => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  }, []);

  const lastContent = messages[messages.length - 1]?.content;

  useEffect(() => {
    scrollToBottom(isGenerating);
  }, [messages.length, lastContent, isGenerating, scrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
      role="log"
      aria-label="Conversation messages"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-6">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ai/10"
                aria-hidden="true"
              >
                <span className="text-3xl">&#9889;</span>
              </div>
              <h2 className="text-heading-3 text-primary mb-2">
                {activeConversation?.title ?? "AI Workspace"}
              </h2>
              <p className="text-body text-secondary max-w-md mx-auto">
                Start a conversation with MR:EGO AI. Ask about career advice,
                job matching, resume optimization, or anything else.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={formatTimestamp(msg.timestamp)}
            bookmarked={msg.bookmarked ?? false}
            isStreaming={msg.status === "streaming"}
            onCopy={() => {
              navigator.clipboard.writeText(msg.content);
            }}
            onDelete={() => {
              if (activeConversationId) {
                useAIWorkspaceStore.getState().deleteMessage(activeConversationId, msg.id);
              }
            }}
            onBookmark={() => {
              if (activeConversationId) {
                toggleBookmark(activeConversationId, msg.id);
              }
            }}
          />
        ))}

        <div ref={bottomRef} className="h-4" aria-hidden="true" />
      </div>
    </div>
  );
}
