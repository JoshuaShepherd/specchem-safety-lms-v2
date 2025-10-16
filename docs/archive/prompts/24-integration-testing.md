# Phase 8: Testing and Quality Assurance - Part 2 (Days 27-29)

## Step 8.2: Integration Testing

**Required Context Files:**
- `apps/crm/src/app/api/` - All API routes to test
- `apps/crm/src/lib/auth/` - Authentication system
- `apps/crm/src/lib/queries/` - Query modules
- `apps/crm/src/lib/db/` - Database connection and schemas
- `apps/crm/src/lib/mappers/` - Data mappers
- `packages/contracts/src/index.ts` - API contracts
- `tests/integration/` - Integration test directory (if exists)
- `tests/fixtures/` - Test data fixtures (if exist)

**Cursor Prompt:**

```
Implement integration testing for our Safety Training system:

1. Set up API route testing using **Vitest + React Testing Library**
2. Create database integration tests
3. Test authentication flows
4. Test data access layer
5. Test form submission flows

Ensure all integration points work correctly and handle errors properly.
```

**Expected Output:**

- API route testing with database integration
- Authentication flow testing
- Data access layer testing
- Form submission flow testing

**Definition of Done:**

- ✅ Integration testing for all API routes
- ✅ Authentication and data flows tested
- ✅ All integration points validated

---

**Next Step:** Proceed to `25-e2e-testing.md`