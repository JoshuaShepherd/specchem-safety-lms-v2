# Safety Training Data Mappers

This directory contains a comprehensive data mapper system for the Safety Training application, providing plant-based multi-tenancy, role-based access control, and seamless integration with the existing authentication system.

## Overview

The Safety Training Data Mappers provide a centralized system for transforming data between database entities and API responses while enforcing:

- **Plant-based Multi-tenancy**: All data is isolated by plant boundaries
- **Role-based Access Control**: Different user roles have different permissions
- **Auth Integration**: Seamless integration with Supabase authentication
- **Type Safety**: Full TypeScript support with strict type checking
- **Audit Trails**: Comprehensive logging and compliance tracking

## Architecture

### Core Components

1. **Individual Mappers**: Specialized mappers for each entity type
2. **Centralized System**: Unified interface for all transformations
3. **Auth Integration**: Seamless auth system integration
4. **Plant Scoping**: Multi-tenant data isolation
5. **Role-based Access**: Hierarchical permission system
6. **Compliance Tracking**: Audit trails and compliance monitoring

### File Structure

```
mappers/
├── index.ts                           # Main exports
├── safety-mapper-system.ts            # Centralized system
├── plant-mappers.ts                   # Plant entity mappers
├── user-mappers.ts                    # User profile mappers
├── course-mappers.ts                  # Course entity mappers
├── enrollment-mappers.ts              # Enrollment mappers
├── progress-mappers.ts                # Progress tracking mappers
├── activity-mappers.ts                # Activity event mappers
├── auth-integration-mappers.ts        # Auth system integration
├── plant-scoped-mappers.ts            # Plant-based filtering
├── role-based-mappers.ts              # Role-based access control
├── compliance-mappers.ts              # Compliance and audit trails
├── __tests__/                         # Integration tests
│   └── safety-mapper-integration.test.ts
└── README.md                          # This documentation
```

## Usage

### Basic Usage

```typescript
import { createSafetyMapperSystem } from "@/lib/mappers";

// Create mapper system with user context
const mapperSystem = createSafetyMapperSystem({
  userRole: "safety_admin",
  userPlantId: "plant-1",
  requesterUserId: "user-1",
  enforcePlantIsolation: true,
  enableAuditTrail: true,
});

// Map plant data
const plantResult = mapperSystem.mapPlant(plantEntity, "read");
console.log(plantResult.data); // Mapped plant data
console.log(plantResult.metadata.accessControl.hasAccess); // true

// Map user profile
const userResult = mapperSystem.mapUserProfile(userProfile, "read");
console.log(userResult.data); // Mapped user data

// Validate operations
const canCreate = mapperSystem.validateOperation("create", "user");
console.log(canCreate.canPerform); // true for safety_admin
```

### Plant-Scoped Responses

```typescript
// Create plant-scoped response
const response = mapperSystem.createPlantScopedResponse(
  { courses: mappedCourses },
  plantEntity
);

console.log(response.data.plant.id); // Plant context
console.log(response.data.data.courses); // Actual data
```

### Role-Based Field Filtering

```typescript
import { USER_PROFILE_FIELD_VISIBILITY } from "@/lib/mappers";

// Filter fields based on user role
const filteredData = mapperSystem.filterFieldsByRole(
  userData,
  USER_PROFILE_FIELD_VISIBILITY
);

// Only fields visible to the user's role will be included
```

## Role Hierarchy

The system implements a hierarchical role system:

1. **safety_admin** (100) - Full system access
2. **plant_manager** (80) - Plant-scoped management
3. **safety_instructor** (60) - Course and progress management
4. **hr_admin** (60) - User and enrollment management
5. **safety_coordinator** (40) - Limited course editing
6. **employee** (20) - Self-service only

### Role Permissions

Each role has specific permissions:

```typescript
const permissions = mapperSystem.getRolePermissions();

// safety_admin permissions
permissions.canManageAllPlants; // true
permissions.canManageUsers; // true
permissions.canManageCourses; // true
permissions.canViewAllData; // true
permissions.canManageAdminRoles; // true

// employee permissions
permissions.canManageAllPlants; // false
permissions.canManageUsers; // false
permissions.canManageCourses; // false
permissions.canViewAllData; // false
permissions.canManageAdminRoles; // false
```

## Plant-Based Multi-Tenancy

### Plant Isolation

All data is automatically filtered by plant boundaries:

```typescript
// Safety admins can access all plants
const adminSystem = createSafetyMapperSystem({
  userRole: "safety_admin",
  userPlantId: "plant-1",
});

// Other roles are limited to their plant
const managerSystem = createSafetyMapperSystem({
  userRole: "plant_manager",
  userPlantId: "plant-1",
});

// Cross-plant access is denied for non-admins
const crossPlantSystem = createSafetyMapperSystem({
  userRole: "plant_manager",
  userPlantId: "plant-2", // Different plant
});
```

