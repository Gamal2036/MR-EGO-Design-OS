"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

export function CTASection() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0 relative overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-50/60 dark:bg-primary-900/20 blur-3xl" />
      </div>
      <Container size="md" className="relative z-base">
        <ScrollReveal y={20}>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-heading-1 md:text-[2.5rem] text-primary mb-6 leading-tight">
              Ready to transform your career?
            </h2>
            <p className="text-body-large text-secondary max-w-[540px] mb-8">
              Join thousands of professionals using MR:EGO to accelerate their growth.
            </p>
            <Button asChild size="xl" variant="primary" className="min-w-[200px] h-12">
              <Link href="/auth/register" aria-label="Start Your Journey — Create account">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-caption text-tertiary mt-5 block">
              No credit card required
            </span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
