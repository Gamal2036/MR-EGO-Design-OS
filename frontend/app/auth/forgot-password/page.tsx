"use client";

import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useCallback, useId, useState } from "react";

import {
  AuthCard,
  AuthCardFooter,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import {
  AuthForm,
  AuthFormActions,
} from "@/components/auth/auth-form";
import { StatusMessage } from "@/components/auth/status-message";
import {
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";

export default function ForgotPasswordPage() {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 1000);
    },
    []
  );

  if (sent) {
    return (
      <AuthCard>
        <StatusMessage
          variant="success"
          title="Check your email"
          message={`If an account exists for ${email}, we've sent password reset instructions.`}
          className="mb-4"
        />
        <Link href="/auth/login">
          <Button variant="outline" size="lg" className="w-full">
            Back to Sign In
          </Button>
        </Link>
        <AuthCardFooter>
          <p className="text-body-small text-secondary">
            Didn&apos;t receive an email?{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-link hover:text-link-hover font-medium transition-colors bg-transparent border-none cursor-pointer"
            >
              Try again
            </button>
          </p>
        </AuthCardFooter>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardHeader
        title="Forgot password?"
        description="Enter your email and we'll send you reset instructions"
        icon={<KeyRound className="h-8 w-8 text-primary" aria-hidden="true" />}
      />

      <AuthForm id={formId} onSubmit={handleSubmit}>
        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <Input
            id={`${formId}-email`}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormMessage />
        </FormField>

        <AuthFormActions>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Send Reset Instructions
          </Button>
        </AuthFormActions>
      </AuthForm>

      <AuthCardFooter>
        <p className="text-body-small text-secondary">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-link hover:text-link-hover font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </AuthCardFooter>
    </AuthCard>
  );
}
