# Phase 1: Monorepo Transformation - Part 1 (Days 2-3)

## Step 1.1: Transform Existing App to Monorepo Structure

**Cursor Prompt:**

```
Transform our existing Next.js + Supabase starter app into a monorepo structure:

1. **Restructure the existing app into monorepo:**
   - Create `apps/safety/` directory and move existing app files there
   - Preserve all existing functionality (auth, pages, components)
   - Create root-level package.json with workspace configuration
   - Set up **pnpm-workspace.yaml** with apps/* and packages/* structure
   - Configure **turbo.json** with build → test → lint → type-check pipeline

2. **Create initial packages structure:**
   - `packages/ui/` - Will eventually hold shadcn/ui components
   - `packages/db/` - Will hold Drizzle schemas and database utilities
   - `packages/contracts/` - Will hold Zod schemas and TypeScript types
   - `packages/shared/` - Will hold shared utilities and configurations
   - Each package with basic package.json, **"exports"**, **"types"**, and tsup config

3. **Maintain existing app functionality:**
   - Keep all existing Supabase auth working in `apps/safety/`
   - Preserve existing API routes and middleware
   - Ensure development server still works: `cd apps/safety && npm run dev`
   - **No breaking changes** - app should work exactly as before

4. **Configure workspace tooling:**
   - Shared TypeScript configuration across workspace
   - Shared ESLint and Prettier configuration
   - **No canary versions** - all dependencies on LTS/stable releases
   - Set up proper import paths for future package usage

Transform incrementally - the working app stays functional throughout the process.
```

**Expected Output:**

- Monorepo structure with existing app moved to `apps/safety/`
- Empty package structure ready for gradual population
- **Existing Next.js + Supabase auth still working perfectly**
- **pnpm + turbo setup** with `pnpm-workspace.yaml` and `turbo.json`
- **Build pipeline**: build → test → lint → type-check
- Each package.json includes `"exports"`, `"types"`, and builds to `dist/` using tsup/tsc
- **CI scripts**: `pnpm build`, `pnpm type-check` (tsc --noEmit), `pnpm lint`, `pnpm test`
- Workspace dependencies properly configured
- **No functionality lost** - development server works from root or app directory

---

**Next Step:** Proceed to `02-enhance-existing-app.md`