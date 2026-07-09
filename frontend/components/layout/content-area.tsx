"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface ContentAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ className, maxWidth = "2xl", padding = true, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(
          "flex-1 outline-none",
          padding && "px-4 py-6 md:px-6 lg:px-8",
          className,
        )}
        tabIndex={-1}
        role="main"
        {...props}
      >
        <div
          className={cn(
            "mx-auto w-full",
            maxWidth === "sm" && "max-w-container-sm",
            maxWidth === "md" && "max-w-container-md",
            maxWidth === "lg" && "max-w-container-lg",
            maxWidth === "xl" && "max-w-container-xl",
            maxWidth === "2xl" && "max-w-container-2xl",
            maxWidth === "full" && "max-w-full",
          )}
        >
          {children}
        </div>
      </main>
    );
  },
);

ContentArea.displayName = "ContentArea";

export { ContentArea };
export type { ContentAreaProps };
