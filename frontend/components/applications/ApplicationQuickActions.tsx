"use client";

import {
  Plus,
  Upload,
  BarChart3,
  Calendar,
  Mail,
  Bell,
  Sparkles,
  FolderOpen,
  FileText,
  Route,
} from "lucide-react";
import Link from "next/link";
import type { HTMLAttributes } from "react";

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  comingSoon?: boolean;
  href?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: Plus, label: "New Application", description: "Track a new job application" },
  { icon: Upload, label: "Import Applications", description: "Bulk import from job boards", comingSoon: true },
  { icon: BarChart3, label: "Analytics", description: "View application insights", comingSoon: true },
  { icon: Calendar, label: "Calendar Sync", description: "Connect interview calendar", comingSoon: true },
  { icon: Mail, label: "Email Integration", description: "Auto-track from email", comingSoon: true },
  { icon: Bell, label: "Reminders", description: "Set application reminders", comingSoon: true },
  { icon: Sparkles, label: "AI Assistant", description: "Get AI-powered suggestions", comingSoon: true },
  { icon: FolderOpen, label: "Documents Center", description: "Manage all documents", href: "/dashboard/documents" },
  { icon: Route, label: "Career Progress", description: "Track your career growth", href: "/dashboard/career-progress" },
  { icon: FileText, label: "Cover Letters", description: "Generate tailored letters", comingSoon: true },
];

interface ApplicationQuickActionsProps extends HTMLAttributes<HTMLDivElement> {
  onNewApplication?: () => void;
}

export function ApplicationQuickActions({
  onNewApplication,
  className,
  ...props
}: ApplicationQuickActionsProps) {
  return (
    <div className={`space-y-3 ${className || ""}`} role="region" aria-label="Quick Actions" {...props}>
      <h3 className="text-label text-primary font-medium">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3">
        {QUICK_ACTIONS.map((action) => {
          const sharedClasses = `flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all ${
            action.comingSoon
              ? "border-border/50 bg-surface-0/50 text-tertiary cursor-not-allowed"
              : "border-border bg-surface-0 text-secondary hover:border-hover hover:text-primary hover:bg-card cursor-pointer"
          }`;
          const iconContainerClasses = `flex h-8 w-8 items-center justify-center rounded-lg ${
            action.comingSoon ? "bg-neutral-100 dark:bg-neutral-800" : "bg-primary/10"
          }`;
          const iconClasses = `h-4 w-4 ${action.comingSoon ? "text-tertiary" : "text-primary"}`;
          const label = action.comingSoon ? `${action.label} - Coming Soon` : action.label;

          const content = (
            <>
              <div className={iconContainerClasses}>
                <action.icon className={iconClasses} aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-caption font-medium">{action.label}</p>
                <p className="text-smallest text-tertiary hidden sm:block">{action.description}</p>
              </div>
              {action.comingSoon && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-smallest text-tertiary dark:bg-neutral-800">
                  Coming Soon
                </span>
              )}
            </>
          );

          if (action.href) {
            return (
              <Link
                key={action.label}
                href={action.href}
                className={sharedClasses}
                aria-label={label}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                if (!action.comingSoon && action.label === "New Application" && onNewApplication) {
                  onNewApplication();
                }
              }}
              className={sharedClasses}
              aria-label={label}
              disabled={action.comingSoon}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
