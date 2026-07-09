"use client";

import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Route,
  Send,
} from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    description: "Back to overview",
  },
  {
    label: "CV Builder",
    icon: FileText,
    href: "/dashboard/cv-builder",
    description: "Update your CV",
  },
  {
    label: "CV Analysis",
    icon: BarChart3,
    href: "/dashboard/cv-analysis",
    description: "Analyze your CV",
  },
  {
    label: "Career Progress",
    icon: Route,
    href: "/dashboard/career-progress",
    description: "Track your growth",
  },
  {
    label: "AI Workspace",
    icon: Send,
    href: "/dashboard/ai",
    description: "Chat with AI coach",
  },
];

const JobQuickActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.href}
              variant="outline"
              size="sm"
              leftIcon={<Icon className="h-4 w-4" />}
              asChild
            >
              <Link href={action.href}>
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    );
  }
);
JobQuickActions.displayName = "JobQuickActions";

export { JobQuickActions };
