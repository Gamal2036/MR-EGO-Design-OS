"use client";

import { Star, StarOff } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Badge, Card, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/interview";

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

const categoryBadgeVariant: Record<
  string,
  "primary" | "info" | "success" | "warning" | "neutral" | "ai" | "danger"
> = {
  behavioral: "primary",
  technical: "info",
  hr: "success",
  culture: "ai",
  leadership: "warning",
  problem_solving: "danger",
  career: "neutral",
  salary: "success",
};

const difficultyVariant: Record<string, "success" | "warning" | "danger"> = {
  easy: "success",
  medium: "warning",
  hard: "danger",
};

interface QuestionCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  question: Question;
  onClick?: () => void;
  onToggleFavorite?: (id: string) => void;
}

const QuestionCard = forwardRef<HTMLDivElement, QuestionCardProps>(
  ({ className, question, onClick, onToggleFavorite, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="interactive"
        padding="sm"
        className={cn("group", className)}
        role="article"
        aria-label={`Question: ${question.text}`}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={categoryBadgeVariant[question.category]} size="sm">
              {categoryLabel[question.category]}
            </Badge>
            <Badge variant={difficultyVariant[question.difficulty]} size="sm">
              {question.difficulty}
            </Badge>
          </div>
          {onToggleFavorite && (
            <IconButton
              icon={question.isFavorite ? StarOff : Star}
              label={question.isFavorite ? "Unfavorite" : "Favorite"}
              variant="ghost"
              size="xs"
              className={cn(question.isFavorite && "text-warning")}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(question.id);
              }}
            />
          )}
        </div>

        <p className="mt-2 text-body-small text-primary font-medium line-clamp-2">
          {question.text}
        </p>

        {question.answerNotes && (
          <p className="mt-1.5 text-caption text-tertiary line-clamp-2">
            {question.answerNotes}
          </p>
        )}

        {question.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {question.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="neutral" size="xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    );
  },
);
QuestionCard.displayName = "QuestionCard";

export { QuestionCard };
export type { QuestionCardProps };
