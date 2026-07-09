"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function VerificationSuccessPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Email verified!"
        description="Your email has been successfully verified. You can now access all MR:EGO features."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        }
      />
      <Link href="/login">
        <Button variant="primary" size="lg" className="w-full">
          Continue to Sign In
        </Button>
      </Link>
    </AuthCard>
  );
}
