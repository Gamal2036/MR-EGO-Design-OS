"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
        aria-hidden="true"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
      </motion.div>

      <motion.h1
        className="text-heading-2 text-primary font-bold mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Welcome to MR:EGO
      </motion.h1>

      <motion.p
        className="text-body text-secondary max-w-sm mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Your intelligent career operating system. Manage your professional growth
        with AI-powered insights and tools.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2">
          <Zap className="h-6 w-6 text-ai-500" aria-hidden="true" />
          <span className="text-caption font-medium text-secondary">AI-Powered</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2">
          <Shield className="h-6 w-6 text-success" aria-hidden="true" />
          <span className="text-caption font-medium text-secondary">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2">
          <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-caption font-medium text-secondary">Smart</span>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/auth/login" className="flex-1">
          <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Sign In
          </Button>
        </Link>
        <Link href="/auth/register" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            Create Account
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
