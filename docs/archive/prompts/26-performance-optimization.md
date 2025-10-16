# Phase 9: Production Readiness - Part 1 (Days 30-31)

## Step 9.1: Performance Optimization

**Required Context Files:**
- `apps/crm/src/app/` - Application structure for code splitting
- `apps/crm/src/components/` - Components for lazy loading
- `apps/crm/src/lib/queries/` - Query modules for optimization
- `apps/crm/drizzle.config.ts` - Database configuration
- `apps/crm/src/lib/db/schema/` - Database schemas for index optimization
- `next.config.ts` - Next.js configuration
- `apps/crm/package.json` - Dependencies and bundle analysis
- `apps/crm/src/lib/monitoring/` - Monitoring utilities (if exist)

**Cursor Prompt:**

```
Optimize our enhanced Next.js + Safety Training app for production performance:

1. Implement code splitting and lazy loading
2. Optimize database queries and indexing
3. Add caching strategies
4. Optimize bundle size
5. **Observability & error boundaries**:
   - **Hook API errors to logger (Sentry/OTel) with requestId correlation**
   - **Add React error boundaries for data-heavy pages**

Ensure the application loads quickly and performs well under load.
```

**Expected Output:**

- Code splitting and lazy loading implemented
- Database query optimization and indexing
- Caching strategies for performance
- Observability and error boundaries

**Definition of Done:**

- ✅ Performance optimized for production
- ✅ Bundle size optimized
- ✅ Observability and error boundaries implemented

---

**Next Step:** Proceed to `27-security-hardening.md`