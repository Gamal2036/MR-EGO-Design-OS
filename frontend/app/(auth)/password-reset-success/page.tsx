"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function PasswordResetSuccessPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Password reset successful"
        description="Your password has been changed. You can now sign in with your new password."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        }
      />
      <Link href="/login">
        <Button variant="primary" size="lg" className="w-full">
          Sign In with New Password
        </Button>
      </Link>
    </AuthCard>
  );
}
