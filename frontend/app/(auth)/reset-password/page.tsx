"use client";

import { Lock } from "lucide-react";
import { useCallback, useId, useState } from "react";

import {
  AuthCard,
  AuthCardHeader,
} from "@/components/auth/auth-card";
import {
  AuthForm,
  AuthFormActions,
} from "@/components/auth/auth-form";
import { ErrorSummary } from "@/components/auth/error-summary";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { PasswordVisibilityToggle } from "@/components/auth/password-visibility-toggle";
import { StrengthIndicator } from "@/components/auth/strength-indicator";
import type { StrengthLevel } from "@/components/auth/strength-indicator";
import {
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";

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

export default function ResetPasswordPage() {
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    },
    [password, confirmPassword]
  );

  return (
    <AuthCard>
      <AuthCardHeader
        title="Reset your password"
        description="Enter your new password below"
        icon={<Lock className="h-8 w-8 text-primary" aria-hidden="true" />}
      />

      <ErrorSummary errors={errors} className="mb-5" />

      <AuthForm id={formId} onSubmit={handleSubmit}>
        <FormField name="password">
          <FormLabel>New Password</FormLabel>
          <div className="relative">
            <Input
              id={`${formId}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
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
          <FormLabel>Confirm New Password</FormLabel>
          <div className="relative">
            <Input
              id={`${formId}-confirm-password`}
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat new password"
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

        <AuthFormActions>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Reset Password
          </Button>
        </AuthFormActions>
      </AuthForm>
    </AuthCard>
  );
}
