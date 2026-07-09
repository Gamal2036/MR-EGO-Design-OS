# MR.EGO MASTER PRODUCT REQUIREMENTS DOCUMENT

## Document Information
- Product Name: MR.EGO
- Document Type: Master Product Requirements Document
- Version: 1.0
- Stage: After DP-39 / Pre-Backend
- Status: Current-State Specification
- Scope: Frontend implementation as present in the repository
- Baseline Date: 2026-07-09
- Intended Audience: TestSprite, QA Engineers, Backend Development, AI Development, API Design, Future Contributors, Investors, Technical Documentation

This document describes the real platform that exists in the current repository after DP-39. It is grounded in the implemented frontend, route structure, shared shell, design-system components, stores, types, and feature pages present in the workspace. Where a capability is represented as a UI shell, mock data, or a staged experience rather than a production-integrated feature, that distinction is explicitly noted.

---

# 1 Executive Summary

## 1.1 Vision
MR.EGO is a professional growth platform designed to unify career development, applicant tracking, AI-assisted productivity, learning, interviews, analytics, and communications into a single experience. The current implementation presents this vision as a polished, enterprise-style dashboard product with a strong emphasis on career readiness, AI-assisted guidance, and role-based professional planning.

## 1.2 Mission
The mission of the current product is to provide a cohesive workspace where users can:
- present a professional profile and career narrative,
- manage applications and career progress,
- access AI-guided recommendations and planning,
- prepare for interviews and skill development,
- monitor progress through dashboards and analytics.

## 1.3 Target Users
The current product is aimed at users who are actively managing professional growth. The primary user segments represented by the implementation are:
- Students exploring career paths and education plans.
- Junior developers building experience and preparing for interviews.
- IT support and operations professionals seeking structured career progression.
- Cybersecurity beginners and early-career practitioners building foundations.
- Career changers who need a guided roadmap and planning environment.
- Recruiters and hiring-oriented professionals who need a structured view of talent readiness and application progress.
- Job seekers who want to organize applications, improve CV quality, and receive guidance.

## 1.4 Problems Solved
The current implementation addresses several real pain points:
- Fragmented career development processes across CVs, applications, learning, interviews, and analytics.
- Poor visibility into professional progress and readiness.
- Difficulty organizing career-related tasks and next actions.
- Lack of a single environment for AI-assisted planning and recommendations.
- Limited ability to track and reflect on job application progress.

## 1.5 Platform Overview
The platform is currently implemented as a modern Next.js frontend with a protected dashboard shell, a dark/light-capable UI system, and a large collection of feature modules. The product presents a multi-module experience that spans:
- authentication and onboarding,
- dashboard and productivity views,
- AI workspace and provider management,
- CV builder and analysis,
- job search and applications tracking,
- learning, interviews, goals, roadmap, and coach modules,
- profile, settings, messaging, notifications, and analytics.

The product is currently best understood as a high-fidelity design and frontend experience with realistic UI flows, structured state, and demo-backed data rather than a fully connected backend-driven system.

---

# 2 Product Overview

## 2.1 Authentication
Authentication is implemented as a mock, client-side experience. Users can register, log in, reset password, and access verification-themed states. The current behavior is driven by a Zustand auth store and a session cookie. The implementation supports protected routing through middleware based on a simple cookie check. No backend identity provider, token refresh, or real credential validation is present.

## 2.2 Dashboard
The dashboard is the primary landing experience for authenticated users. It provides an overview of career score, CV readiness, job matches, applications, interviews, profile completeness, quick actions, recommended jobs, application pipeline, activity timeline, and insights. The dashboard acts as the entry point for navigation to deeper modules.

## 2.3 AI Workspace
The AI workspace is a dedicated conversational experience for interacting with an AI assistant. It supports creating and managing conversations, sending messages, streaming status states, and toggling panel views. The current experience uses demo flow, local state persistence, and a mocked assistant response. It is not yet connected to a real LLM provider at runtime.

## 2.4 AI Providers
The AI Providers module presents a management interface for configuring and testing AI provider connections. The implementation includes provider cards, routing configuration, settings panels, model browsing, and testing workflows. The current state is a UI-oriented configuration layer with simulated connection behavior rather than real provider integration.

## 2.5 CV Builder
The CV Builder module provides a CV editor layout for creating and editing a professional CV. The current implementation exposes the structure for building and revising a CV experience, but the underlying document editing workflow is represented as a structured frontend experience rather than a production-ready document management system.

## 2.6 CV Analysis
The CV Analysis module evaluates a CV against a set of structured criteria and displays an ATS-oriented analysis summary. It includes scorecards, skill gap analysis, keyword analysis, recommendations, priority fixes, timelines, and improvement actions. The current experience is driven by demo data and simulated analysis flow.

## 2.7 Job Search
The Job Search module provides a searchable and filterable job exploration interface. Users can browse job results, search by keyword, and use filters. The implementation includes job cards, search bar, filter panel, quick actions, and results layout. It is currently driven by a job-search store and demo data.

## 2.8 Applications Tracker
The Applications Tracker helps users monitor each job application through a pipeline and list-based experience. It offers filters, search, status transitions, notes, tasks, timeline events, and a detailed application drawer. The module is one of the more mature feature areas in the frontend.

## 2.9 Documents Center
The Documents Center is currently represented as a route with an under-construction state. The UI shell exists, but no document upload, storage, versioning, or organization capabilities are implemented.

## 2.10 Career Progress
The Career Progress module provides a career-score-oriented dashboard with roadmap information, goals, skills, learning progress, achievements, milestones, and next best actions. It is designed to help users understand readiness and the next steps in their professional development.

## 2.11 Analytics
The Analytics module provides visual analytics for activity, applications, CV performance, skill growth, learning progress, AI usage, provider usage, recommendations, productivity, achievements, and recent activity. It uses chart-based cards and a period selector, but data is currently demo-driven.

## 2.12 Profile
The Profile module is implemented as a profile layout route and is intended to host profile details, professional information, and user data. The current repository presents it as a structured route shell rather than a fully populated profile management experience.

## 2.13 Settings
The Settings module is implemented as a settings layout route and is intended to host user preferences, account controls, and application preferences. The current implementation is a UI shell and does not yet provide full backend-connected settings management.

## 2.14 Notifications
The Notifications module provides a notification inbox experience with summary cards, a filter panel, bulk actions, a detail panel, and loading/error states. The current experience is backed by demo notification data.

