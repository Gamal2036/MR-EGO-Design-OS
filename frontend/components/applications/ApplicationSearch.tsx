"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { type HTMLAttributes, useRef } from "react";

interface ApplicationSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ApplicationSearch({
  value,
  onChange,
  placeholder = "Search applications...",
  className,
  ...props
}: ApplicationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative ${className || ""}`} {...props}>
      <SearchIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface-0 pl-9 pr-8 py-2 text-caption text-primary placeholder:text-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-hover"
        aria-label="Search applications"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
