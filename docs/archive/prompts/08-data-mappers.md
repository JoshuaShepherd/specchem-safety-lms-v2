# Phase 3: Type Contracts & Validation - Part 2 (Days 6-8)

## Step 3.2: Create Safety Training Data Mappers

**Required Context Files:**
- `packages/contracts/src/index.ts` - DTO schemas and types
- `apps/crm/src/lib/db/schema/` - Database schema files
- `apps/crm/src/lib/db/schema/relations.ts` - Database relationships
- `packages/shared/src/index.ts` - Shared utilities and types
- `apps/crm/src/lib/mappers/` - Existing mapper files (if any)
- `apps/crm/src/lib/supabase/` - Supabase client configuration

**Cursor Prompt:**

```
Create data mapper functions that handle transformation between Safety Training entities and API responses, integrating with existing auth system:

1. **Safety training-specific data transformations:**
   - Plant database entities (Drizzle) ↔ Plant API responses
   - Course database entities ↔ Course API responses with plant scoping
   - User profile entities ↔ User API responses with plant and role context
   - Enrollment entities ↔ Enrollment API responses with progress tracking
   - Progress entities ↔ Progress API responses with completion metrics
   - Activity event entities ↔ Event API responses with audit trails
   - Question event entities ↔ Assessment API responses with quiz data

2. **Auth + Safety training integration mappers:**
   - auth.users + user_profiles → Complete user responses with plant context
   - Plant-scoped database queries → Plant-isolated API responses
   - Role-based database access → Permission-filtered API data (safety_admin, plant_manager, etc.)
   - Course + enrollment entities → Training pipeline responses
   - Progress + activity events → Compliance tracking responses

3. **Plant-based multi-tenancy mappers:**
   - Plant-scoped user filtering → Plant-specific user lists
   - Plant-scoped course filtering → Plant-specific course catalogs
   - Plant-scoped enrollment filtering → Plant-specific training assignments
   - Plant-scoped progress filtering → Plant-specific compliance data
   - Cross-plant admin access → Multi-plant aggregated responses

4. **Safety training workflow mappers:**
   - Course creation data → Course entity with plant assignment
   - Enrollment assignment data → Enrollment entity with plant scoping
   - Progress tracking data → Progress entity with completion metrics
   - Assessment data → Question events with scoring and timing
   - Compliance data → Activity events with audit trails

5. **Mapper implementation requirements:**
   - Preserve existing auth data transformation patterns
   - Add plant-based data isolation and filtering
   - Handle safety training date fields (enrollment dates, expiration dates, completion dates)
   - Implement role-based field visibility (employee vs. safety_admin visibility)
   - Add compliance tracking and audit trail transformations
   - Ensure type safety for plant-scoped combined types
   - Handle training-specific status enums and progress calculations

6. **Integration safeguards:**
   - Don't modify existing auth mappers
   - Create separate safety training mapper namespace
   - Test that auth endpoints remain unaffected
   - Validate plant-scoped responses are properly isolated
   - Ensure role-based access control is enforced in transformations

7. **Monorepo optimization:**
   - Design safety mappers for reuse across multiple applications
   - Create shared plant and role transformation utilities
   - Ensure mappers work with both single-app and multi-app deployments
   - Build plant-scoped data access patterns for consistency

Create a centralized safety training mapper system that integrates seamlessly with existing auth mappers while enforcing plant-based multi-tenancy and role-based access control.
```

**Expected Output:**

- Plant-scoped data mappers integrated with existing auth system
- Auth+Safety combined response transformation utilities with plant context
- Plant-based multi-tenancy data filtering mappers
- Role-based access control transformation utilities (safety_admin, plant_manager, etc.)
- Training workflow mappers (courses, enrollments, progress, events)
- Compliance tracking and audit trail transformation utilities
- Centralized safety mapper system for monorepo consistency
- Type-safe transformations with plant isolation and business logic

**Definition of Done:**

- ✅ Plant-scoped data mappers integrate seamlessly with existing auth mappers
- ✅ Plant-based multi-tenancy transformation utilities implemented
- ✅ Role-based access control mappers working correctly (safety_admin, plant_manager, safety_instructor, hr_admin, safety_coordinator, employee)
- ✅ Training workflow mappers implemented (courses ↔ enrollments ↔ progress ↔ events)
- ✅ Compliance tracking and audit trail mappers functional
- ✅ All safety transformations are type-safe and validated with plant scoping
- ✅ Plant data isolation enforced in all transformations
- ✅ Existing auth endpoints unaffected by safety mapper additions

---

**Next Step:** Proceed to `09-api-contracts.md`