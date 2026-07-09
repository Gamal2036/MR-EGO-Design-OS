"use client";

import {
  Heart,
  Pin,
  Search,
  X,
  ChevronLeft,
  Bot,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { AssistantCard } from "./assistant-card";

import { Input } from "@/components/forms/input";
import { Badge } from "@/components/foundation/badge";
import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAssistantStore } from "@/stores/assistant-store";
import type { AssistantCategory } from "@/types/assistant";

const categories: { value: AssistantCategory | "all"; label: string }[] = [
  { value: "all", label: "All Assistants" },
  { value: "career", label: "Career" },
  { value: "cv", label: "CV" },
  { value: "jobs", label: "Jobs" },
  { value: "interview", label: "Interview" },
  { value: "learning", label: "Learning" },
  { value: "skills", label: "Skills" },
  { value: "salary", label: "Salary" },
  { value: "recruiter", label: "Recruiter" },
  { value: "documents", label: "Documents" },
  { value: "writing", label: "Writing" },
  { value: "general", label: "General" },
];

export function AssistantSidebar() {
  const assistants = useAssistantStore((s) => s.assistants);
  const activeAssistantId = useAssistantStore((s) => s.activeAssistantId);
  const searchQuery = useAssistantStore((s) => s.searchQuery);
  const categoryFilter = useAssistantStore((s) => s.categoryFilter);
  const showFavoritesOnly = useAssistantStore((s) => s.showFavoritesOnly);
  const showPinnedOnly = useAssistantStore((s) => s.showPinnedOnly);
  const sidebarOpen = useAssistantStore((s) => s.sidebarOpen);
  const setActiveAssistant = useAssistantStore((s) => s.setActiveAssistant);
  const setSearchQuery = useAssistantStore((s) => s.setSearchQuery);
  const setCategoryFilter = useAssistantStore((s) => s.setCategoryFilter);
  const setShowFavoritesOnly = useAssistantStore((s) => s.setShowFavoritesOnly);
  const setShowPinnedOnly = useAssistantStore((s) => s.setShowPinnedOnly);
  const toggleFavorite = useAssistantStore((s) => s.toggleFavorite);
  const togglePinned = useAssistantStore((s) => s.togglePinned);
  const toggleSidebar = useAssistantStore((s) => s.toggleSidebar);

  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = assistants;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.provider.toLowerCase().includes(q) ||
          a.model.toLowerCase().includes(q),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((a) => a.category === categoryFilter);
    }

    if (showFavoritesOnly) {
      result = result.filter((a) => a.favorite);
    }

    if (showPinnedOnly) {
      result = result.filter((a) => a.pinned);
    }

    return result;
  }, [assistants, searchQuery, categoryFilter, showFavoritesOnly, showPinnedOnly]);

  const handleSelect = useCallback(
    (id: string) => {
      setActiveAssistant(id);
      setMobileOpen(false);
    },
    [setActiveAssistant],
  );

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ai text-white shadow-strong lg:hidden",
          "hover:bg-ai/90 transition-colors",
        )}
        onClick={() => setMobileOpen(true)}
        aria-label="Open assistant sidebar"
      >
        <Bot className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-normal lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "flex flex-col border-r border-border bg-surface-1 transition-all duration-normal",
          "fixed inset-y-0 left-0 z-50 w-72 lg:static lg:z-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarOpen ? "lg:w-72" : "lg:w-0 lg:overflow-hidden lg:border-0",
        )}
        aria-label="Assistant sidebar"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-ai" aria-hidden="true" />
            <h2 className="text-heading-4 text-primary font-semibold">Assistants</h2>
            <Badge variant="ai" size="xs">{assistants.length}</Badge>
          </div>
          <IconButton
            icon={ChevronLeft}
            variant="ghost"
            size="sm"
            label="Close sidebar"
            onClick={toggleSidebar}
            className="hidden lg:flex"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex lg:hidden text-tertiary hover:text-primary"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 py-3 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary pointer-events-none" />
            <Input
              placeholder="Search assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-caption"
              aria-label="Search assistants"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                if (showPinnedOnly) setShowPinnedOnly(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded-lg px-2 py-1 text-caption transition-colors shrink-0",
                showFavoritesOnly
                  ? "bg-danger/10 text-danger"
                  : "text-tertiary hover:text-secondary hover:bg-surface-2",
              )}
              aria-pressed={showFavoritesOnly}
              aria-label="Show favorites only"
            >
              <Heart className="h-3.5 w-3.5" />
              Favorites
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPinnedOnly(!showPinnedOnly);
                if (showFavoritesOnly) setShowFavoritesOnly(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded-lg px-2 py-1 text-caption transition-colors shrink-0",
                showPinnedOnly
                  ? "bg-ai/10 text-ai"
                  : "text-tertiary hover:text-secondary hover:bg-surface-2",
              )}
              aria-pressed={showPinnedOnly}
              aria-label="Show pinned only"
            >
              <Pin className="h-3.5 w-3.5" />
              Pinned
            </button>
          </div>
        </div>

        <div className="px-3 py-2 border-b border-border overflow-x-auto scrollbar-none">
          <div className="flex gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategoryFilter(cat.value)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-caption font-medium transition-colors shrink-0",
                  categoryFilter === cat.value
                    ? "bg-ai/10 text-ai border border-ai/20"
                    : "text-tertiary hover:text-secondary hover:bg-surface-2 border border-transparent",
                )}
                aria-pressed={categoryFilter === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Search className="h-8 w-8 text-tertiary mb-2" aria-hidden="true" />
              <p className="text-caption text-tertiary">No assistants found</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setShowFavoritesOnly(false);
                  setShowPinnedOnly(false);
                }}
                className="text-caption text-ai hover:underline mt-1"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((assistant) => (
              <AssistantCard
                key={assistant.id}
                assistant={assistant}
                active={assistant.id === activeAssistantId}
                onSelect={handleSelect}
                onToggleFavorite={toggleFavorite}
                onTogglePinned={togglePinned}
              />
            ))
          )}
        </div>

        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-caption text-tertiary hover:text-secondary hover:bg-surface-2 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
            Collapse
          </button>
        </div>
      </aside>
    </>
  );
}
