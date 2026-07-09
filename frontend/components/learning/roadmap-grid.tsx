"use client";

import { RoadmapCard } from "./roadmap-card";

import type { Roadmap } from "@/types/learning";

interface RoadmapGridProps {
  roadmaps: Roadmap[];
  onToggleBookmark?: (id: string) => void;
}

export function RoadmapGrid({ roadmaps, onToggleBookmark }: RoadmapGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
      aria-label="Career roadmaps"
    >
      {roadmaps.map((roadmap) => (
        <div key={roadmap.id} role="listitem">
          <RoadmapCard
            roadmap={roadmap}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      ))}
    </div>
  );
}
