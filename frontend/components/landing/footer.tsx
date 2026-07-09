"use client";

import { Sparkles, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "API"],
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "Help Center", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "GDPR"],
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900/50 border-t border-border" role="contentinfo">
      <Container size="xl">
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <ScrollReveal y={10}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mb-3 text-foreground no-underline hover:no-underline"
                  aria-label="MR:EGO — Home"
                >
                  <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-heading-4 font-semibold text-primary">MR:EGO</span>
                </Link>
                <p className="text-caption text-tertiary mb-4 max-w-[200px]">
                  Your AI Career Operating System
                </p>
                <div className="flex items-center gap-3">
                  <a href="#" className="text-tertiary hover:text-primary transition-colors duration-fast" aria-label="GitHub">
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#" className="text-tertiary hover:text-primary transition-colors duration-fast" aria-label="Twitter">
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#" className="text-tertiary hover:text-primary transition-colors duration-fast" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#" className="text-tertiary hover:text-primary transition-colors duration-fast" aria-label="YouTube">
                    <Youtube className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <ScrollReveal y={10} delay={0.05 * footerSections.indexOf(section)}>
                  <h4 className="text-caption font-semibold text-primary uppercase tracking-wider mb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-body-small text-secondary hover:text-primary transition-colors duration-fast no-underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        <div className="py-3 border-t border-border">
          <p className="text-caption text-tertiary text-center lg:text-left">
            &copy; 2026 MR:EGO. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
