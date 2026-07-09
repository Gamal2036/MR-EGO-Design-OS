"use client";

import { FileQuestion } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function AuthNotFoundPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
            <FileQuestion className="h-8 w-8 text-tertiary" />
          </div>
        }
      />
      <div className="flex flex-col gap-3">
        <Link href="/">
          <Button variant="primary" size="lg" className="w-full">
            Go to Home
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            Sign In
          </Button>
        </Link>
      </div>
    </AuthCard>
  );
}
