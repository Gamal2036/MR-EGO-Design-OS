"use client";

import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  Award,
  StickyNote,
  Sparkles,
  Compass,
  Search,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DashboardErrorState, DashboardLoadingState } from "@/components/dashboard";
import { Button, Card } from "@/components/foundation";
import {
  CourseGrid,
  CourseSidebar,
  LearningDashboard,
  LearningEmptyState,
  LearningInsights,
  LearningLayout,
} from "@/components/learning";
import { RoadmapGrid } from "@/components/learning/roadmap-grid";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import {
  demoAIRecommendations,
  demoCertificates,
  demoCourses,
  demoDailyGoals,
  demoLearningNotes,
  demoPracticeLabs,
  demoRoadmaps,
  demoStreak,
  demoWeeklyProgress,
  demoMonthlyProgress,
} from "@/data/learning";
import { cn } from "@/lib/utils";
import { useLearningStore } from "@/stores/learning-store";
import type { CourseCategory, CourseDifficulty, CourseStatus, LearningViewMode } from "@/types/learning";

type PageState = "loading" | "ready" | "error";

export default function LearningPage() {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [activeSection, setActiveSection] = useState<LearningViewMode>("dashboard");
  const [searchValue, setSearchValue] = useState("");

  const store = useLearningStore();
  const setCourses = store.setCourses;
  const setRoadmaps = store.setRoadmaps;
  const setDailyGoals = store.setDailyGoals;
  const setLearningNotes = store.setLearningNotes;
  const setCertificates = store.setCertificates;
  const setPracticeLabs = store.setPracticeLabs;
  const setAIRecommendations = store.setAIRecommendations;
  const setViewState = store.setViewState;
  const setSearchQuery = store.setSearchQuery;
  const setFilter = store.setFilter;
  const resetFilters = store.resetFilters;
  const filters = store.filters;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(demoCourses);
      setRoadmaps(demoRoadmaps);
      setDailyGoals(demoDailyGoals);
      setLearningNotes(demoLearningNotes);
      setCertificates(demoCertificates);
      setPracticeLabs(demoPracticeLabs);
      setAIRecommendations(demoAIRecommendations);
      setViewState("ready");
      setPageState("ready");
    }, 400);
    return () => clearTimeout(timer);
  }, [
    setCourses,
    setRoadmaps,
    setDailyGoals,
    setLearningNotes,
    setCertificates,
    setPracticeLabs,
    setAIRecommendations,
    setViewState,
  ]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setCourses(demoCourses);
      setRoadmaps(demoRoadmaps);
      setDailyGoals(demoDailyGoals);
      setLearningNotes(demoLearningNotes);
      setCertificates(demoCertificates);
      setPracticeLabs(demoPracticeLabs);
      setAIRecommendations(demoAIRecommendations);
      setViewState("ready");
      setPageState("ready");
    }, 1000);
  }, [
    setCourses,
    setRoadmaps,
    setDailyGoals,
    setLearningNotes,
    setCertificates,
    setPracticeLabs,
    setAIRecommendations,
    setViewState,
  ]);

  const courses = store.getFilteredCourses();
  const allCourses = store.courses;
  const roadmaps = store.roadmaps;
  const dailyGoals = store.dailyGoals;
  const learningNotes = store.learningNotes;
  const certificates = store.certificates;
  const practiceLabs = store.practiceLabs;
  const aiRecommendations = store.aiRecommendations;
  const stats = store.stats;
  const summary = store.summary;

  const inProgressCourses = useMemo(
    () => allCourses.filter((c) => c.status === "in-progress"),
    [allCourses],
  );
  const completedCourses = useMemo(
    () => allCourses.filter((c) => c.status === "completed"),
    [allCourses],
  );
  const bookmarkedCourses = useMemo(
    () => allCourses.filter((c) => c.isBookmarked),
    [allCourses],
  );
  const recommendedCourses = useMemo(
    () => allCourses.filter((c) => c.isRecommended),
    [allCourses],
  );

  const counts = useMemo(() => ({
    inProgress: inProgressCourses.length,
    completed: completedCourses.length,
    bookmarks: bookmarkedCourses.length,
    recommended: recommendedCourses.length,
    roadmaps: roadmaps.length,
    certificates: certificates.length,
    labs: practiceLabs.length,
    notes: learningNotes.length,
  }), [inProgressCourses, completedCourses, bookmarkedCourses, recommendedCourses, roadmaps, certificates, practiceLabs, learningNotes]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      setSearchQuery(value);
    },
    [setSearchQuery],
  );

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.difficulty !== "all" ||
    filters.status !== "all" ||
    filters.bookmarked ||
    searchValue !== "";

  if (pageState === "loading") {
    return <DashboardLoadingState message="Loading Learning Center..." />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-4 lg:p-6">
            <LearningDashboard
              stats={stats}
              streak={demoStreak}
              dailyGoals={dailyGoals}
              inProgressCourses={inProgressCourses}
              recommendedCourses={recommendedCourses}
              roadmaps={roadmaps}
              aiRecommendations={aiRecommendations}
              nextLesson={summary.nextLesson}
              recommendedRoadmapName={summary.recommendedRoadmap}
              onToggleGoal={store.toggleGoalCompleted}
              onToggleBookmark={store.toggleBookmark}
              onToggleFavorite={store.toggleFavorite}
              onToggleRoadmapBookmark={store.toggleRoadmapBookmark}
            />
          </div>
        );

      case "courses":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-heading-4 text-primary font-semibold">My Courses</h2>
                <p className="text-caption text-tertiary">
                  {allCourses.length} courses &middot; {inProgressCourses.length} in progress
                </p>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="xs" onClick={() => { resetFilters(); setSearchValue(""); }}>
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search courses..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 pl-9 pr-3 text-body-small text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Search courses"
                />
              </div>
              <select
                value={filters.category}
                onChange={(e) => setFilter({ category: e.target.value as CourseCategory | "all" })}
                className="h-9 rounded-lg border border-border bg-surface-1 px-3 text-caption text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="networking">Networking</option>
                <option value="cloud">Cloud</option>
                <option value="devops">DevOps</option>
                <option value="ai">AI</option>
                <option value="data">Data</option>
                <option value="career">Career</option>
                <option value="language">Language</option>
              </select>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilter({ difficulty: e.target.value as CourseDifficulty | "all" })}
                className="h-9 rounded-lg border border-border bg-surface-1 px-3 text-caption text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filter by difficulty"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilter({ status: e.target.value as CourseStatus | "all" })}
                className="h-9 rounded-lg border border-border bg-surface-1 px-3 text-caption text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {courses.length === 0 ? (
              <LearningEmptyState
                title="No courses match your filters"
                description="Try adjusting your search or filter criteria."
                actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
                onAction={hasActiveFilters ? () => { resetFilters(); setSearchValue(""); } : undefined}
              />
            ) : (
              <CourseGrid
                courses={courses}
                onToggleBookmark={store.toggleBookmark}
                onToggleFavorite={store.toggleFavorite}
              />
            )}
          </div>
        );

      case "roadmaps":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Career Roadmaps</h2>
              <p className="text-caption text-tertiary">
                {roadmaps.length} roadmaps available
              </p>
            </div>
            {roadmaps.length === 0 ? (
              <LearningEmptyState title="No roadmaps available" />
            ) : (
              <RoadmapGrid
                roadmaps={roadmaps}
                onToggleBookmark={store.toggleRoadmapBookmark}
              />
            )}
          </div>
        );

      case "bookmarks":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Bookmarks</h2>
              <p className="text-caption text-tertiary">
                {bookmarkedCourses.length} bookmarked courses
              </p>
            </div>
            {bookmarkedCourses.length === 0 ? (
              <LearningEmptyState
                title="No bookmarks yet"
                description="Bookmark courses to access them quickly."
              />
            ) : (
              <CourseGrid
                courses={bookmarkedCourses}
                onToggleBookmark={store.toggleBookmark}
                onToggleFavorite={store.toggleFavorite}
              />
            )}
          </div>
        );

      case "completed":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Completed Courses</h2>
              <p className="text-caption text-tertiary">
                {completedCourses.length} courses completed
              </p>
            </div>
            {completedCourses.length === 0 ? (
              <LearningEmptyState
                title="No completed courses yet"
                description="Keep learning and track your progress here."
              />
            ) : (
              <CourseGrid
                courses={completedCourses}
                onToggleBookmark={store.toggleBookmark}
                onToggleFavorite={store.toggleFavorite}
              />
            )}
          </div>
        );

      case "certificates":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Certificates</h2>
              <p className="text-caption text-tertiary">
                {certificates.length} certificates earned
              </p>
            </div>
            {certificates.length === 0 ? (
              <LearningEmptyState
                title="No certificates yet"
                description="Complete courses to earn certificates."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Certificates">
                {certificates.map((cert) => (
                  <Card key={cert.id} variant="success" padding="md" className="space-y-3" role="listitem">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <Award className="h-5 w-5 text-success" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-body-small font-semibold text-primary">{cert.title}</h3>
                        <p className="text-caption text-tertiary">
                          Issued {new Date(cert.issuedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "labs":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Practice Labs</h2>
              <p className="text-caption text-tertiary">
                {practiceLabs.length} labs available
              </p>
            </div>
            {practiceLabs.length === 0 ? (
              <LearningEmptyState title="No practice labs available" />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Practice labs">
                {practiceLabs.map((lab) => (
                  <Card
                    key={lab.id}
                    variant="interactive"
                    padding="md"
                    className={cn("space-y-3", lab.isCompleted && "border-success/30")}
                    role="listitem"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body-small font-semibold text-primary truncate">{lab.title}</h3>
                        <p className="text-caption text-tertiary mt-0.5 line-clamp-2">{lab.description}</p>
                      </div>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                        aria-label={lab.isBookmarked ? "Remove bookmark" : "Bookmark lab"}
                        onClick={(e) => {
                          e.stopPropagation();
                          store.toggleLabBookmark(lab.id);
                        }}
                      >
                        <BookMarked
                          className={cn("h-3.5 w-3.5", lab.isBookmarked && "fill-primary text-primary")}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-caption text-tertiary">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-3">
                        {lab.difficulty}
                      </span>
                      <span>{lab.estimatedTime}</span>
                    </div>
                    {lab.isCompleted && (
                      <div className="flex items-center gap-1 text-caption text-success font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Completed
                      </div>
                    )}
                    {!lab.isCompleted && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => store.toggleLabCompleted(lab.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {lab.technologies.map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-3 text-tertiary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "notes":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold">Learning Notes</h2>
              <p className="text-caption text-tertiary">
                {learningNotes.length} notes
              </p>
            </div>
            {learningNotes.length === 0 ? (
              <LearningEmptyState
                title="No notes yet"
                description="Take notes while learning to reinforce your knowledge."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Learning notes">
                {learningNotes.map((note) => (
                  <Card key={note.id} padding="md" className="space-y-2" role="listitem">
                    <div className="flex items-start gap-2">
                      <StickyNote className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-body-small font-semibold text-primary">{note.title}</h3>
                        <p className="text-caption text-tertiary mt-0.5 line-clamp-3">{note.content}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-3 text-tertiary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-caption text-tertiary">
                      Updated {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "ai-recommendations":
        return (
          <div className="p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-heading-4 text-primary font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
                AI Recommendations
              </h2>
              <p className="text-caption text-tertiary">
                Personalized recommendations based on your learning patterns
              </p>
            </div>
            {aiRecommendations.length === 0 ? (
              <LearningEmptyState
                title="No recommendations yet"
                description="Start learning to get personalized AI recommendations."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list" aria-label="AI recommendations">
                {aiRecommendations.map((rec) => (
                  <Card key={rec.id} variant="ai" padding="md" className="space-y-3" role="listitem">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ai/10">
                          <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-body-small font-semibold text-primary">{rec.title}</h3>
                          <span className="text-caption text-ai">{rec.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-caption text-secondary">{rec.description}</p>
                    <div className="rounded-lg bg-ai/5 p-2.5">
                      <p className="text-caption text-tertiary">{rec.reason}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <Card variant="ai" padding="md" className="text-center">
              <p className="text-body-small text-primary font-medium mb-1">AI Career Coach</p>
              <p className="text-caption text-tertiary mb-3">
                Get personalized career guidance and learning recommendations powered by AI.
              </p>
              <Button asChild variant="primary" size="sm">
                <Link href="/dashboard/coach">
                  Open AI Coach
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-4 lg:p-6">
            <LearningEmptyState title="Section coming soon" description="This section is under development." />
          </div>
        );
    }
  };

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Learning Center" },
              ]}
            />
            <h1 className="text-heading-3 text-primary font-semibold">
              Learning Center
            </h1>
          </div>
          <div
            className="flex items-center rounded-lg border border-border bg-surface-1 p-1"
            role="group"
            aria-label="View mode"
          >
            <button
              onClick={() => setActiveSection("dashboard")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                activeSection === "dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-tertiary hover:text-secondary",
              )}
              aria-pressed={activeSection === "dashboard"}
              aria-label="Dashboard view"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection("courses")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                activeSection === "courses"
                  ? "bg-primary text-primary-foreground"
                  : "text-tertiary hover:text-secondary",
              )}
              aria-pressed={activeSection === "courses"}
              aria-label="Courses view"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Courses</span>
            </button>
            <button
              onClick={() => setActiveSection("roadmaps")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                activeSection === "roadmaps"
                  ? "bg-primary text-primary-foreground"
                  : "text-tertiary hover:text-secondary",
              )}
              aria-pressed={activeSection === "roadmaps"}
              aria-label="Roadmaps view"
            >
              <Compass className="h-4 w-4" />
              <span className="hidden sm:inline">Roadmaps</span>
            </button>
          </div>
        </div>

        <LearningLayout
          sidebar={
            <CourseSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              counts={counts}
            />
          }
          main={renderMainContent()}
          insights={
            <LearningInsights
              dailyGoals={dailyGoals}
              streak={demoStreak}
              weeklyProgress={demoWeeklyProgress}
              monthlyProgress={demoMonthlyProgress}
              summary={summary}
              aiRecommendations={aiRecommendations}
            />
          }
        />
      </div>
    </div>
  );
}
