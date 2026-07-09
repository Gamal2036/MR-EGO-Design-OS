"use client";

import { type HTMLAttributes } from "react";

import { RightPanel } from "../context/context-panel";
import { SessionSidebar } from "../sidebar/session-sidebar";
import { AIToolbar } from "../toolbar/ai-toolbar";

import { StatusBar } from "./status-bar";
import { WorkspaceHeader } from "./workspace-header";

import { cn } from "@/lib/utils";

interface AIWorkspaceLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AIWorkspaceLayout({ children, className, ...props }: AIWorkspaceLayoutProps) {
  return (
    <div
      className={cn("flex h-full flex-col bg-background", className)}
      {...props}
    >
      <WorkspaceHeader />
      <AIToolbar />

      <div className="flex flex-1 overflow-hidden">
        <SessionSidebar />

        <main
          id="ai-workspace-main"
          className="flex flex-1 flex-col overflow-hidden"
          role="main"
          aria-label="AI workspace main content"
          tabIndex={-1}
        >
          {children}
        </main>

        <RightPanel />
      </div>

      <StatusBar />
    </div>
  );
}