## 2.15 Messaging
The Messaging module provides a conversation-centric inbox. Users can browse conversations, select a conversation, search, filter, and send messages. The experience is currently demo-backed and not connected to real-time communication services.

## 2.16 AI Assistant Hub
The AI Assistant Hub is implemented as a dedicated assistant workspace experience. It provides a sidebar, details panel, and workspace area for interacting with assistant-based workflows. The current experience is a structured UI surface for future AI assistant capabilities rather than a fully integrated service.

## 2.17 Tasks
The Tasks module offers a task management experience with board and list views, task creation, filtering, search, and task details. It is built as a self-contained productivity workflow and uses local demo data.

## 2.18 Calendar
The Calendar module provides a calendar-based planning experience for events. It is implemented as a route with a demo-backed event model and a calendar layout surface.

## 2.19 Interview Preparation
The Interview Preparation module provides interview tracking, interview cards, practice session concepts, question libraries, a preparation score, and a dashboard layout for upcoming and past interviews. The module offers a rich frontend experience but includes “coming soon” states for some AI-driven simulation features.

## 2.20 Learning Center
The Learning Center provides a learning hub with courses, roadmaps, bookmarks, certificates, practice labs, notes, AI recommendations, and a dashboard view. It is one of the richer self-development modules in the product.

## 2.21 Skill Assessment
The Skill Assessment experience is implemented under the Skills route and is presented as a skills dashboard. The current implementation is a structured portal for skill exploration and progress tracking rather than a formal test engine.

## 2.22 Roadmap Generator
The Roadmap Generator is represented by the Roadmap route. It offers a phase-based career roadmap, recommended learning paths, weekly and daily plans, career path selection, and progress tracking. It is driven by demo roadmaps and AI-oriented content.

## 2.23 Career Coach
The Career Coach module provides a coach experience with readiness scores, recommendations, action plans, motivation, and next-best steps. It is built as a high-value guidance module and is currently demo-backed.

## 2.24 Smart Goals
The Smart Goals module offers goal tracking, dashboards, filters, heatmaps, AI-based recommendations, and goal lifecycle views. It is implemented as a polished planning experience backed by demo goals.

---

# 3 User Personas

## 3.1 Student
A student is preparing for a first professional role and wants a structured environment to build an early career narrative. They value clear guidance, learning resources, goal setting, and a professional-looking CV. Their primary modules are Learning Center, Roadmap, Skills, CV Builder, Career Coach, and Goals.

## 3.2 Junior Developer
A junior developer wants to build credibility, improve interview readiness, and discover the next technical milestones. They use the dashboard, job search, application tracker, CV analysis, interview preparation, learning center, and roadmap modules.

## 3.3 IT Support Professional
An IT support professional is seeking advancement into more technical or specialized roles. They need practical guidance on upcoming skills, career transitions, and job readiness. Their primary modules are Career Progress, Learning, Skill Assessment, Roadmap, Analytics, and Coach.

## 3.4 Cybersecurity Beginner
A beginner in cybersecurity wants a structured path that helps them understand required competencies and monitor progress. They benefit from roadmap planning, learning content, skill dashboard, goals, and AI recommendations.

## 3.5 Career Changer
A career changer needs to assess whether their current experience aligns with a new direction and wants tailored recommendations. They use CV analysis, Career Coach, Roadmap, Goals, and Applications Tracker to plan a transition.

## 3.6 Recruiter
A recruiter or hiring-oriented professional may use the product to understand talent readiness, review career profile components, and track application or candidate readiness signals. In the current implementation, the recruiter persona is partially represented through the design and analytics surface rather than full recruiting workflows.

## 3.7 Job Seeker
A job seeker needs an organized system for managing the full application lifecycle. They use CV Builder, CV Analysis, Job Search, Applications Tracker, Notifications, Calendar, Interview Preparation, and Analytics.

---

# 4 User Journey

## 4.1 Registration
A new user reaches the landing experience, selects a registration path, provides a username, email, and password, and is treated as an authenticated mock user. The system creates a locally persisted auth session and redirects the user to the dashboard.

## 4.2 Login
An existing user accesses the login page, enters credentials, and receives a mock authentication result. The session cookie is set, the user is redirected to the dashboard, and the shell becomes available.

## 4.3 Dashboard
After authentication, the user lands on the dashboard, which presents their career score, key metrics, quick actions, job matches, pipeline, and insights. From here the user can navigate to modules such as CV, Jobs, Analytics, Coach, Learning, Tasks, or Goals.

## 4.4 Build CV
The user enters the CV Builder module, where the interface supports the creation and revision of professional CV content. The module acts as a structured CV editing experience that can later be connected to analysis and application workflows.

## 4.5 Analyze CV
From the CV analysis module, the user can inspect scores, ATS factors, weaknesses, strengths, skill gaps, recommendations, and improvement checklist items. The experience is currently demo-backed and presented as an evaluation workflow.

## 4.6 Search Jobs
The user navigates to Job Search, enters search terms or uses filters, views job opportunities, and inspects matches. The current flow is focused on job discovery and filtering rather than live job ingestion.

## 4.7 Track Applications
The user opens Applications Tracker, views applications, updates status, adds notes and tasks, and follows a workflow from draft to interview, offer, or archived states. The module supports tracking and organization.

## 4.8 Prepare Interviews
The user enters Interview Preparation to review planned interviews, track interview data, access question libraries, and inspect preparation insights. Some AI-driven interview experiences remain marked as future or coming soon.

## 4.9 Learning
The user enters Learning Center to browse courses, roadmaps, certificates, labs, notes, and recommendations. They can bookmark content, mark progress, and follow learning pathways.

## 4.10 Goals
The user uses Smart Goals to define and review personal goals, track completion progress, explore AI recommendations, and examine goal-based insights.

## 4.11 Analytics
The user visits Analytics to review trends, performance, skill growth, application funnel, AI usage, provider usage, and recent activity across the platform.

---

# 5 Functional Requirements

## 5.1 Authentication and Access
### Purpose
Allow users to enter the system, maintain a mock authenticated session, and access protected areas.

### Inputs
Email, password, username, redirect target.

### Outputs
Authenticated state, session cookie, route redirect, validation error messages.

### User Actions
Register, log in, reset password, verify account-related states, navigate away, log out.

### Expected Behavior
Users can authenticate through the mock flow and reach the dashboard. Protected routes redirect unauthenticated users to the login experience.

