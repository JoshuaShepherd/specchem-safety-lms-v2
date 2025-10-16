# Phase 4: Core Infrastructure - Part 1 (Days 9-11)

## Step 4.1: Enhance Existing Authentication for Safety Training Operations

**Required Context Files:**
- `apps/crm/src/lib/supabase/` - Supabase client configuration
- `apps/crm/src/lib/auth/` - Authentication utilities (if exists)
- `apps/crm/src/lib/middleware/` - Authentication middleware (if exists)
- `apps/crm/src/app/api/auth/` - Auth API routes (if exist)
- `packages/shared/src/index.ts` - Shared authentication types
- `apps/crm/src/lib/db/schema/profiles.ts` - User profiles schema
- `apps/crm/src/lib/db/schema/admin-roles.ts` - Role management schema

**Cursor Prompt:**

```
Enhance the existing Supabase authentication system to support Safety Training functionality:

1. **Analyze existing auth setup:**
   - Document current Supabase Auth configuration
   - Understand existing authentication middleware
   - Map current user registration and login flows
   - Identify existing session management patterns

2. **Add Safety training-specific auth enhancements:**
   - Extend user metadata with plant assignments
   - Add role-based access control for Safety training operations
   - Create Safety training-specific middleware for plant-scoped access
   - Implement permission utilities for Safety training data access

3. **Preserve existing functionality:**
   - Keep current user registration and login flows intact
   - Maintain existing password reset functionality
   - Preserve current email verification process
   - Don't modify existing session persistence and security

4. **Safety training plant and role system:**
   - Add plant assignment to user profiles
   - Create role hierarchy (safety_admin, plant_manager, safety_instructor, hr_admin, safety_coordinator, employee)
   - Build plant-based data filtering middleware
   - Implement Safety training permission checking utilities

5. **Development utilities:**
   - Add Safety training-specific auth bypass toggle (dev only)
   - Create plant switching for testing (dev only)
   - Build role simulation utilities for development
   - **`AUTH_BYPASS` only allowed in dev. CI/prod fail fast if set**
   - **Startup logs loud warning when enabled**
   - Allows progress when auth wiring is breaking everything
```

**Expected Output:**

- Complete authentication system with Supabase Auth
- Role-based access control and plant management
- Authentication middleware and utilities
- Development auth bypass (dev only)

**Definition of Done:**

- ✅ Authentication system with role-based access control
- ✅ **`AUTH_BYPASS` only allowed in dev. CI/prod fail fast if set. Startup logs loud warning when enabled**
- ✅ Session management and security implemented

---

**Next Step:** Proceed to `11-api-routes.md`