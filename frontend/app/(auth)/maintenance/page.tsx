"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import { Button } from "@/components/foundation/button";

export default function MaintenancePage() {
  return (
    <AuthCard>
      <AuthCardHeader
        title="Under maintenance"
        description="We're currently performing scheduled maintenance. We'll be back shortly. Thank you for your patience."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-info/10">
            <Wrench className="h-8 w-8 text-info" />
          </div>
        }
      />
      <Link href="/login">
        <Button variant="primary" size="lg" className="w-full">
          Try Again
        </Button>
      </Link>
    </AuthCard>
  );
}
