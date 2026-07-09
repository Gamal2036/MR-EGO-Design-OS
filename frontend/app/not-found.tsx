"use client";

import { FileSearch, ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="flex flex-col items-center text-center px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 mb-6">
          <FileSearch className="h-12 w-12 text-primary" aria-hidden="true" />
        </div>

        <h1 className="text-[4rem] md:text-[6rem] font-bold text-primary leading-none mb-2">
          404
        </h1>

        <h2 className="text-heading-2 text-primary font-bold mb-3">
          Page not found
        </h2>

        <p className="text-body text-secondary max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
