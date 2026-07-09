"use client";

import { Check, MessageSquare, Pencil, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

export function ConversationHeader() {
  const conversations = useAIWorkspaceStore((s) => s.conversations);
  const activeConversationId = useAIWorkspaceStore((s) => s.activeConversationId);
  const renameConversation = useAIWorkspaceStore((s) => s.renameConversation);
  const isGenerating = useAIWorkspaceStore((s) => s.isGenerating);

  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const conversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleStartRename = useCallback(() => {
    if (conversation) {
      setRenameValue(conversation.title);
      setIsRenaming(true);
    }
  }, [conversation]);

  const handleCancelRename = useCallback(() => {
    setIsRenaming(false);
    setRenameValue("");
  }, []);

  const handleConfirmRename = useCallback(() => {
    const trimmed = renameValue.trim();
    if (trimmed && activeConversationId) {
      renameConversation(activeConversationId, trimmed);
    }
    setIsRenaming(false);
  }, [renameValue, activeConversationId, renameConversation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleConfirmRename();
      } else if (e.key === "Escape") {
        handleCancelRename();
      }
    },
    [handleConfirmRename, handleCancelRename],
  );

  if (!conversation) return null;

  const messageCount = conversation.messages.length;

  return (
    <div
      className="flex items-center justify-between border-b border-border bg-surface-0 px-4 py-2"
      role="banner"
      aria-label="Conversation header"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <MessageSquare className="h-4 w-4 shrink-0 text-ai" aria-hidden="true" />
        {isRenaming ? (
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-7 rounded-md border border-border bg-surface-1 px-2 text-label text-primary outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              aria-label="Conversation title"
            />
            <IconButton
              icon={Check}
              variant="ghost"
              size="xs"
              label="Confirm rename"
              onClick={handleConfirmRename}
            />
            <IconButton
              icon={X}
              variant="ghost"
              size="xs"
              label="Cancel rename"
              onClick={handleCancelRename}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="truncate text-label font-semibold text-primary">
              {conversation.title}
            </h2>
            <button
              type="button"
              onClick={handleStartRename}
              className="shrink-0 rounded p-0.5 text-tertiary opacity-0 transition-opacity hover:text-secondary focus:opacity-100 group-hover:opacity-100"
              aria-label="Rename conversation"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isGenerating && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ai/10 px-2.5 py-0.5 text-smallest text-ai">
            <span className="h-1.5 w-1.5 rounded-full bg-ai animate-pulse" />
            Generating
          </span>
        )}
        <div className="flex items-center gap-2 text-smallest text-tertiary" aria-label="Conversation metadata">
          <span>{messageCount} message{messageCount !== 1 ? "s" : ""}</span>
          {conversation.model && (
            <>
              <span className="text-disabled" aria-hidden="true">&middot;</span>
              <span>{conversation.model}</span>
            </>
          )}
          {conversation.tokenCount && (
            <>
              <span className="text-disabled" aria-hidden="true">&middot;</span>
              <span>~{conversation.tokenCount} tokens</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
