"use client";

import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ErrorSummary } from "@/components/auth/error-summary";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { PasswordVisibilityToggle } from "@/components/auth/password-visibility-toggle";
import { SocialLogin } from "@/components/auth/social-login";
import { StrengthIndicator } from "@/components/auth/strength-indicator";
import type { StrengthLevel } from "@/components/auth/strength-indicator";
import { Checkbox } from "@/components/forms/checkbox";
import {
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { useAuthStore } from "@/stores/auth-store";

function getPasswordStrength(password: string): StrengthLevel {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4) as StrengthLevel;
}

function getPasswordRequirements(password: string) {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase and lowercase letters", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
}

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const strength = getPasswordStrength(password);
  const requirements = getPasswordRequirements(password);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors([]);
      if (password !== confirmPassword) {
        setErrors(["Passwords do not match"]);
        return;
      }
      if (!terms) {
        setErrors(["You must agree to the Terms of Service and Privacy Policy"]);
        return;
      }
      setLoading(true);
      const result = register({ username, email, password });
      setLoading(false);
      if (result.success) {
        router.push("/onboarding");
      } else {
        setErrors(result.error ? [result.error] : []);
      }
    },
    [username, email, password, confirmPassword, terms, register, router]
  );

  return (
    <AuthCard>
      <AuthCardHeader
        title="Create your account"
        description="Join MR:EGO and take control of your career"
        icon={<UserPlus className="h-8 w-8 text-primary" aria-hidden="true" />}
      />

      <ErrorSummary errors={errors} className="mb-5" />

      <AuthForm id={formId} onSubmit={handleSubmit}>
        <FormField name="username">
          <FormLabel>Username</FormLabel>
          <Input
            id={`${formId}-username`}
            type="text"
            placeholder="johndoe"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FormMessage />
        </FormField>

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

        <FormField name="password">
          <FormLabel>Password</FormLabel>
          <div className="relative">
            <Input
              id={`${formId}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <PasswordVisibilityToggle
              visible={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <StrengthIndicator level={strength} className="mt-2" />
          {password.length > 0 && (
            <PasswordRequirements requirements={requirements} className="mt-2" />
          )}
          <FormMessage />
        </FormField>

        <FormField name="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <div className="relative">
            <Input
              id={`${formId}-confirm-password`}
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <PasswordVisibilityToggle
              visible={showConfirm}
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>
          <FormMessage />
        </FormField>

        <div className="pt-1">
          <Checkbox
            id={`${formId}-terms`}
            label="I agree to the Terms of Service and Privacy Policy"
            checked={terms}
            onCheckedChange={(checked) => setTerms(Boolean(checked))}
          />
        </div>

        <AuthFormActions>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Create Account
          </Button>
        </AuthFormActions>
      </AuthForm>

      <SocialLogin label="Or sign up with" />

      <AuthCardFooter>
        <p className="text-body-small text-secondary">
          Already have an account?{" "}
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
