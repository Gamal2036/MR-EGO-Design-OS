"use client";

import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  FolderGit2,
  Award,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCVBuilderStore } from "@/stores/cv-builder-store";
import type { CVSectionId } from "@/types/cv-builder";
import { CV_SECTION_LABELS } from "@/types/cv-builder";

const SECTION_ICONS: Record<CVSectionId, LucideIcon> = {
  "personal-info": User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  languages: Globe,
  projects: FolderGit2,
  certifications: Award,
};

interface CVSectionNavigatorProps {
  className?: string;
}

export function CVSectionNavigator({ className }: CVSectionNavigatorProps) {
  const activeSection = useCVBuilderStore((s) => s.activeSection);
  const setActiveSection = useCVBuilderStore((s) => s.setActiveSection);
  const cvData = useCVBuilderStore((s) => s.cvData);

  const isSectionComplete = (id: CVSectionId): boolean => {
    switch (id) {
      case "personal-info":
        return !!(cvData.personalInfo.fullName && cvData.personalInfo.email);
      case "summary":
        return cvData.summary.length > 20;
      case "experience":
        return cvData.experience.length > 0;
      case "education":
        return cvData.education.length > 0;
      case "skills":
        return cvData.skills.length > 0;
      case "languages":
        return cvData.languages.length > 0;
      case "projects":
        return cvData.projects.length > 0;
      case "certifications":
        return cvData.certifications.length > 0;
    }
  };

  return (
    <nav className={cn("space-y-1", className)} aria-label="CV Sections">
      <h2 className="text-overline text-tertiary uppercase tracking-wider px-3 pb-2">
        Sections
      </h2>
      {(Object.keys(CV_SECTION_LABELS) as CVSectionId[]).map((id) => {
        const Icon = SECTION_ICONS[id];
        const isActive = activeSection === id;
        const isComplete = isSectionComplete(id);

        return (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-body transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-secondary hover:bg-accent hover:text-accent-foreground"
            )}
            aria-current={isActive ? "true" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate flex-1 text-left">{CV_SECTION_LABELS[id]}</span>
            {isComplete ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cv-500" aria-label="Complete" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-tertiary" aria-label="Incomplete" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
