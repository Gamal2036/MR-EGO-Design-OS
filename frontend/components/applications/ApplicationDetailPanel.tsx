"use client";

import {
  X,
  Building2,
  MapPin,
  DollarSign,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  User,
  ChevronDown,
  CalendarClock,
} from "lucide-react";
import { useState, type HTMLAttributes } from "react";

import { ApplicationDocumentsPanel } from "./ApplicationDocumentsPanel";
import { ApplicationNotesPanel } from "./ApplicationNotesPanel";
import { ApplicationTaskChecklist } from "./ApplicationTaskChecklist";
import { ApplicationTimeline } from "./ApplicationTimeline";

import { Badge } from "@/components/foundation/badge";
import type { Application, ApplicationPriority, ApplicationStatus } from "@/types/application-tracker";
import { APPLICATION_STATUSES } from "@/types/application-tracker";

interface ApplicationDetailPanelProps extends HTMLAttributes<HTMLDivElement> {
  application: Application;
  onClose: () => void;
  onStatusChange: (appId: string, status: ApplicationStatus) => void;
  onAddNote: (appId: string, content: string) => void;
  onUpdateNote: (appId: string, noteId: string, content: string) => void;
  onDeleteNote: (appId: string, noteId: string) => void;
  onToggleTask: (appId: string, taskId: string) => void;
  onAddTask: (appId: string, text: string, priority: ApplicationPriority, dueDate?: string) => void;
  onDeleteTask: (appId: string, taskId: string) => void;
  isFullScreen?: boolean;
}

const STATUS_VARIANT: Record<ApplicationStatus, "primary" | "info" | "success" | "warning" | "danger" | "neutral" | "ai"> = {
  draft: "neutral",
  prepared: "info",
  applied: "primary",
  viewed: "info",
  interview: "ai",
  "technical-test": "warning",
  offer: "success",
  accepted: "success",
  rejected: "danger",
  archived: "neutral",
};

export function ApplicationDetailPanel({
  application,
  onClose,
  onStatusChange,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  isFullScreen = false,
  className,
  ...props
}: ApplicationDetailPanelProps) {
  const app = application;
  const [statusOpen, setStatusOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "tasks" | "notes" | "documents">("timeline");

  const tabs = [
    { id: "timeline" as const, label: "Timeline" },
    { id: "tasks" as const, label: `Tasks (${app.tasks.length})` },
    { id: "notes" as const, label: `Notes (${app.notes.length})` },
    { id: "documents" as const, label: `Documents (${app.documents.length})` },
  ];

  const validStatuses = APPLICATION_STATUSES;

  return (
    <div
      className={`flex flex-col bg-surface-1 border-l border-border ${
        isFullScreen ? "fixed inset-0 z-50" : "w-full max-w-md"
      } ${className || ""}`}
      role="dialog"
      aria-label={`Details for ${app.company} - ${app.role}`}
      aria-modal={isFullScreen}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-heading-4 text-primary truncate">{app.company}</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary hover:text-primary hover:bg-surface-0 transition-colors"
          aria-label="Close detail panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-5 p-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <h3 className="text-heading-3 text-primary">{app.role}</h3>
                <div className="flex flex-wrap items-center gap-2 text-caption text-secondary">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {app.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {app.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                <span className="text-label font-medium text-ai">{app.matchScore}%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={STATUS_VARIANT[app.status]} size="sm">
                {APPLICATION_STATUSES.find((s) => s.status === app.status)?.label || app.status}
              </Badge>
              <Badge
                variant={app.priority === "high" ? "danger" : app.priority === "medium" ? "warning" : "neutral"}
                size="sm"
              >
                {app.priority}
              </Badge>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setStatusOpen(!statusOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-0 px-3 py-2 text-caption text-secondary hover:text-primary transition-colors"
                aria-haspopup="listbox"
                aria-expanded={statusOpen}
              >
                <span>Change status...</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
              </button>
              {statusOpen && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 z-10 rounded-lg border border-border bg-card shadow-soft max-h-48 overflow-y-auto"
                  role="listbox"
                  aria-label="Select status"
                >
                  {validStatuses.map((s) => (
                    <button
                      key={s.status}
                      type="button"
                      onClick={() => {
                        onStatusChange(app.id, s.status);
                        setStatusOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-caption text-left transition-colors hover:bg-surface-0 ${
                        s.status === app.status ? "text-primary font-medium" : "text-secondary"
                      }`}
                      role="option"
                      aria-selected={s.status === app.status}
                    >
                      <Badge variant={STATUS_VARIANT[s.status]} size="xs">{s.label}</Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {app.salaryLabel && (
              <div className="flex items-center gap-2 text-caption text-secondary">
                <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                {app.salaryLabel}
              </div>
            )}

            {app.nextAction && (
              <div className="flex items-center justify-between rounded-lg bg-info/5 border border-info/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-info" aria-hidden="true" />
                  <span className="text-caption text-info font-medium">{app.nextAction}</span>
                </div>
                {app.nextActionDate && (
                  <span className="text-caption text-info">{app.nextActionDate}</span>
                )}
              </div>
            )}
          </div>

          {app.aiRecommendation && (
            <div className="rounded-xl border border-ai/20 bg-ai/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                <h4 className="text-label text-ai font-medium">AI Recommendation</h4>
              </div>
              <p className="text-caption text-secondary">{app.aiRecommendation}</p>
              {app.aiInsights && app.aiInsights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {app.aiInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-caption text-tertiary">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ai" aria-hidden="true" />
                      {insight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {app.contactName && (
            <div className="space-y-2 rounded-lg border border-border bg-surface-0 p-3">
              <h4 className="text-label text-primary">Contact</h4>
              <div className="space-y-1.5 text-caption text-secondary">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  {app.contactName}
                </div>
                {app.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {app.contactEmail}
                  </div>
                )}
                {app.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {app.contactPhone}
                  </div>
                )}
              </div>
            </div>
          )}

          {app.jobUrl && (
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-caption text-info hover:text-info/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              View Job Posting
            </a>
          )}

          <div className="border-t border-border pt-4">
            <div className="flex gap-1 border-b border-border" role="tablist" aria-label="Details sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-caption border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-tertiary hover:text-secondary"
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4" role="tabpanel" id="panel-timeline" hidden={activeTab !== "timeline"}>
              {activeTab === "timeline" && (
                <ApplicationTimeline events={app.timeline} />
              )}
            </div>
            <div className="mt-4" role="tabpanel" id="panel-tasks" hidden={activeTab !== "tasks"}>
              {activeTab === "tasks" && (
                <ApplicationTaskChecklist
                  tasks={app.tasks}
                  onToggle={(taskId) => onToggleTask(app.id, taskId)}
                  onAdd={(text, priority, dueDate) => onAddTask(app.id, text, priority, dueDate)}
                  onDelete={(taskId) => onDeleteTask(app.id, taskId)}
                />
              )}
            </div>
            <div className="mt-4" role="tabpanel" id="panel-notes" hidden={activeTab !== "notes"}>
              {activeTab === "notes" && (
                <ApplicationNotesPanel
                  notes={app.notes}
                  onAdd={(content) => onAddNote(app.id, content)}
                  onUpdate={(noteId, content) => onUpdateNote(app.id, noteId, content)}
                  onDelete={(noteId) => onDeleteNote(app.id, noteId)}
                />
              )}
            </div>
            <div className="mt-4" role="tabpanel" id="panel-documents" hidden={activeTab !== "documents"}>
              {activeTab === "documents" && (
                <ApplicationDocumentsPanel documents={app.documents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
