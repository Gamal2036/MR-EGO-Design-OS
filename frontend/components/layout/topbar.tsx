"use client";

import { Menu, Search } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { AIShortcutButton } from "@/components/shell/ai-shortcut-button";
import { NotificationButton } from "@/components/shell/notification-button";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { UserMenuShell } from "@/components/shell/user-menu";
import { cn } from "@/lib/utils";

interface TopbarProps extends HTMLAttributes<HTMLElement> {
  breadcrumb?: React.ReactNode;
  title?: string;
  onMenuToggle?: () => void;
}

const Topbar = forwardRef<HTMLElement, TopbarProps>(
  ({ className, breadcrumb, title, onMenuToggle, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-sticky flex h-16 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-6",
          className,
        )}
        role="banner"
        {...props}
      >
        <div className="flex items-center gap-2 lg:hidden">
          <IconButton
            icon={Menu}
            variant="ghost"
            size="sm"
            label="Toggle navigation menu"
            onClick={onMenuToggle}
          />
        </div>

        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="hidden md:flex">
            {breadcrumb}
          </nav>
        )}

        {title && (
          <h1 className="truncate text-heading-4 text-sidebar-foreground font-semibold">
            {title}
          </h1>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          <button
            type="button"
            className="mr-2 hidden items-center gap-2 rounded-lg border border-border bg-surface-1 px-3 py-1.5 text-body-small text-tertiary transition-colors hover:border-hover hover:text-secondary md:flex"
            aria-label="Search"
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
              });
              document.dispatchEvent(event);
            }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Search</span>
            <kbd className="ml-6 rounded border border-border bg-background px-1.5 py-0.5 text-smallest text-tertiary">
              ⌘K
            </kbd>
          </button>

          <AIShortcutButton />
          <ThemeToggle />
          <NotificationButton />
          <UserMenuShell />
        </div>
      </header>
    );
  },
);

Topbar.displayName = "Topbar";

export { Topbar };
export type { TopbarProps };
