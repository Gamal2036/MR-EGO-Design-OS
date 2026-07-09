"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        role="navigation"
        aria-label="Primary"
        className={cn(
          "fixed top-0 left-0 right-0 z-banner h-14 flex items-center transition-all duration-normal ease-out-custom",
          scrolled
            ? "glass border-b border-glass-border shadow-glass"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="flex items-center justify-between w-full px-8 max-w-container-2xl mx-auto">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-foreground no-underline hover:no-underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="MR:EGO — Home"
          >
            <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-heading-4 font-semibold text-primary">MR:EGO</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-5" aria-label="Primary navigation">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/auth/login"
                className="text-body-small text-secondary hover:text-primary transition-colors duration-fast no-underline"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button asChild size="sm" variant="primary">
                <Link href="/auth/register" aria-label="Get Started — Create account">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </nav>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-accent transition-colors duration-fast"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-overlay bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              className="fixed top-0 right-0 bottom-0 z-popover w-[300px] bg-surface-1 shadow-4 flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-heading-4 font-semibold text-primary">MR:EGO</span>
                <button
                  className="flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/auth/login"
                  className="text-body text-secondary hover:text-primary transition-colors duration-fast no-underline py-2"
                >
                  Sign In
                </Link>
                <Button asChild size="lg" variant="primary" className="w-full">
                  <Link href="/auth/register" aria-label="Get Started — Create account">
                    Get Started
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
