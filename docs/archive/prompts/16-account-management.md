# Phase 6: Core Features Implementation - Part 1 (Days 16-22)

## Step 6.1: Plant Management

**Required Context Files:**
- `apps/crm/src/app/plants/` - Plant management pages (if exist)
- `apps/crm/src/components/plants/` - Plant-specific components
- `packages/contracts/src/index.ts` - Plant DTO types
- `apps/crm/src/lib/queries/plants.ts` - Plant query modules
- `apps/crm/src/lib/validations/plants.ts` - Plant validation schemas
- `apps/crm/src/lib/mappers/plants.ts` - Plant data mappers
- `apps/crm/src/app/api/plants/` - Plant API routes

**Cursor Prompt:**

```
Implement complete Safety Training plant management functionality:

1. Create plant listing page with:
   - Search and filtering
   - Sorting and pagination
   - Plant-based access control
   - Bulk operations

2. Build plant detail pages with:
   - Plant information display
   - User management
   - Course management
   - Training progress tracking
   - Compliance reporting

3. Implement plant forms for:
   - Creating new plants
   - Editing existing plants
   - Plant status management
   - User assignment

4. Ensure all functionality is type-safe and uses proper validation
```

**Expected Output:**

- Complete plant management with CRUD operations
- Plant listing with search, filtering, and pagination
- Plant detail pages with related data
- Plant-based access control

**Definition of Done:**

- ✅ Plant management with CRUD operations
- ✅ Plant-based access control working
- ✅ Search and filtering functional
- ✅ All features use proper validation and type safety

---

**Next Step:** Proceed to `17-contact-management.md`