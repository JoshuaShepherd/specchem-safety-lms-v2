# Architecture Diagram: Current State → Target Safety Training Platform

## Current State Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CURRENT STATE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   Next.js App   │    │     Supabase Safety DB         │ │
│  │                 │    │                                 │ │
│  │ ┌─────────────┐ │    │ ┌─────────────────────────────┐ │ │
│  │ │   Frontend  │ │    │ │     Safety Training Schema  │ │ │
│  │ │             │ │    │ │                             │ │ │
│  │ │ • page.tsx  │ │    │ │ • profiles (3 users)        │ │ │
│  │ │ • layout.tsx│ │    │ │ • plants (11 locations)     │ │ │
│  │ │ • globals.css│ │    │ │ • courses (3 courses)      │ │ │
│  │ │             │ │    │ │ • enrollments (2 active)    │ │ │
│  │ │ ❌ No Auth  │ │    │ │ • progress (2 records)      │ │ │
│  │ │ ❌ No API   │ │    │ │ • activity_events           │ │ │
│  │ │ ❌ No Forms │ │    │ │ • question_events           │ │ │
│  │ │ ❌ No State │ │    │ │ • admin_roles (2 admins)    │ │ │
│  │ │ ❌ No UI    │ │    │ │ • audit_log                 │ │ │
│  │ │             │ │    │ │                             │ │ │
│  │ └─────────────┘ │    │ └─────────────────────────────┘ │ │
│  │                 │    │                                 │ │
│  │ Dependencies:   │    │ Features:                      │ │
│  │ • React 19      │    │ ✅ RLS Security                │ │
│  │ • Next.js 15    │    │ ✅ Audit Logging               │ │
│  │ • Tailwind v4   │    │ ✅ Multi-tenant                │ │
│  │ • TypeScript    │    │ ✅ Data Validation             │ │
│  │ • ESLint        │    │ ✅ Migration System            │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│                                                             │
│  ❌ NO CONNECTION BETWEEN FRONTEND AND DATABASE             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Target Safety Training Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        TARGET SAFETY TRAINING PLATFORM                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        Next.js Application                             │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   App Router    │  │   Components    │  │      API Routes         │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ • (auth)/       │  │ • ui/           │  │ • /api/auth/            │ │   │
│  │  │ • (dashboard)/  │  │ • forms/        │  │ • /api/courses/         │ │   │
│  │  │ • (training)/   │  │ • charts/       │  │ • /api/enrollments/     │ │   │
│  │  │ • (admin)/      │  │ • layout/       │  │ • /api/progress/        │ │   │
│  │  │                 │  │                 │  │ • /api/activities/      │ │   │
│  │  └─────────────────┘  └─────────────────┘  │ • /api/reports/         │ │   │
│  │                                           │ • /api/admin/            │ │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  │                         │ │   │
│  │  │   Libraries     │  │   State Mgmt    │  │                         │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ • lib/supabase/ │  │ • store/        │  │                         │ │   │
│  │  │ • lib/db/       │  │ • hooks/        │  │                         │ │   │
│  │  │ • lib/validations│ │ • types/        │  │                         │ │   │
│  │  │ • lib/utils/    │  │                 │  │                         │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Supabase Safety Database                            │   │
│  │                                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │                Safety Training Schema                           │   │   │
│  │  │                                                                 │   │   │
│  │  │ • profiles (user management)                                    │   │   │
│  │  │ • plants (facility locations)                                   │   │   │
│  │  │ • courses (training content)                                    │   │   │
│  │  │ • enrollments (user course assignments)                         │   │   │
│  │  │ • progress (learning progress tracking)                         │   │   │
│  │  │ • activity_events (user interaction logging)                    │   │   │
│  │  │ • question_events (quiz response tracking)                      │   │   │
│  │  │ • admin_roles (permission management)                           │   │   │
│  │  │ • audit_log (compliance tracking)                               │   │   │
│  │  │                                                                 │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                         │   │
│  │  ✅ RLS Security  ✅ Audit Logging  ✅ Multi-tenant  ✅ Validation    │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        Integration Layer                               │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Authentication│  │   Data Access   │  │      Business Logic     │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ • Supabase Auth │  │ • Drizzle ORM   │  │ • Course Management     │ │   │
│  │  │ • RLS Policies  │  │ • Type Safety   │  │ • Enrollment Management │ │   │
│  │  │ • Role-based    │  │ • Migrations    │  │ • Progress Tracking     │ │   │
│  │  │ • JWT Tokens    │  │ • Queries       │  │ • Activity Logging      │ │   │
│  │  │                 │  │                 │  │ • Compliance Reporting  │ │   │
│  │  └─────────────────┘  └─────────────────┘  │ • Admin Management      │ │   │
│  │                                           │                         │ │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  └─────────────────────────┘ │   │
│  │  │   Validation    │  │   State Mgmt    │                             │   │
│  │  │                 │  │                 │                             │   │
│  │  │ • Zod Schemas   │  │ • Zustand       │                             │   │
│  │  │ • Form Validation│  │ • Optimistic   │                             │   │
│  │  │ • API Contracts │  │ • Caching       │                             │   │
│  │  │ • Type Safety   │  │ • Real-time     │                             │   │
│  │  │                 │  │                 │                             │   │
│  │  └─────────────────┘  └─────────────────┘                             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        User Experience                                 │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │  Training Module│  │  Progress Module│  │     Admin Module        │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ • Course Catalog│  │ • Progress      │  │ • User Management       │ │   │
│  │  │ • Course Content│  │ • Certificates  │  │ • Role Assignment       │ │   │
│  │  │ • Quizzes       │  │ • Activity Log  │  │ • Plant Management      │ │   │
│  │  │ • Assessments   │  │ • Reports       │  │ • Course Management     │ │   │
│  │  │ • Completion    │  │ • Analytics     │  │ • System Settings       │ │   │
│  │  │                 │  │                 │  │ • Audit Logs            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW DIAGRAM                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  User Authentication                                                             │
│         ↓                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Supabase Auth + RLS                                 │   │
│  │                                                                         │   │
│  │  • JWT Token Validation                                                 │   │
│  │  • User Profile Lookup                                                  │   │
│  │  • Role-based Access Control                                            │   │
│  │  • Plant-based Permissions                                              │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│         ↓                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Application State                                   │   │
│  │                                                                         │   │
│  │  • Zustand Store (User, Permissions, UI State)                         │   │
│  │  • React Context (Theme, Notifications)                                │   │
│  │  • Local Storage (Preferences, Cache)                                  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│         ↓                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    API Layer (Next.js API Routes)                      │   │
│  │                                                                         │   │
│  │  • Request Validation (Zod)                                             │   │
│  │  • Authentication Middleware                                            │   │
│  │  • Business Logic Processing                                            │   │
│  │  • Database Queries (Drizzle ORM)                                       │   │
│  │  • Response Formatting                                                  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│         ↓                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Database Layer (Supabase PostgreSQL)                │   │
│  │                                                                         │   │
│  │  • Safety Training Tables (Existing)                                   │   │
│  │  • CRM Tables (New)                                                    │   │
│  │  • RLS Policies (Security)                                             │   │
│  │  • Audit Triggers (Compliance)                                         │   │
│  │  • Real-time Subscriptions                                             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│         ↓                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Frontend Components                                 │   │
│  │                                                                         │   │
│  │  • shadcn/ui Components (Consistent UI)                                │   │
│  │  • React Hook Form (Form Management)                                   │   │
│  │  • Recharts/Tremor (Data Visualization)                                │   │
│  │  • Real-time Updates (Supabase Subscriptions)                          │   │
│  │  • Optimistic Updates (Zustand)                                        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack Comparison

