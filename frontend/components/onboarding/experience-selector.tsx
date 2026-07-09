"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ExperienceLevel {
  id: string;
  label: string;
  description: string;
  years: string;
}

const LEVELS: ExperienceLevel[] = [
  {
    id: "entry",
    label: "Entry Level",
    description: "Just starting out or less than 2 years",
    years: "0-2 years",
  },
  {
    id: "mid",
    label: "Mid Level",
    description: "Competent and working independently",
    years: "2-5 years",
  },
  {
    id: "senior",
    label: "Senior",
    description: "Deep expertise and mentoring others",
    years: "5-8 years",
  },
  {
    id: "lead",
    label: "Lead / Principal",
    description: "Strategic impact and team leadership",
    years: "8+ years",
  },
  {
    id: "executive",
    label: "Executive",
    description: "C-suite, director, or VP-level",
    years: "12+ years",
  },
];

interface ExperienceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ExperienceSelector({
  value,
  onChange,
  className,
}: ExperienceSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {LEVELS.map((level, index) => {
        const isSelected = value === level.id;

        return (
          <motion.button
            key={level.id}
            type="button"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => onChange(level.id)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-normal",
              isSelected
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-hover hover:shadow-soft"
            )}
            role="radio"
            aria-checked={isSelected}
          >
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-normal",
                isSelected
                  ? "border-primary"
                  : "border-neutral-300 dark:border-neutral-600"
              )}
            >
              {isSelected && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-label font-semibold",
                    isSelected ? "text-primary" : "text-primary"
                  )}
                >
                  {level.label}
                </span>
                <span className="text-caption text-tertiary">
                  {level.years}
                </span>
              </div>
              <p className="text-body-small text-secondary mt-0.5">
                {level.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
