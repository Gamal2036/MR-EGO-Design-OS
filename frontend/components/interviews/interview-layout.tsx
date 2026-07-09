"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface InterviewLayoutProps extends HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const InterviewLayout = forwardRef<HTMLDivElement, InterviewLayoutProps>(
  ({ className, left, center, right, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-1 gap-0 overflow-hidden bg-background",
          className,
        )}
        {...props}
      >
        {left && (
          <aside
            className="hidden w-72 shrink-0 flex-col border-r border-border bg-surface-1 overflow-y-auto xl:flex"
            aria-label="Interview sidebar"
          >
            {left}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto" role="main">
          {center}
        </main>

        {right && (
          <aside
            className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface-1 overflow-y-auto lg:flex"
            aria-label="Interview insights"
          >
            {right}
          </aside>
        )}
      </div>
    );
  },
);
InterviewLayout.displayName = "InterviewLayout";

export { InterviewLayout };
export type { InterviewLayoutProps };
