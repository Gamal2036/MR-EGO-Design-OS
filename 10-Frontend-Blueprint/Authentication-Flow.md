# Authentication Flow

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Navigation-Flow.md](../06-UX-Architecture/Navigation-Flow.md)), DP-4 ([States/Unauthorized.md](../05-Application-Shell/States/Unauthorized.md))

---

## Purpose

Defines the authentication architecture — auth service, session management, token lifecycle, login/register/reset flows, OAuth integration, and permission model.

---

## Authentication Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 AUTHENTICATION SYSTEM                     │
├─────────────────────────────────────────────────────────┤
│  Auth Service                                            │
│  Login, register, logout, refresh, password reset        │
├─────────────────────────────────────────────────────────┤
│  Session Manager                                         │
│  Token storage, expiry detection, auto-refresh           │
├─────────────────────────────────────────────────────────┤
│  Permission Engine                                       │
│  Role-based, feature-based, resource-level checks        │
├─────────────────────────────────────────────────────────┤
│  Auth Provider                                           │
│  Context provider, hooks, guards                         │
└─────────────────────────────────────────────────────────┘
```

---

## Auth Service

```typescript
// Pseudocode
interface AuthService {
  // Authentication
  login(credentials: Credentials): Promise<Session>;
  register(data: RegistrationData): Promise<Session>;
  logout(): Promise<void>;
  
  // Session
  getSession(): Session | null;
  refreshSession(): Promise<Session>;
  isAuthenticated(): boolean;
  
  // Password
  requestPasswordReset(email: string): Promise<void>;
  confirmPasswordReset(token: string, password: string): Promise<void>;
  
  // OAuth
  loginWithOAuth(provider: OAuthProvider): Promise<Session>;
  linkOAuthAccount(provider: OAuthProvider): Promise<void>;
  
  // MFA (future)
  setupMFA(): Promise<MFASetup>;
  verifyMFA(code: string): Promise<boolean>;
  
  // Events
  onSessionExpired: Event<void>;
  onAuthenticated: Event<Session>;
  onLoggedOut: Event<void>;
}
```

---

## Session Management

### Token Lifecycle

```
Login successful
     ↓
Access token (15 min) + Refresh token (7 days) received
     ↓
Access token stored in memory (not localStorage)
     ↓
Refresh token stored in httpOnly cookie (or localStorage as fallback)
     ↓
Every API request includes access token
     ↓
On 401 response:
  ↓
Attempt refresh:
  ├── Success → Retry original request with new token
  └── Failure → Logout + redirect to login
```

### Session State

```typescript
// Pseudocode
interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  permissions: Permission[];
  roles: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  preferences: UserPreferences;
}

enum AuthState {
  Loading,         // Initialising, checking stored session
  Authenticated,   // Valid session
  Unauthenticated, // No session
  Expired,         // Session expired, attempting refresh
  Error,           // Auth error
}
```

---

## Auth Flow

### Login Flow

```
User visits /login
     ↓
Enter email + password
     ↓
Submit to AuthService.login()
     ↓
┌──────────────┐      ┌───────────────────┐
│ SUCCESS      │      │ FAILURE            │
│ Session      │      │ Show error         │
│ created      │      │ "Invalid email or  │
│ Redirect to  │      │  password"         │
│ dashboard    │      │                    │
│ (or return   │      │ Max 5 attempts →   │
│  URL)        │      │ rate limit message │
└──────────────┘      └───────────────────┘
```

### Register Flow

```
User visits /register
     ↓
Enter name, email, password
     ↓
Password strength validation (client + server)
     ↓
Submit to AuthService.register()
     ↓
┌──────────────┐      ┌───────────────────┐
│ SUCCESS      │      │ FAILURE            │
│ Session      │      │ Show validation    │
│ created      │      │ errors             │
│ Redirect to  │      │ "Email already     │
│ /onboarding  │      │  registered"       │
└──────────────┘      └───────────────────┘
```

### Password Reset Flow

```
User clicks "Forgot Password"
     ↓
Enter email → Submit
     ↓
"Check your email" message (always — prevents enumeration)
     ↓
Email sent with reset link (expires 1 hour)
     ↓
User clicks link → /reset-password/:token
     ↓
Enter new password (2x, with strength meter)
     ↓
Submit → Password updated → Redirect to login
```

---

## Permission Model

```typescript
// Pseudocode
enum Role {
  Free,          // Free tier
  Pro,           // Premium subscriber
  Enterprise,    // Enterprise customer
  Admin,         // System administrator
}

enum Permission {
  ViewDashboard,
  ViewJobs,
  ApplyToJobs,
  ManageCV,
  UseAI,
  ViewAnalytics,
  ManageSettings,
  ManageTeam,
  ExportData,
  AdminAccess,
}

interface PermissionCheck {
  permission: Permission;
  resource?: string;        // Resource ID for resource-level checks
  action?: 'read' | 'write' | 'delete' | 'admin';
}

function hasPermission(check: PermissionCheck): boolean {
  // Check role-based permissions
  // Check feature-based permissions
  // Check resource-level permissions
  // Return boolean
}
```

---

## Auth Guards

```typescript
// Pseudocode
// Route guard
function requireAuth(route: RouteDefinition): GuardResult {
  if (authState === AuthState.Loading) return { redirect: null, loading: true };
  if (authState === AuthState.Unauthenticated) {
    return { redirect: '/login?return=' + route.path };
  }
  if (authState === AuthState.Expired) {
    // Attempt refresh, then evaluate
  }
  return { redirect: null, loading: false };
}

// Permission guard
function requirePermission(permission: Permission): GuardResult {
  if (!hasPermission(permission)) {
    return { redirect: '/unauthorized' };
  }
  return { redirect: null };
}
```

---

## Session Persistence

| Data | Storage | Security |
|------|---------|----------|
| Access token | Memory | Not accessible via JS |
| Refresh token | httpOnly cookie | Not accessible via JS |
| User info | In-memory store | Not persisted |
| Preferences | localStorage | Non-sensitive only |
| Remember me | localStorage flag | Boolean only |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Settings-Architecture.md](Settings-Architecture.md) | Security settings integration |
| [Profile-System.md](Profile-System.md) | User profile from session data |
| [State-Management.md](State-Management.md) | Auth state slice |

---

## Validation Notes

1. Access tokens are never stored in localStorage or sessionStorage — memory only.
2. Password reset tokens expire after 1 hour — single use only.
3. Rate limiting prevents brute force attacks (5 attempts, then 60s cooldown).
4. "Check your email" message prevents email enumeration on password reset.
5. Session auto-refresh is silent — users are never interrupted mid-task.
