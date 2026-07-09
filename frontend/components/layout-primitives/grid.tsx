"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-1 md:grid-cols-2 lg:grid-cols-12",
      auto: "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
      "auto-sm": "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
      "auto-lg": "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: 5,
  },
});

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ columns, gap, className }))}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export { Grid, gridVariants };
export type { GridProps };
