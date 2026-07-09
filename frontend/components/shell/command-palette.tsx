"use client";

import { Command, Search } from "lucide-react";
import { type HTMLAttributes, useCallback, useEffect, useState } from "react";

import { SIDEBAR_NAV } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const allItems = SIDEBAR_NAV.flatMap((group) =>
    group.items.flatMap((item) => [
      item,
      ...(item.children ?? []),
    ]),
  );

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.href?.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setOpen(false);
      }
    },
    [isOpen, setOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed left-1/2 top-[15%] z-modal w-full max-w-lg -translate-x-1/2",
          "rounded-xl border border-border bg-popover shadow-modal",
          "animate-fade-in",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-tertiary" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter" && filtered[selectedIndex]) {
                const item = filtered[selectedIndex];
                if (item?.href) {
                  window.location.href = item.href;
                }
                setOpen(false);
              }
            }}
            placeholder="Search pages, settings, and more..."
            className="flex-1 bg-transparent py-4 text-body outline-none placeholder:text-tertiary"
            autoFocus
            aria-label="Search"
          />
          <kbd className="hidden shrink-0 items-center gap-1 rounded border border-border bg-background px-2 py-1 text-smallest text-tertiary sm:flex">
            <Command className="h-3 w-3" aria-hidden="true" />
            K
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Results">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center text-body text-tertiary">
              No results found
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href ?? item.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-fast",
                    "focus-visible:outline-none",
                    index === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent/50",
                  )}
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href;
                    }
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <Icon className="h-4 w-4 shrink-0 text-tertiary" aria-hidden="true" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.href && (
                    <span className="text-caption text-tertiary">
                      {item.href}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export function CommandPaletteTrigger() {
  return <CommandPalette />;
}
