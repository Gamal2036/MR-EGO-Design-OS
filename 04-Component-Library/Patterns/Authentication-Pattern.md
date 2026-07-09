# Authentication-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Product-Constitution.md](../../01-Constitution/Product-Constitution.md)), DP-2 ([Architecture.md](../../03-Design-System/Architecture.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the login, registration, and password reset flows for user authentication. Provides consistent form layouts, validation patterns, error handling, loading states, and social login integration across all auth entry points.

---

## Composition

```
AuthPage (Container)
├── AuthLayout (centered card layout)
│   ├── AuthBranding
│   │   ├── Logo
│   │   ├── AppName ("MR:EGO")
│   │   └── Tagline (optional)
│   └── AuthCard
│       ├── Card
│       │   ├── Card.Header
│       │   │   ├── AuthTitle ("Sign in" / "Create account" / "Reset password")
│       │   │   └── AuthSubtitle (contextual description)
│       │   ├── Card.Body
│       │   │   ├── [LoginForm]
│       │   │   │   ├── FormGroup (email)
│       │   │   │   │   ├── Input (type="email")
│       │   │   │   │   └── Validation
│       │   │   │   ├── FormGroup (password)
│       │   │   │   │   ├── Password (with visibility toggle)
│       │   │   │   │   └── Validation
│       │   │   │   ├── FormGroup (remember me)
│       │   │   │   │   └── Checkbox ("Remember me")
│       │   │   │   ├── SubmitButton ("Sign in", full-width, primary)
│       │   │   │   └── ForgotPasswordLink ("Forgot password?")
│       │   │   ├── [RegisterForm]
│       │   │   │   ├── FormGroup (full name)
│       │   │   │   │   ├── Input (type="text")
│       │   │   │   │   └── Validation
│       │   │   │   ├── FormGroup (email)
│       │   │   │   │   ├── Input (type="email")
│       │   │   │   │   └── Validation
│       │   │   │   ├── FormGroup (password)
│       │   │   │   │   ├── Password (with strength indicator)
│       │   │   │   │   └── Validation
│       │   │   │   ├── FormGroup (confirm password)
│       │   │   │   │   ├── Password
│       │   │   │   │   └── Validation (match check)
│       │   │   │   ├── FormGroup (terms)
│       │   │   │   │   └── Checkbox ("I agree to Terms of Service")
│       │   │   │   └── SubmitButton ("Create account", full-width, primary)
│       │   │   ├── [PasswordResetForm]
│       │   │   │   ├── [RequestStep]
│       │   │   │   │   ├── FormGroup (email)
│       │   │   │   │   │   ├── Input (type="email")
│       │   │   │   │   │   └── Validation
│       │   │   │   │   └── SubmitButton ("Send reset link", full-width, primary)
│       │   │   │   └── [ResetStep]
│       │   │   │       ├── FormGroup (new password)
│       │   │   │       │   ├── Password (with strength indicator)
│       │   │   │       │   └── Validation
│       │   │   │       ├── FormGroup (confirm password)
│       │   │   │       │   ├── Password
│       │   │   │       │   └── Validation (match check)
│       │   │   │       └── SubmitButton ("Reset password", full-width, primary)
│       │   │   └── [SocialLoginSection]
│       │   │       ├── Divider ("or continue with")
│       │   │       ├── SocialLoginButton (Google)
│       │   │       │   ├── SocialIcon (Google logo)
│       │   │       │   └── Label ("Continue with Google")
│       │   │       ├── SocialLoginButton (GitHub)
│       │   │       │   ├── SocialIcon (GitHub logo)
│       │   │       │   └── Label ("Continue with GitHub")
│       │   │       ├── SocialLoginButton (LinkedIn)
│       │   │       │   ├── SocialIcon (LinkedIn logo)
│       │   │       │   └── Label ("Continue with LinkedIn")
│       │   │       └── EnterpriseSSOButton ("Continue with SSO")
│       │   └── Card.Footer
│       │           ├── AuthSwitchLink ("Don't have an account? Sign up" / "Already have an account? Sign in")
│       │           └── BackToSignInLink ("Back to sign in") [password reset only]
│       └── AuthLegal
│           ├── PrivacyPolicyLink
│           └── TermsOfServiceLink
└── AuthErrorBoundary (global error handler)
    └── ErrorState (server error, network error)
```