### Plant-Scoped Queries

```typescript
import { PlantScopedMappers } from "@/lib/mappers";

// Create plant-scoped filters
const filters = PlantScopedMappers.mapPlantScopeToDbFilters(
  "safety_admin",
  "plant-1",
  "plant-2" // Optional specific plant
);

// Validate plant access
const access = PlantScopedMappers.validatePlantAccess(
  "plant_manager",
  "plant-1",
  "plant-2"
);

console.log(access.hasAccess); // false for cross-plant access
```

## Auth Integration

### Auth User Mapping

```typescript
import { AuthIntegrationMappers } from "@/lib/mappers";

// Map auth user to complete context
const authContext = AuthIntegrationMappers.mapAuthUserToCompleteContext(
  supabaseUser,
  userProfile,
  plantEntity,
  "safety_admin"
);

// Convert to API response
const apiResponse =
  AuthIntegrationMappers.mapAuthProfileToApiResponse(authContext);
```

### Auth Validation

```typescript
// Validate auth for safety training
const validation = AuthIntegrationMappers.validateAuthForSafetyTraining(
  supabaseUser,
  userProfile,
  plantEntity,
  "safety_admin",
  "plant-1"
);

if (validation.isValid) {
  console.log(validation.user); // Complete user context
  console.log(validation.plantAccess); // Plant access info
}
```

## Compliance and Audit Trails

### Compliance Tracking

```typescript
import { ComplianceMappers } from "@/lib/mappers";

// Map enrollment to compliance record
const complianceRecord = ComplianceMappers.mapToComplianceRecord(
  enrollment,
  progress,
  userProfile,
  course,
  plant,
  true // isRequired
);

// Create compliance summary
const summary = ComplianceMappers.mapPlantDataToComplianceSummary(plant, [
  complianceRecord,
]);
```

### Audit Trails

```typescript
// Map activity events to audit trail
const auditTrail = ComplianceMappers.mapActivityEventsToAuditTrail(
  activityEvents,
  userMap,
  plantMap
);

// Each audit entry includes:
// - User information
// - Action performed
// - Resource affected
// - Plant context
// - Timestamp
// - Additional metadata
```

## Training Workflow Mappers

### Enrollment Workflow

```typescript
import { EnrollmentMappers } from "@/lib/mappers";

// Map enrollment to workflow status
const workflowStatus = EnrollmentMappers.mapEnrollmentToWorkflowStatus(
  enrollment,
  user,
  course,
  plant,
  progress,
  expiresAt
);

console.log(workflowStatus.nextSteps); // ["Continue training", "Complete section: introduction"]
console.log(workflowStatus.isOverdue); // false
console.log(workflowStatus.daysUntilExpiration); // 30
```

### Progress Tracking

```typescript
import { ProgressMappers } from "@/lib/mappers";

// Map progress to completion tracking
const completionTracking = ProgressMappers.mapProgressToCompletionTracking(
  enrollment,
  progress,
  milestones,
  certificate,
  user,
  course,
  plant
);

console.log(completionTracking.nextSteps); // ["Review certificate"]
console.log(completionTracking.certificate?.expiresAt); // "2025-01-01T00:00:00Z"
```

## Error Handling

### Access Control Errors

```typescript
try {
  const result = mapperSystem.mapPlant(plantEntity, "read");
  if (!result.metadata.accessControl.hasAccess) {
    throw new Error(result.metadata.accessControl.reason);
  }
} catch (error) {
  console.error("Access denied:", error.message);
}
```

### Plant Isolation Violations

```typescript
const result = mapperSystem.mapMultipleEntities(
  entities,
  mapper,
  "test-entities"
);

if (!result.metadata.plantIsolation.isIsolated) {
  console.error(
    "Plant isolation violations:",
    result.metadata.plantIsolation.violations
  );
}
```

## Testing

### Integration Tests

The system includes comprehensive integration tests:

```bash
# Run mapper integration tests
npm test src/lib/mappers/__tests__/safety-mapper-integration.test.ts
```

### Test Coverage

Tests cover:

- Auth integration compatibility
- Plant-based multi-tenancy
- Role-based access control
- Training workflow mappers
- Compliance tracking
- Error handling
- Constants and configuration

## Constants and Configuration

### Available Constants

