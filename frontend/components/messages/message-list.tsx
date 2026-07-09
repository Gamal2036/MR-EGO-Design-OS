"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef } from "react";

import { MessageGroup } from "./message-group";
import { TypingIndicator } from "./typing-indicator";

import { Button } from "@/components/foundation/button";
import type { Conversation, Message } from "@/types/messages";

interface MessageListProps {
  conversation: Conversation;
  isTyping?: boolean;
  typingName?: string;
  onJumpToNewest?: () => void;
}

function getDateLabel(timestamp: string): string {
  const now = Date.now();
  const date = new Date(timestamp).getTime();
  const diff = now - date;
  const MS_DAY = 86400000;

  if (diff < MS_DAY) return "Today";
  if (diff < 2 * MS_DAY) return "Yesterday";
  return new Date(timestamp).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function groupMessagesByDate(messages: Message[]): { label: string; messages: Message[] }[] {
  const groups: { label: string; messages: Message[] }[] = [];
  let currentLabel = "";
  let currentGroup: Message[] = [];

  for (const msg of messages) {
    const label = getDateLabel(msg.timestamp);
    if (label !== currentLabel) {
      if (currentGroup.length > 0) {
        groups.push({ label: currentLabel, messages: currentGroup });
      }
      currentLabel = label;
      currentGroup = [msg];
    } else {
      currentGroup.push(msg);
    }
  }

  if (currentGroup.length > 0) {
    groups.push({ label: currentLabel, messages: currentGroup });
  }

  return groups;
}

function getUnreadSeparatorIndex(messages: Message[]): number {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg && msg.status === "delivered" && msg.type === "outgoing") {
      return i + 1;
    }
  }
  return -1;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ conversation, isTyping, typingName, onJumpToNewest }, ref) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const prevMessageCount = useRef(conversation.messages.length);

    const scrollToBottom = useCallback((smooth = true) => {
      bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    }, []);

    useEffect(() => {
      if (conversation.messages.length > prevMessageCount.current) {
        scrollToBottom(true);
      }
      prevMessageCount.current = conversation.messages.length;
    }, [conversation.messages.length, scrollToBottom]);

    useEffect(() => {
      scrollToBottom(false);
    }, [conversation.id, scrollToBottom]);

    const messages = conversation.messages;
    const groups = groupMessagesByDate(messages);
    const unreadIdx = getUnreadSeparatorIndex(messages);

    return (
      <div
        ref={ref}
        className="relative flex flex-1 flex-col overflow-hidden"
      >
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto scrollbar-thin"
          role="log"
          aria-label="Messages"
          aria-live="polite"
        >
          <div className="py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <p className="text-body text-tertiary">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              <>
                {groups.map((group) => (
                  <MessageGroup key={group.label} messages={group.messages} label={group.label} />
                ))}

                {unreadIdx > 0 && unreadIdx < messages.length && (
                  <div className="flex items-center gap-3 px-4 py-2" role="separator" aria-label="Unread messages">
                    <div className="h-px flex-1 bg-primary/30" />
                    <span className="text-smallest font-medium text-primary">Unread</span>
                    <div className="h-px flex-1 bg-primary/30" />
                  </div>
                )}
              </>
            )}
          </div>

          {isTyping && <TypingIndicator name={typingName} />}

          <div ref={bottomRef} />
        </div>

        {onJumpToNewest && messages.length > 5 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Button
              variant="outline"
              size="sm"
              onClick={onJumpToNewest}
              leftIcon={<ChevronDown className="h-4 w-4" />}
              className="shadow-elevation-2"
            >
              Jump to newest
            </Button>
          </div>
        )}
      </div>
    );
  },
);
MessageList.displayName = "MessageList";

export { MessageList, getDateLabel, groupMessagesByDate };
export type { MessageListProps };
