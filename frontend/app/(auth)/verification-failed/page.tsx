"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function VerificationFailedPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Verification failed"
        description="The verification link is invalid or has expired. Please request a new one."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <AlertCircle className="h-8 w-8 text-danger" />
          </div>
        }
      />
      <div className="flex flex-col gap-3">
        <Link href="/email-verification">
          <Button variant="primary" size="lg" className="w-full">
            Resend Verification
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    </AuthCard>
  );
}
