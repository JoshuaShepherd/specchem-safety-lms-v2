# Safety Training API Contracts

## Overview

This document describes the comprehensive Safety Training API contracts that integrate with existing auth endpoints while maintaining clear separation and plant-scoped data access.

## Key Features

- **Plant-scoped Multi-tenancy**: All operations are scoped to specific plants
- **Role-based Access Control**: Granular permissions for different user roles
- **Auth Integration**: Seamless integration with existing authentication system
- **Comprehensive Tracking**: Course progress, activity events, and question responses
- **Bulk Operations**: Efficient bulk enrollment and management operations
- **File Upload**: Course material and document management
- **Type Safety**: Full TypeScript support with strict validation

## API Endpoint Structure

All Safety Training endpoints are prefixed with `/api/safety-training` to avoid conflicts with existing auth routes:

```
/api/safety-training/plants                    # Plant management
/api/safety-training/plants/:plantId/courses   # Course management
/api/safety-training/plants/:plantId/enrollments # Enrollment management
/api/safety-training/plants/:plantId/progress  # Progress tracking
/api/safety-training/plants/:plantId/activity-events # Activity tracking
/api/safety-training/plants/:plantId/admin-roles # Admin role management
/api/safety-training/users/:userId/...         # User-specific operations
/api/safety-training/auth/context              # Auth integration
```

## Entity Models

### Core Entities

1. **Plant** - Represents a physical location or facility
2. **Course** - Training course content and metadata
3. **Enrollment** - User enrollment in a course
4. **Progress** - User progress through a course
5. **ActivityEvent** - User activity tracking
6. **QuestionEvent** - Quiz and question response tracking
7. **AdminRole** - Plant-specific admin roles and permissions

### Entity Relationships

```
Plant (1) ←→ (N) Course
Plant (1) ←→ (N) Enrollment
Plant (1) ←→ (N) AdminRole
Course (1) ←→ (N) Enrollment
Enrollment (1) ←→ (1) Progress
Enrollment (1) ←→ (N) ActivityEvent
Enrollment (1) ←→ (N) QuestionEvent
User (1) ←→ (N) Enrollment
User (1) ←→ (N) AdminRole
```

## Authentication Integration

### Auth Context Endpoint

```typescript
GET / api / safety - training / auth / context;
```

Returns combined auth + safety training user context:

```typescript
{
  user: {
    id: string;
    authUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    territoryId?: string;
  };
  plantAccess: Array<{
    plantId: string;
    plantName: string;
    permissions: string[];
    adminRoles: string[];
  }>;
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}
```

### Permission System

Permissions are plant-scoped and follow the pattern:

- `plants:{plantId}:read`
- `plants:{plantId}:write`
- `courses:{plantId}:read`
- `courses:{plantId}:create`
- `courses:{plantId}:update`
- `courses:{plantId}:delete`
- `enrollments:{plantId}:read`
- `enrollments:{plantId}:create`
- `enrollments:{plantId}:update`
- `enrollments:{plantId}:delete`
- `progress:{plantId}:read`
- `progress:{plantId}:update`
- `admin_roles:{plantId}:manage`

## Plant Management

### List Plants

```typescript
GET /api/safety-training/plants
Query: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}
```

### Get Plant

```typescript
GET /api/safety-training/plants/:plantId
```

### Create Plant

```typescript
POST /api/safety-training/plants
Body: {
  name: string;
  code?: string;
  description?: string;
  location?: string;
}
```

### Update Plant

```typescript
PUT /api/safety-training/plants/:plantId
Body: Partial<CreatePlantRequest>
```

### Delete Plant

```typescript
DELETE /api/safety-training/plants/:plantId
```

## Course Management

### List Courses

