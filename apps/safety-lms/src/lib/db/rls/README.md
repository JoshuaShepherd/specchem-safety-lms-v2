# Safety Business RLS (Row-Level Security) Documentation

## Overview

This directory contains comprehensive Row-Level Security (RLS) policies for Safety business tables, designed to provide secure, territory-based access control while preserving existing Safety training functionality.

## Key Principles

### 1. **Preservation of Existing Systems**

- ✅ **Existing auth.users and auth.sessions policies remain untouched**
- ✅ **Existing Safety training table policies (profiles, plants, courses, etc.) are preserved**
- ✅ **No interference with current Safety training functionality**
- ✅ **Separate RLS policies for Safety business vs Safety training data**

### 2. **Territory-Based Access Control**

- Users can only access data within their assigned territory
- Safety admins can access all territories
- Safety managers have territory-wide access
- Data isolation between different territories

### 3. **Role-Based Permissions**

- **safety_admin**: Full access to all Safety business data
- **safety_manager**: Territory-wide management capabilities
- **safety_coordinator**: Territory-wide coordination and project management
- **safety_rep**: Territory-wide sales and customer management
- **safety_instructor**: Training-focused access
- **plant_manager**: Plant-specific access
- **hr_admin**: HR-focused access
- **employee**: Limited access to own records and territory data

### 4. **Owner-Based Access**

- Users can always access records they own
- Record ownership is tracked via `owner_id` and `created_by` fields
- Admins and managers can access owned records across territories

## Files Structure

```
apps/crm/src/lib/db/rls/
├── README.md                           # This documentation
├── safety-business-policies.sql        # Main RLS policies for Safety business tables
├── rls-test-framework.sql              # Comprehensive testing framework
└── rls-tests.spec.ts                   # TypeScript test suite
```

## Safety Business Tables Covered

| Table           | Description                                  | RLS Policies                                |
| --------------- | -------------------------------------------- | ------------------------------------------- |
| `territories`   | Regional foundation for safety operations    | Territory visibility, admin management      |
| `user_profiles` | Extended user profiles for Safety business   | Own profile access, territory-based viewing |
| `accounts`      | Safety equipment and service customers       | Territory access, role-based management     |
| `branches`      | Physical locations for safety operations     | Account-based access control                |
| `contacts`      | Individual people in safety operations       | Account-based access, owner-based access    |
| `activity_logs` | Safety-related activities and interactions   | User-based access, territory-based viewing  |
| `opportunities` | Sales pipeline for safety equipment/services | Territory access, role-based management     |
| `sales_facts`   | Historical sales data for reporting          | Territory access, user-based access         |
| `products`      | Safety equipment and services catalog        | Territory access, role-based management     |
| `projects`      | Construction and safety projects             | Territory access, role-based management     |

## Access Control Matrix

### Territory Access Patterns

| User Role          | Territory Access               | Cross-Territory Access  |
| ------------------ | ------------------------------ | ----------------------- |
| safety_admin       | All territories                | ✅ Full access          |
| safety_manager     | Own territory + admin override | ✅ Admin can access all |
| safety_coordinator | Own territory                  | ❌ Blocked              |
| safety_rep         | Own territory                  | ❌ Blocked              |
| safety_instructor  | Own territory                  | ❌ Blocked              |
| plant_manager      | Own territory                  | ❌ Blocked              |
| hr_admin           | Own territory                  | ❌ Blocked              |
| employee           | Own territory (limited)        | ❌ Blocked              |

### CRUD Operations by Role

| Operation  | safety_admin | safety_manager   | safety_coordinator   | safety_rep                        | employee             |
| ---------- | ------------ | ---------------- | -------------------- | --------------------------------- | -------------------- |
| **SELECT** | All data     | Territory data   | Territory data       | Territory data                    | Own + territory data |
| **INSERT** | All tables   | Territory tables | Projects, activities | Accounts, contacts, opportunities | Activities only      |
| **UPDATE** | All data     | Territory data   | Own + territory data | Own + territory data              | Own data only        |
| **DELETE** | All data     | Territory data   | Own data only        | Own data only                     | Own data only        |

### Table-Specific Access Rules

#### Territories Table

- **View**: All authenticated users can view active territories
- **Manage**: Safety admins only

#### User Profiles Table

- **View Own**: All users can view their own profile
- **Update Own**: All users can update their own profile
- **View Territory**: Managers and coordinators can view territory profiles
- **Manage All**: Safety admins only

#### Accounts Table

- **View**: Territory access + owned records
- **Create**: Safety admins, managers, reps
- **Update**: Owners + territory managers/admins
- **Delete**: Safety admins and managers only

#### Branches Table

- **View**: Based on account access
- **Manage**: Based on account management permissions

#### Contacts Table

- **View**: Based on account access + owned records
- **Create**: Safety admins, managers, reps
- **Update**: Owners + territory managers/admins
- **Delete**: Safety admins and managers only

#### Activity Logs Table

- **View**: Own activities + territory account activities
- **Create**: All users (own activities)
- **Update**: Own activities + territory managers/admins
- **Delete**: Territory managers/admins only

#### Opportunities Table

- **View**: Territory access + owned records
- **Create**: Safety admins, managers, reps
- **Update**: Owners + territory managers/admins
- **Delete**: Safety admins and managers only

#### Sales Facts Table

- **View**: Territory access + owned records
- **Create**: Safety admins and managers only
- **Update**: Safety admins and managers only
- **Delete**: Safety admins only

#### Products Table

- **View**: Territory access
- **Manage**: Safety admins and managers only

#### Projects Table

- **View**: Territory access + owned records
- **Create**: Safety admins, managers, coordinators
- **Update**: Owners + territory managers/admins
- **Delete**: Safety admins and managers only

