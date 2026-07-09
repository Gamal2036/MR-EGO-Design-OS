"use client";

import { type HTMLAttributes, useState, type ReactNode } from "react";

import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

import { SkipLink } from "@/components/shell/skip-link";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  breadcrumb?: ReactNode;
  title?: string;
  hideSidebar?: boolean;
  hideTopbar?: boolean;
  hideMobileNav?: boolean;
}

export function AppShell({
  className,
  breadcrumb,
  title,
  hideSidebar = false,
  hideTopbar = false,
  hideMobileNav = false,
  children,
  ...props
}: AppShellProps) {
  const { sidebarExpanded } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={cn("relative flex min-h-screen bg-background", className)} {...props}>
      <SkipLink />

      {!hideSidebar && (
        <>
          <div
            className={cn(
              "fixed inset-0 z-40 bg-black/50 transition-opacity duration-normal lg:hidden",
              mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 transition-transform duration-normal lg:static lg:z-auto",
              "lg:block",
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            )}
          >
            <Sidebar />
          </div>
        </>
      )}

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-normal",
          !hideSidebar && (sidebarExpanded ? "lg:ml-64" : "lg:ml-16"),
        )}
      >
        {!hideTopbar && (
          <Topbar
            breadcrumb={breadcrumb}
            title={title}
            onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        )}

        {children}

        {!hideMobileNav && <MobileNav />}
      </div>
    </div>
  );
}
