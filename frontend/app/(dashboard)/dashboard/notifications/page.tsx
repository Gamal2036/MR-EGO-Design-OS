"use client";

import { useEffect, useCallback, useState } from "react";

import {
  NotificationBulkActions,
  NotificationDetailPanel,
  NotificationErrorState,
  NotificationFilterPanel,
  NotificationList,
  NotificationLoadingState,
  NotificationSummaryCards,
  NotificationsHeader,
} from "@/components/notifications";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { demoNotifications } from "@/data/notifications";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/stores/notifications-store";

export default function NotificationsPage() {
  const viewState = useNotificationsStore((s) => s.viewState);
  const selectedNotificationId = useNotificationsStore((s) => s.selectedNotificationId);
  const setViewState = useNotificationsStore((s) => s.setViewState);
  const setNotifications = useNotificationsStore((s) => s.setNotifications);
  const selectNotification = useNotificationsStore((s) => s.selectNotification);
  const getSummary = useNotificationsStore((s) => s.getSummary);
  const getNotificationById = useNotificationsStore((s) => s.getNotificationById);
  const resetFilters = useNotificationsStore((s) => s.resetFilters);
  const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead);

  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(demoNotifications);
      setViewState("ready");
    }, 600);
    return () => clearTimeout(timer);
  }, [setNotifications, setViewState]);

  const handleRetry = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setNotifications(demoNotifications);
      setViewState("ready");
    }, 600);
  }, [setNotifications, setViewState]);

  const handleCloseDetail = useCallback(() => {
    setDetailPanelOpen(false);
    selectNotification(null);
  }, [selectNotification]);

  const selectedNotification = selectedNotificationId
    ? getNotificationById(selectedNotificationId)
    : undefined;

  const summary = viewState === "ready" ? getSummary() : null;

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 md:px-6 md:py-7 lg:px-7 lg:py-8">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Notifications" },
            ]}
          />
        </div>

        {viewState === "loading" && (
          <div className="rounded-xl border border-border bg-card">
            <div className="p-5 border-b border-border">
              <div className="h-8 w-48 rounded bg-surface-2 animate-pulse" />
            </div>
            <NotificationLoadingState />
          </div>
        )}

        {viewState === "error" && (
          <div className="rounded-xl border border-border bg-card p-6">
            <NotificationErrorState onRetry={handleRetry} />
          </div>
        )}

        {viewState === "ready" && summary && (
          <div className="space-y-6">
            <NotificationsHeader onMarkAllRead={markAllAsRead} />

            <NotificationSummaryCards summary={summary} />

            <div className="flex items-center justify-between">
              <NotificationBulkActions />
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-caption font-medium transition-colors",
                    filterPanelOpen
                      ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                      : "border-border bg-surface-0 text-secondary hover:border-hover",
                  )}
                  aria-expanded={filterPanelOpen}
                  aria-label="Toggle filters"
                >
                  Filters
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className={cn(filterPanelOpen ? "block" : "hidden", "lg:block lg:w-64 shrink-0")}>
                <div className="sticky top-20 rounded-xl border border-border bg-card p-4">
                  <NotificationFilterPanel
                    onClose={() => setFilterPanelOpen(false)}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="rounded-xl border border-border bg-card p-4">
                  <NotificationList onResetFilters={resetFilters} />
                </div>
              </div>

              <div
                className={cn(
                  "hidden lg:block lg:w-80 xl:w-96 shrink-0",
                  detailPanelOpen && "block",
                )}
              >
                {selectedNotification ? (
                  <div className="sticky top-20">
                    <NotificationDetailPanel
                      notification={selectedNotification}
                      onClose={handleCloseDetail}
                    />
                  </div>
                ) : (
                  <div className="sticky top-20 rounded-xl border border-border bg-card p-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-1 border border-border mb-3">
                        <span className="text-heading-4 text-tertiary">i</span>
                      </div>
                      <p className="text-body text-secondary">
                        Select a notification to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {detailPanelOpen && selectedNotification && (
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden",
            "flex flex-col",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Notification details"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseDetail}
            aria-hidden="true"
          />
          <div className="relative ml-auto h-full w-full max-w-md bg-background border-l border-border overflow-y-auto">
            <NotificationDetailPanel
              notification={selectedNotification}
              onClose={handleCloseDetail}
            />
          </div>
        </div>
      )}
    </div>
  );
}
