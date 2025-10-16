# Phase 8: Testing and Quality Assurance - Part 1 (Days 27-29)

## Step 8.1: Unit Testing

**Required Context Files:**
- `apps/crm/src/lib/` - All utility functions and libraries to test
- `apps/crm/src/lib/mappers/` - Data mapper functions
- `apps/crm/src/lib/validations/` - Validation schemas
- `packages/contracts/src/index.ts` - DTO schemas for fixture testing
- `apps/crm/src/components/` - Components to test
- `apps/crm/package.json` - Dependencies (vitest, testing-library)
- `tests/unit/` - Unit test directory (if exists)
- `vitest.config.ts` - Vitest configuration (if exists)

**Cursor Prompt:**

```
Set up comprehensive unit testing for our Safety Training system:

1. Add testing frameworks to existing app (**Vitest + React Testing Library**)
2. Create Safety business test utilities and helpers (alongside existing test setup)
3. Write unit tests for:
   - Utility functions
   - Data mappers
   - Validation schemas
   - Component rendering
   - Form validation

4. Set up test coverage reporting
5. Create testing best practices documentation

Ensure all critical functionality is covered by unit tests.
```

**Expected Output:**

- Testing frameworks configured (Vitest + React Testing Library)
- Unit tests for utilities, mappers, and components
- Test coverage reporting and documentation
- Testing best practices established

**Definition of Done:**

- ✅ Unit testing with >80% coverage
- ✅ Test utilities and helpers created
- ✅ Testing best practices documented

---

**Next Step:** Proceed to `24-integration-testing.md`