"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function AuthLayout({ children, className, gradient = true }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center bg-surface-0 overflow-hidden",
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-50/50 dark:bg-primary-900/20 blur-3xl" />
          <div className="absolute -bottom-1/3 right-0 w-[600px] h-[600px] rounded-full bg-ai-50/40 dark:bg-ai-900/10 blur-3xl" />
        </div>
      )}

      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-heading-4 font-semibold text-primary hover:text-primary-600 transition-colors"
          aria-label="MR:EGO Home"
        >
          <Sparkles className="h-5 w-5 text-ai-500" aria-hidden="true" />
          <span>MR:EGO</span>
        </Link>
      </motion.div>

      <div className="relative z-base w-full max-w-[440px] px-5 py-12">
        <div className="mb-4 rounded-lg border border-warning/30 bg-warning/5 px-4 py-2.5 text-center">
          <p className="text-caption text-warning font-medium">
            Development mock authentication &mdash; not production auth.
          </p>
        </div>
        {children}
      </div>

      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <p className="text-caption text-tertiary text-center">
          &copy; {new Date().getFullYear()} MR:EGO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
