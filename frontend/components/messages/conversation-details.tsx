"use client";

import { Calendar, FileText, FolderOpen, Link2, Users, X } from "lucide-react";
import { forwardRef } from "react";

import { ConversationFiles } from "./conversation-files";
import { ConversationLinks } from "./conversation-links";
import { MessageAvatar } from "./message-avatar";

import { IconButton } from "@/components/foundation/icon-button";
import type { Conversation } from "@/types/messages";

interface ConversationDetailsProps {
  conversation: Conversation;
  onClose?: () => void;
}

const roleMap: Record<string, "ai" | "user" | "system" | "recruiter" | "career_coach" | "support"> = {
  ai: "ai",
  user: "user",
  system: "system",
  recruiter: "recruiter",
  career_coach: "career_coach",
  support: "support",
};

const ConversationDetails = forwardRef<HTMLDivElement, ConversationDetailsProps>(
  ({ conversation, onClose }, ref) => {
    return (
      <div
        ref={ref}
        className="flex h-full flex-col border-l border-border bg-surface-0 overflow-y-auto scrollbar-thin"
        role="complementary"
        aria-label="Conversation details"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-label font-semibold text-primary">Details</h3>
          <IconButton
            icon={X}
            variant="ghost"
            size="sm"
            label="Close details panel"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        <div className="flex flex-col gap-6 p-4">
          <section aria-label="Members">
            <h4 className="flex items-center gap-1.5 text-caption font-medium text-secondary mb-3">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              Members
            </h4>
            <div className="flex flex-col gap-2">
              {conversation.participants.map((p) => (
                <div key={p.id} className="flex items-center gap-2.5">
                  <MessageAvatar
                    initials={p.initials}
                    role={roleMap[p.role] ?? "system"}
                    name={p.name}
                    size="sm"
                    online={p.online}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-caption font-medium text-primary">{p.name}</p>
                    <p className="text-smallest text-tertiary capitalize">{p.role.replace("_", " ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-border" />

          <ConversationFiles files={[]} />
          <ConversationLinks links={[]} />

          <div className="border-t border-border" />

          <section aria-label="Related items">
            <h4 className="flex items-center gap-1.5 text-caption font-medium text-secondary mb-3">
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              Related
            </h4>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-caption text-secondary hover:bg-surface-1 hover:text-primary transition-colors"
              >
                <FileText className="h-4 w-4 text-cv" />
                <span>Related CV</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-caption text-secondary hover:bg-surface-1 hover:text-primary transition-colors"
              >
                <FolderOpen className="h-4 w-4 text-job" />
                <span>Related Documents</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-caption text-secondary hover:bg-surface-1 hover:text-primary transition-colors"
              >
                <Calendar className="h-4 w-4 text-info" />
                <span>Related Job</span>
              </button>
            </div>
          </section>

          <div className="border-t border-border" />

          <section aria-label="Metadata">
            <h4 className="text-caption font-medium text-secondary mb-2">Metadata</h4>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-smallest">
                <span className="text-tertiary">Created</span>
                <span className="text-secondary">
                  {new Date(conversation.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-smallest">
                <span className="text-tertiary">Messages</span>
                <span className="text-secondary">{conversation.messages.length}</span>
              </div>
              <div className="flex justify-between text-smallest">
                <span className="text-tertiary">Participants</span>
                <span className="text-secondary">{conversation.participants.length}</span>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          <section aria-label="Future backend hooks">
            <h4 className="text-caption font-medium text-secondary mb-2">Backend Hooks</h4>
            <div className="rounded-lg border border-border bg-surface-1 p-3">
              <p className="text-smallest text-tertiary">
                Future backend integration will enable real-time sync, message persistence, and cross-device access.
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  },
);
ConversationDetails.displayName = "ConversationDetails";

export { ConversationDetails };
export type { ConversationDetailsProps };
