"use client";

import {
  LayoutDashboard,
  FileSearch,
  Wrench,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Globe,
  Hash,
  Lightbulb,
  History,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Panel } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "ats", label: "ATS", icon: FileSearch },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "languages", label: "Languages", icon: Globe },
  { id: "keywords", label: "Keywords", icon: Hash },
  { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  { id: "history", label: "History", icon: History },
];

export interface AnalysisNavigationProps extends HTMLAttributes<HTMLDivElement> {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const AnalysisNavigation = forwardRef<HTMLDivElement, AnalysisNavigationProps>(
  ({ className, activeSection = "overview", onSectionChange, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("", className)}
        aria-label="Analysis sections"
        {...props}
      >
        <Panel variant="default" padding="none">
          <ul className="divide-y divide-border" role="list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              const isDisabled = item.id === "history";

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => !isDisabled && onSectionChange?.(item.id)}
                    disabled={isDisabled}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left text-label transition-colors duration-fast",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                      isActive
                        ? "bg-primary/5 text-primary font-medium border-r-2 border-primary"
                        : "text-secondary hover:bg-surface-0 hover:text-primary",
                      isDisabled && "opacity-40 cursor-not-allowed"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-primary" : "text-tertiary"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>
      </nav>
    );
  }
);
AnalysisNavigation.displayName = "AnalysisNavigation";

export { AnalysisNavigation };
