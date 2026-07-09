"use client";

import {
  Archive,
  Bot,
  Briefcase,
  GraduationCap,
  HeadphonesIcon,
  Inbox,
  Pin,
  UserRound,
} from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { ConversationFilter } from "@/types/messages";

interface FilterOption {
  value: ConversationFilter;
  label: string;
  icon: React.ElementType;
}

const filterOptions: FilterOption[] = [
  { value: "all", label: "All", icon: Inbox },
  { value: "pinned", label: "Pinned", icon: Pin },
  { value: "unread", label: "Unread", icon: UserRound },
  { value: "ai_assistant", label: "AI Assistant", icon: Bot },
  { value: "career_coach", label: "Career Coach", icon: GraduationCap },
  { value: "applications", label: "Applications", icon: Briefcase },
  { value: "recruiters", label: "Recruiters", icon: Briefcase },
  { value: "support", label: "Support", icon: HeadphonesIcon },
  { value: "archived", label: "Archived", icon: Archive },
];

interface ConversationFiltersProps {
  activeFilter: ConversationFilter;
  onFilterChange: (filter: ConversationFilter) => void;
}

const ConversationFilters = forwardRef<HTMLDivElement, ConversationFiltersProps>(
  ({ activeFilter, onFilterChange }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col gap-0.5"
        role="group"
        aria-label="Conversation filters"
      >
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = activeFilter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors duration-fast",
                "text-body text-secondary hover:bg-surface-1 hover:text-primary",
                isActive && "bg-primary/10 text-primary font-medium",
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${option.label}`}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-tertiary")} aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);
ConversationFilters.displayName = "ConversationFilters";

export { ConversationFilters };
export type { ConversationFiltersProps };
