# Phase 2: Database and Schema Setup - Part 1 (Days 4-5)

## Step 2.1: Set Up Drizzle ORM with Existing Supabase

**Cursor Prompt:**

```
Integrate Drizzle ORM with our existing Supabase setup to prepare for Safety schema:

1. **Configure Drizzle alongside existing Supabase:**
   - Create drizzle.config.ts in `apps/safety/` using existing Supabase connection
   - Use the same database connection string and credentials
   - **Don't break existing Supabase auth** - Drizzle works alongside it

2. **Set up Safety schema structure:**
   - Create `apps/safety/lib/db/schema/` directory for schema files
   - Plan for our 10 core Safety tables (territories, accounts, contacts, etc.)
   - Set up schema exports and TypeScript type generation
   - Configure migration system for Safety tables only

3. **Preserve existing auth tables:**
   - Document existing Supabase auth schema (don't modify it)
   - Ensure Drizzle doesn't interfere with auth.users and related tables
   - Plan integration between auth.users and our user_profiles table

4. **Set up development workflow:**
   - Create migration scripts for Safety schema development
   - Set up database introspection to work with existing + new tables
   - Test that existing auth still works with Drizzle running

**Key Principle:** Add Safety schema to existing database without breaking authentication.
```

**Expected Output:**

- Drizzle ORM working alongside existing Supabase setup
- Safety schema development environment ready
- Migration system for Safety tables configured
- **Existing authentication completely preserved**

**Definition of Done:**

- ✅ Drizzle ORM connected to existing Supabase database
- ✅ Safety schema structure ready for development
- ✅ **Existing auth system works perfectly** (sign-in, sign-up, etc.)
- ✅ Migration system ready for Safety table creation
- ✅ Development workflow established for schema changes

---

**Next Step:** Proceed to `05-safety-schema-creation.md`