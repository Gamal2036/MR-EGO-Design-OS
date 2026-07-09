"use client";

import { BarChart3, Brain, Briefcase, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const MOBILE_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "AI", icon: Brain, href: "/ai" },
  { label: "Jobs", icon: Briefcase, href: "/dashboard/jobs" },
  { label: "More", icon: BarChart3, href: "/dashboard/analytics" },
];

export function MobileNav({ className }: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-sticky border-t border-border bg-background md:hidden",
        className,
      )}
      aria-label="Mobile navigation"
      role="navigation"
    >
      <ul className="flex items-center justify-around" role="list">
        {MOBILE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-caption transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  isActive
                    ? "text-primary"
                    : "text-tertiary hover:text-secondary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
