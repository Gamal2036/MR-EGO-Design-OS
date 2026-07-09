"use client";

import {
  Plus,
  LayoutDashboard,
  List,
  Calendar,
  Star,
  CalendarClock,
  History,
  Bookmark,
  MessageCircleQuestion,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  DashboardErrorState,
  DashboardLoadingState,
} from "@/components/dashboard";
import { Button, Badge, Card } from "@/components/foundation";
import {
  InterviewCard,
  InterviewSearch,
  InterviewDetails,
  InterviewForm,
  InterviewCalendar,
  InterviewEmptyState,
  InsightsPanel,
  PreparationScore,
  PracticeSessionCard,
  QuestionLibrary,
} from "@/components/interviews";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import {
  demoInterviews,
  demoQuestions,
  demoPracticeSessions,
} from "@/data/interviews";
import { cn } from "@/lib/utils";
import { useInterviewStore } from "@/stores/interview-store";

type PageState = "loading" | "ready" | "error";

const sidebarSections = [
  { label: "Upcoming Interviews", icon: CalendarClock, filter: "upcoming" as const },
  { label: "Past Interviews", icon: History, filter: "completed" as const },
  { label: "Saved Questions", icon: Bookmark, filter: "questions" as const },
  { label: "Practice Sessions", icon: MessageCircleQuestion, filter: "practice" as const },
  { label: "Favorite Companies", icon: Star, filter: "favorites" as const },
];

