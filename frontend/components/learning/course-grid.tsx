"use client";

import { CourseCard } from "./course-card";

import type { Course } from "@/types/learning";

interface CourseGridProps {
  courses: Course[];
  onToggleBookmark?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export function CourseGrid({ courses, onToggleBookmark, onToggleFavorite }: CourseGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
      aria-label="Course grid"
    >
      {courses.map((course) => (
        <div key={course.id} role="listitem">
          <CourseCard
            course={course}
            onToggleBookmark={onToggleBookmark}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
}
