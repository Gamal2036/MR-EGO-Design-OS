"use client";

import { forwardRef } from "react";

import { MessageItem } from "./message-item";

import type { Message } from "@/types/messages";

interface MessageGroupProps {
  messages: Message[];
  label: string;
}

const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ messages, label }, ref) => {
    return (
      <div ref={ref} className="flex flex-col" role="list" aria-label={label}>
        <div className="sticky top-0 z-10 flex items-center justify-center px-4 py-2">
          <div className="rounded-full bg-surface-1 px-3 py-1 text-smallest font-medium text-tertiary border border-border">
            {label}
          </div>
        </div>
        {messages.map((message, idx) => (
          <MessageItem
            key={message.id}
            message={message}
            showAvatar={idx === 0 || messages[idx - 1]?.sender.id !== message.sender.id}
            showSender={
              idx === 0 ||
              messages[idx - 1]?.sender.id !== message.sender.id ||
              messages[idx - 1]?.type !== message.type
            }
          />
        ))}
        <div className="border-t border-border/50 mx-4 my-2" role="separator" aria-orientation="horizontal" />
      </div>
    );
  },
);
MessageGroup.displayName = "MessageGroup";

export { MessageGroup };
export type { MessageGroupProps };
