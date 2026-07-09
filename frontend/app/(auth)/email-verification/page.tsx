"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  AuthCard,
  AuthCardFooter,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function EmailVerificationPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = useCallback(() => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResent(true);
    }, 1000);
  }, []);

  return (
    <AuthCard>
      <AuthCardHeader
        title="Verify your email"
        description="We've sent a verification link to your email address. Please check your inbox."
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>
        }
      />

      <div className="flex flex-col gap-3">
        <Link href="/verification-success" className="w-full">
          <Button variant="primary" size="lg" className="w-full">
            Continue
          </Button>
        </Link>

        <Button
          variant="outline"
          size="lg"
          loading={resending}
          onClick={handleResend}
          disabled={resent}
        >
          {resent ? "Email Sent" : "Resend Email"}
        </Button>
      </div>

      <AuthCardFooter>
        <p className="text-body-small text-secondary">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <Link
            href="/login"
            className="text-link hover:text-link-hover font-medium transition-colors"
          >
            try a different email
          </Link>
        </p>
      </AuthCardFooter>
    </AuthCard>
  );
}
