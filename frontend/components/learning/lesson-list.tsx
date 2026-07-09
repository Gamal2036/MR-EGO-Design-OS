"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { LessonCard } from "./lesson-card";

import type { CourseModule } from "@/types/learning";

interface LessonListProps {
  modules: CourseModule[];
  moduleIndexOffset?: number;
  onSelectLesson?: (lessonId: string) => void;
}

export function LessonList({
  modules,
  moduleIndexOffset = 0,
  onSelectLesson,
}: LessonListProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((mod) => {
      initial[mod.id] = true;
    });
    return initial;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="space-y-3" role="list" aria-label="Course modules and lessons">
      {modules.map((mod, modIdx) => (
        <div
          key={mod.id}
          className="rounded-xl border border-border bg-surface-1 overflow-hidden"
        >
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-2 transition-colors"
            onClick={() => toggleModule(mod.id)}
            aria-expanded={expandedModules[mod.id]}
            aria-controls={`module-${mod.id}-content`}
          >
            {expandedModules[mod.id] ? (
              <ChevronDown className="h-4 w-4 text-tertiary" aria-hidden="true" />
            ) : (
              <ChevronRight className="h-4 w-4 text-tertiary" aria-hidden="true" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-body-small font-medium text-primary">
                Module {modIdx + 1}: {mod.title}
              </p>
              <p className="text-caption text-tertiary mt-0.5">{mod.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-caption text-tertiary">{mod.estimatedTime}</span>
              {mod.progress > 0 && (
                <span className="text-caption font-medium text-primary">{mod.progress}%</span>
              )}
            </div>
          </button>

          {expandedModules[mod.id] && (
            <div id={`module-${mod.id}-content`} className="border-t border-border p-3 space-y-2">
              {mod.lessons.length === 0 ? (
                <p className="text-caption text-tertiary text-center py-4">No lessons yet</p>
              ) : (
                mod.lessons.map((lesson, lsnIdx) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    moduleIndex={modIdx + moduleIndexOffset + 1}
                    lessonIndex={lsnIdx}
                    onSelect={onSelectLesson}
                  />
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
