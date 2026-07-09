# Security Checklist

## Authentication Security

| Item | Status | Phase |
|------|--------|-------|
| Password hashing (server-side, bcrypt/argon2) | Server responsibility | DP-15 |
| JWT tokens with short expiry (15 min access, 7 day refresh) | Implement | DP-15 |
| Token storage in localStorage (access) + Secure cookie (refresh) | Implement | DP-15 |
| Token refresh interceptor in API client | Implement | DP-15 |
| Logout invalidates all tokens | Implement | DP-15 |
| Rate limiting on login/register endpoints | Server responsibility | DP-15 |
| Account lockout after failed attempts | Server responsibility | DP-15 |
| Password strength validation (min 12 chars, mixed case, numbers, symbols) | Implement | DP-15 |
| Session timeout after inactivity (30 min) | Implement | DP-15 |
| Remember me functionality (extended session, opt-in) | Implement | DP-15 |

## Authorization

| Item | Status | Phase |
|------|--------|-------|
| Role-based access control (RBAC) | Implement | DP-15 |
| Permission guard on routes | Implement | DP-14 |
| API-level authorization (server validates) | Server responsibility | DP-15 |
| Feature flag enforcement | Implement | DP-14 |
| UI element visibility based on permissions | Implement | DP-15 |
| Admin-only routes and actions | Implement | DP-15 |

## Data Protection

| Item | Status | Phase |
|------|--------|-------|
| HTTPS enforced (server/network level) | Server responsibility | DP-32 |
| API payload validation (client + server) | Implement both | DP-14 |
| Input sanitization (prevent XSS in rendered content) | Implement | DP-14 |
| Content Security Policy (CSP) headers | Configure | DP-32 |
| `X-Content-Type-Options: nosniff` | Server responsibility | DP-32 |
| `X-Frame-Options: DENY` | Server responsibility | DP-32 |
| `Referrer-Policy: strict-origin-when-cross-origin` | Server responsibility | DP-32 |
| Permissions-Policy (restrict camera, mic, geolocation) | Configure | DP-32 |
| SRI (Subresource Integrity) for external scripts | Implement | DP-32 |
| No sensitive data in URL params | Implement | DP-14 |
| PII masking in UI (partial email/phone display) | Implement | DP-28 |

## Frontend Security

| Item | Status | Phase |
|------|--------|-------|
| CSP enforced (prevent inline scripts, restrict sources) | Configure | DP-32 |
| XSS prevention: React auto-escaping + CSP | Built-in (React) + CSP | DP-12 |
| CSRF tokens on state-changing requests | Server responsibility | DP-15 |
| `SameSite=Strict` or `SameSite=Lax` cookies | Server responsibility | DP-15 |
| Secure flag on all cookies | Server responsibility | DP-15 |
| Clickjacking protection (X-Frame-Options + CSP frame-ancestors) | Configure | DP-32 |
| Open redirect prevention | Implement | DP-15 |
| Safe URL handling (no `javascript:` URLs) | Implement | DP-14 |
| Trusted types enforcement | Configure | DP-31 |
| Subresource integrity checks | Implement | DP-32 |

## API Security

| Item | Status | Phase |
|------|--------|-------|
| API token in Authorization header (Bearer) | Implement | DP-14 |
| Token validation on every request (server) | Server responsibility | DP-14 |
| Rate limiting per user/token | Server responsibility | DP-14 |
| Request/response size limits | Implement client | DP-14 |
| API error messages: no stack traces or internal details | Implement | DP-14 |
| GraphQL depth limiting | Server responsibility | DP-14 |
| Input validation on all API calls | Implement | DP-14 |

## File Upload Security

| Item | Status | Phase |
|------|--------|-------|
| File type validation (allowlist: PDF, DOCX, PNG, JPG) | Implement | DP-27 |
| File size limits (10MB max per file) | Implement | DP-27 |
| Virus scanning (server-side) | Server responsibility | DP-27 |
| Upload progress reporting (safe, no path disclosure) | Implement | DP-27 |
| Secure file storage (server, not client-accessible directly) | Server responsibility | DP-27 |

## AI Integration Security

| Item | Status | Phase |
|------|--------|-------|
| AI prompt sanitization (prevent injection) | Implement | DP-18 |
| No PII in AI prompts (strip before sending) | Implement | DP-18 |
| AI response sanitization (prevent XSS in markdown) | Implement | DP-18 |
| Rate limiting on AI endpoints | Server responsibility | DP-18 |
| User confirmation for AI actions (apply, delete, submit) | Implement | DP-18 |
| AI usage tracking and auditing | Implement | DP-18 |

## Dependency Security

| Item | Status | Phase |
|------|--------|-------|
| npm audit in CI pipeline | Configure | DP-12 |
| Dependabot/Renovate for automated updates | Configure | DP-12 |
| Lockfile verification | Configure | DP-12 |
| Regular dependency audit (monthly) | Configure | DP-12 |
| Minimal dependency policy (audit each addition) | Process | DP-12 |

## Security Testing

| Test | Frequency | Phase |
|------|-----------|-------|
| npm audit | Every commit | DP-12 |
| Dependency vulnerability scan | Weekly | DP-12 |
| Manual security review | DP-15 (Auth), DP-32 (Full) | DP-15, DP-32 |
| OWASP Top 10 review | DP-31 | DP-31 |
| Penetration testing | Before production | DP-32 |
| CSP evaluation | DP-32 | DP-32 |
| Session management review | DP-15, DP-32 | DP-15, DP-32 |
