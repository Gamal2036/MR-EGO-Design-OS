"use client";

import {
  Brain,
  Cloud,
  Code,
  Container,
  GitBranch,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  Monitor,
  Network,
  Search,
  Shield,
  ShieldCheck,
  Swords,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skills";

interface SkillCategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  skill: Skill;
}

const iconMap: Record<string, LucideIcon> = {
  Network,
  Shield,
  Terminal,
  Lock,
  Monitor,
  ShieldCheck,
  Code,
  Bug: Swords,
  Swords,
  Cloud,
  CloudLock: ShieldCheck,
  Container,
  Layers,
  GitBranch,
  MessageSquare,
  AlertTriangle: Shield,
  Brain,
  Search,
  Globe,
};

function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "text-success";
  if (confidence >= 60) return "text-ai";
  if (confidence >= 40) return "text-warning";
  return "text-danger";
}

function getProgressColor(progress: number): string {
  if (progress >= 80) return "bg-success";
  if (progress >= 60) return "bg-ai";
  if (progress >= 40) return "bg-warning";
  return "bg-danger";
}

const SkillCategoryCard = forwardRef<HTMLDivElement, SkillCategoryCardProps>(
  ({ className, skill, ...props }, ref) => {
    const Icon = iconMap[skill.icon] || Brain;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-normal hover:shadow-medium hover:border-primary/20",
          "cursor-default",
          className
        )}
        role="article"
        aria-label={`${skill.name}: ${skill.currentLevel} level, ${skill.progress}% progress`}
        tabIndex={0}
        {...props}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-fast" aria-hidden="true">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={skill.priority === "high" ? "danger" : skill.priority === "medium" ? "warning" : "success"} size="xs" className="capitalize">
            {skill.priority}
          </Badge>
        </div>

        <h4 className="text-body font-medium text-primary mb-1 truncate">{skill.name}</h4>
        <p className="text-smallest text-secondary mb-3 line-clamp-2">{skill.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-smallest">
            <span className="text-tertiary">Progress</span>
            <span className="font-medium text-primary">{skill.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-slow ease-out-custom", getProgressColor(skill.progress))}
              style={{ width: `${skill.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-smallest text-tertiary">Level:</span>
            <span className="text-smallest font-medium text-primary capitalize">{skill.currentLevel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-smallest text-tertiary">AI:</span>
            <span className={cn("text-smallest font-semibold", getConfidenceColor(skill.confidence))}>
              {skill.confidence}%
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 to-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-slow ease-out-custom origin-left" />
      </div>
    );
  }
);
SkillCategoryCard.displayName = "SkillCategoryCard";

export { SkillCategoryCard };
export type { SkillCategoryCardProps };