### Edge Cases
Invalid email format, short password, missing required values, re-entering the app with an existing session cookie.

### Validation
The system validates email format and password length before success. It shows error messages when validation fails.

## 5.2 Dashboard Experience
### Purpose
Provide a high-level overview of a user’s career readiness and recent activity.

### Inputs
Demo metrics, route action selections, user interactions.

### Outputs
Career overview cards, quick actions, job recommendations, application pipeline, timeline, insights.

### User Actions
Open dashboard, select quick action, review metrics, navigate to modules.

### Expected Behavior
The dashboard loads a coherent summary and routes to related modules when quick actions are used.

### Edge Cases
Unrecognized quick action, loading state, retry path.

### Validation
Navigation actions must route only to known paths; non-route actions should log or remain inert in the current implementation.

## 5.3 AI Workspace
### Purpose
Provide a conversational workspace for AI-assisted guidance.

### Inputs
Conversation creation, user message text, stop command, panel toggling.

### Outputs
Conversation history, assistant responses, status states, panel visibility.

### User Actions
Create conversation, send message, stop generation, rename or delete conversation, bookmark message, toggle panel states.

### Expected Behavior
Each conversation maintains local state and a message thread. The assistant returns a mocked completion after a short delay.

### Edge Cases
No active conversation, stopped generation, multiple conversations, deleted conversation.

### Validation
The UI should preserve conversation state and allow users to resume or switch threads.

## 5.4 AI Providers
### Purpose
Let users manage AI provider configuration and routing preferences.

### Inputs
Provider selection, settings values, model selection, routing mode, provider removal/reset actions.

### Outputs
Provider cards, settings panels, router configuration, status badges, testing results.

### User Actions
Add provider, remove provider, edit settings, select current model, favorite models, run tests, set router defaults, set fallback provider, set priority list.

### Expected Behavior
The provider management experience updates state locally and visually reflects the selected status.

### Edge Cases
Missing provider definitions, reset state, provider removal when it is the current default.

### Validation
The store should update related router settings when providers are removed or reset.

## 5.5 CV Builder
### Purpose
Support structured CV authoring and editing.

### Inputs
CV content sections, builder layout interactions.

### Outputs
CV editing layout and structured content presentation.

### User Actions
Open editor, review sections, edit content.

### Expected Behavior
The editor should render a consistent builder UI suitable for future CV persistence.

### Edge Cases
Unfinished sections, empty content state.

### Validation
The experience should render the current CV editor layout without crashing.

## 5.6 CV Analysis
### Purpose
Provide a structured evaluation of a CV against readiness criteria.

### Inputs
Analysis data, active section selection, improvement toggles, re-analysis action.

### Outputs
Score summary, ATS details, skill gap data, recommendations, improvement checklist, timeline.

### User Actions
Open analysis, switch sections, re-analyze, toggle action completion.

### Expected Behavior
The analysis page should display a detailed summary and allow section-based navigation.

### Edge Cases
No prior analysis available, analysis in progress, future sections like projects or languages without data.

### Validation
The analytical experience should gracefully display placeholder content for unsupported sections.

## 5.7 Job Search
### Purpose
Enable browsing and filtering of jobs.

### Inputs
Search query, active filters, quick action selection.

### Outputs
Job cards, search results, filter state, saved jobs interaction.

### User Actions
Search, filter, view results, interact with quick actions.

### Expected Behavior
Users can explore job matches and see results based on their current filters.

### Edge Cases
No results, mobile filter state, empty search.

### Validation
The job search UI should reflect the active filter state and show empty states if no results are found.

## 5.8 Applications Tracker
### Purpose
Allow users to manage their job application lifecycle.

### Inputs
Application data, search text, filter settings, selected application, status updates, notes, tasks.

### Outputs
Pipeline board, list view, application detail panel, notes/tasks and timeline updates.

### User Actions
Select application, update status, add note, edit note, add task, mark task complete, filter by criteria.

### Expected Behavior
The tracker should update application state in real time and reflect changes in the pipeline and detail surfaces.

### Edge Cases
Empty state after filters, no selected application, unsupported status changes.

### Validation
The store should keep the selected application and filtered application list consistent.

## 5.9 Documents Center
### Purpose
Provide a future-ready home for document management.

### Inputs
None in the current implementation.

### Outputs
Under-construction placeholder experience.

### User Actions
Visit the route.

### Expected Behavior
The route should inform the user that the document module is not yet implemented.

### Edge Cases
No document data present.

### Validation
The route should remain stable and clearly present the current limitation.

## 5.10 Career Progress
### Purpose
Help users monitor career growth, readiness, and next actions.

### Inputs
Career progress data, selection filters, goal/milestone toggles.

### Outputs
Career score view, roadmap view, recommendations, learning progress, achievements.

### User Actions
Select goal, toggle milestone, adjust filters, inspect recommendations.

### Expected Behavior
The module should provide a consistent overview of career readiness and next steps.

### Edge Cases
No milestones, empty states, failed load.

### Validation
The UI should render fallback states appropriately when data is missing.

## 5.11 Analytics
### Purpose
Present historical and current performance data in a visually structured way.

### Inputs
Period selection, analytics data sets.

### Outputs
Charts, cards, recommendations, activity feed, achievements.

### User Actions
Change period, review charts, inspect quick actions.

### Expected Behavior
Analytics should update the displayed content based on the selected time period.

### Edge Cases
Loading state, initial render, unsupported period.

### Validation
The module should show loading and error states and retain the selected period.

## 5.12 Profile and Settings
### Purpose
Provide shell areas for profile and preference management.

### Inputs
Profile layout state and settings layout state.

### Outputs
Structured profile and settings surfaces.

### User Actions
Open the routes.

### Expected Behavior
The routes render their corresponding layouts and remain navigable within the shell.

### Edge Cases
Unauthenticated access should redirect.

### Validation
Protected route enforcement should apply consistently.

## 5.13 Notifications and Messaging
### Purpose
Support message handling and notification tracking.

### Inputs
Conversation selection, search query, filter selection, message content.

### Outputs
Inbox, conversation thread, notification list, detail panels.

### User Actions
Browse notifications, filter them, select a notification, select a conversation, send a message, mark read.

### Expected Behavior
The modules should present structured communication experiences and update local state.

### Edge Cases
No conversations, no notifications, empty search state.

### Validation
The UIs should represent empty and loading states.

