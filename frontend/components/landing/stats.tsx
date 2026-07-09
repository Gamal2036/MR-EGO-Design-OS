"use client";

import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "CVs Optimized" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "3.2x", label: "Interview Rate Boost" },
];

export function Stats() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-1 border-t border-border/50" aria-label="Statistics">
      <Container size="xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={0.1 * (index + 1)} y={20}>
              <div className="text-center">
                <motion.span
                  className="block text-display md:text-[3rem] font-bold text-primary mb-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-body-small text-tertiary">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
