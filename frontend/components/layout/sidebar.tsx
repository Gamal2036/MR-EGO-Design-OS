"use client";

import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/foundation/badge";
import { IconButton } from "@/components/foundation/icon-button";
import { SIDEBAR_NAV, type NavGroup, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarExpanded, setSidebarExpanded } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-sticky flex h-full flex-col border-r border-border bg-sidebar transition-all duration-normal",
        sidebarExpanded ? "w-64" : "w-16",
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {sidebarExpanded && (
          <Link
            href="/"
            className="flex items-center gap-2 text-heading-4 text-sidebar-foreground font-semibold"
            aria-label="MR:EGO Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-button">
              M
            </span>
            <span className="truncate">MR:EGO</span>
          </Link>
        )}
        {!sidebarExpanded && (
          <Link
            href="/"
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-button"
            aria-label="MR:EGO Home"
          >
            M
          </Link>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 scrollbar-thin">
        {SIDEBAR_NAV.map((group, groupIndex) => (
          <SidebarGroup
            key={groupIndex}
            group={group}
            expanded={sidebarExpanded}
            currentPath={pathname}
          />
        ))}
      </nav>

      <div className="flex items-center justify-center border-t border-border p-3">
        <IconButton
          icon={sidebarExpanded ? PanelLeftClose : PanelLeftOpen}
          variant="ghost"
          size="sm"
          label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
        />
      </div>
    </aside>
  );
}

interface SidebarGroupProps {
  group: NavGroup;
  expanded: boolean;
  currentPath: string;
}

function SidebarGroup({ group, expanded, currentPath }: SidebarGroupProps) {
  return (
    <div className="mb-4" role="group" aria-label={group.label}>
      {group.label && expanded && (
        <div className="mb-1 px-3 py-1">
          <span className="text-caption text-sidebar-foreground/50 font-semibold uppercase tracking-wider">
            {group.label}
          </span>
        </div>
      )}
      <ul className="space-y-0.5" role="list">
        {group.items.map((item, index) => (
          <SidebarItemContainer
            key={index}
            item={item}
            expanded={expanded}
            currentPath={currentPath}
            depth={0}
          />
        ))}
      </ul>
    </div>
  );
}

interface SidebarItemContainerProps {
  item: NavItem;
  expanded: boolean;
  currentPath: string;
  depth: number;
}

function SidebarItemContainer({
  item,
  expanded,
  currentPath,
  depth,
}: SidebarItemContainerProps) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some((c) => c.href === currentPath) ?? false,
  );
  const isActive = item.href === currentPath;
  const hasChildren = !!(item.children && item.children.length > 0);

  return (
    <li>
      <SidebarItemButton
        item={item}
        expanded={expanded}
        isActive={isActive}
        depth={depth}
        hasChildren={hasChildren}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
      {hasChildren && expanded && isOpen && (
        <ul className="mt-0.5 space-y-0.5" role="list">
          {item.children!.map((child, childIndex) => (
            <SidebarItemContainer
              key={childIndex}
              item={child}
              expanded={expanded}
              currentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface SidebarItemButtonProps {
  item: NavItem;
  expanded: boolean;
  isActive: boolean;
  depth: number;
  hasChildren: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

function SidebarItemButton({
  item,
  expanded,
  isActive,
  depth,
  hasChildren,
  isOpen,
  onToggle,
}: SidebarItemButtonProps) {
  const Icon = item.icon;
  const paddingLeft = expanded ? 12 + depth * 16 : 0;

  const content = (
    <>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      {expanded && (
        <span className="flex-1 truncate text-left text-body-small font-medium">
          {item.label}
        </span>
      )}
      {expanded && item.badge && (
        <Badge variant="primary" size="xs">
          {item.badge}
        </Badge>
      )}
      {expanded && hasChildren && (
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-fast",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      )}
    </>
  );

  const className = cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all duration-fast",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    isActive &&
      "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
    !expanded && "justify-center px-0",
  );

  if (item.href && !hasChildren) {
    if (item.disabled) {
      return (
        <span
          className={cn(className, "cursor-not-allowed opacity-50")}
          style={{ paddingLeft: expanded ? paddingLeft : undefined }}
          aria-disabled="true"
        >
          {content}
        </span>
      );
    }
    return (
      <Link
        href={item.href}
        className={className}
        style={{ paddingLeft: expanded ? paddingLeft : undefined }}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={className}
      style={{ paddingLeft: expanded ? paddingLeft : undefined }}
      aria-expanded={isOpen}
      aria-disabled={!!item.disabled}
      disabled={item.disabled}
    >
      {content}
    </button>
  );
}
