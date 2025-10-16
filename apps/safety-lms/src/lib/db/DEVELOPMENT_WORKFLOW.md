# Safety Database Development Workflow

## Overview

This document outlines the development workflow for working with Drizzle ORM and the existing Safety database schema alongside Supabase authentication.

## Prerequisites

### Environment Setup

1. Ensure `DATABASE_URL` environment variable is set with Supabase connection string
2. Verify existing Supabase auth is working
3. Confirm no conflicts with existing Safety database tables

### Required Environment Variables

```bash
# Required for Drizzle operations (Safety Database)
DATABASE_URL=postgresql://postgres:[password]@db.radbukphijxenmgiljtu.supabase.co:5432/postgres

# Supabase Safety Project Configuration
NEXT_PUBLIC_SUPABASE_URL=https://radbukphijxenmgiljtu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: For development logging
NODE_ENV=development
```

## Development Commands

### Schema Development

#### 1. Generate Migration Files

```bash
pnpm db:generate
```

- Creates migration files in `./drizzle/` directory
- Only includes Safety training tables (existing schema)
- Preserves existing Supabase auth tables

#### 2. Apply Migrations

```bash
pnpm db:migrate
```

- Applies pending migrations to the database
- **WARNING**: Only run on development/staging databases
- **NEVER**: Run on production without testing first

#### 3. Push Schema Changes (Development Only)

```bash
pnpm db:push
```

- Directly pushes schema changes without migration files
- **Use only for development** - not recommended for production
- Useful for rapid prototyping

### Database Exploration

#### 4. Open Drizzle Studio

```bash
pnpm db:studio
```

- Opens web interface for database exploration
- View and edit Safety training tables
- **Note**: Shows all tables including existing Supabase auth tables
- **Do not modify**: auth.\* tables or existing Safety training tables

#### 5. Introspect Existing Schema

```bash
pnpm db:introspect
```

- Generates schema files from existing database structure
- Useful for understanding existing table structures
- **Output**: Creates schema files in `./drizzle/introspected/`

### Development Workflow

#### Typical Development Session

1. **Start Development Server**

   ```bash
   pnpm dev
   ```

2. **Make Schema Changes**
   - Edit schema files in `src/lib/db/schema/`
   - Add new tables, modify existing ones
   - Update relationships and constraints

3. **Generate Migration**

   ```bash
   pnpm db:generate
   ```

   - Review generated migration files
   - Ensure only Safety Training tables are affected

4. **Apply Changes**

   ```bash
   pnpm db:push  # For rapid development
   # OR
   pnpm db:migrate  # For proper migration workflow
   ```

5. **Verify Changes**

   ```bash
   pnpm db:studio
   ```

   - Check that new tables exist
   - Verify existing tables are unchanged

## Schema Organization

### File Structure

```
src/lib/db/schema/
├── index.ts              # Main schema exports
├── profiles.ts           # User profiles (linked to auth.users)
├── plants.ts            # Manufacturing plant locations
├── courses.ts           # Training courses
├── enrollments.ts       # User course enrollments
├── progress.ts          # User progress tracking
├── activity-events.ts   # User activity logging
├── question-events.ts   # Quiz response tracking
├── admin-roles.ts       # User role management
├── audit-log.ts         # System audit logging
├── relations.ts         # Table relationships
└── auth-preservation.md # Auth integration docs
```

### Naming Conventions

- **Table Names**: `snake_case` (e.g., `profiles`, `activity_events`)
- **Column Names**: `snake_case` (e.g., `created_at`, `user_id`)
- **Type Exports**: `PascalCase` (e.g., `Profile`, `NewProfile`)

## Integration with Supabase Auth

### Authentication Flow

1. User authenticates via Supabase Auth (unchanged)
2. Safety app queries `auth.users` for authentication state
3. Safety app extends user data via `profiles` table
4. All Safety operations respect Supabase RLS policies

### User Profile Synchronization

```typescript
// Example: Create user profile after auth signup
const createUserProfile = async (userId: string, userData: any) => {
  await db.insert(profiles).values({
    id: userId, // Links to auth.users.id
    plantId: userData.plantId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    jobTitle: userData.jobTitle,
    // ... other profile data
  });
};
```

## Testing Strategy

### Pre-Migration Testing

- [ ] Verify existing auth login/logout works
- [ ] Check Safety app functionality is intact
- [ ] Confirm no naming conflicts with existing tables

### Post-Migration Testing

- [ ] Test Safety table creation/updates
- [ ] Verify database connection pooling
- [ ] Check RLS policies don't interfere
- [ ] Test user profile synchronization

### Rollback Strategy

```bash
# If migration fails, restore from backup
# Or manually drop problematic tables
DROP TABLE IF EXISTS [table_name];
```

## Best Practices

### Schema Changes

1. **Never modify** existing Supabase auth tables
2. **Never modify** existing Safety training tables
3. **Use migrations** for production deployments
4. **Test thoroughly** before applying to production

### Database Operations

1. **Use transactions** for multi-table operations
2. **Implement proper error handling**
3. **Respect RLS policies** for data security
4. **Monitor connection pool** usage

### Development Environment

1. **Use separate database** for development
2. **Regular backups** before major changes
3. **Version control** all schema changes
4. **Document breaking changes**

## Troubleshooting

### Common Issues

#### 1. Migration Conflicts

```bash
# Check for conflicting table names
pnpm db:introspect
```

#### 2. Connection Issues

```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL
```

#### 3. Schema Sync Issues

```bash
# Force regenerate schema
rm -rf drizzle/
pnpm db:generate
```

### Getting Help

1. Check Drizzle documentation
2. Review Supabase auth integration docs
3. Consult team for existing Safety database knowledge
4. Test in isolated development environment first
