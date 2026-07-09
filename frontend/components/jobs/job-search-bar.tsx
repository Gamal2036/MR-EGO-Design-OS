"use client";

import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { type HTMLAttributes, forwardRef, useRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import { useJobSearchStore } from "@/stores/job-search-store";

interface JobSearchBarProps extends HTMLAttributes<HTMLDivElement> {
  totalResults?: number;
}

const JobSearchBar = forwardRef<HTMLDivElement, JobSearchBarProps>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const searchQuery = useJobSearchStore((s) => s.searchQuery);
    const setSearchQuery = useJobSearchStore((s) => s.setSearchQuery);
    const showFilters = useJobSearchStore((s) => s.showFilters);
    const setShowFilters = useJobSearchStore((s) => s.setShowFilters);
    const performSearch = useJobSearchStore((s) => s.performSearch);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      performSearch();
    };

    const handleClear = () => {
      setSearchQuery("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        performSearch();
      }
    };

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-tertiary pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search jobs by title, company, skills, or keywords..."
              className={cn(
                "flex h-12 w-full rounded-xl border border-border bg-surface-0 pl-10 pr-20",
                "text-body text-primary placeholder:text-tertiary",
                "transition-all duration-normal",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-focus",
                "hover:border-hover"
              )}
              aria-label="Search jobs"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-20 top-1/2 -translate-y-1/2 text-tertiary hover:text-secondary transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-8 w-8 p-0",
                  showFilters && "bg-accent text-accent-foreground"
                )}
                aria-label={showFilters ? "Hide filters" : "Show filters"}
                aria-pressed={showFilters}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="h-8 px-3"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        <div className="flex items-center gap-2 text-caption text-tertiary">
          <Sparkles className="h-3 w-3 text-ai" aria-hidden="true" />
          <span>AI-powered matching finds roles aligned with your CV profile and career goals</span>
        </div>
      </div>
    );
  }
);
JobSearchBar.displayName = "JobSearchBar";

export { JobSearchBar };
export type { JobSearchBarProps };
