"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <motion.div
      className="relative z-banner flex items-center justify-center gap-2 h-9 bg-gradient-to-r from-primary-600 via-cyan-600 to-primary-600 text-primary-foreground text-smallest font-medium"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="banner"
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      <span>
        Introducing MR:EGO 2.0 — AI-powered career intelligence, now available.
      </span>
      <a
        href="#features"
        className="ml-1 underline underline-offset-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
      >
        Learn more &rarr;
      </a>
    </motion.div>
  );
}