export default function InterviewsPage() {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [activeSection, setActiveSection] = useState<string>("upcoming");

  const viewMode = useInterviewStore((s) => s.viewMode);
  const setViewMode = useInterviewStore((s) => s.setViewMode);
  const setInterviews = useInterviewStore((s) => s.setInterviews);
  const setQuestions = useInterviewStore((s) => s.setQuestions);
  const setPracticeSessions = useInterviewStore((s) => s.setPracticeSessions);
  const setViewState = useInterviewStore((s) => s.setViewState);
  const selectedInterviewId = useInterviewStore((s) => s.selectedInterviewId);
  const isFormOpen = useInterviewStore((s) => s.isFormOpen);
  const openForm = useInterviewStore((s) => s.openForm);
  const filters = useInterviewStore((s) => s.filters);
  const setFilter = useInterviewStore((s) => s.setFilter);
  const resetFilters = useInterviewStore((s) => s.resetFilters);
  const getFilteredInterviews = useInterviewStore((s) => s.getFilteredInterviews);
  const getInterviewById = useInterviewStore((s) => s.getInterviewById);
  const selectInterview = useInterviewStore((s) => s.selectInterview);
  const toggleFavorite = useInterviewStore((s) => s.toggleFavorite);
  const toggleChecklistItem = useInterviewStore((s) => s.toggleChecklistItem);
  const deleteInterview = useInterviewStore((s) => s.deleteInterview);
  const archiveInterview = useInterviewStore((s) => s.archiveInterview);
  const addInterview = useInterviewStore((s) => s.addInterview);
  const addNote = useInterviewStore((s) => s.addNote);
  const stats = useInterviewStore((s) => s.stats);
  const questions = useInterviewStore((s) => s.questions);
  const practiceSessions = useInterviewStore((s) => s.practiceSessions);
  const getUpcomingInterviews = useInterviewStore((s) => s.getUpcomingInterviews);
  const getPastInterviews = useInterviewStore((s) => s.getPastInterviews);
  const getFavoriteInterviews = useInterviewStore((s) => s.getFavoriteInterviews);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInterviews(demoInterviews);
      setQuestions(demoQuestions);
      setPracticeSessions(demoPracticeSessions);
      setViewState("ready");
      setPageState("ready");
    }, 400);
    return () => clearTimeout(timer);
  }, [setInterviews, setQuestions, setPracticeSessions, setViewState]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setInterviews(demoInterviews);
      setQuestions(demoQuestions);
      setPracticeSessions(demoPracticeSessions);
      setViewState("ready");
      setPageState("ready");
    }, 1000);
  }, [setInterviews, setQuestions, setPracticeSessions, setViewState]);

  if (pageState === "loading") {
    return <DashboardLoadingState message="Loading Interview Center..." />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.search !== "" ||
    filters.favorites;

  const filteredInterviews = getFilteredInterviews();
  const upcomingInterviews = getUpcomingInterviews();
  const pastInterviews = getPastInterviews();
  const favoriteInterviews = getFavoriteInterviews();

  const selectedInterview = selectedInterviewId
    ? getInterviewById(selectedInterviewId)
    : undefined;

  return (
    <div
      className="flex h-full flex-col bg-background"
      role="main"
      aria-label="Interview Preparation Center"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Interviews" },
              ]}
            />
            <h1 className="text-heading-3 text-primary font-semibold">
              Interview Preparation Center
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-lg border border-border bg-surface-1 p-1"
              role="group"
              aria-label="View mode"
            >
              <button
                onClick={() => setViewMode("dashboard")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                  viewMode === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-pressed={viewMode === "dashboard"}
                aria-label="Dashboard view"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-pressed={viewMode === "list"}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-caption transition-colors",
                  viewMode === "calendar"
                    ? "bg-primary text-primary-foreground"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-pressed={viewMode === "calendar"}
                aria-label="Calendar view"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </button>
            </div>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => openForm()}
            >
              New Interview
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <InterviewSearch
              value={filters.search}
              onValueChange={(search) => setFilter({ search })}
            />
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="xs" onClick={resetFilters}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-1 gap-0 overflow-hidden rounded-xl border border-border bg-background">
          <aside
            className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface-1 overflow-y-auto xl:flex"
            aria-label="Interview sidebar"
          >
            <div className="p-4 space-y-1">
              <h3 className="text-caption text-tertiary font-medium uppercase tracking-wider mb-2 px-2">
                Navigation
              </h3>
              {sidebarSections.map((section) => {
                const Icon = section.icon;
                const count =
                  section.filter === "upcoming"
                    ? upcomingInterviews.length
                    : section.filter === "completed"
                      ? pastInterviews.length
                      : section.filter === "favorites"
                        ? favoriteInterviews.length
                        : section.filter === "questions"
                          ? questions.length
                          : practiceSessions.length;

                return (
                  <button
                    key={section.label}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-body-small transition-colors",
                      activeSection === section.filter
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-tertiary hover:bg-surface-2 hover:text-secondary",
                    )}
                    onClick={() => setActiveSection(section.filter)}
                    aria-current={activeSection === section.filter ? "true" : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="flex-1 truncate">{section.label}</span>
                    <Badge variant="neutral" size="xs">
                      {count}
                    </Badge>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-border p-4">
              <h3 className="text-caption text-tertiary font-medium uppercase tracking-wider mb-3 px-2">
                Practice Sessions
              </h3>
              <div className="space-y-2">
                {practiceSessions.slice(0, 2).map((session) => (
                  <PracticeSessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto">
            {viewMode === "dashboard" && (
              <div className="p-4 lg:p-6">
                <div className="mb-6">
                  <h2 className="text-heading-4 text-primary font-semibold mb-1">
                    Interview Dashboard
                  </h2>
                  <p className="text-body-small text-tertiary">
                    Track and prepare for your upcoming interviews
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  <Card padding="sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-caption text-tertiary">Upcoming</p>
                        <p className="text-heading-3 text-primary font-bold">
                          {upcomingInterviews.length}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                        <CalendarClock className="h-5 w-5 text-info" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                  <Card padding="sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-caption text-tertiary">Completed</p>
                        <p className="text-heading-3 text-primary font-bold">
                          {pastInterviews.length}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <History className="h-5 w-5 text-success" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                  <Card padding="sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-caption text-tertiary">Favorites</p>
                        <p className="text-heading-3 text-primary font-bold">
                          {favoriteInterviews.length}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                        <Star className="h-5 w-5 text-warning" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                </div>

                {upcomingInterviews.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-body font-medium text-primary mb-3">
                      Upcoming Timeline
                    </h3>
                    <div className="space-y-3">
                      {upcomingInterviews.map((interview) => (
                        <InterviewCard
                          key={interview.id}
                          interview={interview}
                          onSelect={selectInterview}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-body font-medium text-primary">
                      Question Categories
                    </h3>
                    <QuestionLibrary
                      questions={questions}
                      onQuestionClick={() => {}}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-body font-medium text-primary">
                      AI Practice
                    </h3>
                    <Card padding="sm">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ai/10">
                          <MessageCircleQuestion className="h-6 w-6 text-ai" aria-hidden="true" />
                        </div>
                        <p className="text-body-small text-primary font-medium mb-1">
                          AI Practice Sessions
                        </p>
                        <p className="text-caption text-tertiary mb-3">
                          Practice with AI-powered interview simulation
                        </p>
                        <Badge variant="ai" size="sm">
                          Coming Soon
                        </Badge>
                      </div>
                    </Card>

                    <h3 className="text-body font-medium text-primary">
                      Mock Interview
                    </h3>
                    <Card padding="sm">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <MessageCircleQuestion className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                        <p className="text-body-small text-primary font-medium mb-1">
                          Mock Interviews
                        </p>
                        <p className="text-caption text-tertiary mb-3">
                          Full interview simulation with feedback
                        </p>
                        <Badge variant="primary" size="sm">
                          Coming Soon
                        </Badge>
                      </div>
                    </Card>

                    <h3 className="text-body font-medium text-primary">
                      Company Research
                    </h3>
                    <Card padding="sm">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                          <MessageCircleQuestion className="h-6 w-6 text-success" aria-hidden="true" />
                        </div>
                        <p className="text-body-small text-primary font-medium mb-1">
                          Company Research Hub
                        </p>
                        <p className="text-caption text-tertiary mb-3">
                          AI-powered company insights and culture analysis
                        </p>
                        <Badge variant="success" size="sm">
                          Coming Soon
                        </Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {viewMode === "list" && (
              <div className="p-4 lg:p-6">
                {filteredInterviews.length === 0 ? (
                  <InterviewEmptyState
                    type={hasActiveFilters ? "filtered" : "interviews"}
                    onAction={hasActiveFilters ? resetFilters : () => openForm()}
                  />
                ) : (
                  <div className="space-y-3">
                    {filteredInterviews.map((interview) => (
                      <InterviewCard
                        key={interview.id}
                        interview={interview}
                        onSelect={selectInterview}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {viewMode === "calendar" && (
              <div className="p-4 lg:p-6">
                <InterviewCalendar
                  interviews={demoInterviews}
                  onInterviewClick={selectInterview}
                />
              </div>
            )}
          </main>

          <aside
            className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface-1 overflow-y-auto lg:flex"
            aria-label="Interview insights"
          >
            <InsightsPanel stats={stats} />
            <div className="border-t border-border p-4">
              <PreparationScore
                score={stats.preparationScore}
                confidenceLevel={stats.confidenceLevel}
                averageScore={stats.averageScore}
              />
            </div>
          </aside>
        </div>
      </div>

      {isFormOpen && (
        <InterviewForm
          onSave={(data) => {
            const newInterview = {
              id: `int-${Date.now()}`,
              title: data.title || "New Interview",
              company: data.company || { name: "Company", industry: "Technology", size: "Unknown" },
              role: data.role || "Role",
              type: data.type || "technical",
              format: data.format || "video",
              location: data.location || "TBD",
              date: data.date || new Date().toISOString(),
              time: data.time,
              duration: data.duration,
              status: "upcoming" as const,
              isFavorite: false,
              isArchived: false,
              checklist: [],
              notes: [],
              resources: [],
              preparationProgress: 0,
              interviewer: data.interviewer,
              salary: data.salary,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            addInterview(newInterview);
          }}
          onClose={() => useInterviewStore.getState().closeForm()}
        />
      )}

      {selectedInterview && (
        <InterviewDetails
          interview={selectedInterview}
          onClose={() => selectInterview(null)}
          onToggleFavorite={toggleFavorite}
          onToggleChecklist={toggleChecklistItem}
          onDelete={(id) => {
            deleteInterview(id);
            selectInterview(null);
          }}
          onArchive={(id) => {
            archiveInterview(id);
            selectInterview(null);
          }}
          onAddNote={(interviewId) => {
            addNote(interviewId, {
              id: `n-${Date.now()}`,
              content: "New note",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }}
        />
      )}
    </div>
  );
}
