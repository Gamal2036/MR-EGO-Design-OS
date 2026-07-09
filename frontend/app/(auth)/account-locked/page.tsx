"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardFooter,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function AccountLockedPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Account locked"
        description="Your account has been temporarily locked due to multiple failed sign-in attempts. Please try again later or reset your password."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <Lock className="h-8 w-8 text-danger" />
          </div>
        }
      />
      <div className="flex flex-col gap-3">
        <Link href="/reset-password">
          <Button variant="primary" size="lg" className="w-full">
            Reset Password
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            Try Again
          </Button>
        </Link>
      </div>
      <AuthCardFooter>
        <p className="text-body-small text-secondary">
          Need help?{" "}
          <Link
            href="/"
            className="text-link hover:text-link-hover font-medium transition-colors"
          >
            Contact support
          </Link>
        </p>
      </AuthCardFooter>
    </AuthCard>
  );
}