## Helper Functions

### Territory Functions

- `get_user_territory_id()` - Get current user's territory ID
- `get_user_territory_id_by_user(user_id)` - Get specific user's territory ID
- `can_access_territory(user_id, territory_id)` - Check territory access

### Role Functions

- `has_safety_role(user_id, role)` - Check specific Safety role
- `is_safety_admin_or_manager(user_id)` - Check admin/manager status
- `owns_record_or_is_admin(user_id, owner_id)` - Check ownership or admin

## Integration with Existing Systems

### Safety Training Tables (Preserved)

- `profiles` - User profiles linked to auth.users.id
- `plants` - Manufacturing plant locations
- `courses` - Training courses
- `enrollments` - User course enrollments
- `progress` - User progress tracking
- `activity_events` - User activity logging
- `question_events` - Quiz response tracking
- `admin_roles` - User role management
- `audit_log` - System audit logging

### Supabase Auth Tables (Untouched)

- `auth.users` - User authentication data
- `auth.sessions` - User session management
- `auth.identities` - OAuth provider identities
- All other auth.\* tables remain completely untouched

## Testing Framework

### SQL Testing Functions

- `setup_test_territories()` - Create test territories
- `setup_test_users()` - Create test users with different roles
- `setup_test_accounts()` - Create test accounts
- `run_all_rls_tests()` - Execute comprehensive test suite
- `cleanup_test_data()` - Clean up test data

### Test Categories

1. **Territory Isolation Tests** - Verify cross-territory access prevention
2. **Role-based Access Tests** - Verify role permission enforcement
3. **Owner-based Access Tests** - Verify record ownership rules
4. **Cross-territory Prevention Tests** - Verify territory boundaries
5. **Admin Override Tests** - Verify admin capabilities

### TypeScript Test Suite

- Comprehensive test coverage with Vitest
- Integration tests with Drizzle ORM
- Real-world query scenarios
- Automated test execution

## Usage Instructions

### 1. Apply RLS Policies

```sql
-- Run the main policy file
\i apps/crm/src/lib/db/rls/safety-business-policies.sql
```

### 2. Run Tests

```sql
-- Setup and run all tests
SELECT setup_test_territories();
SELECT setup_test_users();
SELECT setup_test_accounts();
SELECT * FROM run_all_rls_tests();

-- Cleanup
SELECT cleanup_test_data();
```

### 3. TypeScript Testing

```bash
# Run the TypeScript test suite
npm test apps/crm/src/lib/db/rls/rls-tests.spec.ts
```

## Security Considerations

### Data Isolation

- ✅ **Territory boundaries are enforced at the database level**
- ✅ **No cross-territory data leakage possible**
- ✅ **Admin access is properly logged and auditable**

### Role Hierarchy

- ✅ **Clear role hierarchy with appropriate permissions**
- ✅ **Principle of least privilege applied**
- ✅ **Escalation paths for legitimate business needs**

### Audit Trail

- ✅ **All RLS policies are documented and testable**
- ✅ **Policy changes require explicit migration**
- ✅ **Comprehensive test coverage ensures policy integrity**

## Migration Strategy

### Phase 1: Policy Creation

1. Create helper functions for territory and role checking
2. Apply RLS policies to Safety business tables
3. Verify policies don't interfere with existing systems

### Phase 2: Testing and Validation

1. Run comprehensive test suite
2. Validate territory isolation
3. Test role-based access control
4. Verify admin override capabilities

### Phase 3: Integration

1. Test with real application queries
2. Validate Drizzle ORM integration
3. Performance testing with RLS enabled
4. User acceptance testing

## Troubleshooting

### Common Issues

#### "Insufficient Privilege" Errors

- **Cause**: User doesn't have required role or territory access
- **Solution**: Check user's role and territory assignment
- **Debug**: Use helper functions to verify access permissions

#### Cross-Territory Access Denied

- **Cause**: RLS policies correctly blocking cross-territory access
- **Solution**: Use admin user or check if access is actually needed
- **Debug**: Verify territory assignments and role permissions

#### Performance Issues

- **Cause**: RLS policies adding overhead to queries
- **Solution**: Ensure proper indexes on territory_id and role columns
- **Debug**: Use EXPLAIN ANALYZE to identify bottlenecks

### Debug Commands

```sql
-- Check user's territory
SELECT get_user_territory_id();

-- Check user's role
SELECT role FROM user_profiles WHERE auth_user_id = get_current_user_id();

-- Check territory access
SELECT can_access_territory(get_current_user_id(), 'territory-id-here');

-- View accessible records
SELECT COUNT(*) FROM accounts; -- Will be filtered by RLS
```

## Best Practices

### Development

1. **Always test RLS policies after schema changes**
2. **Use the test framework to validate new policies**
3. **Document any new helper functions**
4. **Maintain clear role hierarchy**

### Production

1. **Monitor RLS policy performance**
2. **Regular security audits of access patterns**
3. **Backup and recovery testing with RLS**
4. **User training on territory and role concepts**

### Maintenance

1. **Regular review of user roles and territories**
2. **Cleanup of inactive user accounts**
3. **Audit logs for admin actions**
4. **Performance optimization of RLS policies**

## Future Enhancements

### Planned Features

- **Dynamic territory assignment based on business rules**
- **Time-based access controls for temporary permissions**
- **Advanced audit logging for RLS policy decisions**
- **Integration with external identity providers**

### Monitoring

- **Real-time RLS policy performance metrics**
- **Access pattern analytics**
- **Security event monitoring**
- **Automated policy compliance checking**

---

**Note**: This RLS implementation is designed to work alongside existing Safety training systems without any interference. All existing auth and training functionality remains completely unchanged.