### Current Stack

```
Frontend:     Next.js 15 + React 19 + TypeScript + Tailwind v4
Database:     Supabase PostgreSQL (Safety Schema Only)
Auth:         None
State:        None
Forms:        None
UI:           Basic HTML/CSS
Testing:      None
```

### Target Stack

```
Frontend:     Next.js 15 + React 19 + TypeScript + Tailwind v4
Database:     Supabase PostgreSQL (Safety + Safety schema)
Auth:         Supabase Auth + RLS
State:        Zustand + React Context
Forms:        React Hook Form + Zod
UI:           shadcn/ui + Radix UI
Charts:       Recharts + Tremor
Testing:      Jest + Playwright
ORM:          Drizzle ORM
Validation:   Zod schemas
```

## Integration Points

### 1. **User Management Integration**

```
Existing profiles table → User profile management
Existing admin_roles → Role-based access control
Existing plants → Multi-tenant facility management
```

### 2. **Activity Logging Integration**

```
Existing activity_events → Training activity tracking
Existing audit_log → Compliance audit trail
Comprehensive activity tracking for safety training
```

### 3. **Multi-tenant Architecture**

```
Plant-based organization → Facility-based training
Role-based permissions → Training access control
Plant managers → Training administrators
```

### 4. **Reporting Integration**

```
Safety training reports → Compliance reporting
Progress tracking → Learning analytics
User engagement → Training effectiveness metrics
```

## Success Metrics

### Technical Metrics

- ✅ 100% TypeScript coverage
- ✅ < 3s page load times
- ✅ 99.9% uptime
- ✅ Zero security vulnerabilities
- ✅ 90%+ test coverage

### Business Metrics

- ✅ Unified training experience
- ✅ Single sign-on across training modules
- ✅ Real-time progress synchronization
- ✅ Comprehensive compliance audit trail
- ✅ Scalable multi-tenant training architecture

### User Experience Metrics

- ✅ Consistent UI/UX across modules
- ✅ Mobile-responsive design
- ✅ Accessibility compliance (WCAG 2.1)
- ✅ Intuitive navigation
- ✅ Fast, responsive interactions
