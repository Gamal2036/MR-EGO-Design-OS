"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does MR:EGO's AI analyze my CV?",
    answer: "MR:EGO uses proprietary natural language processing models trained on millions of career trajectories. It analyzes your CV against role-specific requirements, industry benchmarks, and current market demands to provide actionable optimization suggestions.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We employ enterprise-grade encryption (AES-256), SOC 2 Type II certified infrastructure, and strict data handling policies. Your career data is never shared without your explicit consent.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Most users see initial optimization suggestions within minutes of uploading their CV. Users typically report significant improvements in application responses within 2-4 weeks of following MR:EGO's recommendations.",
  },
  {
    question: "Can I use MR:EGO alongside my current job search?",
    answer: "Yes — MR:EGO is designed to integrate seamlessly into your existing workflow. Use it to optimize applications, track opportunities, and gain insights without disrupting your current process.",
  },
  {
    question: "What makes MR:EGO different from other career tools?",
    answer: "MR:EGO is the first AI career operating system that unifies CV optimization, job matching, application tracking, and career analytics in one platform. Our AI is purpose-built for career development, not repurposed from general-purpose models.",
  },
  {
    question: "Is there a free tier available?",
    answer: "Yes. We offer a free tier with core CV analysis and basic job matching. Premium plans unlock advanced features including unlimited optimizations, priority matching, and personalized career coaching.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0" aria-labelledby="faq-heading">
      <Container size="md">
        <ScrollReveal y={20}>
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Frequently asked questions
            </h2>
            <p className="text-body text-secondary max-w-[520px] mx-auto">
              Everything you need to know about MR:EGO.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={0.05 * index} y={10}>
              <div className="border border-border rounded-lg bg-surface-1 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-body text-primary font-medium hover:bg-accent/30 transition-colors duration-fast"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-tertiary transition-transform duration-normal",
                      openIndex === index && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-body-small text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
