"use client";

import {
  ArrowLeft,
  Bookmark,
  Clock,
  Heart,
  Star,
  User,
  Users,
  Tag,
  GraduationCap,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { LessonList } from "./lesson-list";

import { Badge, Button, Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Course, CourseDifficulty } from "@/types/learning";

const difficultyConfig: Record<CourseDifficulty, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-success/10 text-success" },
  intermediate: { label: "Intermediate", className: "bg-info/10 text-info" },
  advanced: { label: "Advanced", className: "bg-warning/10 text-warning" },
  expert: { label: "Expert", className: "bg-danger/10 text-danger" },
};

interface CourseDetailsProps {
  course: Course;
  onToggleBookmark?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onSelectLesson?: (lessonId: string) => void;
}

export function CourseDetails({
  course,
  onToggleBookmark,
  onToggleFavorite,
  onSelectLesson,
}: CourseDetailsProps) {
  const router = useRouter();
  const diffConfig = difficultyConfig[course.difficulty];

  const completedLessons = course.modules.reduce(
    (sum, mod) => sum + mod.lessons.filter((l) => l.completed).length,
    0,
  );
  const totalLessons = course.modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0,
  );

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        onClick={() => router.push("/dashboard/learning")}
      >
        Back to Learning Center
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-heading-3 text-primary font-bold">{course.title}</h1>
                <p className="text-body text-tertiary">{course.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={course.isBookmarked ? "Remove bookmark" : "Bookmark course"}
                  onClick={() => onToggleBookmark?.(course.id)}
                >
                  <Bookmark
                    className={cn("h-4 w-4", course.isBookmarked && "fill-primary text-primary")}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={course.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  onClick={() => onToggleFavorite?.(course.id)}
                >
                  <Heart
                    className={cn("h-4 w-4", course.isFavorite && "fill-danger text-danger")}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="neutral" size="sm">{course.category}</Badge>
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", diffConfig.className)}>
                {diffConfig.label}
              </span>
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {course.estimatedTime}
              </span>
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" />
                {course.rating} ({course.ratingCount})
              </span>
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                {course.enrolledCount.toLocaleString()} enrolled
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-1 border border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-body-small font-medium text-primary">{course.instructor.name}</p>
                <p className="text-caption text-tertiary">{course.instructor.role}</p>
              </div>
            </div>
          </div>

          {course.status === "in-progress" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-body font-medium text-primary">Course Progress</span>
                <span className="text-body font-semibold text-primary">{course.progress}%</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-surface-3"
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
              <p className="text-caption text-tertiary">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
          )}

          {course.modules.length > 0 && (
            <section aria-label="Course modules and lessons" className="space-y-4">
              <h2 className="text-heading-4 text-primary font-semibold">Course Content</h2>
              <LessonList
                modules={course.modules}
                onSelectLesson={onSelectLesson}
              />
            </section>
          )}
        </div>

        <div className="space-y-6">
          <Card padding="md" className="space-y-4">
            <h3 className="text-body font-medium text-primary">Course Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-caption text-secondary">
                <GraduationCap className="h-4 w-4 text-tertiary" aria-hidden="true" />
                <span>{course.modules.length} modules &middot; {totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-secondary">
                <Clock className="h-4 w-4 text-tertiary" aria-hidden="true" />
                <span>{course.estimatedTime} total</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-secondary">
                <Tag className="h-4 w-4 text-tertiary" aria-hidden="true" />
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="neutral" size="xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {course.prerequisites.length > 0 && (
            <Card padding="md" className="space-y-3">
              <h3 className="text-body font-medium text-primary">Prerequisites</h3>
              <ul className="space-y-1.5">
                {course.prerequisites.map((prereq) => (
                  <li key={prereq} className="flex items-center gap-2 text-caption text-secondary">
                    <div className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden="true" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {course.skills.length > 0 && (
            <Card padding="md" className="space-y-3">
              <h3 className="text-body font-medium text-primary">Skills You&apos;ll Gain</h3>
              <div className="flex flex-wrap gap-1.5">
                {course.skills.map((skill) => (
                  <Badge key={skill} variant="primary" size="xs">{skill}</Badge>
                ))}
              </div>
            </Card>
          )}

          {course.resources.length > 0 && (
            <Card padding="md" className="space-y-3">
              <h3 className="text-body font-medium text-primary">Resources</h3>
              <div className="space-y-2">
                {course.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    className="flex items-center gap-2 text-caption text-link hover:text-link-hover transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="flex-1 truncate">{resource.title}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </Card>
          )}

          <Card padding="md" className="space-y-3" variant="ai">
            <h3 className="text-body font-medium text-primary">AI Coach</h3>
            <p className="text-caption text-tertiary">
              Get personalized guidance and answers about this course.
            </p>
            <Badge variant="ai" size="sm">Coming Soon</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}