## 5.14 Tasks, Calendar, and Interviews
### Purpose
Provide planning and preparation capabilities for personal productivity and interview readiness.

### Inputs
Task filters, calendar events, interview data, question data, interview form submissions.

### Outputs
Task board/list, calendar layout, interview cards, question library, stats, details panels.

### User Actions
Create task, update task, filter tasks, add interview, favorite interview, view calendar, select interview.

### Expected Behavior
The modules should present a polished planning workspace driven by demo data and local state.

### Edge Cases
No tasks, no interviews, no calendar events, form submission with missing fields.

### Validation
The experience should update state responsively and preserve the selected view.

## 5.15 Learning, Skills, Roadmap, Coach, and Goals
### Purpose
Support continuous professional development through learning, skill tracking, coaching, and planning.

### Inputs
Courses, roadmaps, goals, AI recommendations, filters, search terms.

### Outputs
Learning dashboard, course grid, roadmap details, recommendations, goal views.

### User Actions
Browse courses, bookmark content, filter content, complete tasks, inspect roadmaps and coach recommendations.

### Expected Behavior
The modules should present a structured and interactive learning environment.

### Edge Cases
No matching content, empty states, route transitions, missing recommendations.

### Validation
Views should render correctly for filtered and empty states.

---

# 6 Non Functional Requirements

## 6.1 Performance
The current frontend should render key routes quickly under local development conditions. Most page transitions are lightweight, and many modules load demo data with short simulated delays. The platform should remain responsive even with multiple panels and nested layouts.

## 6.2 Accessibility
The implementation includes accessible patterns such as landmarks, aria labels, skip link support, keyboard-friendly controls, and semantic structure. The product should continue to prioritize WCAG-aligned navigation, visible focus states, and good contrast.

## 6.3 Security
The current implementation uses a mock authentication flow and session cookie. Real security boundaries are not yet present. The system should not be treated as secure for production use until server-side authentication, authorization, and data protection are introduced.

## 6.4 Scalability
The architecture is designed to support incremental module growth. Zustand stores and component-based UI composition make it feasible to expand the experience; however, the current implementation is not yet designed for high-scale multi-tenant or production data workloads.

## 6.5 Availability
The current experience is available as a frontend demo environment with local state and demo data. It is not yet a mission-critical production service with operational monitoring, failover, or disaster recovery.

## 6.6 Responsiveness
The UI is designed for desktop and tablet, with responsive behavior for mobile. Sidebar collapse, mobile filters, and responsive grids are implemented in several modules.

## 6.7 Browser Support
The product targets modern evergreen browsers. The implementation uses current React and Next.js features and should be validated in the latest versions of Chromium, Firefox, and Safari.

## 6.8 Mobile Support
The UI supports core mobile behavior through responsive layouts and mobile-specific panels, but the product is not yet a fully mobile-native experience.

---

# 7 Platform Architecture

## 7.1 Frontend
The frontend is implemented with Next.js 15 using the App Router. The application uses React 19, TypeScript, Tailwind CSS, Framer Motion, Radix UI primitives, and Zustand state management. The product is organized around route-based pages and feature-specific components.

## 7.2 Components
Reusable components are organized into feature-oriented folders and shared foundation components. The UI layer includes layout components such as app shell, sidebar, topbar, mobile navigation, and breadcrumb; foundation elements such as buttons, cards, input, modal/dialog primitives, and badges; and feature components for analytics, AI, CV, jobs, learning, tasks, and interviews.

## 7.3 Stores
The application uses Zustand stores as the primary client-side state layer. Each domain module has its own store, which manages its state, local actions, and persistence characteristics. Stores are used for auth, AI workspace, AI providers, analytics, applications, assistant, calendar, career progress, coach, CV analysis, CV builder, interviews, jobs, learning, messages, notifications, profile, roadmap, settings, skills, smart goals, tasks, theme, and UI.

## 7.4 Types
The type system is centralized in the types folder. Domain-specific interfaces define the data models for AI workspace, providers, analytics, applications, career progress, coaching, CV analysis, interviews, jobs, learning, messages, notifications, roadmap, settings, smart goals, tasks, theme, and more. These types drive UI interactions and store logic.

## 7.5 Data
Most of the current data layer is composed of demo datasets defined in the data folder. The app reads from static mock data sources rather than a live backend. This enables a rich UI experience while keeping the frontend independent from data services in the current phase.

## 7.6 Navigation
Navigation is driven by a shared sidebar configuration and a set of route-based pages. The navigation config provides top-level and nested links for dashboard, AI workspace, CV, jobs, analytics, coach, communication, profile, settings, documents, and admin.

## 7.7 Protected Routes
Protected routes are enforced through middleware that checks for a session cookie. The current implementation uses a simple cookie-based mechanism and redirects unauthenticated users to the authentication login flow.

## 7.8 Dashboard
The dashboard is implemented as a routed page within the authenticated shell. It is composed of reusable dashboard components and acts as a hub for navigation and summary information.

---

# 8 Folder Structure

## 8.1 Application Shell
The app directory contains route-level pages, authentication routes, dashboard routes, onboarding routes, and the root layout. The app shell establishes the high-level routing structure and layouts.

## 8.2 Components
The components folder contains reusable UI building blocks, structured by feature domain. It includes foundation components, shell layout, dashboard, AI, analytics, CV, learning, tasks, interviews, jobs, profile, settings, notifications, messages, and feedback components.

## 8.3 Stores
The stores folder contains all Zustand-based state modules. Each store is designed around a domain and manages both business state and user interactions.

## 8.4 Types
The types folder contains strongly typed definitions for the main product domains. Types are used across stores, components, and pages.

## 8.5 Data
The data folder contains static content used to seed UI components and modules such as dashboard metrics, learning content, messaging data, calendar events, analytics data, and job results.

## 8.6 Config and Utilities
The config folder holds navigation configuration and other app-level settings. The lib and utils folders contain shared helpers and UI utilities.

## 8.7 Public and Assets
The public and assets folders contain static media and branding resources used by the UI.

---

# 9 Routes

## 9.1 Public Routes
- /: landing page.
- /onboarding: onboarding experience.
- /auth/login: login.
- /auth/register: registration.
- /auth/forgot-password: forgot password.
- /auth/reset-password: reset password.
- /auth/email-verification: verification flow state.
- /auth/verification-success: success state.
- /auth/verification-failed: failed state.
- /auth/password-reset-success: success state.
- /auth/session-expired: session expired state.
- /auth/access-denied: access denied state.
- /auth/account-locked: account-locked state.
- /auth/maintenance: maintenance state.