```typescript
import { SAFETY_MAPPER_CONSTANTS } from "@/lib/mappers";

SAFETY_MAPPER_CONSTANTS.DEFAULT_PAGE_SIZE; // 20
SAFETY_MAPPER_CONSTANTS.MAX_PAGE_SIZE; // 100
SAFETY_MAPPER_CONSTANTS.DEFAULT_SORT_ORDER; // "desc"
SAFETY_MAPPER_CONSTANTS.SUPPORTED_OPERATIONS; // ["read", "create", "update", "delete"]
SAFETY_MAPPER_CONSTANTS.SUPPORTED_RESOURCES; // ["plants", "users", "courses", ...]
SAFETY_MAPPER_CONSTANTS.ROLE_HIERARCHY; // Role hierarchy mapping
SAFETY_MAPPER_CONSTANTS.FIELD_VISIBILITY; // Field visibility configurations
```

### Field Visibility

```typescript
// User profile field visibility
SAFETY_MAPPER_CONSTANTS.FIELD_VISIBILITY.USER_PROFILE.id.roles; // ["safety_admin", "plant_manager", ...]
SAFETY_MAPPER_CONSTANTS.FIELD_VISIBILITY.USER_PROFILE.authUserId.roles; // ["safety_admin", "plant_manager"]

// Course field visibility
SAFETY_MAPPER_CONSTANTS.FIELD_VISIBILITY.COURSE.name.roles; // All roles can see course name
SAFETY_MAPPER_CONSTANTS.FIELD_VISIBILITY.COURSE.isRequired.roles; // ["safety_admin", "plant_manager", "hr_admin"]
```

## Best Practices

### 1. Always Use the Centralized System

```typescript
// ✅ Good
const mapperSystem = createSafetyMapperSystem(config);
const result = mapperSystem.mapUserProfile(profile);

// ❌ Avoid direct mapper usage
const result = UserMappers.mapUserProfileToApiResponse(profile);
```

### 2. Validate Operations Before Performing

```typescript
// ✅ Good
const canCreate = mapperSystem.validateOperation("create", "user");
if (canCreate.canPerform) {
  // Perform operation
}

// ❌ Avoid assuming permissions
// Perform operation directly
```

### 3. Handle Plant Isolation

```typescript
// ✅ Good
const result = mapperSystem.mapMultipleEntities(
  entities,
  mapper,
  "entity-type"
);
if (!result.metadata.plantIsolation.isIsolated) {
  // Handle violations
}

// ❌ Avoid ignoring plant isolation
// Process entities without validation
```

### 4. Use Role-Based Field Filtering

```typescript
// ✅ Good
const filteredData = mapperSystem.filterFieldsByRole(
  userData,
  USER_PROFILE_FIELD_VISIBILITY
);

// ❌ Avoid exposing all fields
// Return userData directly
```

### 5. Enable Audit Trails for Sensitive Operations

```typescript
// ✅ Good
const mapperSystem = createSafetyMapperSystem({
  ...config,
  enableAuditTrail: true,
});

// ❌ Avoid disabling audit trails for compliance operations
```

## Migration Guide

### From Direct Mapper Usage

If you're currently using individual mappers directly:

```typescript
// Before
const userData = UserMappers.mapUserProfileToApiResponse(profile);

// After
const mapperSystem = createSafetyMapperSystem(config);
const result = mapperSystem.mapUserProfile(profile);
const userData = result.data;
```

### Adding Plant Scoping

```typescript
// Before
const courses = CourseMappers.mapCoursesToApiResponses(courseEntities);

// After
const result = mapperSystem.mapMultipleEntities(
  courseEntities,
  course => mapperSystem.mapCourse(course).data,
  "courses"
);
const courses = result.data;
```

## Troubleshooting

### Common Issues

1. **Access Denied Errors**
   - Check user role and plant assignment
   - Verify plant access permissions
   - Ensure proper role hierarchy

2. **Plant Isolation Violations**
   - Verify all entities have correct plantId
   - Check plant scoping configuration
   - Ensure proper filtering

3. **Field Visibility Issues**
   - Check role permissions
   - Verify field visibility configuration
   - Ensure proper role assignment

4. **Auth Integration Problems**
   - Verify Supabase user data
   - Check profile existence and status
   - Ensure proper auth context

### Debug Mode

Enable debug logging:

```typescript
const mapperSystem = createSafetyMapperSystem({
  ...config,
  enableAuditTrail: true, // Enables detailed logging
});
```

## Contributing

When adding new mappers:

1. Follow the existing patterns
2. Add comprehensive tests
3. Update documentation
4. Ensure plant isolation
5. Implement role-based access control
6. Add audit trail support

## Support

For questions or issues:

1. Check the integration tests for examples
2. Review the existing mapper implementations
3. Consult the role hierarchy and permissions
4. Verify plant scoping configuration