```typescript
GET /api/safety-training/plants/:plantId/courses
Query: {
  query?: string;
  type?: CourseType;
  status?: CourseStatus;
  isRequired?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Get Course

```typescript
GET /api/safety-training/plants/:plantId/courses/:courseId
```

### Create Course

```typescript
POST /api/safety-training/plants/:plantId/courses
Body: {
  plantId: string;
  name: string;
  description?: string;
  type: CourseType;
  duration: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  materials?: Array<{
    type: "video" | "document" | "quiz" | "interactive" | "other";
    url?: string;
    title: string;
    description?: string;
  }>;
  passingScore?: number;
  certificateValidDays?: number;
  isRequired?: boolean;
}
```

### Update Course

```typescript
PUT /api/safety-training/plants/:plantId/courses/:courseId
Body: Partial<CreateCourseRequest>
```

### Delete Course

```typescript
DELETE /api/safety-training/plants/:plantId/courses/:courseId
```

## Enrollment Management

### List Enrollments

```typescript
GET /api/safety-training/plants/:plantId/enrollments
Query: {
  userId?: string;
  courseId?: string;
  status?: EnrollmentStatus;
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Get Enrollment

```typescript
GET /api/safety-training/plants/:plantId/enrollments/:enrollmentId
```

### Create Enrollment

```typescript
POST /api/safety-training/plants/:plantId/enrollments
Body: {
  courseId: string;
  plantId: string;
  userId: string;
  expiresAt?: string;
  assignedBy?: string;
  notes?: string;
}
```

### Bulk Enrollments

```typescript
POST /api/safety-training/plants/:plantId/enrollments/bulk
Body: {
  plantId: string;
  courseId: string;
  userIds: string[];
  expiresAt?: string;
  assignedBy?: string;
  notes?: string;
}
```

### Update Enrollment

```typescript
PUT /api/safety-training/plants/:plantId/enrollments/:enrollmentId
Body: Partial<CreateEnrollmentRequest>
```

### Cancel Enrollment

```typescript
DELETE /api/safety-training/plants/:plantId/enrollments/:enrollmentId
```

## Progress Tracking

### List Progress

```typescript
GET /api/safety-training/plants/:plantId/progress
Query: {
  userId?: string;
  courseId?: string;
  status?: ProgressStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Get Progress

```typescript
GET /api/safety-training/plants/:plantId/progress/:progressId
```

### Update Progress

```typescript
PUT /api/safety-training/plants/:plantId/progress/:progressId
Body: {
  enrollmentId: string;
  courseId: string;
  plantId: string;
  status?: ProgressStatus;
  progressPercent?: number;
  currentSection?: string;
  timeSpent?: number;
  completedSections?: string[];
  quizScore?: {
    sectionKey: string;
    score: number;
    attempts: number;
  };
}
```

## Activity Tracking

### List Activity Events

```typescript
GET /api/safety-training/plants/:plantId/activity-events
Query: {
  userId?: string;
  courseId?: string;
  eventType?: ActivityEventType;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Create Activity Event

```typescript
POST /api/safety-training/plants/:plantId/activity-events
Body: {
  enrollmentId: string;
  courseId: string;
  plantId: string;
  eventType: ActivityEventType;
  sectionKey?: string;
  meta?: Record<string, unknown>;
}
```

### List Question Events

```typescript
GET /api/safety-training/plants/:plantId/question-events
Query: {
  userId?: string;
  courseId?: string;
  sectionKey?: string;
  questionKey?: string;
  isCorrect?: boolean;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Create Question Event

```typescript
POST /api/safety-training/plants/:plantId/question-events
Body: {
  enrollmentId: string;
  courseId: string;
  plantId: string;
  sectionKey: string;
  questionKey: string;
  isCorrect: boolean;
  attemptIndex?: number;
  responseMeta?: Record<string, unknown>;
}
```

## Admin Role Management

### List Admin Roles

```typescript
GET /api/safety-training/plants/:plantId/admin-roles
Query: {
  userId?: string;
  roleType?: AdminRoleType;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### Get Admin Role

```typescript
GET /api/safety-training/plants/:plantId/admin-roles/:adminRoleId
```

### Create Admin Role

```typescript
POST /api/safety-training/plants/:plantId/admin-roles
Body: {
  plantId: string;
  userId: string;
  roleType: AdminRoleType;
  permissions?: string[];
  expiresAt?: string;
  assignedBy: string;
}
```

### Update Admin Role

```typescript
PUT /api/safety-training/plants/:plantId/admin-roles/:adminRoleId
Body: Partial<CreateAdminRoleRequest>
```

### Remove Admin Role

```typescript
DELETE /api/safety-training/plants/:plantId/admin-roles/:adminRoleId
```

## User-Specific Endpoints

### User Enrollments

```typescript
GET /api/safety-training/users/:userId/enrollments
Query: {
  plantId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### User Progress

```typescript
GET /api/safety-training/users/:userId/progress
Query: {
  plantId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

### User Activity Events

```typescript
GET /api/safety-training/users/:userId/activity-events
Query: {
  plantId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
```

## File Upload

### Upload Course Material

```typescript
POST /api/safety-training/plants/:plantId/courses/:courseId/materials
Body: {
  courseId: string;
  plantId: string;
  materialType: "video" | "document" | "interactive" | "other";
  title: string;
  description?: string;
  file?: File;
  url?: string;
}
```

## Error Handling

All endpoints return consistent error responses:

```typescript
{
  success: false;
  error: {
    code: SafetyTrainingErrorCode;
    message: string;
    details?: Array<{
      field?: string;
      message: string;
      code?: string;
    }>;
    requestId?: string;
    timestamp: string;
    path?: string;
    method?: string;
    plantId?: string;
    userId?: string;
  };
  version: "1.0";
}
```

### Error Codes

- `PLANT_NOT_FOUND` - Plant does not exist
- `PLANT_ACCESS_DENIED` - User lacks access to plant
- `COURSE_NOT_FOUND` - Course does not exist
- `COURSE_ACCESS_DENIED` - User lacks access to course
- `ENROLLMENT_NOT_FOUND` - Enrollment does not exist
- `ENROLLMENT_ALREADY_EXISTS` - User already enrolled
- `ENROLLMENT_EXPIRED` - Enrollment has expired
- `PROGRESS_NOT_FOUND` - Progress record not found
- `PROGRESS_ACCESS_DENIED` - User lacks access to progress
- `ACTIVITY_EVENT_NOT_FOUND` - Activity event not found
- `QUESTION_EVENT_NOT_FOUND` - Question event not found
- `ADMIN_ROLE_NOT_FOUND` - Admin role not found
- `ADMIN_ROLE_ACCESS_DENIED` - User lacks admin permissions
- `USER_NOT_AUTHORIZED` - User not authorized for operation
- `PLANT_MISMATCH` - Plant ID mismatch in request
- `INVALID_PROGRESS_UPDATE` - Invalid progress update
- `COURSE_COMPLETION_FAILED` - Course completion validation failed
- `CERTIFICATE_GENERATION_FAILED` - Certificate generation error
- `VALIDATION_ERROR` - Request validation failed
- `BUSINESS_ERROR` - Business logic error
- `SYSTEM_ERROR` - Internal system error

## Validation

### Request Validation

All requests are validated using Zod schemas with:

- Type safety
- Format validation
- Required field checking
- Custom business rules

### Response Validation

All responses are validated to ensure:

- Correct data structure
- Required fields present
- Type consistency
- No additional properties

### Plant Scoping

All operations automatically scope to the specified plant:

- Plant ID must be valid UUID
- User must have access to the plant
- Plant context is validated on every request

## TypeScript Support

### Type Safety

All contracts provide full TypeScript support:

- Branded types for IDs
- Strict schemas with no additional properties
- Compile-time type checking
- IntelliSense support

### Generated Types

Types are generated from schemas:

- Request/Response types
- Query parameter types
- Error response types
- Entity types

### Usage Example

```typescript
import {
  CreateCourseRequest,
  CourseResponse,
  SafetyTrainingApiEndpoints,
  safetyTrainingValidation,
} from "@specchem/contracts";

// Type-safe request
const courseData: CreateCourseRequest = {
  plantId: "123e4567-e89b-12d3-a456-426614174000",
  name: "Safety Orientation",
  type: "safety_orientation",
  duration: 60,
};

// Type-safe response
const response: CourseResponse = await fetch(
  "/api/safety-training/plants/123/courses",
  {
    method: "POST",
    body: JSON.stringify(courseData),
  }
).then(res => res.json());

// Validation middleware
const validation = safetyTrainingValidation.validateRequest(
  "CREATE_COURSE",
  request,
  { userId: "user123", plantId: "plant123" }
);
```

## OpenAPI Specification

Complete OpenAPI 3.0.3 specification is available:

- All endpoints documented
- Request/response schemas
- Error responses
- Authentication requirements
- Example requests/responses

## Integration with Existing Auth

### Preserved Auth Endpoints

Existing auth endpoints remain unchanged:

- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/refresh`
- `/api/auth/logout`

### New Safety Training Endpoints

Safety Training endpoints are separate:

- `/api/safety-training/*` - All Safety Training operations
- No conflicts with existing auth routes
- Shared authentication middleware

### Combined Context

Auth + Safety Training context available at:

- `/api/safety-training/auth/context` - Combined user context
- Includes auth user data + plant access + permissions

## Monorepo Optimization

### Shared Contracts

Contracts are designed for reuse across multiple apps:

- Shared plant and role patterns
- Consistent API structure
- Reusable validation schemas

### Single/Multi App Support

Contracts work with both deployment models:

- Single app deployment
- Multi-app monorepo deployment
- Shared package structure

## Testing

### Contract Testing

Comprehensive testing framework:

- Schema validation tests
- Endpoint specification tests
- Error response tests
- Integration tests

### Type Safety Tests

Type safety validation:

- Compile-time type checking
- Runtime validation
- Schema consistency tests

## Performance

### Optimization Features

- Efficient validation middleware
- Cached schema parsing
- Minimal overhead validation
- Optimized error responses

### Monitoring

- Request/response validation metrics
- Error rate tracking
- Performance monitoring
- Audit logging

## Security

### Access Control

- Plant-scoped permissions
- Role-based access control
- Request validation
- Response sanitization

### Data Protection

- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## Deployment

### Environment Support

- Development server
- Staging server
- Production server
- Local development

### Configuration

- Environment-specific settings
- Feature flags
- Rate limiting
- Caching strategies

## Future Enhancements

### Planned Features

- Real-time progress updates
- Advanced reporting
- Mobile API support
- Webhook integrations
- Analytics dashboard

### Extensibility

- Plugin architecture
- Custom validators
- Event system
- Middleware pipeline

## Support

### Documentation

- API reference
- Integration guides
- Code examples
- Troubleshooting

### Community

- GitHub repository
- Issue tracking
- Feature requests
- Contributing guidelines
