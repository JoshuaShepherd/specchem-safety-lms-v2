# Supabase Auth Schema Preservation

## Overview

This document outlines how the Drizzle ORM integrates with the existing Safety database without interfering with Supabase authentication or existing Safety training functionality.

## Existing Supabase Auth Tables (DO NOT MODIFY)

### Core Auth Tables (Managed by Supabase)

- `auth.users` - User authentication data
- `auth.sessions` - User session management
- `auth.identities` - OAuth provider identities
- `auth.refresh_tokens` - Token refresh management
- `auth.mfa_factors` - Multi-factor authentication
- `auth.mfa_challenges` - MFA challenge tracking
- `auth.audit_log_entries` - Authentication audit logs
- `auth.flow_state` - Authentication flow state management
- `auth.instances` - Supabase instance configuration
- `auth.mfa_amr_claims` - MFA authentication method reference claims
- `auth.oauth_clients` - OAuth client configurations
- `auth.one_time_tokens` - One-time token management
- `auth.saml_providers` - SAML provider configurations
- `auth.saml_relay_states` - SAML relay state management
- `auth.schema_migrations` - Auth schema migration tracking
- `auth.sso_domains` - Single sign-on domain configurations
- `auth.sso_providers` - Single sign-on provider configurations

### Safety Project Tables (Existing - DO NOT MODIFY)

- `profiles` - User profiles linked to auth.users.id
- `plants` - Manufacturing plant locations (11 plants)
- `courses` - Training courses (3 courses)
- `enrollments` - User course enrollments (2 enrollments)
- `progress` - User progress tracking (2 progress records)
- `activity_events` - User activity logging
- `question_events` - Quiz response tracking
- `admin_roles` - User role management (2 admin roles)
- `audit_log` - System audit logging
- `schema_migrations` - Drizzle migration tracking

## Safety Training Integration Strategy

### 1. User Profile Extension

- **Safety Table**: `profiles`
- **Purpose**: Extends Supabase auth with Safety Training user data
- **Relationship**: Links to `auth.users.id` (one-to-one)
- **Key Principle**: Never modify auth.users directly

### 2. Naming Convention

- **Safety Tables**: All use descriptive names without prefixes
- **Examples**: `profiles`, `plants`, `courses`, `enrollments`
- **Existing Tables**: Left completely untouched

### 3. Authentication Flow

1. User authenticates via Supabase Auth (unchanged)
2. Safety app queries `auth.users` for authentication state
3. Safety app extends user data via `profiles` table
4. All Safety operations respect Supabase RLS policies

## Database Connection Strategy

### Environment Variables

```bash
# Primary connection for Safety Training operations
DATABASE_URL=postgresql://[supabase-connection-string]

# Supabase client for auth operations
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

### Drizzle Configuration

- **Schema Path**: `./src/lib/db/schema/*.ts` (Safety Training tables only)
- **Migration Prefix**: `safety_` (avoids conflicts with existing migrations)
- **Introspection**: Configured to work alongside existing tables

## Security Considerations

### Row Level Security (RLS)

- Existing RLS policies on Safety tables remain active
- Safety Training tables implement their own RLS policies
- No cross-table RLS policies between Safety and other schemas

### Data Isolation

- Safety Training schema is completely separate from other schemas
- No foreign key relationships between Safety Training and other tables
- User profiles table serves as the bridge between auth and training systems

## Migration Strategy

### Phase 1: Schema Creation

1. Create Safety Training tables with proper naming
2. No modifications to existing tables
3. Test that existing Safety functionality remains intact

### Phase 2: Integration

1. Implement user profile synchronization
2. Set up proper RLS policies for Safety Training tables
3. Test authentication flow end-to-end

### Phase 3: Data Migration (Future)

1. Migrate any existing Safety Training data if needed
2. Set up data synchronization between systems
3. Implement proper backup and rollback procedures

## Testing Checklist

- [ ] Existing Supabase auth login/logout works
- [ ] Safety app functionality remains intact
- [ ] Safety Training tables can be created without errors
- [ ] No naming conflicts with existing tables
- [ ] Database connection pooling works correctly
- [ ] RLS policies don't interfere between schemas
