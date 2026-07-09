"use client";

import { ShieldX } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardFooter,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function AccessDeniedPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Access denied"
        description="You don't have permission to access this page. Please contact your administrator if you believe this is a mistake."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <ShieldX className="h-8 w-8 text-danger" />
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
