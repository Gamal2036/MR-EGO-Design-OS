import {
  Award,
  Banknote,
  Briefcase,
  Flag,
  GraduationCap,
  Languages,
  MessageCircleQuestion,
  Rocket,
  Target,
  type LucideIcon,
} from "lucide-react";

import type { SmartGoalPriority, SmartGoalStatus, SmartGoalType } from "@/types/smart-goal";

export const goalTypeIcons: Record<SmartGoalType, LucideIcon> = {
  career: Target,
  learning: GraduationCap,
  certification: Award,
  job_search: Briefcase,
  language: Languages,
  interview: MessageCircleQuestion,
  salary: Banknote,
  personal: Rocket,
  custom: Flag,
};

export const goalTypeLabels: Record<SmartGoalType, string> = {
  career: "Career Goal",
  learning: "Learning Goal",
  certification: "Certification Goal",
  job_search: "Job Search Goal",
  language: "Language Goal",
  interview: "Interview Goal",
  salary: "Salary Goal",
  personal: "Personal Goal",
  custom: "Custom Goal",
};

export const goalStatusLabels: Record<SmartGoalStatus, string> = {
  not_started: "Not Started",
  planning: "Planning",
  in_progress: "In Progress",
  paused: "Paused",
  completed: "Completed",
  archived: "Archived",
  cancelled: "Cancelled",
};

export const goalPriorityLabels: Record<SmartGoalPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 0) return `in ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

export function getStatusColor(status: SmartGoalStatus): string {
  switch (status) {
    case "completed":
      return "bg-success text-success-foreground";
    case "in_progress":
      return "bg-primary text-primary-foreground";
    case "planning":
      return "bg-info text-info-foreground";
    case "paused":
      return "bg-warning text-warning-foreground";
    case "archived":
    case "cancelled":
      return "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300";
    default:
      return "bg-surface-2 text-secondary";
  }
}

export function getPriorityColor(priority: SmartGoalPriority): string {
  switch (priority) {
    case "critical":
      return "text-danger border-danger/30 bg-danger/10";
    case "high":
      return "text-warning border-warning/30 bg-warning/10";
    case "medium":
      return "text-info border-info/30 bg-info/10";
    case "low":
      return "text-success border-success/30 bg-success/10";
  }
}

export function getRiskColor(riskLevel: "low" | "medium" | "high" | "critical"): string {
  switch (riskLevel) {
    case "critical":
      return "text-danger";
    case "high":
      return "text-warning";
    case "medium":
      return "text-info";
    case "low":
      return "text-success";
  }
}

export function getTrendIcon(direction: "up" | "down" | "stable"): string {
  return direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
}