## 9.2 Protected Dashboard Routes
- /dashboard: main dashboard.
- /dashboard/tasks: tasks management.
- /dashboard/goals: smart goals.
- /dashboard/learning: learning center.
- /dashboard/roadmap: roadmap generator.
- /dashboard/skills: skill assessment.
- /dashboard/calendar: calendar.
- /dashboard/interviews: interviews.
- /dashboard/cv-builder: CV builder.
- /dashboard/cv-analysis: CV analysis.
- /dashboard/jobs: job search.
- /dashboard/applications: applications tracker.
- /dashboard/analytics: analytics dashboard.
- /dashboard/career-progress: career progress.
- /dashboard/coach: career coach.
- /dashboard/notifications: notifications.
- /dashboard/profile: profile route.
- /dashboard/settings: settings route.
- /dashboard/documents: documents route.
- /dashboard/ai-assistants: AI assistants hub.

## 9.3 Additional Protected Routes
- /ai: AI workspace.
- /messages: messaging.
- /notifications: redirect route to notifications.
- /jobs: redirect route to job search.
- /cv: CV route shell.
- /career: career shell route.
- /analytics: analytics route shell.
- /admin: admin route.

## 9.4 Route Purpose Summary
Each route serves a specific role within the shell. The dashboard is the primary workspace hub, while other routes provide focused experiences for career development, learning, communication, and AI assistance.

## 9.5 Protected Status
All major workspace routes are protected by middleware through a session cookie. Unauthenticated users are redirected to the authentication experience.

## 9.6 Navigation Dependencies
Most routes depend on the shared app shell, navigation configuration, and the current authenticated session state.

---

# 10 Components

## 10.1 Layout Components
- AppShell: shared layout wrapper for the dashboard experience.
- Sidebar: main navigation shell with sections and nested items.
- Topbar: contextual header with actions and route information.
- MobileNav: mobile navigation surface.
- Breadcrumb: route breadcrumb component.
- SkipLink: accessibility skip-link component.

## 10.2 Foundation Components
- Button, IconButton, Badge, Card, Input, Checkbox, Select, Dialog, Dropdown, Separator, Tooltip, Switch, Toast, Table-like structure, form-related primitives.

## 10.3 Dashboard Components
- DashboardHeader, DashboardHero, CareerScoreCard, MetricCard, QuickActionGrid, JobMatchCard, ApplicationPipeline, ActivityTimeline, InsightPanel, DashboardLoadingState, DashboardErrorState.

## 10.4 AI Components
- AI workspace layout, conversation area, conversation header, AI input, empty states, provider cards, provider dialogs, provider settings panels, provider router panel, testing panel, model browser.

## 10.5 CV Components
- CV editor layout, CV analysis layout, score cards, skill gap cards, ATS cards, recommendations, improvements, checklist, analysis timeline, summary, progress cards.

## 10.6 Jobs and Applications Components
- Job search bar, filter panel, quick actions, results layout, application tracker header, application pipeline board, application cards, application stats, filters, search, detail panel, empty states, loading/error states.

## 10.7 Learning, Career, Coach, Goals, Tasks, Interviews
- Course grid, course sidebar, learning dashboard, roadmap grid, career progress cards, coach layout, goal cards, task board/list/form, interview cards, calendar layouts, preparation score and insights panels.

## 10.8 Communication Components
- Notification list, header, summary cards, filters, detail panel, message layout, message empty states, conversation list, message composer.

---

# 11 State Management

## 11.1 Auth Store
The auth store manages user identity, authentication state, login, registration, logout, and session persistence through a mock session cookie.

## 11.2 AI Workspace Store
The AI workspace store manages conversations, message history, conversation selection, sidebar states, right panel states, generation state, and message-level actions such as bookmark, delete, rename, duplicate, clear, and archive.

## 11.3 AI Provider Store
The AI provider store manages provider configuration, model metadata, provider status, router configuration, settings, health state, model favorites, and testing state.

## 11.4 Analytics Store
The analytics store manages selected period, view state, and the analytics data loading lifecycle.

## 11.5 Application Tracker Store
The application tracker store manages the full application workflow: list, filters, selection, detail visibility, status updates, notes, tasks, timeline events, and filter execution.

## 11.6 Assistant Store
The assistant store manages assistant-related state for the AI assistant hub experience.

## 11.7 Calendar Store
The calendar store manages calendar events and view state.

## 11.8 Career Progress Store
The career progress store manages career data, selection states, filters, and progress toggles.

## 11.9 Coach Store
The coach store manages the coach experience, selected timeframe, recommendations, action completion state, and coach data.

## 11.10 CV Analysis Store
The CV analysis store manages the active analysis section, analysis state, analysis data, and improvement toggles.

## 11.11 CV Builder Store
The CV builder store manages builder-level state and CV content-oriented workflows.

## 11.12 Interview Store
The interview store manages interviews, practice sessions, questions, filters, selected interview, form state, favorites, archive/delete actions, and preparation stats.

## 11.13 Job Search Store
The job search store manages jobs, search query, filter state, and results visibility.

## 11.14 Learning Store
The learning store manages courses, roadmaps, notes, certificates, labs, AI recommendations, filters, view mode, and learning progress actions.

## 11.15 Messages Store
The messages store manages conversations, selection, search, filters, detail visibility, typing state, and sending behavior.

## 11.16 Notifications Store
The notifications store manages notification lists, selected notification, filters, summary calculations, and read-state changes.

## 11.17 Profile Store
The profile store manages profile profile-related UI and data state.

## 11.18 Roadmap Store
The roadmap store manages roadmap progression, selected career path, selected phase, and daily/weekly planning actions.

## 11.19 Settings Store
The settings store manages settings page data and preferences state.

## 11.20 Skill Store
The skill store manages skill and progress state.

## 11.21 Smart Goal Store
The smart goal store manages goals, filters, sort order, goal selection, form visibility, dashboard recommendations, and heatmap data.

## 11.22 Task Store
The task store manages task list, board view, filters, form visibility, selected task, and task details.

## 11.23 Theme Store
The theme store manages visual theme and appearance state.

## 11.24 UI Store
The UI store manages sidebar expansion and other shell-level UI state.

---

