# Performance Targets

## Bundle Budgets

| Metric | Target | Stretch | Measurement |
|--------|--------|---------|-------------|
| Total JS (gzipped) | <400KB | <300KB | Webpack/Vite bundle analyzer |
| Initial JS (gzipped) | <150KB | <120KB | First load entry point |
| Per module JS (gzipped) | <50KB | <35KB | Each lazy-loaded module |
| CSS (gzipped) | <30KB | <20KB | All themes combined |
| Total assets (gzipped) | <800KB | <600KB | JS + CSS + fonts + critical images |
| Fonts (preloaded) | <40KB | <25KB | Inter typeface (subset) |
| Icons (SVG sprite) | <20KB | <10KB | All icons tree-shaken |

## Runtime Performance

| Metric | Target | Stretch | Measurement |
|--------|--------|---------|-------------|
| First Contentful Paint (FCP) | <1.5s | <1.0s | Lighthouse |
| Largest Contentful Paint (LCP) | <2.5s | <1.8s | Lighthouse |
| Time to Interactive (TTI) | <3.5s | <2.5s | Lighthouse |
| Interaction to Next Paint (INP) | <200ms | <100ms | Chrome UX Report |
| Cumulative Layout Shift (CLS) | <0.1 | <0.05 | Lighthouse |
| First Input Delay (FID) | <100ms | <50ms | Chrome UX Report |
| Speed Index | <3.0s | <2.0s | Lighthouse |
| Total Blocking Time (TBT) | <200ms | <100ms | Lighthouse |

## Lighthouse Targets

| Category | Target | Stretch |
|----------|--------|---------|
| Performance | >=90 | >=95 |
| Accessibility | >=95 | >=100 |
| Best Practices | >=95 | >=100 |
| SEO (public pages) | >=95 | >=100 |
| PWA | >=90 | >=95 |

## Rendering Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Frame rate (animations) | 60fps | DevTools Performance tab |
| Frame rate (scrolling) | 60fps | DevTools Performance tab |
| Style recalculation | <5ms | DevTools Performance tab |
| Layout thrashing | 0 occurrences | Layout thrashing audit |
| Memory usage (idle) | <50MB | Chrome Task Manager |
| Memory usage (active) | <120MB | Chrome Task Manager |
| DOM nodes | <1500 | DevTools |
| Event listeners | <200 | DevTools |

## Loading Performance

| Metric | Strategy | Target |
|--------|----------|--------|
| Code splitting | Route-based + module-based | All pages lazy loaded |
| Image loading | Lazy loading (IntersectionObserver) | Below-fold images deferred |
| Font loading | `font-display: swap` | No invisible text |
| Preloading | Critical fonts, shell chunk | <link rel="preload"> |
| Prefetching | Dashboard after shell load | `<link rel="prefetch">` |
| Caching | In-memory cache, localStorage | No duplicate network requests |
| API response | Cache-first strategy | <200ms cache hit |
| Bundle optimization | Tree-shaking, code splitting | No dead code in production |

## Network Performance

| Metric | Target | Strategy |
|--------|--------|----------|
| API response time | <200ms p50, <500ms p95 | CDN, caching, edge functions |
| Concurrent requests | Max 6 per domain | HTTP/2 multiplexing |
| API payload size | <50KB per response | Field selection, pagination |
| Retry strategy | 3 retries with exponential backoff | API client interceptor |
| Offline support | Core UI, cached data | Service worker (DP-32) |

## Performance Monitoring

**Phase DP-32:**
- Lighthouse CI for every PR
- Web Vitals tracking (via `web-vitals` library)
- Real User Monitoring (RUM) data collection
- Performance budgets enforced in CI
- Bundle size regression alerts
- Custom Performance Observer marks for critical interactions

## Performance Optimization Order (DP-31)

1. Bundle size reduction (analyze, tree-shake, code-split)
2. Image optimization (lazy loading, WebP, responsive sizes)
3. Font optimization (subsetting, preloading)
4. Runtime optimization (memoization, virtualization for long lists)
5. Animation optimization (GPU-composited properties)
6. Network optimization (caching headers, CDN configuration)
7. Memory optimization (cleanup intervals, detached DOM)
8. Third-party script audit and deferral
