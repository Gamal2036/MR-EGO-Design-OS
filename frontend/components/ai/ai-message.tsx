"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Bot, Sparkles, User } from "lucide-react";
import { type HTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const messageVariants = cva(
  "flex gap-3 w-full transition-all duration-normal",
  {
    variants: {
      role: {
        user: "flex-row",
        assistant: "flex-row",
        system: "flex-row",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  }
);

const RoleIcon = {
  user: User,
  assistant: Bot,
  system: Sparkles,
};

interface AIMessageProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  role: "user" | "assistant" | "system";
  message: string;
  timestamp?: string;
  confidence?: number;
  actions?: ReactNode;
  typing?: boolean;
}

const AIMessage = forwardRef<HTMLDivElement, AIMessageProps>(
  (
    {
      className,
      role,
      message,
      timestamp,
      confidence,
      actions,
      typing = false,
      ...props
    },
    ref
  ) => {
    const Icon = RoleIcon[role];

    return (
      <div
        ref={ref}
        className={cn(messageVariants({ role }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            role === "user" && "bg-primary/10 text-primary",
            role === "assistant" && "bg-ai/10 text-ai",
            role === "system" && "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-label font-semibold text-primary capitalize">
              {role === "assistant" ? "MR:EGO AI" : role}
            </span>
            {timestamp && (
              <span className="text-caption text-tertiary">{timestamp}</span>
            )}
            {confidence !== undefined && (
              <span
                className={cn(
                  "text-caption font-medium",
                  confidence >= 0.8 && "text-success",
                  confidence >= 0.5 && confidence < 0.8 && "text-warning",
                  confidence < 0.5 && "text-danger"
                )}
              >
                {Math.round(confidence * 100)}% confidence
              </span>
            )}
          </div>
          <div
            className={cn(
              "text-body text-primary whitespace-pre-wrap",
              typing && "animate-pulse"
            )}
          >
            {message}
            {typing && (
              <span className="inline-flex ml-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
              </span>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 pt-1">{actions}</div>
          )}
        </div>
      </div>
    );
  }
);
AIMessage.displayName = "AIMessage";

export { AIMessage, messageVariants };
export type { AIMessageProps };