---

## When to Use

- Login page for existing users
- Registration/sign-up page for new users
- Password reset flow (request + reset)
- Social login / OAuth integration
- Enterprise SSO login

## When NOT to Use

- User settings within app (use Settings-Pattern for password change)
- Admin impersonation (use admin-specific tools)
- API authentication (use token management)
- Multi-factor authentication setup (use security settings)

---

## Variants

### Login
| Aspect | Specification |
|--------|---------------|
| Fields | Email, Password, Remember Me |
| Actions | Sign In, Forgot Password |
| Social | Google, GitHub, LinkedIn, SSO |
| Footer | "Don't have an account? Sign up" |
| Validation | Email format, password not empty |

### Registration
| Aspect | Specification |
|--------|---------------|
| Fields | Full Name, Email, Password, Confirm Password, Terms |
| Password | Strength indicator required; minimum 8 characters |
| Actions | Create Account |
| Social | Google, GitHub, LinkedIn |
| Footer | "Already have an account? Sign in" |
| Validation | Email format, password match, password strength, terms required |

### Password Reset (Request)
| Aspect | Specification |
|--------|---------------|
| Fields | Email |
| Actions | Send Reset Link |
| Success | "Check your email for reset link" message |
| Footer | "Back to sign in" |

### Password Reset (Set New)
| Aspect | Specification |
|--------|---------------|
| Fields | New Password, Confirm Password |
| Token | URL token validated on page load (hidden) |
| Actions | Reset Password |
| Success | "Password reset successfully. Sign in with new password." |
| Footer | "Back to sign in" |

### Social Login / SSO
| Aspect | Specification |
|--------|---------------|
| Buttons | Provider-specific buttons with brand icons |
| Loading | Provider loading state on click |
| Error | Provider-specific error handling |
| New user | Social registration auto-fills name and email from provider |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Idle** | Form ready for input | All fields interactive |
| **Typing** | Field focus indicators; inline validation as user types (after first blur) | Validation on blur, not on every keystroke |
| **Submitting** | SubmitButton shows spinner; all inputs disabled; social buttons disabled | Credentials being verified |
| **Error (invalid credentials)** | ErrorState above form: "Invalid email or password"; input fields retain values | User can correct and retry |
| **Error (validation)** | Inline error messages per field (red text, icons); `aria-invalid` on errored fields | Field-level validation feedback |
| **Error (network)** | ErrorState with retry button: "Network error. Please try again." | Retry or check connection |
| **Error (rate limit)** | "Too many attempts. Please try again in N minutes." | Rate-limited feedback |
| **Success (login)** | Redirect to dashboard/main page | Smooth transition |
| **Success (register)** | Auto-login or redirect to welcome/onboarding | Post-registration flow |
| **Success (reset request)** | "Check your email" message with icon; email field shown for reference | Awaiting email interaction |
| **Success (reset complete)** | Success message with "Sign in" button | Redirect to login |
| **Loading (token check)** | Skeleton card; "Verifying reset link..." | Validating reset token from URL |
| **Token invalid/expired** | ErrorState: "Reset link expired. Request a new one." with link | User can re-request |
| **Remember me** | Checkbox checked; session persists after browser close | Token stored in persistent cookie |
| **Social login loading** | Social button shows spinner; other buttons disabled | OAuth flow in progress |
| **Social login callback** | Processing OAuth callback; auto-login or account linking | Redirect handling |
| **SSO loading** | SSO button loading; redirecting to identity provider | SAML/OIDC flow |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Form role | `<form>` with `aria-label="Sign in form"` or appropriate label |
| Email field | `type="email"`, `autocomplete="email"`, `aria-required="true"` |
| Password field | `type="password"`, `autocomplete="current-password"` (login) / `new-password` (register/reset) |
| Remember me | `<input type="checkbox">` with visible label |
| Submit button | `aria-label="Sign in"` (login) / `aria-label="Create account"` (register) |
| Error messages | `role="alert"`, `aria-live="assertive"`, linked to input via `aria-describedby` |
| Global error | `role="alert"` on ErrorState above form |
| Forgot password link | `aria-label="Forgot password"` |
| Social buttons | `aria-label="Continue with {provider}"` |
| Password visibility | Toggle button `aria-label="Show password"` / `"Hide password"` |
| Strength indicator | `aria-live="polite"` for strength changes |
| Auth switch link | "Don't have an account?" / "Already have an account?" clearly labeled |
| Loading state | `aria-busy="true"` on form during submission |
| Focus management | On error, focus moves to first invalid field or global error message |
| Keyboard | Tab through fields; Enter submits form; Tab order: fields → submit → social → footer |
| Auto-complete | `autocomplete` attributes properly set for all fields |
| CAPTCHA (if present) | Accessible CAPTCHA with audio alternative |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Full-width AuthCard (no padding from viewport edges). Logo centered at top. Social buttons stacked. AuthCard has no border/shadow (full-bleed). Bottom spacing for keyboard. Password strength below field. |
| Tablet (768-1023px) | AuthCard centered (400px max width). Social buttons in a row (2 per row). Divider with "or" text. |
| Desktop (1024-1279px) | AuthCard centered (440px max width). Subtle shadow on card. Social buttons horizontal. Two-column layout possible for registration (name + email side by side). |
| Wide (1280-1599px) | AuthCard centered (480px max width). Comfortable padding. Branding area may show illustration beside card. |
| Ultra-wide (1600px+) | AuthCard centered (480px max width). Background decoration optional. Content never exceeds 480px. |

