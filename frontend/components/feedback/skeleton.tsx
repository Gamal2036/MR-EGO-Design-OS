"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded";
}

const variantClasses = {
  text: "h-4 w-full rounded",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-lg",
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-skeleton-pulse bg-neutral-200 dark:bg-neutral-700",
          variantClasses[variant],
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  lines?: number;
}

const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  ({ className, count = 1, lines = 3, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {Array.from({ length: count }).map((_, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            {Array.from({ length: lines }).map((__, lineIdx) => (
              <Skeleton
                key={lineIdx}
                className={cn(
                  "h-4",
                  lineIdx === lines - 1 ? "w-2/3" : "w-full"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);
SkeletonGroup.displayName = "SkeletonGroup";

export { Skeleton, SkeletonGroup };
export type { SkeletonProps, SkeletonGroupProps };
