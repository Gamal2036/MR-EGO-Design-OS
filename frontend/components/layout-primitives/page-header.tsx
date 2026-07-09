"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  breadcrumb?: ReactNode;
  metadata?: ReactNode;
  divider?: boolean;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      title,
      description,
      action,
      breadcrumb,
      metadata,
      divider = true,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {breadcrumb && <div>{breadcrumb}</div>}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {typeof title === "string" ? (
              <h1 className="text-heading-1 text-primary">{title}</h1>
            ) : (
              title
            )}
            {description && (
              <p className="text-body-large text-secondary mt-1">
                {description}
              </p>
            )}
            {metadata && (
              <div className="flex items-center gap-3 mt-2">{metadata}</div>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {divider && <hr className="border-border" />}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
export type { PageHeaderProps };
