"use client";

import {
  BookOpen,
  BookMarked,
  Compass,
  Star,
  CheckCircle2,
  Award,
  Beaker,
  StickyNote,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

import { Badge } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { LearningViewMode } from "@/types/learning";

interface CourseSidebarProps {
  activeSection: LearningViewMode;
  onSectionChange: (section: LearningViewMode) => void;
  counts: Record<string, number>;
}

const sidebarSections: {
  label: string;
  icon: typeof LayoutDashboard;
  mode: LearningViewMode;
  countKey: string;
}[] = [
  { label: "Dashboard", icon: LayoutDashboard, mode: "dashboard", countKey: "" },
  { label: "My Courses", icon: BookOpen, mode: "courses", countKey: "inProgress" },
  { label: "Recommended", icon: Star, mode: "ai-recommendations", countKey: "recommended" },
  { label: "Roadmaps", icon: Compass, mode: "roadmaps", countKey: "roadmaps" },
  { label: "Bookmarks", icon: BookMarked, mode: "bookmarks", countKey: "bookmarks" },
  { label: "Completed", icon: CheckCircle2, mode: "completed", countKey: "completed" },
  { label: "Certificates", icon: Award, mode: "certificates", countKey: "certificates" },
  { label: "Practice Labs", icon: Beaker, mode: "labs", countKey: "labs" },
  { label: "Notes", icon: StickyNote, mode: "notes", countKey: "notes" },
  { label: "AI Recommendations", icon: Sparkles, mode: "ai-recommendations", countKey: "" },
];

export function CourseSidebar({ activeSection, onSectionChange, counts }: CourseSidebarProps) {
  return (
    <div className="p-4 space-y-1">
      <h3 className="text-caption text-tertiary font-medium uppercase tracking-wider mb-3 px-2">
        Learning Center
      </h3>
      {sidebarSections.map((section) => {
        const Icon = section.icon;
        const count = section.countKey ? counts[section.countKey] : undefined;
        return (
          <button
            key={section.mode}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-body-small transition-colors",
              activeSection === section.mode
                ? "bg-primary/10 text-primary font-medium"
                : "text-tertiary hover:bg-surface-2 hover:text-secondary",
            )}
            onClick={() => onSectionChange(section.mode)}
            aria-current={activeSection === section.mode ? "true" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="flex-1 truncate">{section.label}</span>
            {count !== undefined && count > 0 && (
              <Badge variant="neutral" size="xs">
                {count}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}
