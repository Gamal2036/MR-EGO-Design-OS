"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface GoalsLayoutProps {
  header: ReactNode;
  filters?: ReactNode;
  content: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export function GoalsLayout({ header, filters, content, sidebar, className }: GoalsLayoutProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        {header}
        {filters && <div className="mt-6">{filters}</div>}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">{content}</div>
          {sidebar && <aside className="space-y-6">{sidebar}</aside>}
        </div>
      </div>
    </div>
  );
}
