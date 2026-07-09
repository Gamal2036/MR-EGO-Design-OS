"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with core career tools.",
    features: ["CV analysis", "Basic job matching", "3 optimizations/month", "Email support"],
    highlighted: false,
    delay: 0.1,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For professionals serious about growth.",
    features: [
      "Unlimited CV optimizations",
      "Priority job matching",
      "AI career coaching",
      "Real-time market insights",
      "Priority support",
    ],
    highlighted: true,
    delay: 0.2,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per team",
    description: "For teams and organizations.",
    features: [
      "Everything in Pro",
      "Team management",
      "SSO & MFA",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    highlighted: false,
    delay: 0.3,
  },
];

export function PricingPreview() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-1 border-t border-border/50" aria-labelledby="pricing-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-12">
            <span className="text-overline text-primary tracking-widest uppercase mb-3 block">
              PRICING
            </span>
            <h2 id="pricing-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-body text-secondary max-w-[520px] mx-auto">
              Start free. Upgrade when you need more power.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {tiers.map((tier) => (
            <ScrollReveal key={tier.name} delay={tier.delay} y={20}>
              <div
                className={`relative p-7 rounded-xl border transition-all duration-normal ease-out-custom ${
                  tier.highlighted
                    ? "border-primary/30 bg-primary-50/30 dark:bg-primary-900/20 shadow-medium"
                    : "border-border bg-surface-1 shadow-soft hover:shadow-hover"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-smallest font-semibold">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-heading-4 text-primary mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-display font-bold text-primary">{tier.price}</span>
                    {tier.period && (
                      <span className="text-body-small text-tertiary">/{tier.period}</span>
                    )}
                  </div>
                  <p className="text-body-small text-secondary">{tier.description}</p>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-body-small text-body">
                      <Check className="h-3.5 w-3.5 text-cv-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={tier.highlighted ? "primary" : "outline"} size="lg" className="w-full">
                  <Link
                    href={tier.name === "Enterprise" ? "#contact" : "/auth/register"}
                    aria-label={`${tier.name} plan: ${tier.price}`}
                  >
                    {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
