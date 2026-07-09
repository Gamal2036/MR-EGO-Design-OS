"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Brain, Target, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

function FloatingIcon({
  icon: Icon,
  className,
  delay = 0,
  duration = 4,
}: {
  icon: typeof Sparkles;
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl glass shadow-glass",
        className
      )}
      animate={{
        y: [0, -12, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5 text-primary" />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-surface-0 pt-16 pb-12 md:pt-20 md:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-50/50 dark:bg-primary-900/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-ai-50/40 dark:bg-ai-900/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-50/30 dark:bg-cyan-900/5 blur-3xl" />
        <FloatingIcon icon={Sparkles} className="top-32 left-[15%] text-cyan-500" delay={0} />
        <FloatingIcon icon={Brain} className="top-40 right-[18%] text-ai-500/70" delay={1} duration={5} />
        <FloatingIcon icon={Target} className="bottom-48 left-[12%] text-primary/60" delay={2} duration={4.5} />
        <FloatingIcon icon={Zap} className="bottom-36 right-[15%] text-cyan-500/60" delay={0.5} duration={3.5} />
      </div>

      <Container size="xl" className="relative z-base">
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center">
          <motion.span
            className="inline-flex items-center gap-1.5 text-overline text-primary mb-3 tracking-widest uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            AI-Powered Career Platform
          </motion.span>

          <motion.h1
            id="hero-heading"
            className="text-display md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight text-primary mb-4 leading-[1.1]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Your AI Career
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-ai-500 bg-clip-text text-transparent">
              Operating System
            </span>
          </motion.h1>

          <motion.p
            className="text-body-large md:text-body-large text-secondary max-w-[540px] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The intelligent platform that manages your career journey — from CV
            optimization to job matching, all powered by AI.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button asChild size="xl" variant="primary" className="w-full sm:w-auto min-w-[180px]">
              <Link href="/auth/register" aria-label="Start Your Journey — Create account">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto min-w-[140px]">
              <a href="#features">
                Learn More
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-caption text-tertiary">
              Trusted by 10,000+ professionals at leading companies
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center" aria-label="Trusted companies">
              {["Stripe", "Vercel", "Linear", "Notion"].map((name) => (
                <span
                  key={name}
                  className="text-body-small font-semibold text-tertiary/60 dark:text-tertiary/40 tracking-tight"
                  role="presentation"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
