"use client";

import { Search, X } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface TaskSearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const TaskSearch = forwardRef<HTMLInputElement, TaskSearchProps>(
  ({ className, value, onChange, placeholder = "Search tasks...", ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tertiary pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex h-input-md w-full rounded-lg border border-input bg-background pl-10 pr-10 text-body ring-offset-background transition-all duration-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Search tasks"
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
TaskSearch.displayName = "TaskSearch";

export { TaskSearch };
export type { TaskSearchProps };
