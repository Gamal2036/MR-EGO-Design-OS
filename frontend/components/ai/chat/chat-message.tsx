"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Bookmark,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Edit3,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { type HTMLAttributes, forwardRef, useCallback, useState } from "react";

import { MarkdownContent } from "./markdown-content";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";

const messageCardVariants = cva(
  "group relative flex w-full gap-3 rounded-xl px-4 py-3 transition-all duration-normal animate-fade-in",
  {
    variants: {
      role: {
        user:
          "bg-primary/5 border border-primary/10",
        assistant:
          "bg-ai/5 border border-ai/10",
        system:
          "bg-neutral-100/80 border border-neutral-200 dark:bg-neutral-800/80 dark:border-neutral-700",
        warning:
          "bg-warning/5 border border-warning/20",
        error:
          "bg-danger/5 border border-danger/20",
        thinking:
          "bg-ai/5 border border-ai/10",
        success:
          "bg-success/5 border border-success/20",
        suggestion:
          "bg-ai/5 border border-ai/10 shadow-ai-card",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  },
);

const roleConfig = {
  user: { icon: User, label: "You" },
  assistant: { icon: Sparkles, label: "MR:EGO AI" },
  system: { icon: MessageSquare, label: "System" },
  warning: { icon: TriangleAlert, label: "Warning" },
  error: { icon: XCircle, label: "Error" },
  thinking: { icon: Brain, label: "Thinking" },
  success: { icon: CheckCircle2, label: "Success" },
  suggestion: { icon: Sparkles, label: "AI Suggestion" },
} as const;

interface ChatMessageProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageCardVariants> {
  role: "user" | "assistant" | "system" | "warning" | "error" | "thinking" | "success" | "suggestion";
  content: string;
  timestamp?: string;
  bookmarked?: boolean;
  onCopy?: () => void;
  onRetry?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onBookmark?: () => void;
  isStreaming?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      role,
      content,
      timestamp,
      bookmarked,
      onCopy,
      onRetry,
      onDelete,
      onEdit,
      onLike,
      onDislike,
      onBookmark,
      isStreaming = false,
      isExpanded = true,
      onToggleExpand,
      ...props
    },
    ref,
  ) => {
    const config = roleConfig[role];
    const Icon = config.icon;
    const [liked, setLiked] = useState<boolean | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(!isExpanded);

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(content);
      onCopy?.();
    }, [content, onCopy]);

    const handleLike = useCallback(() => {
      setLiked(liked === true ? null : true);
      onLike?.();
    }, [liked, onLike]);

    const handleDislike = useCallback(() => {
      setLiked(liked === false ? null : false);
      onDislike?.();
    }, [liked, onDislike]);

    const shouldTruncate = content.length > 500;
    const displayContent = shouldTruncate && isCollapsed
      ? content.slice(0, 300) + "..."
      : content;

    return (
      <div
        ref={ref}
        className={cn(messageCardVariants({ role }), className)}
        role="listitem"
        aria-label={`${config.label} message`}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            role === "user" && "bg-primary/10 text-primary",
            role === "assistant" && "bg-ai/10 text-ai",
            role === "system" && "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300",
            role === "warning" && "bg-warning/10 text-warning",
            role === "error" && "bg-danger/10 text-danger",
            role === "thinking" && "bg-ai/10 text-ai",
            role === "success" && "bg-success/10 text-success",
            role === "suggestion" && "bg-ai/10 text-ai",
          )}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-label font-semibold text-primary">
              {config.label}
            </span>
            {timestamp && (
              <span className="text-caption text-tertiary">{timestamp}</span>
            )}
            {isStreaming && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ai/10 px-2 py-0.5 text-smallest text-ai">
                <span className="h-1.5 w-1.5 rounded-full bg-ai animate-pulse" />
                Streaming
              </span>
            )}
          </div>

          <div className={cn(isStreaming && "animate-pulse")}>
            {isStreaming ? (
              <>
                <span className="text-body text-primary whitespace-pre-wrap break-words">
                  {displayContent}
                </span>
                <span className="inline-flex ml-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                </span>
              </>
            ) : (
              <MarkdownContent content={displayContent} />
            )}
          </div>

          <div
            className={cn(
              "flex items-center gap-0.5 pt-1 opacity-0 transition-opacity duration-fast group-hover:opacity-100",
              "focus-within:opacity-100",
            )}
            role="group"
            aria-label="Message actions"
          >
            {onCopy && (
              <IconButton
                icon={Copy}
                variant="ghost"
                size="xs"
                label="Copy message"
                onClick={handleCopy}
              />
            )}
            {onRetry && (
              <IconButton
                icon={ExternalLink}
                variant="ghost"
                size="xs"
                label="Retry"
                onClick={onRetry}
              />
            )}
            {onEdit && (
              <IconButton
                icon={Edit3}
                variant="ghost"
                size="xs"
                label="Edit message"
                onClick={onEdit}
              />
            )}
            {onDelete && (
              <IconButton
                icon={Trash2}
                variant="ghost"
                size="xs"
                label="Delete message"
                onClick={onDelete}
              />
            )}
            {onLike && (
              <IconButton
                icon={ThumbsUp}
                variant="ghost"
                size="xs"
                label="Like"
                onClick={handleLike}
                className={cn(liked === true && "text-primary")}
              />
            )}
            {onDislike && (
              <IconButton
                icon={ThumbsDown}
                variant="ghost"
                size="xs"
                label="Dislike"
                onClick={handleDislike}
                className={cn(liked === false && "text-danger")}
              />
            )}
            {onBookmark && (
              <IconButton
                icon={Bookmark}
                variant="ghost"
                size="xs"
                label={bookmarked ? "Remove bookmark" : "Bookmark"}
                onClick={onBookmark}
                className={cn(bookmarked && "text-ai")}
              />
            )}
            {shouldTruncate && onToggleExpand && (
              <IconButton
                icon={isCollapsed ? ChevronDown : ChevronUp}
                variant="ghost"
                size="xs"
                label={isCollapsed ? "Expand message" : "Collapse message"}
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                  onToggleExpand();
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = "ChatMessage";

export { ChatMessage, messageCardVariants };
export type { ChatMessageProps };
