"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LearningLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  insights?: ReactNode;
  className?: string;
}

export function LearningLayout({ sidebar, main, insights, className }: LearningLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-1 gap-0 overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
      role="main"
      aria-label="Learning Center"
    >
      <aside
        className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface-1 overflow-y-auto xl:flex"
        aria-label="Learning navigation sidebar"
      >
        {sidebar}
      </aside>

      <main className="flex-1 overflow-y-auto min-h-0">
        {main}
      </main>

      {insights && (
        <aside
          className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface-1 overflow-y-auto lg:flex"
          aria-label="Learning insights panel"
        >
          {insights}
        </aside>
      )}
    </div>
  );
}
