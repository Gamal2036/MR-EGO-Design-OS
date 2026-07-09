"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ApplicationTrackerHeader,
  ApplicationPipelineBoard,
  ApplicationCard,
  ApplicationStats,
  ApplicationFilters,
  ApplicationSearch,
  ApplicationDetailPanel,
  ApplicationEmptyState,
  ApplicationLoadingState,
  ApplicationErrorState,
  ApplicationQuickActions,
} from "@/components/applications";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { useApplicationTrackerStore } from "@/stores/application-tracker-store";
import type {
  Application as App,
  ApplicationStatus as AppStatus,
} from "@/types/application-tracker";

export default function ApplicationsPage() {
  const {
    filteredApplications,
    selectedApplication,
    filters,
    viewMode,
    state,
    errorMessage,
    detailPanelOpen,
    selectApplication,
    setFilters,
    resetFilters,
    setViewMode,
    updateStatus,
    addNote,
    updateNote,
    deleteNote,
    toggleTask,
    addTask,
    deleteTask,
    loadApplications,
    setDetailPanelOpen,
  } = useApplicationTrackerStore();

  const [showFilters, setShowFilters] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleSelect = useCallback(
    (app: App) => {
      selectApplication(app);
      setMobileDetailOpen(true);
    },
    [selectApplication]
  );

  const handleCloseDetail = useCallback(() => {
    setDetailPanelOpen(false);
    setMobileDetailOpen(false);
  }, [setDetailPanelOpen]);

  const handleStatusChange = useCallback(
    (appId: string, status: AppStatus) => {
      updateStatus(appId, status);
    },
    [updateStatus]
  );

  if (state === "loading") {
    return (
      <div className="min-h-0 flex-1">
        <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
          <ApplicationLoadingState />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-0 flex-1">
        <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
          <ApplicationErrorState
            message={errorMessage || undefined}
            onRetry={loadApplications}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Applications" },
            ]}
          />

          <ApplicationTrackerHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalApplications={filteredApplications.length}
            onNewApplication={() => {}}
          />

          <ApplicationStats applications={filteredApplications} />

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ApplicationSearch
                value={filters.searchQuery}
                onChange={(q) => setFilters({ searchQuery: q })}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-lg px-4 py-2 text-caption border transition-colors ${
                showFilters
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-border text-secondary hover:text-primary hover:border-hover"
              }`}
              aria-expanded={showFilters}
              aria-label="Toggle filters"
            >
              Filters
            </button>
            <button
              type="button"
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="rounded-lg border border-border px-4 py-2 text-caption text-secondary hover:text-primary hover:border-hover transition-colors lg:hidden"
              aria-expanded={showQuickActions}
            >
              Actions
            </button>
          </div>

          {showQuickActions && (
            <div className="lg:hidden">
              <ApplicationQuickActions />
            </div>
          )}

          {showFilters && (
            <div className="lg:hidden">
              <ApplicationFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={resetFilters}
              />
            </div>
          )}

          <div className="flex items-start gap-6">
            <div className="flex-1 min-w-0">
              {state === "empty" ? (
                <ApplicationEmptyState
                  hasFilters={
                    !!filters.searchQuery ||
                    filters.status.length > 0 ||
                    filters.priority.length > 0 ||
                    filters.dateRange !== "all" ||
                    filters.matchScoreMin > 0
                  }
                  onResetFilters={resetFilters}
                />
              ) : viewMode === "pipeline" ? (
                <ApplicationPipelineBoard
                  applications={filteredApplications}
                  onSelect={handleSelect}
                />
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredApplications.map((app) => (
                    <div key={app.id}>
                      <ApplicationCard
                        application={app}
                        onSelect={handleSelect}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden xl:flex xl:w-72 xl:flex-col xl:gap-4 xl:shrink-0">
              <ApplicationFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={resetFilters}
              />
              <ApplicationQuickActions />
            </div>
          </div>
        </div>
      </div>

      {selectedApplication && (
        <>
          <div className="hidden lg:block">
            <div
              className={`fixed inset-y-0 right-0 z-40 transform transition-transform duration-normal ${
                detailPanelOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <ApplicationDetailPanel
                application={selectedApplication}
                onClose={handleCloseDetail}
                onStatusChange={handleStatusChange}
                onAddNote={addNote}
                onUpdateNote={updateNote}
                onDeleteNote={deleteNote}
                onToggleTask={toggleTask}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
              />
            </div>
            {detailPanelOpen && (
              <div
                className="fixed inset-0 z-30 bg-black/20 cursor-pointer"
                onClick={handleCloseDetail}
                aria-hidden="true"
              />
            )}
          </div>

          {mobileDetailOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileDetailOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute inset-y-0 right-0 w-full max-w-md animate-slide-in-from-right">
                <ApplicationDetailPanel
                  application={selectedApplication}
                  onClose={() => setMobileDetailOpen(false)}
                  onStatusChange={handleStatusChange}
                  onAddNote={addNote}
                  onUpdateNote={updateNote}
                  onDeleteNote={deleteNote}
                  onToggleTask={toggleTask}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                  isFullScreen
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


