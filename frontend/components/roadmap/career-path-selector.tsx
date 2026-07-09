"use client";

import { Check, ChevronDown, Route } from "lucide-react";
import { type HTMLAttributes, forwardRef, useMemo, useState } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/foundation/card";
import { roadmapDifficultyConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AICareerPath } from "@/types/roadmap";

export interface CareerPathSelectorProps extends HTMLAttributes<HTMLDivElement> {
  paths: AICareerPath[];
  selectedId: string;
  onPathSelect: (id: string) => void;
}

const CareerPathSelector = forwardRef<HTMLDivElement, CareerPathSelectorProps>(
  ({ className, paths, selectedId, onPathSelect, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const selected = useMemo(
      () => paths.find((p) => p.id === selectedId) ?? paths[0],
      [paths, selectedId]
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career path selector"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Career Path</CardTitle>
          </div>
          <CardDescription>
            Choose a target role to personalize your roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full justify-between"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-label="Select career path"
            >
              <span className="truncate">{selected?.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </Button>

            {isOpen && (
              <div
                className="absolute z-10 mt-1 w-full rounded-xl border border-border bg-card shadow-medium"
                role="listbox"
                aria-label="Career paths"
              >
                <div className="max-h-60 overflow-auto p-1">
                  {paths.map((path) => {
                    const difficulty = roadmapDifficultyConfig[path.difficulty];
                    const isSelected = path.id === selectedId;

                    return (
                      <button
                        key={path.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isSelected
                            ? "bg-ai/10"
                            : "hover:bg-accent"
                        )}
                        onClick={() => {
                          onPathSelect(path.id);
                          setIsOpen(false);
                        }}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isSelected ? (
                            <Check className="h-4 w-4 text-ai" aria-hidden="true" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-border" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-label font-medium text-primary">
                            {path.title}
                          </p>
                          <p className="text-caption text-secondary line-clamp-2">
                            {path.description}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <Badge variant="outline" size="xs" className={difficulty.color}>
                              {difficulty.label}
                            </Badge>
                            <span className="text-caption text-tertiary">
                              {path.estimatedMonths} months
                            </span>
                            <span className="text-caption text-tertiary">
                              {path.totalHours}h
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {selected && (
            <div className="rounded-xl border border-border bg-surface-0 p-4 space-y-3">
              <div>
                <p className="text-caption text-tertiary">Selected path</p>
                <p className="text-body font-semibold text-primary">
                  {selected.title}
                </p>
                <p className="text-body-small text-secondary mt-1">
                  {selected.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  size="xs"
                  className={roadmapDifficultyConfig[selected.difficulty].color}
                >
                  {roadmapDifficultyConfig[selected.difficulty].label}
                </Badge>
                <Badge variant="neutral" size="xs">
                  {selected.estimatedMonths} months
                </Badge>
                <Badge variant="neutral" size="xs">
                  {selected.totalHours} hours total
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
CareerPathSelector.displayName = "CareerPathSelector";

export { CareerPathSelector };