# 12 Data Models

## 12.1 Authentication Models
- MockUser: user identity object with id, email, username.

## 12.2 AI Workspace Models
- AIMessage: role, content, timestamp, status, metadata, bookmark state.
- Conversation: conversation metadata including title, messages, timestamps, flags, model, token count, and message count.
- Sidebar and panel state types.

## 12.3 AI Provider Models
- ProviderConfig: provider identity, status, settings, models, current model, latency, token usage, health, timestamps.
- ProviderSettings: configuration parameters such as API key, base URL, temperature, top P, max tokens, streaming, timeout, retry count.
- ProviderModel: model metadata.
- ProviderRouterConfig: default provider, fallback provider, priority list, routing mode.

## 12.4 Analytics Models
- Analytics period and metric types, chart data structures, quick action types, achievements, recent activity feed items.

## 12.5 Application Models
- Application: company, role, location, status, priority, match score, timeline, notes, tasks, documents, contact information, AI recommendation, AI insights.
- ApplicationFilters and ApplicationTrackerStore shape.

## 12.6 Calendar Models
- Calendar events with title, date, time, location, description, and type information.

## 12.7 Career, Coach, Roadmap, and Goal Models
- Career progress data, coach data, roadmap phases, milestones, action plan, recommendations, daily and weekly plans, smart goals.

## 12.8 CV Models
- CV analysis result structures, section analysis, skill gap data, ATS data, keyword data, improvement steps, recommendations, and timeline entries.

## 12.9 Interview Models
- Interview definition with company, role, type, format, date, status, checklist, notes, resources, prep progress, and favorite/archive flags.

## 12.10 Learning and Skills Models
- Course, certificate, roadmap, practice lab, note, AI recommendation, skill, learning progress item, and related data structures.

## 12.11 Messaging and Notification Models
- Message conversation payloads and notification objects with status, types, timestamps, and read/unread state.

## 12.12 Profile, Settings, Themes, UI Models
- User profile object, settings preference object, theme state, UI visibility state, and shell layout state.

---

# 13 UI/UX Guidelines

## 13.1 Design System
The product uses a design-system-driven interface with consistent typography, spacing, cards, border radius, elevation, surfaces, and color semantics. The system is organized around strong visual hierarchy and consistent component patterns.

## 13.2 Dark Mode
The UI supports dark mode through theme handling and theme-aware styles. The root layout and app shell are built to align with a theme-capable environment.

## 13.3 Spacing
The app uses consistent spacing tokens across cards, sections, panels, and page shells. The dashboard and workspace layouts rely on generous padding and clear sectional separation.

## 13.4 Typography
The UI uses clear heading hierarchy with body, caption, and label styles. Typography is applied consistently across dashboard cards, forms, and data surfaces.

## 13.5 Cards
Cards are a dominant visual container in the dashboard, analytics, learning, applications, and coach experiences. Cards support variants for success, warning, info, AI, and neutral surfaces.

## 13.6 Buttons
Buttons are standardized with primary, outline, ghost, and destructive patterns. The system uses icon-button variants and spacing consistent with the design language.

## 13.7 Forms
Forms are implemented through shared form controls with labels, concise input spacing, and consistent validation states. Forms appear in auth, settings, interviews, tasks, and provider management workflows.

## 13.8 Dialogs
Dialog-style interactions appear in provider management, deletion, and reset flows. These interactions are rendered as overlays with clear action areas and close controls.

## 13.9 Tables
The current product leans on card-based and list-based patterns rather than complex tabular workflows. The system supports structured list layout and data panels where tables are not yet a dominant pattern.

## 13.10 Charts
Charts are used in analytics and progress modules through the Recharts library. These charts help present activity, skill growth, funnel data, and learning progress in a visual format.

---

# 14 Dashboard Integration

The dashboard is the primary integration layer for the product. It connects to the broader platform through navigation, quick actions, and shared visual language. The dashboard is not merely a summary page; it is the launch point for the end-to-end concept of the product. It links to modules including CV tools, jobs, analytics, coaching, tasks, calendar, skills, and learning. Each module uses the same shell, navigation patterns, and visual design system. This creates continuity across the user experience and allows the platform to present a unified brand and operating model.

The current integration model is mostly frontend-level and local-state-based. Modules do not yet share a real backend or centralized data service, but they do share the same shell and data conventions. Future backend integration should preserve this modular structure while moving the data layer to centralized services and persistent APIs.

---

# 15 AI Features

## 15.1 Current AI Architecture
The current AI architecture is primarily frontend-driven. The app includes AI-specific stores, types, components, and route-level experiences for workspace, providers, coach, roadmap, and recommendations. It is designed around an eventual AI service layer rather than a fully implemented service integration.

## 15.2 Workspace
The AI workspace provides user-facing conversation flows with local conversation management and simulated assistant responses. The experience is a strong foundation for future real model integration.

## 15.3 Providers
The provider management module contains the infrastructure for multiple AI providers. This includes provider registration, settings, models, routing, and testing. The implementation is currently UI-centric and does not connect to live provider APIs.

## 15.4 Roadmap
The roadmap module offers AI-oriented recommendations and a structured growth path. It is positioned as an AI-assisted planning tool.

## 15.5 Coach
The coach module provides AI-shaped guidance such as readiness assessment, next steps, recommendations, and action planning. It is implemented as a content-rich guidance experience.

## 15.6 Recommendations
The platform uses recommendations across learning, career progress, goals, analytics, and dashboard experiences. These recommendations are currently represented through demo content and local state.

## 15.7 Goals
The goals system includes an AI recommendation panel and structured goal planning. It is designed to be compatible with AI-generated guidance but is currently more of a design and interaction model than a fully automated system.

---

# 16 Current Limitations

The following limitations are real and visible in the current implementation:
- Authentication is mock-based and uses a client-side session cookie rather than a real identity system.
- AI responses are simulated and not connected to a live model provider.
- AI provider connection testing is simulated rather than real API-based verification.
- The Documents Center is not implemented beyond a placeholder route.
- The app uses demo data for most modules; it is not yet connected to persistent user data.
- No real backend, database, file storage, or real-time service exists in the current repository state.
- Some route shells exist for profile, settings, and assistant experiences, but the full feature depth is not yet implemented.
- Some navigation entries are disabled and marked as future work.
- The product currently behaves as a high-fidelity frontend prototype with many production gaps.

---

# 17 Backend Preparation

