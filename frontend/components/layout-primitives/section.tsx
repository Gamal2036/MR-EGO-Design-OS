"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  description?: string;
  action?: ReactNode;
  headerClassName?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, title, description, action, headerClassName, children, ...props },
    ref
  ) => {
    return (
      <section ref={ref} className={cn("space-y-5", className)} {...props}>
        {(title || action) && (
          <div
            className={cn(
              "flex items-start justify-between gap-4",
              headerClassName
            )}
          >
            <div className="flex-1 min-w-0">
              {title && (
                typeof title === "string" ? (
                  <h2 className="text-heading-3 text-primary">{title}</h2>
                ) : (
                  title
                )
              )}
              {description && (
                <p className="text-body text-secondary mt-1">{description}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        <div>{children}</div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
export type { SectionProps };
