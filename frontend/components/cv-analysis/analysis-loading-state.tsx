"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { Skeleton } from "@/components/feedback/skeleton";
import { cn } from "@/lib/utils";

const AnalysisLoadingState = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-h-0 flex-1 p-8", className)}
      role="status"
      aria-label="Loading analysis"
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-2xl space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-6">
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-2 xl:col-span-4 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-56 w-full rounded-xl" />
          </div>
          <div className="hidden xl:block xl:col-span-1 space-y-4">
            <Skeleton className="h-60 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
});
AnalysisLoadingState.displayName = "AnalysisLoadingState";

export { AnalysisLoadingState };
