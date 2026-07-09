"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface ContentBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: string;
  action?: ReactNode;
  variant?: "default" | "card" | "bordered";
  padding?: boolean;
}

const variantStyles = {
  default: "",
  card: "rounded-xl border border-border bg-card shadow-soft",
  bordered: "rounded-xl border border-border",
};

const ContentBlock = forwardRef<HTMLDivElement, ContentBlockProps>(
  (
    {
      className,
      title,
      description,
      action,
      variant = "default",
      padding = variant !== "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          padding && "p-5",
          className
        )}
        {...props}
      >
        {(title || action) && (
          <div
            className={cn(
              "flex items-start justify-between gap-4",
              padding ? "mb-4" : "mb-5"
            )}
          >
            <div className="flex-1 min-w-0">
              {title && typeof title === "string" ? (
                <h3 className="text-heading-4 text-primary">{title}</h3>
              ) : (
                title
              )}
              {description && (
                <p className="text-body-small text-secondary mt-0.5">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        <div>{children}</div>
      </div>
    );
  }
);
ContentBlock.displayName = "ContentBlock";

export { ContentBlock };
export type { ContentBlockProps };
