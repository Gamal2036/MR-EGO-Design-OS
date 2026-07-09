"use client";

import { FileText, Lock, Play, CheckCircle2, Puzzle, ClipboardCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Lesson, LessonType } from "@/types/learning";

const lessonIcons: Record<LessonType, typeof Play> = {
  video: Play,
  reading: FileText,
  exercise: Puzzle,
  quiz: ClipboardCheck,
  project: FileText,
};

interface LessonCardProps {
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  onSelect?: (lessonId: string) => void;
}

export function LessonCard({ lesson, moduleIndex, lessonIndex, onSelect }: LessonCardProps) {
  const Icon = lessonIcons[lesson.type];

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border border-border bg-surface-1 p-3 text-left transition-all",
        lesson.completed && "border-success/30 bg-success/5",
        lesson.isLocked && "opacity-50 cursor-not-allowed",
        !lesson.isLocked && "hover:border-primary/30 hover:bg-primary/5 cursor-pointer",
      )}
      onClick={() => !lesson.isLocked && onSelect?.(lesson.id)}
      disabled={lesson.isLocked}
      aria-label={`${lesson.title} - ${lesson.type} - ${lesson.duration}${lesson.completed ? " - Completed" : lesson.isLocked ? " - Locked" : ""}`}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          lesson.completed
            ? "bg-success/10"
            : lesson.isLocked
              ? "bg-surface-3"
              : "bg-primary/10",
        )}
      >
        {lesson.completed ? (
          <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
        ) : lesson.isLocked ? (
          <Lock className="h-4 w-4 text-tertiary" aria-hidden="true" />
        ) : (
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-body-small font-medium truncate",
            lesson.completed ? "text-success" : "text-primary",
          )}
        >
          {moduleIndex}.{lessonIndex + 1} {lesson.title}
        </p>
        <p className="text-caption text-tertiary truncate mt-0.5">
          {lesson.description}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {lesson.quizCount && (
          <span className="text-caption text-tertiary">{lesson.quizCount} questions</span>
        )}
        <span className="text-caption text-tertiary whitespace-nowrap">{lesson.duration}</span>
      </div>
    </button>
  );
}
