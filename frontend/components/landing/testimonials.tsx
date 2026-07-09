"use client";

import { Star } from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  name: string;
  title: string;
  quote: string;
  initials: string;
  color: string;
  delay: number;
}

function TestimonialCard({ name, title, quote, initials, color, delay }: TestimonialProps) {
  return (
    <ScrollReveal delay={delay} y={30}>
      <article
        className="p-6 rounded-lg border border-border bg-surface-1 shadow-soft flex flex-col h-full"
        aria-label={`Testimonial from ${name}`}
      >
        <div className="flex items-center gap-0.5 mb-4" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-warning-500 text-warning-500" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="text-body text-body flex-1 mb-5 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="pt-5 border-t border-border">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center text-label font-semibold text-white shrink-0",
                color
              )}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-body-small text-primary font-semibold truncate">{name}</p>
              <p className="text-caption text-secondary truncate">{title}</p>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Chen",
    title: "Senior Engineer at Stripe",
    quote: "MR:EGO completely transformed how I approach my career. The AI matched me with a role I would have never found on my own.",
    initials: "SC",
    color: "bg-primary-500",
    delay: 0.1,
  },
  {
    name: "Marcus Johnson",
    title: "Product Lead at Vercel",
    quote: "The CV optimization alone paid for itself ten times over. I went from a 40% to 92% ATS match rate.",
    initials: "MJ",
    color: "bg-ai-500",
    delay: 0.2,
  },
  {
    name: "Priya Patel",
    title: "Design Director at Linear",
    quote: "Finally, a career tool that treats your professional growth with the seriousness it deserves. The insights are uncanny.",
    initials: "PP",
    color: "bg-job-500",
    delay: 0.3,
  },
];

export function Testimonials() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0" aria-labelledby="testimonials-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Loved by career-driven professionals
            </h2>
            <p className="text-body text-secondary max-w-[540px] mx-auto">
              See what our users say about their experience with MR:EGO.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
