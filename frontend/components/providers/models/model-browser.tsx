"use client";

import { Search, Star, History, Sparkles, SlidersHorizontal, X } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react";

import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderModel } from "@/types/ai-providers";

type ModelSort = "name" | "context" | "speed";
type ModelFilter = "all" | "favorites" | "recent" | "recommended";

interface ModelBrowserProps extends HTMLAttributes<HTMLDivElement> {
  provider: ProviderConfig;
  onSelectModel?: (modelId: string) => void;
  onToggleFavorite?: (modelId: string) => void;
}

const speedLabels: Record<string, string> = {
  fast: "Fast",
  medium: "Medium",
  slow: "Slow",
};

const speedColors: Record<string, string> = {
  fast: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  slow: "bg-danger/10 text-danger border-danger/20",
};

const ModelBrowser = forwardRef<HTMLDivElement, ModelBrowserProps>(
  ({ className, provider, onSelectModel, onToggleFavorite, ...props }, ref) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<ModelFilter>("all");
    const [sort, setSort] = useState<ModelSort>("name");

    const models = provider.models;

    const filteredModels = useMemo(() => {
      let result = [...models];

      if (filter === "favorites") {
        result = result.filter((m) => m.favorite);
      } else if (filter === "recent") {
        result = result.filter((m) => m.recentlyUsed);
      } else if (filter === "recommended") {
        result = result.filter((m) => m.recommended);
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
          (m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q),
        );
      }

      result.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "context") return b.contextLength - a.contextLength;
        if (sort === "speed") {
          const speedOrder = { fast: 0, medium: 1, slow: 2 };
          return speedOrder[a.speed] - speedOrder[b.speed];
        }
        return 0;
      });

      return result;
    }, [models, filter, sort, search]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, modelId: string) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectModel?.(modelId);
        }
      },
      [onSelectModel],
    );

    const favoriteCount = useMemo(() => models.filter((m) => m.favorite).length, [models]);
    const recentCount = useMemo(() => models.filter((m) => m.recentlyUsed).length, [models]);
    const recommendedCount = useMemo(() => models.filter((m) => m.recommended).length, [models]);

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        role="region"
        aria-label="Model browser"
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className="flex h-input-md w-full rounded-lg border border-input bg-background pl-10 pr-10 text-body ring-offset-background transition-all duration-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Search models"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="Filter models">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-smallest font-medium transition-colors",
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-secondary hover:bg-surface-3",
              )}
              aria-pressed={filter === "all"}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("favorites")}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-smallest font-medium transition-colors",
                filter === "favorites"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-secondary hover:bg-surface-3",
              )}
              aria-pressed={filter === "favorites"}
              disabled={favoriteCount === 0}
            >
              <Star className="h-3 w-3" aria-hidden="true" />
              Favorites
              {favoriteCount > 0 && (
                <span className="ml-0.5 opacity-70">({favoriteCount})</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setFilter("recent")}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-smallest font-medium transition-colors",
                filter === "recent"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-secondary hover:bg-surface-3",
              )}
              aria-pressed={filter === "recent"}
              disabled={recentCount === 0}
            >
              <History className="h-3 w-3" aria-hidden="true" />
              Recent
            </button>
            <button
              type="button"
              onClick={() => setFilter("recommended")}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-smallest font-medium transition-colors",
                filter === "recommended"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-secondary hover:bg-surface-3",
              )}
              aria-pressed={filter === "recommended"}
              disabled={recommendedCount === 0}
            >
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Recommended
            </button>
          </div>

          <div className="flex items-center gap-1">
            <SlidersHorizontal className="h-4 w-4 text-tertiary" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as ModelSort)}
              className="bg-transparent text-smallest text-secondary border-none outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label="Sort models"
            >
              <option value="name">Name</option>
              <option value="context">Context Length</option>
              <option value="speed">Speed</option>
            </select>
          </div>
        </div>

        <div className="space-y-1" role="listbox" aria-label="Available models">
          {filteredModels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-body text-tertiary">
                {search
                  ? "No models match your search"
                  : filter === "favorites"
                    ? "No favorite models yet"
                    : filter === "recent"
                      ? "No recently used models"
                      : "No recommended models"}
              </p>
            </div>
          ) : (
            filteredModels.map((model) => (
              <ModelRow
                key={model.id}
                model={model}
                isSelected={provider.currentModel === model.id}
                onSelect={() => onSelectModel?.(model.id)}
                onToggleFavorite={() => onToggleFavorite?.(model.id)}
                onKeyDown={(e) => handleKeyDown(e, model.id)}
              />
            ))
          )}
        </div>

        <p className="text-smallest text-tertiary text-center">
          {filteredModels.length} of {models.length} models
        </p>
      </div>
    );
  },
);
ModelBrowser.displayName = "ModelBrowser";

interface ModelRowProps {
  model: ProviderModel;
  isSelected: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ModelRow = forwardRef<HTMLDivElement, ModelRowProps>(
  ({ model, isSelected, onSelect, onToggleFavorite, onKeyDown }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-fast cursor-pointer",
          isSelected
            ? "bg-primary/10 border border-primary/20"
            : "hover:bg-surface-2 border border-transparent",
        )}
        role="option"
        aria-selected={isSelected}
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            "shrink-0 transition-colors",
            model.favorite ? "text-warning" : "text-tertiary hover:text-warning",
          )}
          aria-label={model.favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="h-4 w-4" fill={model.favorite ? "currentColor" : "none"} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-body font-medium text-primary truncate">{model.name}</span>
            {model.recommended && (
              <Sparkles className="h-3.5 w-3.5 text-warning shrink-0" aria-label="Recommended" />
            )}
          </div>
          <span className="text-smallest text-tertiary">{model.id}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="neutral" size="xs" className={speedColors[model.speed]}>
            {speedLabels[model.speed]}
          </Badge>
          <span className="text-smallest text-tertiary whitespace-nowrap">
            {(model.contextLength / 1024).toFixed(0)}K ctx
          </span>
          {model.costPlaceholder !== "—" && (
            <span className="text-smallest text-tertiary">{model.costPlaceholder}</span>
          )}
        </div>
      </div>
    );
  },
);
ModelRow.displayName = "ModelRow";

export { ModelBrowser };
export type { ModelBrowserProps };
