"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";
import { Card } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface CompletionCardProps {
  className?: string;
}

export function CompletionCard({ className }: CompletionCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-6"
      >
        <CheckCircle2
          className="h-10 w-10 text-success"
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <h2 className="text-heading-2 text-primary font-semibold">
          You&apos;re all set!
        </h2>
        <p className="text-body text-secondary max-w-md mx-auto">
          Your career profile is ready. MR:EGO AI is now working to find the
          best opportunities and insights tailored to you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mt-8 space-y-3"
      >
        <Card variant="ai" padding="sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-ai shrink-0" aria-hidden="true" />
            <p className="text-body-small text-left">
              <span className="font-medium">AI Engine active</span> &mdash;
              We&apos;re analyzing your profile against live market data
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <Link href="/dashboard">
          <Button
            size="xl"
            variant="primary"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Go to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
