"use client";

import { ArrowRight, Sparkles, Compass, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import { CourseGrid } from "./course-grid";
import { DailyGoalCard } from "./daily-goal";
import { LearningStats } from "./learning-stats";
import { LearningStreak } from "./learning-streak";
import { RoadmapCard } from "./roadmap-card";

import { Badge, Button, Card } from "@/components/foundation";
import type {
  AIRecommendation,
  Course,
  DailyGoal,
  LearningStats as LearningStatsType,
  LearningStreak as LearningStreakType,
  Roadmap,
} from "@/types/learning";

interface LearningDashboardProps {
  stats: LearningStatsType;
  streak: LearningStreakType;
  dailyGoals: DailyGoal[];
  inProgressCourses: Course[];
  recommendedCourses: Course[];
  roadmaps: Roadmap[];
  aiRecommendations: AIRecommendation[];
  nextLesson?: { courseId: string; courseTitle: string; lessonId: string; lessonTitle: string } | null;
  recommendedRoadmapName?: string | null;
  onToggleGoal: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleRoadmapBookmark: (id: string) => void;
}

export function LearningDashboard({
  stats,
  streak,
  dailyGoals,
  inProgressCourses,
  recommendedCourses,
  roadmaps,
  aiRecommendations,
  nextLesson,
  recommendedRoadmapName,
  onToggleGoal,
  onToggleBookmark,
  onToggleFavorite,
  onToggleRoadmapBookmark,
}: LearningDashboardProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <section aria-label="Learning statistics">
        <LearningStats stats={stats} />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {inProgressCourses.length > 0 && (
            <section aria-label="Continue learning" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-heading-4 text-primary font-semibold">Continue Learning</h2>
                <Button
                  variant="ghost"
                  size="xs"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  onClick={() => router.push("/dashboard/learning")}
                >
                  View all
                </Button>
              </div>
              <CourseGrid
                courses={inProgressCourses.slice(0, 3)}
                onToggleBookmark={onToggleBookmark}
                onToggleFavorite={onToggleFavorite}
              />
            </section>
          )}

          {nextLesson && (
            <Card
              variant="ai"
              padding="md"
              className="flex items-center justify-between cursor-pointer hover:shadow-medium transition-shadow"
              onClick={() => router.push(`/dashboard/learning/course/${nextLesson.courseId}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/dashboard/learning/course/${nextLesson.courseId}`);
                }
              }}
              aria-label={`Continue with next lesson: ${nextLesson.lessonTitle} in ${nextLesson.courseTitle}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/10">
                  <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-small font-medium text-primary">Next Lesson</p>
                  <p className="text-caption text-tertiary">{nextLesson.lessonTitle}</p>
                  <p className="text-caption text-tertiary">{nextLesson.courseTitle}</p>
                </div>
              </div>
              <Badge variant="ai" size="sm">Continue</Badge>
            </Card>
          )}

          {recommendedCourses.length > 0 && (
            <section aria-label="Recommended for you" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-heading-4 text-primary font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-warning fill-warning" aria-hidden="true" />
                  Recommended for You
                </h2>
              </div>
              <CourseGrid
                courses={recommendedCourses.slice(0, 3)}
                onToggleBookmark={onToggleBookmark}
                onToggleFavorite={onToggleFavorite}
              />
            </section>
          )}

          {aiRecommendations.length > 0 && (
            <section aria-label="AI suggestions" className="space-y-4">
              <h2 className="text-heading-4 text-primary font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                AI Suggestions
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aiRecommendations.slice(0, 4).map((rec) => (
                  <Card key={rec.id} variant="ai" padding="sm" className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-body-small font-medium text-primary truncate">
                        {rec.title}
                      </p>
                      <Badge variant="ai" size="xs">
                        {rec.confidence}%
                      </Badge>
                    </div>
                    <p className="text-caption text-tertiary line-clamp-2">{rec.description}</p>
                    <p className="text-caption text-ai/70">{rec.reason}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section aria-label="Daily goals">
            <DailyGoalCard goals={dailyGoals} onToggleGoal={onToggleGoal} />
          </section>

          <section aria-label="Learning streak">
            <LearningStreak streak={streak} />
          </section>

          {recommendedRoadmapName && (
            <Card
              variant="interactive"
              padding="md"
              className="space-y-2"
              onClick={() => router.push("/dashboard/learning")}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/dashboard/learning");
                }
              }}
              aria-label={`Recommended roadmap: ${recommendedRoadmapName}`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ai/10">
                  <Compass className="h-4 w-4 text-ai" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-small font-medium text-primary">Recommended Roadmap</p>
                  <p className="text-caption text-tertiary">{recommendedRoadmapName}</p>
                </div>
              </div>
            </Card>
          )}

          {roadmaps.length > 0 && (
            <section aria-label="Active roadmaps" className="space-y-3">
              <h3 className="text-body font-medium text-primary">Active Roadmaps</h3>
              {roadmaps.slice(0, 2).map((roadmap) => (
                <RoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  onToggleBookmark={onToggleRoadmapBookmark}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
