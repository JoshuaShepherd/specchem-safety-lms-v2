# Phase 6: Core Features Implementation - Part 3 (Days 16-22)

## Step 6.3: Course Management & Training Pipeline

**Required Context Files:**
- `apps/crm/src/app/courses/` - Course management pages (if exist)
- `apps/crm/src/components/courses/` - Course components
- `packages/contracts/src/index.ts` - Course and enrollment DTO types
- `apps/crm/src/lib/queries/courses.ts` - Course query modules
- `apps/crm/src/lib/validations/courses.ts` - Course validation schemas
- `apps/crm/src/lib/mappers/courses.ts` - Course data mappers
- `apps/crm/src/app/api/courses/` - Course API routes
- `apps/crm/src/lib/db/schema/courses.ts` - Course database schema
- `apps/crm/src/lib/db/schema/enrollments.ts` - Enrollment database schema

**Cursor Prompt:**

```
Implement the Safety Training course management and training pipeline:

1. Create course listing with training pipeline view
2. Build course forms and management
3. Implement enrollment progression tracking
4. Add training completion reporting
5. Create course-plant-user relationships
6. Implement course search and filtering

Ensure the pipeline view is intuitive and all data is properly validated.
```

**Expected Output:**

- Training pipeline with enrollment progression
- Course forms and management interface
- Training completion and reporting capabilities
- Relationships with plants and users

**Definition of Done:**

- ✅ Training pipeline with enrollment progression
- ✅ Course-plant-user relationships working
- ✅ All features use proper validation and type safety

---

**Next Step:** Proceed to `19-activity-logging.md`