The backend must later provide the following capabilities:
- Real authentication and authorization.
- Persistent user profile and account management.
- Storage for CVs, career data, goals, tasks, interviews, applications, messages, and notifications.
- AI runtime integration for workspace, coach, roadmap, and recommendations.
- Provider connection and model execution services.
- Analytics aggregation and reporting.
- File storage for documents and uploaded assets.
- Event-driven notifications and messaging workflows.
- Audit logging and admin management.

The current frontend already establishes the expected user flows and domain model, making it possible to implement backend services against a defined experience contract.

---

# 18 API Requirements

## 18.1 Authentication APIs
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh
- POST /auth/forgot-password
- POST /auth/reset-password
- GET /auth/me

## 18.2 User and Profile APIs
- GET /users/me/profile
- PUT /users/me/profile
- GET /users/me/preferences
- PUT /users/me/preferences

## 18.3 Dashboard APIs
- GET /dashboard/overview
- GET /dashboard/quick-actions
- GET /dashboard/insights

## 18.4 AI Workspace APIs
- GET /ai/conversations
- POST /ai/conversations
- GET /ai/conversations/{id}
- POST /ai/conversations/{id}/messages
- DELETE /ai/conversations/{id}
- POST /ai/conversations/{id}/stop

## 18.5 AI Provider APIs
- GET /ai/providers
- POST /ai/providers
- PUT /ai/providers/{id}
- DELETE /ai/providers/{id}
- POST /ai/providers/{id}/test
- PUT /ai/providers/router
- GET /ai/providers/models

## 18.6 CV APIs
- GET /cv
- PUT /cv
- POST /cv/analyze
- GET /cv/analysis
- GET /cv/analysis/history

## 18.7 Job and Application APIs
- GET /jobs
- GET /jobs/{id}
- GET /applications
- POST /applications
- PUT /applications/{id}
- POST /applications/{id}/notes
- POST /applications/{id}/tasks
- POST /applications/{id}/status

## 18.8 Learning and Roadmap APIs
- GET /learning/courses
- GET /learning/roadmaps
- GET /learning/recommendations
- GET /learning/certificates
- GET /learning/labs
- GET /learning/notes
- GET /roadmaps/me

## 18.9 Coaching and Goals APIs
- GET /coach/summary
- GET /coach/action-plan
- GET /goals
- POST /goals
- PUT /goals/{id}
- POST /goals/{id}/complete

## 18.10 Communication APIs
- GET /messages/conversations
- GET /messages/conversations/{id}
- POST /messages/conversations/{id}/messages
- GET /notifications
- PUT /notifications/{id}/read
- PUT /notifications/read-all

## 18.11 Analytics APIs
- GET /analytics/overview
- GET /analytics/activity
- GET /analytics/funnel
- GET /analytics/performance

---

# 19 Database Requirements

## 19.1 Core Entities
- User
- Session
- Profile
- Preference
- Role and permission

## 19.2 Career and CV Entities
- CVDocument
- WorkExperience
- EducationEntry
- ProjectEntry
- SkillEntry
- CertificationEntry
- LanguageEntry
- CVAnalysisResult

## 19.3 Application and Job Entities
- JobOpportunity
- ApplicationRecord
- ApplicationNote
- ApplicationTask
- ApplicationTimelineEvent
- ApplicationDocumentLink

## 19.4 Learning and Development Entities
- CourseEnrollment
- LearningNote
- PracticeLabProgress
- CertificateAward
- RoadmapPlan
- RoadmapPhase
- LearningRecommendation

## 19.5 AI Entities
- AIConversation
- AIMessage
- AIProviderConfig
- ProviderModelPreference
- AIRecommendation
- AIRequestLog

## 19.6 Communication Entities
- ConversationThread
- MessageRecord
- NotificationRecord

## 19.7 Planning Entities
- GoalRecord
- GoalMilestone
- TaskRecord
- CalendarEvent
- InterviewRecord
- InterviewQuestionRecord

## 19.8 Analytics Entities
- AnalyticsSnapshot
- UsageEvent
- PerformanceMetric

## 19.9 Relationships
- A user has one profile, many goals, many applications, many conversations, many tasks, many notifications, many interviews, and many learning records.
- A CV document can contain many experiences, education entries, projects, languages, and skills.
- An application can have many notes, tasks, timeline events, and documents.
- A conversation contains many messages.
- A roadmap contains many phases and milestones.

## 19.10 Future Schema Considerations
The database should be designed for relational integrity and future scalability, with clear separation between core identity data, user-generated content, and AI-generated recommendations.

---

# 20 Testing Requirements

## 20.1 Functional Tests
- Verify auth registration and login success and failure cases.
- Verify dashboard renders all core summary panels.
- Verify each major route loads and displays the intended content.
- Verify AI workspace conversation create/send/stop flows.
- Verify provider add/edit/remove/reset flows.
- Verify CV builder and CV analysis modules render correctly.
- Verify job search filters and results behavior.
- Verify applications tracker status updates, tasks, notes, and detail panel behavior.
- Verify learning center filtering and empty states.
- Verify goals, roadmap, coach, tasks, calendar, and interview flows.

## 20.2 UI Tests
- Verify responsive behavior on mobile, tablet, and desktop.
- Verify dark/light mode switching.
- Verify cards, buttons, dialogs, panels, and navigation states.
- Verify loading and error states.

## 20.3 Navigation Tests
- Verify protected routes redirect unauthenticated users.
- Verify sidebar navigation items take users to the correct page.
- Verify dashboard quick actions route correctly.
- Verify breadcrumbs remain consistent.

## 20.4 Integration Tests
- Verify the dashboard can navigate to each feature module.
- Verify the messaging and notification surfaces connect to shared shell navigation.
- Verify AI workspace and provider modules update shared state correctly.
- Verify applications and analytics present coherent state changes.

## 20.5 Regression Tests
- Verify no regressions in route structure after navigation refactors.
- Verify the mock-session flow still behaves after auth-related changes.
- Verify no layout regressions in the app shell and sidebar.

## 20.6 Accessibility Tests
- Verify keyboard navigation across shell and module pages.
- Verify focus management in dialogs and menus.
- Verify interactive elements have accessible names.
- Verify color contrast and semantics.

## 20.7 Performance Tests
- Verify initial page render times are acceptable.
- Verify route transitions remain responsive.
- Verify charts and analytics panels load without excessive layout shifts.

