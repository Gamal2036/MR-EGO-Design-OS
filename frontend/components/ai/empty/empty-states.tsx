"use client";

import { MessageSquare, FileText, Search, WifiOff } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface AIEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const AIEmptyState = forwardRef<HTMLDivElement, AIEmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
          className,
        )}
        {...props}
      >
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ai/10 text-ai" aria-hidden="true">
            {icon}
          </div>
        )}
        <h3 className="text-heading-4 text-primary">{title}</h3>
        {description && (
          <p className="text-body text-secondary max-w-sm">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  },
);
AIEmptyState.displayName = "AIEmptyState";

export function NoConversation() {
  return (
    <AIEmptyState
      icon={<MessageSquare className="h-6 w-6" />}
      title="No conversation selected"
      description="Choose a conversation from the sidebar or start a new one."
      role="status"
    />
  );
}

export function NoSearchResults() {
  return (
    <AIEmptyState
      icon={<Search className="h-6 w-6" />}
      title="No results found"
      description="Try a different search term or browse the conversation history."
      role="status"
    />
  );
}

export function NoFiles() {
  return (
    <AIEmptyState
      icon={<FileText className="h-6 w-6" />}
      title="No files attached"
      description="Drag and drop files or use the attach button to add files to this conversation."
      role="status"
    />
  );
}

export function ProviderMissing() {
  return (
    <AIEmptyState
      icon={<WifiOff className="h-6 w-6" />}
      title="AI provider not configured"
      description="Configure an AI provider in settings to start using the workspace."
      role="alert"
    />
  );
}

export { AIEmptyState };
