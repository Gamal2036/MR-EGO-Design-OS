# Deployment Preparation

## Environment Strategy

| Environment | Purpose | URL | Deployment Trigger |
|-------------|---------|-----|-------------------|
| Development | Local development | `localhost:5173` | Manual |
| Review/Preview | Per-PR preview | `pr-{number}.mr-ego.preview.app` | PR creation |
| Staging | Integration testing | `staging.mr-ego.app` | Merge to main |
| Production | Live application | `app.mr-ego.com` | Release tag |

## CI/CD Pipeline

### Commit Stage (every push)

```
lint → typecheck → build → test(unit+integration) → bundle-size → lighthouse
```

### PR Stage (on PR open/sync)

```
commit-stage → preview-deploy → visual-regression → e2e-smoke → a11y-scan
```

### Staging Deploy (merge to main)

```
pr-stage → staging-deploy → full-e2e → perf-test → security-scan
```

### Production Deploy (release tag)

```
staging-deploy → approval-gate → production-deploy → smoke-test → monitoring-check
```

## Build Configuration

### Production Build

- **Command:** `npm run build:production`
- **Output:** `apps/web/dist/` (static files for CDN)
- **Features:**
  - Code splitting (route-based, module-based)
  - CSS minification (via PostCSS + cssnano)
  - JS minification (via esbuild/terser)
  - Tree shaking (dead code elimination)
  - Source maps (production: hidden, error-tracking only)
  - Asset hashing (content-based for cache busting)
  - Gzip + Brotli compression (CDN level)
  - Environment variable injection (build-time)

### Build Variables

| Variable | Source | Purpose |
|----------|--------|---------|
| `VITE_API_URL` | Env | API endpoint base URL |
| `VITE_AI_API_URL` | Env | AI service endpoint |
| `VITE_WS_URL` | Env | WebSocket endpoint |
| `VITE_SENTRY_DSN` | Env | Error tracking |
| `VITE_GA_ID` | Env | Analytics tracking ID |
| `VITE_ENV` | CI | Environment name |
| `VITE_VERSION` | CI | Build version (git hash) |

## CDN Configuration

- **Provider:** Cloudflare, Vercel, or AWS CloudFront
- **Cache policy:**
  - Static assets: 1 year (`immutable`)
  - HTML: `no-cache` (always validate)
  - API responses: vary by endpoint
- **Edge functions:** None initially (future: API gateway)
- **Custom domain:** `app.mr-ego.com` with automated SSL (Let's Encrypt)
- **DDoS protection:** CDN-level WAF

## Error Tracking

**Provider:** Sentry

**Configuration:**
- Source maps uploaded for production debugging
- Error grouping by component/route
- User context attached (anonymous ID, not PII)
- Breadcrumbs for user actions
- Performance tracing for slow interactions
- Release tracking for error-to-commit mapping
- Alerts for error spikes (>10% increase)

## Monitoring

### Frontend Monitoring

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| LCP | web-vitals | >2.5s p75 |
| CLS | web-vitals | >0.1 p75 |
| INP | web-vitals | >200ms p75 |
| JS errors | Sentry | >1% of sessions |
| API error rate | Sentry/custom | >5% of requests |
| Bundle size | CI | >budget threshold |
| Uptime | Status page | <99.9% |

### Logging

- Client-side logs sent to Sentry (errors only, no debug in production)
- API request/response logging (server-side)
- AI interaction audit log (server-side)
- Authentication events logged (login, logout, failed attempts)

## Rollback Strategy

| Scenario | Rollback Action | Recovery Time |
|----------|----------------|---------------|
| Failed deploy | Revert to previous CDN release | <5 min |
| Performance regression | Revert + alert + profile | <15 min |
| Security vulnerability | Revert + incident response | <30 min |
| Data corruption | Revert + restore from backup | <60 min |
| Breaking API change | Revert frontend + coordinate API rollback | <30 min |

### Rollback Process

1. Revert git commit or restore previous build artifact
2. Deploy previous version to CDN
3. Verify smoke tests pass
4. Notify stakeholders
5. Root cause analysis within 24h

## Production Readiness Checklist (DP-32)

| Item | Status |
|------|--------|
| Production build configuration complete | |
| CI/CD pipeline fully operational | |
| CDN configured with caching policies | |
| SSL/TLS certificates installed and auto-renewing | |
| Custom domain configured | |
| Environment variables injected correctly | |
| Error tracking (Sentry) configured | |
| Performance monitoring instrumented | |
| Analytics tracking (if applicable) configured | |
| CSP headers configured and tested | |
| Security headers verified | |
| Backup and rollback procedures documented | |
| Runbook created for on-call engineers | |
| Load testing completed | |
| Security scan passed | |
| Accessibility audit passed (WCAG 2.2 AA) | |
| Lighthouse scores confirmed >=90 | |
| All E2E tests passing | |
| Visual regression 0 differences | |
| A/B testing infrastructure (if needed) | |

## Post-Deployment Monitoring

- **First hour:** Active monitoring by engineering team
- **First day:** Track error rates, performance metrics, user feedback
- **First week:** Review logs, optimize slow interactions, triage issues
- **First month:** Performance baseline established, iterate on improvements
