"use client";

import {
  Check,
  CheckCheck,
  Clock,
  Copy,
  Forward,
  Reply,
  Trash2,
} from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { MessageAvatar } from "./message-avatar";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/messages";

const typeStyles: Record<string, { container: string; badge: string; label: string }> = {
  incoming: { container: "", badge: "", label: "" },
  outgoing: { container: "ml-12", badge: "", label: "" },
  system: {
    container: "",
    badge: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
    label: "System",
  },
  ai: {
    container: "",
    badge: "bg-ai/10 text-ai",
    label: "AI Assistant",
  },
  recruiter: {
    container: "",
    badge: "bg-job/10 text-job",
    label: "Recruiter",
  },
  career_coach: {
    container: "",
    badge: "bg-cv/10 text-cv",
    label: "Career Coach",
  },
  warning: {
    container: "",
    badge: "bg-warning/10 text-warning",
    label: "Warning",
  },
  success: {
    container: "",
    badge: "bg-success/10 text-success",
    label: "Success",
  },
  information: {
    container: "",
    badge: "bg-info/10 text-info",
    label: "Information",
  },
};

const statusIcon = {
  sending: Clock,
  sent: Check,
  delivered: CheckCheck,
  read: CheckCheck,
  error: Clock,
  edited: Clock,
};

const statusColor: Record<string, string> = {
  sending: "text-tertiary",
  sent: "text-tertiary",
  delivered: "text-tertiary",
  read: "text-primary",
  error: "text-danger",
  edited: "text-tertiary",
};

interface MessageItemProps {
  message: Message;
  showAvatar?: boolean;
  showSender?: boolean;
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const roleMap: Record<string, "ai" | "user" | "system" | "recruiter" | "career_coach" | "support"> = {
  ai: "ai",
  user: "user",
  system: "system",
  recruiter: "recruiter",
  career_coach: "career_coach",
  support: "support",
};

const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(
  ({ message, showAvatar = true, showSender = true }, ref) => {
    const [showActions, setShowActions] = useState(false);
    const msgStyle = (typeStyles[message.type] ?? typeStyles["incoming"])!;
    const StatusIcon = statusIcon[message.status];
    const isOutgoing = message.type === "outgoing";
    const isSystem = ["system", "warning", "success", "information"].includes(message.type);

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(message.content);
    }, [message.content]);

    const isStatusIconVisible = isOutgoing || message.status === "error";

    const content = message.content;

    const renderContent = (text: string) => {
      const parts = text.split(/(```[\s\S]*?```|`[^`]*`|[*]{1,3}[^*]+[*]{1,3})/g);
      return parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3);
          const firstLine = code.indexOf("\n");
          const lang = firstLine > 0 ? code.slice(0, firstLine).trim() : "";
          const codeContent = firstLine > 0 ? code.slice(firstLine + 1) : code;
          return (
            <pre
              key={i}
              className="my-2 overflow-x-auto rounded-lg bg-neutral-900 p-3 text-caption text-neutral-100"
              role="code"
              aria-label="Code block"
            >
              {lang && (
                <div className="mb-2 text-smallest text-neutral-400 uppercase tracking-wide">{lang}</div>
              )}
              <code>{codeContent}</code>
            </pre>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-neutral-100 px-1.5 py-0.5 text-caption font-mono text-primary dark:bg-neutral-800"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      });
    };

    if (isSystem) {
      return (
        <div
          ref={ref}
          className="flex justify-center px-4 py-2"
          role="listitem"
          aria-label={`${msgStyle.label} message`}
        >
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
              msgStyle.badge,
            )}
          >
            <span className="text-smallest font-medium">{msgStyle.label}</span>
            <span className="text-caption max-w-md text-center">{content}</span>
            <span className="text-smallest opacity-60">{formatTime(message.timestamp)}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex gap-3 px-4 py-1.5",
          isOutgoing && "flex-row-reverse",
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        role="listitem"
        aria-label={`${isOutgoing ? "Your" : "Incoming"} message`}
      >
        <div className={cn("shrink-0", isOutgoing && "hidden")}>
          {showAvatar ? (
            <MessageAvatar
              initials={message.sender.initials}
              role={roleMap[message.sender.role] ?? "system"}
              name={message.sender.name}
              size="sm"
            />
          ) : (
            <div className="w-8" />
          )}
        </div>

        <div className={cn("flex min-w-0 max-w-[75%] flex-col", isOutgoing && "items-end")}>
          {showSender && !isOutgoing && (
            <span className="mb-0.5 px-1 text-smallest font-medium text-tertiary">
              {message.sender.name}
            </span>
          )}

          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-body",
              isOutgoing
                ? "bg-primary text-primary-foreground rounded-tr-md"
                : "bg-surface-1 border border-border rounded-tl-md",
            )}
          >
            <div className="whitespace-pre-wrap break-words">{renderContent(content)}</div>
          </div>

          {message.attachments && message.attachments.length > 0 && (
            <div className={cn("mt-1 flex flex-wrap gap-2", isOutgoing && "justify-end")}>
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3 py-2"
                >
                  <span className="text-caption text-secondary">{att.name}</span>
                  {att.size && (
                    <span className="text-smallest text-tertiary">{att.size}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className={cn("mt-0.5 flex items-center gap-2 px-1", isOutgoing && "flex-row-reverse")}>
            <span className="text-smallest text-tertiary">{formatTime(message.timestamp)}</span>
            {isStatusIconVisible && StatusIcon && (
              <StatusIcon
                className={cn("h-3 w-3", statusColor[message.status] ?? "text-tertiary")}
                aria-label={`Status: ${message.status}`}
              />
            )}
            {message.editedAt && (
              <span className="text-smallest text-tertiary">(edited)</span>
            )}
          </div>
        </div>

        <div
          className={cn(
            "absolute bottom-1 right-2 flex items-center gap-0.5 rounded-lg bg-background/90 p-0.5 opacity-0 transition-opacity duration-fast backdrop-blur-sm",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            showActions && "opacity-100",
          )}
          role="group"
          aria-label="Message actions"
        >
          <IconButton icon={Reply} variant="ghost" size="xs" label="Reply" />
          <IconButton icon={Forward} variant="ghost" size="xs" label="Forward" />
          <IconButton icon={Copy} variant="ghost" size="xs" label="Copy" onClick={handleCopy} />
          {isOutgoing && (
            <IconButton icon={Trash2} variant="ghost" size="xs" label="Delete" className="text-danger hover:text-danger" />
          )}
        </div>
      </div>
    );
  },
);
MessageItem.displayName = "MessageItem";

export { MessageItem };
export type { MessageItemProps };
