"use client";

import { Shield, Lock, Server, Fingerprint, CheckCircle2 } from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your data is encrypted at rest and in transit using AES-256 and TLS 1.3.",
  },
  {
    icon: Server,
    title: "Enterprise-Grade Infrastructure",
    description: "Hosted on SOC 2 compliant infrastructure with 99.99% uptime guarantee.",
  },
  {
    icon: Fingerprint,
    title: "Multi-Factor Authentication",
    description: "Industry-standard authentication with support for SSO and MFA.",
  },
  {
    icon: Shield,
    title: "GDPR & CCPA Compliant",
    description: "Full compliance with global data protection regulations. Your data, your control.",
  },
];

export function EnterpriseSecurity() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-1 border-t border-border/50" aria-labelledby="security-heading">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal x={-20} y={0}>
            <div>
              <span className="text-overline text-cv tracking-widest uppercase mb-3 block">
                ENTERPRISE SECURITY
              </span>
              <h2 id="security-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
                Your career data is sacred
              </h2>
              <p className="text-body text-secondary mb-6 leading-relaxed">
                We treat your professional information with the highest security standards. Every layer of MR:EGO is built with enterprise-grade protection.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-body-small text-body">
                  <CheckCircle2 className="h-4 w-4 text-cv-500 shrink-0" />
                  <span>SOC 2 Type II certified</span>
                </li>
                <li className="flex items-center gap-2 text-body-small text-body">
                  <CheckCircle2 className="h-4 w-4 text-cv-500 shrink-0" />
                  <span>ISO 27001 certified</span>
                </li>
                <li className="flex items-center gap-2 text-body-small text-body">
                  <CheckCircle2 className="h-4 w-4 text-cv-500 shrink-0" />
                  <span>Regular third-party security audits</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal x={20} y={0} delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item) => (
                <article
                  key={item.title}
                  className="p-5 rounded-lg border border-border/50 bg-surface-1 shadow-soft"
                  tabIndex={0}
                >
                  <div className="w-10 h-10 rounded-lg bg-cv-100 dark:bg-cv-900/40 flex items-center justify-center mb-3">
                    <item.icon className="h-4 w-4 text-cv-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-label text-primary mb-1.5">{item.title}</h3>
                  <p className="text-smallest text-secondary leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
