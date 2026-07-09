"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <ol className="flex items-center gap-1" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <Fragment key={item.href ?? item.label}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 text-caption text-tertiary transition-colors duration-fast",
                      "hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded",
                    )}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-caption",
                      isLast
                        ? "text-foreground font-medium"
                        : "text-tertiary",
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-tertiary" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
