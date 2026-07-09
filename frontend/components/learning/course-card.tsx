"use client";

import { Bookmark, CheckCircle2, Clock, Heart, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge, Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Course, CourseDifficulty } from "@/types/learning";

const difficultyConfig: Record<CourseDifficulty, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-success/10 text-success" },
  intermediate: { label: "Intermediate", className: "bg-info/10 text-info" },
  advanced: { label: "Advanced", className: "bg-warning/10 text-warning" },
  expert: { label: "Expert", className: "bg-danger/10 text-danger" },
};

interface CourseCardProps {
  course: Course;
  onToggleBookmark?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export function CourseCard({ course, onToggleBookmark, onToggleFavorite }: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/learning/course/${course.id}`);
  };

  const diffConfig = difficultyConfig[course.difficulty];

  return (
    <Card
      variant="interactive"
      padding="none"
      className="flex flex-col"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${course.title} - ${course.status === "in-progress" ? `${course.progress}% complete` : course.status === "completed" ? "Completed" : "Not started"}`}
    >
      <div className="flex flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-body font-semibold text-primary truncate">
              {course.title}
            </h3>
            <p className="text-caption text-tertiary mt-0.5 line-clamp-2">
              {course.shortDescription}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={course.isBookmarked ? "Remove bookmark" : "Bookmark course"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark?.(course.id);
              }}
            >
              <Bookmark
                className={cn(
                  "h-3.5 w-3.5",
                  course.isBookmarked && "fill-primary text-primary",
                )}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={course.isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(course.id);
              }}
            >
              <Heart
                className={cn(
                  "h-3.5 w-3.5",
                  course.isFavorite && "fill-danger text-danger",
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="xs">
            {course.category}
          </Badge>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-medium",
              diffConfig.className,
            )}
          >
            {diffConfig.label}
          </span>
        </div>

        <div className="flex items-center gap-3 text-caption text-tertiary">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {course.estimatedTime}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" aria-hidden="true" />
            {course.enrolledCount.toLocaleString()}
          </span>
        </div>

        {course.status === "in-progress" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-caption text-tertiary">Progress</span>
              <span className="text-caption font-medium text-primary">{course.progress}%</span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
              role="progressbar"
              aria-valuenow={course.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${course.progress}% complete`}
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {course.status === "completed" && (
          <div className="flex items-center gap-1.5 text-caption text-success font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Completed
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <User className="h-3 w-3 text-primary" aria-hidden="true" />
          </div>
          <span className="text-caption text-secondary truncate">
            {course.instructor.name}
          </span>
        </div>
      </div>
    </Card>
  );
}
