"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed -top-20 left-4 z-skip-link rounded-b-md bg-primary px-4 py-2 text-button text-primary-foreground shadow-medium transition-all duration-fast focus:top-0"
    >
      Skip to main content
    </a>
  );
}
