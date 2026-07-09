"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { QuestionCard } from "./question-card";

import { cn } from "@/lib/utils";
import type { Question, QuestionCategory } from "@/types/interview";

const categoryLabel: Record<string, string> = {
  behavioral: "Behavioral",
  technical: "Technical",
  hr: "HR",
  culture: "Culture",
  leadership: "Leadership",
  problem_solving: "Problem Solving",
  career: "Career",
  salary: "Salary",
};

interface QuestionLibraryProps extends HTMLAttributes<HTMLDivElement> {
  questions: Question[];
  onQuestionClick?: (id: string) => void;
  selectedCategory?: QuestionCategory | "all";
  onCategoryChange?: (category: QuestionCategory | "all") => void;
}

const QuestionLibrary = forwardRef<HTMLDivElement, QuestionLibraryProps>(
  (
    {
      className,
      questions,
      onQuestionClick,
      selectedCategory = "all",
      onCategoryChange,
      ...props
    },
    ref,
  ) => {
    const categories: (QuestionCategory | "all")[] = [
      "all",
      "behavioral",
      "technical",
      "hr",
      "culture",
      "leadership",
      "problem_solving",
      "career",
      "salary",
    ];

    const filtered =
      selectedCategory === "all"
        ? questions
        : questions.filter((q) => q.category === selectedCategory);

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Question categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={cn(
                "rounded-full px-3 py-1 text-caption font-medium transition-colors",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-tertiary hover:bg-surface-1 hover:text-secondary",
              )}
              onClick={() => onCategoryChange?.(cat)}
            >
              {cat === "all" ? "All" : categoryLabel[cat]}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => onQuestionClick?.(question.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-body-small text-tertiary text-center py-8">
              No questions in this category.
            </p>
          )}
        </div>
      </div>
    );
  },
);
QuestionLibrary.displayName = "QuestionLibrary";

export { QuestionLibrary };
export type { QuestionLibraryProps };
