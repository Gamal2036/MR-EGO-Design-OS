"use client";

import { LogIn } from "lucide-react";
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
import { PasswordVisibilityToggle } from "@/components/auth/password-visibility-toggle";
import { RememberMe } from "@/components/auth/remember-me";
import { SocialLogin } from "@/components/auth/social-login";
import {
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/foundation/button";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors([]);
      setLoading(true);
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrors(result.error ? [result.error] : []);
      }
    },
    [email, password, login, router]
  );

  return (
    <AuthCard>
      <AuthCardHeader
        title="Welcome back"
        description="Sign in to your account to continue"
        icon={<LogIn className="h-8 w-8 text-primary" aria-hidden="true" />}
      />

      <ErrorSummary errors={errors} className="mb-5" />

      <AuthForm id={formId} onSubmit={handleSubmit}>
        <FormField name="email" hasError={errors.includes('Invalid email or password')}>
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

        <FormField name="password" hasError={false}>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            <Link
              href="/forgot-password"
              className="text-caption text-link hover:text-link-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id={`${formId}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordVisibilityToggle
              visible={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <FormMessage />
        </FormField>

        <RememberMe
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
        />

        <AuthFormActions>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Sign In
          </Button>
        </AuthFormActions>
      </AuthForm>

      <SocialLogin />

      <AuthCardFooter>
        <p className="text-body-small text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-link hover:text-link-hover font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </AuthCardFooter>
    </AuthCard>
  );
}
