"use client";

import { Clock } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function SessionExpiredPage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Session expired"
        description="Your session has expired due to inactivity. Please sign in again to continue."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <Clock className="h-8 w-8 text-warning" />
          </div>
        }
      />
      <Link href="/login">
        <Button variant="primary" size="lg" className="w-full">
          Sign In Again
        </Button>
      </Link>
    </AuthCard>
  );
}
