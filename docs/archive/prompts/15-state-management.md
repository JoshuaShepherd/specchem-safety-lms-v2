# Phase 5: Frontend Foundation - Part 3 (Days 12-15)

## Step 5.3: Set Up State Management

**Required Context Files:**
- `apps/crm/src/lib/stores/` - Zustand stores (if exist)
- `apps/crm/src/hooks/` - Custom React hooks
- `packages/contracts/src/index.ts` - DTO types for state
- `apps/crm/src/lib/auth/` - Authentication state management
- `apps/crm/src/lib/queries/` - Query modules for data fetching
- `apps/crm/src/lib/cache/` - Caching utilities (if exist)
- `apps/crm/package.json` - Dependencies (zustand)

**Cursor Prompt:**

```
Add Safety Training state management to our existing Next.js app:

1. Add Safety Training Zustand stores alongside existing auth state:
   - Safety Training entity state (plants, courses, enrollments, progress, activities)
   - Safety Training settings and preferences
   - Safety Training form state management
   - Safety Training data cache management
   - (Preserve existing auth state management)

2. Create custom hooks for:
   - Data fetching and caching
   - Form handling
   - Authentication state
   - Plant and role management

3. Implement proper state management patterns:
   - Optimistic updates
   - Error handling
   - Loading states
   - Cache invalidation

4. Ensure all state management is type-safe and follows React best practices
```

**Expected Output:**

- State management with Zustand stores
- Custom hooks for data fetching and caching
- Proper state management patterns
- Type-safe state management throughout

**Definition of Done:**

- ✅ State management with Zustand stores
- ✅ Custom hooks for consistent data access
- ✅ All state management is type-safe and follows best practices

---

**Next Step:** Proceed to `16-account-management.md`