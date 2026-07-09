"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Award,
  Bell,
  Briefcase,
  FileText,
  GraduationCap,
  Route,
  Send,
  Shield,
  Sparkles,
  type LucideIcon,
  Wrench,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { NotificationCategory } from "@/types/notifications";

const categoryBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-smallest font-medium border",
  {
    variants: {
      category: {
        ai_recommendation: "bg-ai/10 text-ai border-ai/20",
        job_match: "bg-primary/10 text-primary border-primary/20",
        application: "bg-info/10 text-info border-info/20",
        cv_analysis: "bg-success/10 text-success border-success/20",
        document: "bg-warning/10 text-warning border-warning/20",
        career_progress: "bg-secondary/10 text-secondary-foreground border-secondary/20",
        system: "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
        security: "bg-danger/10 text-danger border-danger/20",
        reminder: "bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20",
        achievement: "bg-success/10 text-success border-success/20",
      },
    },
    defaultVariants: {
      category: "system",
    },
  },
);

const categoryIcons: Record<NotificationCategory, LucideIcon> = {
  ai_recommendation: Sparkles,
  job_match: Briefcase,
  application: Send,
  cv_analysis: FileText,
  document: Wrench,
  career_progress: Route,
  system: Bell,
  security: Shield,
  reminder: GraduationCap,
  achievement: Award,
};

const categoryLabels: Record<NotificationCategory, string> = {
  ai_recommendation: "AI Recommendation",
  job_match: "Job Match",
  application: "Application",
  cv_analysis: "CV Analysis",
  document: "Document",
  career_progress: "Career Progress",
  system: "System",
  security: "Security",
  reminder: "Reminder",
  achievement: "Achievement",
};

interface NotificationCategoryBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof categoryBadgeVariants> {
  category: NotificationCategory;
}

const NotificationCategoryBadge = forwardRef<HTMLSpanElement, NotificationCategoryBadgeProps>(
  ({ className, category, ...props }, ref) => {
    const Icon = categoryIcons[category];
    return (
      <span
        ref={ref}
        className={cn(categoryBadgeVariants({ category, className }))}
        {...props}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        <span>{categoryLabels[category]}</span>
      </span>
    );
  },
);
NotificationCategoryBadge.displayName = "NotificationCategoryBadge";

export { NotificationCategoryBadge, categoryIcons, categoryLabels };
export type { NotificationCategoryBadgeProps };
