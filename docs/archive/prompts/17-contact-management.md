# Phase 6: Core Features Implementation - Part 2 (Days 16-22)

## Step 6.2: User Profile Management

**Required Context Files:**
- `apps/crm/src/app/profiles/` - User profile pages (if exist)
- `apps/crm/src/components/profiles/` - User profile components
- `packages/contracts/src/index.ts` - Profile DTO types
- `apps/crm/src/lib/queries/profiles.ts` - Profile query modules
- `apps/crm/src/lib/validations/profiles.ts` - Profile validation schemas
- `apps/crm/src/lib/mappers/profiles.ts` - Profile data mappers
- `apps/crm/src/app/api/profiles/` - Profile API routes
- `apps/crm/src/lib/db/schema/profiles.ts` - Profile database schema

**Cursor Prompt:**

```
Implement complete Safety Training user profile management functionality:

1. Create user profile listing and management pages
2. Build user profile forms with proper validation
3. Implement user-plant relationships
4. Add user search and filtering
5. Create user training activity tracking
6. Implement user import/export functionality

Ensure all user profile management features are type-safe and follow our established patterns.
```

**Expected Output:**

- User profile management with CRUD operations
- User-plant relationships properly implemented
- User search, filtering, and import/export
- Training activity tracking for users

**Definition of Done:**

- ✅ User profile management with plant relationships
- ✅ User search and filtering functional
- ✅ All features use proper validation and type safety

---

**Next Step:** Proceed to `18-opportunity-pipeline.md`