---

## Implementation Example

```typescript
<AuthPage>
  <AuthLayout>
    <AuthBranding>
      <Logo />
      <AppName>MR:EGO</AppName>
    </AuthBranding>
    <AuthCard>
      <Card>
        <Card.Header>
          <AuthTitle>{mode === 'login' ? 'Sign in' : 'Create account'}</AuthTitle>
          <AuthSubtitle>
            {mode === 'login' ? 'Welcome back to MR:EGO' : 'Start your journey with MR:EGO'}
          </AuthSubtitle>
        </Card.Header>
        <Card.Body>
          {authError && (
            <ErrorState message={authError} onRetry={clearError} />
          )}
          {mode === 'login' && (
            <LoginForm onSubmit={handleLogin}>
              <FormGroup label="Email" required hasError={!!errors.email} errorMessage={errors.email}>
                <Input type="email" value={email} onChange={setEmail} autoComplete="email" />
              </FormGroup>
              <FormGroup label="Password" required hasError={!!errors.password} errorMessage={errors.password}>
                <Password value={password} onChange={setPassword} autoComplete="current-password" />
              </FormGroup>
              <FormGroup>
                <Checkbox checked={remember} onChange={setRemember}>Remember me</Checkbox>
              </FormGroup>
              <Button type="submit" variant="primary" fullWidth isLoading={submitting}>
                Sign in
              </Button>
              <Link href="/forgot-password">Forgot password?</Link>
            </LoginForm>
          )}
          {mode === 'register' && (
            <RegisterForm onSubmit={handleRegister}>
              <FormGroup label="Full name" required hasError={!!errors.name} errorMessage={errors.name}>
                <Input value={name} onChange={setName} autoComplete="name" />
              </FormGroup>
              <FormGroup label="Email" required hasError={!!errors.email} errorMessage={errors.email}>
                <Input type="email" value={email} onChange={setEmail} autoComplete="email" />
              </FormGroup>
              <FormGroup label="Password" required hasError={!!errors.password} errorMessage={errors.password}>
                <Password value={password} onChange={setPassword} showStrength autoComplete="new-password" />
              </FormGroup>
              <FormGroup label="Confirm password" required hasError={!!errors.confirm} errorMessage={errors.confirm}>
                <Password value={confirm} onChange={setConfirm} autoComplete="new-password" />
              </FormGroup>
              <FormGroup hasError={!!errors.terms} errorMessage={errors.terms}>
                <Checkbox checked={terms} onChange={setTerms}>
                  I agree to the Terms of Service and Privacy Policy
                </Checkbox>
              </FormGroup>
              <Button type="submit" variant="primary" fullWidth isLoading={submitting}>
                Create account
              </Button>
            </RegisterForm>
          )}
          <Divider>or continue with</Divider>
          <SocialLoginSection>
            <SocialLoginButton provider="google" onClick={handleGoogleLogin} isLoading={socialLoading === 'google'} />
            <SocialLoginButton provider="github" onClick={handleGitHubLogin} isLoading={socialLoading === 'github'} />
            <SocialLoginButton provider="linkedin" onClick={handleLinkedInLogin} isLoading={socialLoading === 'linkedin'} />
          </SocialLoginSection>
          {showSSO && (
            <Button variant="outline" fullWidth onClick={handleSSOLogin}>Continue with Company SSO</Button>
          )}
        </Card.Body>
        <Card.Footer>
          {mode === 'login' ? (
            <AuthSwitchLink>Don't have an account? <Link href="/register">Sign up</Link></AuthSwitchLink>
          ) : (
            <AuthSwitchLink>Already have an account? <Link href="/login">Sign in</Link></AuthSwitchLink>
          )}
        </Card.Footer>
      </Card>
    </AuthCard>
  </AuthLayout>
</AuthPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Settings-Pattern.md](Settings-Pattern.md) | Password change, 2FA setup in security settings |
| [Profile-Pattern.md](Profile-Pattern.md) | User profile accessible only after authentication |
| [Future-Enterprise-Pattern.md](Future-Enterprise-Pattern.md) | Enterprise SSO integration, user provisioning |
| [CRUD-Pattern.md](CRUD-Pattern.md) | Admin user management (CRUD for users) |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Input](../Forms/Input.md) | Email, name text inputs |
| [Password](../Forms/Password.md) | Password fields with visibility toggle and strength |
| [Checkbox](../Forms/Checkbox.md) | Remember me, terms acceptance |
| [Button](../Core/Button.md) | Submit, social login, SSO buttons |
| [Card](../Core/Card.md) | Auth card container |
| [FormGroup](../Forms/FormGroup.md) | Field groups with labels and validation |
| [Validation](../Forms/Validation.md) | Field-level validation |
| [Divider](../Core/Divider.md) | Social login separator |
| [ErrorState](../Feedback/ErrorState.md) | Form-level errors |
| [LoadingState](../Feedback/LoadingState.md) | Submission loading |
| [Toast](../Feedback/Toast.md) | Success feedback |
| [Alert](../Feedback/Alert.md) | Inline alerts (rate limit, account locked) |

## Anti-patterns

1. **No CSRF protection** — All auth forms must include CSRF token.
2. **Showing which field is wrong** — Always use generic "Invalid email or password" to prevent credential enumeration.
3. **Password in plain text** — Never display password as plain text by default; always mask.
4. **No rate limiting** — Implement rate limiting on auth endpoints and show user-friendly rate limit messages.
5. **Session persistence without consent** — "Remember me" must be opt-in; default unchecked.
6. **No HTTPS** — Auth forms must only be served over HTTPS.
7. **Password in URLs** — Never include passwords in URL parameters (GET requests for auth are forbidden).
8. **No password confirmation on registration** — Always require password confirmation to catch typos.
9. **No strength indicator on registration** — Password strength must be shown during registration.
10. **Autocomplete disabled on password fields** — Keep `autocomplete` enabled for accessibility and password manager support.
11. **Social login without fallback** — Always provide email/password option alongside social login.
12. **No error state for expired reset tokens** — Validate token and show clear expiration error.
