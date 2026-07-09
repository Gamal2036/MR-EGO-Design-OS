# Animation Implementation

## Architecture

Per DP-8 Interaction-Motion-DP8-Report.md and DP-1 Motion-System.md, animations are implemented using a system of duration tokens, easing curves, and animation primitives.

## Animation Token System

### Duration Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--mr-animation-duration-instant` | 0ms | Visual feedback, state changes |
| `--mr-animation-duration-fast` | 150ms | Micro-interactions, button feedback |
| `--mr-animation-duration-normal` | 300ms | Standard transitions, panel opens |
| `--mr-animation-duration-slow` | 500ms | Page transitions, emphasis |
| `--mr-animation-duration-glacial` | 1000ms | Ambient animations, backgrounds |

### Easing Curves

| Token | Value | Use Case |
|-------|-------|----------|
| `--mr-animation-easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Standard motion |
| `--mr-animation-easing-decelerate` | cubic-bezier(0.0, 0, 0.2, 1) | Enter animations |
| `--mr-animation-easing-accelerate` | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| `--mr-animation-easing-sharp` | cubic-bezier(0.4, 0, 0.6, 1) | Quick feedback |

## Animation Categories

### 1. Micro-Interactions (DP-8)

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Button hover | Background color, elevation change | 150ms | Standard |
| Button active | Scale 0.97 | 100ms | Accelerate |
| Card hover | Elevation increase | 300ms | Standard |
| Link hover | Underline slide-in | 200ms | Decelerate |
| Focus ring | Ring opacity | 150ms | Standard |
| Switch toggle | Thumb slide, background | 200ms | Decelerate |

### 2. Feedback Animations (DP-8)

| Feedback | Animation | Duration | Easing |
|----------|-----------|----------|--------|
| Toast enter | Slide down + fade in | 300ms | Decelerate |
| Toast exit | Slide up + fade out | 200ms | Accelerate |
| Modal open | Scale + fade in (backdrop) | 300ms | Decelerate |
| Modal close | Scale + fade out | 200ms | Accelerate |
| Skeleton | Shimmer sweep | 1500ms | Linear |
| Progress | Width transition | 300ms | Standard |

### 3. Navigation Animations (DP-8)

| Navigation | Animation | Duration | Easing |
|------------|-----------|----------|--------|
| Page transition | Fade + subtle slide | 300ms | Standard |
| Sidebar expand | Width transition | 300ms | Decelerate |
| Tab switch | Content cross-fade | 200ms | Standard |
| Breadcrumb | Breadcrumb fade-in | 200ms | Standard |
| Command palette | Scale + fade overlay | 200ms | Decelerate |

### 4. AI-Specific Animations (DP-8)

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Streaming text | Character reveal | Real-time | - |
| AI thinking | Pulsing indicator | 1000ms | Ease-in-out |
| Confidence badge | Color transition | 500ms | Standard |
| Memory indicator | Gentle pulse | 2000ms | Ease-in-out |

### 5. Loading Animations (DP-8)

| State | Animation | Duration |
|-------|-----------|----------|
| Page load | Content skeleton shimmer | Until loaded |
| Action loading | Button spinner rotation | Until complete |
| AI processing | Thinking indicator pulse | Until response |
| File upload | Progress bar animation | Real-time |

## Implementation Approach

- CSS transitions and animations for 90% of motion
- WAAPI (Web Animations API) for complex sequences
- Framer Motion or similar library for gesture-driven animations (DP-18 AI streaming, DP-23 wizard transitions)
- `prefers-reduced-motion` respected globally — animations reduced to cross-fades
- GPU-accelerated properties only: `transform`, `opacity`, `filter`

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-13 | Define animation duration and easing tokens |
| 2 | DP-14 | Implement micro-interaction base styles |
| 3 | DP-14 | Build feedback animation system (toast, modal, skeleton) |
| 4 | DP-14 | Implement page transition wrapper |
| 5 | DP-15 | Add form validation animations (shake, highlight) |
| 6 | DP-16 | Add landing page entrance animations |
| 7 | DP-17 | Add dashboard card animation choreography |
| 8 | DP-18 | Implement AI streaming and thinking animations |
| 9 | DP-23 | Add wizard step transition animations |
| 10 | DP-31 | Performance audit — ensure 60fps, respect reduced motion |