## 20.8 Edge Cases
- Empty state rendering.
- Long text and overflowing content.
- Missing images or missing data.
- Missing provider configuration.
- No results for search or filters.

## 20.9 Negative Tests
- Invalid authentication input.
- Invalid route access.
- Empty form submission.
- Undefined data paths.
- Unknown quick actions.

---

# 21 Acceptance Criteria

## 21.1 Authentication
- Users can register and log in through the current mock flow.
- Unauthenticated users are redirected away from protected routes.
- Session persistence works for the current cookie-based flow.

## 21.2 Dashboard
- The dashboard renders career metrics, quick actions, recommended jobs, application pipeline, activity timeline, and insights.
- Quick actions route to known module destinations.

## 21.3 AI Workspace
- Users can create and manage conversations.
- Users can send messages and see the assistant response state.
- The workspace preserves local conversation state.

## 21.4 AI Providers
- Users can view providers and interact with settings, router, models, and testing panels.
- Provider selection and routing state can be updated locally.

## 21.5 CV Builder
- The CV builder route renders the editor experience and supports content-driven editing flows.

## 21.6 CV Analysis
- The CV analysis route renders scorecards, skill gaps, recommendations, ATS content, and improvement areas.
- Placeholder content appears for sections that are not yet supported by data.

## 21.7 Job Search
- Users can search and filter jobs and view results.
- The UI shows empty states when no matching data exists.

## 21.8 Applications Tracker
- Users can view applications in pipeline and list views.
- Users can update status, add notes, add tasks, and view detail panels.

## 21.9 Documents Center
- The documents route is navigable and clearly communicates that the feature is not yet implemented.

## 21.10 Career Progress
- The career progress page displays career score, roadmap, recommendations, milestones, learning progress, and achievements.

## 21.11 Analytics
- The analytics route renders charts and summary cards for the current demo data set.

## 21.12 Profile and Settings
- The profile and settings routes render within the shared shell and remain accessible to authenticated users.

## 21.13 Notifications
- Users can view notification summaries, filter the list, and inspect notification details.

## 21.14 Messaging
- Users can view conversations, select a conversation, search, and send a message.

## 21.15 AI Assistant Hub
- The hub renders a structured assistant workspace shell and supports assistant-specific navigation patterns.

## 21.16 Tasks
- Users can view tasks in list and board mode, filter them, create new tasks, and inspect task details.

## 21.17 Calendar
- Users can access the calendar layout and view events from the current demo data set.

## 21.18 Interview Preparation
- Users can review interviews, inspect question libraries, and view planning and preparation surfaces.

## 21.19 Learning Center
- Users can browse courses, roadmaps, labs, notes, certificates, and recommendations.
- Filters and search work within the learning experience.

## 21.20 Skill Assessment
- The skills route renders a skill dashboard experience for the current feature surface.

## 21.21 Roadmap Generator
- The roadmap route shows phases, progress, daily and weekly plans, and recommendations.

## 21.22 Career Coach
- The coach route presents readiness, recommendations, action plan, motivation, and next steps.

## 21.23 Smart Goals
- The goals route renders goals, filters, heatmap insight, dashboard summary, recommendations, and goal lifecycle workflows.

---

# 22 Risks

## 22.1 Technical Risks
- Frontend-only architecture may create a large integration gap when a backend is introduced.
- Mock auth and mock data may lead to false confidence in real product readiness.
- AI provider integration is not yet wired to live services.
- Lack of backend persistence could cause rework when moving to production data models.

## 22.2 Product Risks
- The current experience may appear more complete than it really is, creating expectations above the actual backend readiness.
- Some modules are portrayed as mature, even though core capabilities are still UI shells or demo-only experiences.

## 22.3 UX Risks
- If the app is treated as fully functional before backend integration, users may encounter inconsistencies between the polished UI and actual capability.
- The platform’s breadth may increase complexity without a corresponding robust domain model and data pipeline.

---

# 23 Future Roadmap

## 23.1 After DP-40
The roadmap after DP-40 should focus on turning the current frontend experience into a real product platform.

## 23.2 Backend
- Implement real backend services for auth, profile, dashboard data, applications, tasks, goals, roadmap, learning, analytics, messaging, notifications, and calendar.
- Introduce API versioning and service contracts.

## 23.3 AI
- Replace mocked AI responses with real model calls.
- Introduce provider authentication, provider-level model execution, prompt templates, guardrails, and response streaming.
- Expand AI coach, roadmap, recommendations, and workspace features into real assistant-driven experiences.

## 23.4 Database
- Introduce persistent relational storage for all major entities.
- Add migrations, indexing, and audit trails.
- Support file storage and analytics event logging.

## 23.5 Authentication
- Replace the mock session flow with a secure backend-based auth system.
- Introduce email verification, password recovery, MFA, refresh tokens, and role-based access controls.

## 23.6 Payments
- Introduce billing and subscription flows if premium features or enterprise tiers are later required.

## 23.7 Deployment
- Introduce staging and production deployment environments.
- Add observability, error tracking, backups, and uptime monitoring.

---

# 24 Appendix

## 24.1 Glossary
- MR.EGO: The professional growth and career development platform described in this document.
- Dashboard: The primary authenticated landing experience.
- AI Workspace: The conversational AI interface.
- Provider Router: The logical routing layer for selecting AI providers.
- CV Analysis: The structured evaluation of a curriculum vitae.
- Application Tracker: The workflow tool for monitoring job applications.
- Learning Center: The learning and development hub.
- Career Coach: The AI-guided coaching experience.
- Smart Goals: The goals and progress planning system.

## 24.2 Definitions
- Demo-backed experience: A feature whose content is currently supplied by local mock data rather than real external data sources.
- Mock auth: A simplified authentication flow that uses local state and session cookies.
- Protected route: A route that requires an authenticated user session.
- Shell: The shared navigation and layout wrapper around the product modules.

## 24.3 Project Terminology
- DP-39: The design and product milestone immediately preceding the backend transition.
- Pre-Backend: The current phase in which the platform is primarily represented as a rich frontend experience with model-driven design and local-state architecture.
- Module: A self-contained product area with its own UI and data concerns.

---

## Final Note
This PRD is intended to be the current-state requirements reference for the MR.EGO platform as implemented after DP-39. It documents the real capabilities, the real architecture, the current limitations, and the expected future work required to transform the experience from a high-fidelity frontend prototype into a full production platform.
