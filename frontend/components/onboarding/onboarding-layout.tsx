"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: ReactNode;
  className?: string;
}

export function OnboardingLayout({ children, className }: OnboardingLayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col bg-surface-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary-50/60 dark:bg-primary-900/20 blur-3xl" />
        <div className="absolute -bottom-1/3 -right-1/4 w-[800px] h-[800px] rounded-full bg-ai-50/40 dark:bg-ai-900/10 blur-3xl" />
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-job-50/30 dark:bg-job-900/5 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 pt-6 pb-2 flex justify-center"
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

      <div className="relative z-base flex-1 flex flex-col w-full max-w-[720px] mx-auto px-5 py-4 md:py-8">
        {children}
      </div>
    </div>
  );
}
