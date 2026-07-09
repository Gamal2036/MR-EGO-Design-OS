"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { AnalysisHeader } from "./analysis-header";
import { AnalysisNavigation } from "./analysis-navigation";
import { RightPanel } from "./right-panel";

import { cn } from "@/lib/utils";

export interface CVAnalysisLayoutProps extends HTMLAttributes<HTMLDivElement> {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const CVAnalysisLayout = forwardRef<HTMLDivElement, CVAnalysisLayoutProps>(
  ({ className, children, activeSection, onSectionChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-0 flex-1 flex flex-col", className)}
        {...props}
      >
        <AnalysisHeader />

        <div className="mx-auto w-full max-w-screen-2xl px-5 pb-6 md:px-7 md:pb-8 lg:px-8 lg:pb-10 flex-1">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-6 h-full">
            <aside
              className="hidden lg:block lg:col-span-1"
              aria-label="Analysis navigation"
            >
              <div className="sticky top-24 space-y-4">
                <AnalysisNavigation
                  activeSection={activeSection}
                  onSectionChange={onSectionChange}
                />
              </div>
            </aside>

            <main
              className="min-w-0 lg:col-span-2 xl:col-span-4"
              role="main"
              aria-label="Analysis content"
            >
              <div className="space-y-6">{children}</div>
            </main>

            <aside
              className="hidden xl:block xl:col-span-1"
              aria-label="Suggestions and actions"
            >
              <div className="sticky top-24 space-y-4">
                <RightPanel />
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
);
CVAnalysisLayout.displayName = "CVAnalysisLayout";

export { CVAnalysisLayout };
