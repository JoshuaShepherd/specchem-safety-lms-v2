# Safety Training System Architecture Guide

## Overview

This guide documents the **actual** architecture and requirements for the Safety Training System. All subsequent prompts should be rewritten based on this understanding, not the CRM-focused approach that was initially used. This is a **safety training and compliance management system**, not a CRM system.

## Core System Architecture

### 1. Plant-Based Multi-Tenancy
- **Plants** are the primary organizational unit (not territories)
- Each plant operates as a separate tenant with isolated data
- Users belong to specific plants and can only access their plant's data
- Safety admins can access all plants across the organization

### 2. User Roles & Permissions Hierarchy
```
safety_admin (100) - Can manage all plants, users, courses, and system settings
plant_manager (80) - Can manage users, courses, and data within their plant
safety_instructor (60) - Can create/edit courses, view enrollments and progress
hr_admin (60) - Can manage enrollments, assign training, view compliance reports
safety_coordinator (40) - Limited course management and progress viewing
employee (20) - Can take assigned training and view own progress
```

### 3. Core Entities & Relationships

#### Primary Entities
- **Plants** - Physical facilities/locations where training occurs
- **User Profiles** - Extended user data linked to auth.users
- **Courses** - Safety training content and curriculum
- **Enrollments** - User assignments to courses
- **Progress** - Individual training progress and completion tracking
- **Activity Events** - System-generated events (course started, completed, etc.)
- **Question Events** - Quiz/assessment interaction tracking
- **Admin Roles** - Plant-specific administrative permissions

#### Key Relationships
- Users → Plants (many-to-one)
- Users → Enrollments (one-to-many)
- Courses → Enrollments (one-to-many)
- Enrollments → Progress (one-to-one)
- Users → Activity Events (one-to-many)
- Users → Question Events (one-to-many)

## Database Schema Structure

### Core Tables
```sql
-- Plants (primary organizational unit)
plants (id, name, is_active, created_at, updated_at)

-- User profiles (extends auth.users)
user_profiles (id, auth_user_id, plant_id, first_name, last_name, email, phone, 
               job_title, department, role, status, is_active, last_login_at, 
               created_at, updated_at, created_by)

-- Training courses
courses (id, plant_id, name, description, type, status, difficulty_level, 
         duration, is_required, completion_criteria, prerequisites, is_active, 
         created_at, updated_at)

-- User course assignments
enrollments (id, user_id, course_id, plant_id, status, enrolled_at, started_at, 
             completed_at, expires_at, score, attempts, notes, is_active, 
             created_at, updated_at)

-- Training progress tracking
progress (id, enrollment_id, user_id, course_id, plant_id, status, 
          progress_percentage, time_spent, last_accessed_at, completed_at, 
          score, notes, is_active, created_at, updated_at)

-- System activity events
activity_events (id, user_id, course_id, enrollment_id, plant_id, type, 
                 description, metadata, occurred_at, is_active, created_at, updated_at)

-- Quiz/assessment events
question_events (id, user_id, course_id, enrollment_id, plant_id, question_id, 
                 type, result, user_answer, correct_answer, time_spent, metadata, 
                 occurred_at, is_active, created_at, updated_at)

-- Plant-specific admin roles
admin_roles (id, user_id, plant_id, role_type, permissions, assigned_by, 
             assigned_at, expires_at, is_active, created_at, updated_at)
```

## Business Rules & Validation

### Plant Access Control
- All operations must be scoped to a specific plant
- Users can only access data within their assigned plant
- Safety admins can access all plants
- Cross-plant data access is prohibited for non-admin roles

### Role-Based Permissions
- **Safety Admin**: Full system access, can manage all plants
- **Plant Manager**: Plant-scoped user and course management
- **Safety Instructor**: Course creation and content management
- **HR Admin**: Enrollment management and compliance reporting
- **Safety Coordinator**: Limited course and progress management
- **Employee**: Self-service training and progress viewing

### Training Workflow
1. **Course Creation**: Safety instructors create courses within their plant
2. **Enrollment**: HR admins or plant managers assign courses to users
3. **Progress Tracking**: System tracks user progress through courses
4. **Completion**: Users complete training and earn certificates
5. **Compliance**: System monitors training compliance and expiration

### Data Validation Rules
- All entities must include `plant_id` for plant scoping
- User roles must be validated against plant permissions
- Course assignments must respect plant boundaries
- Progress tracking must be tied to valid enrollments
- All timestamps must be in ISO format for API consistency

## API Design Patterns

### Plant-Scoped Endpoints
```typescript
// All endpoints are plant-scoped
GET /api/plants/{plantId}/courses
GET /api/plants/{plantId}/users
GET /api/plants/{plantId}/enrollments
GET /api/plants/{plantId}/progress
```

### Authentication Integration
- Uses Supabase Auth for user authentication
- User profiles extend auth.users with plant and role information
- All API requests must include plant context
- Role-based access control enforced at API level

### Response Wrappers
```typescript
// Plant-scoped response wrapper
interface PlantScopedResponse<T> {
  data: T;
  plant: Plant;
  user: UserContext;
  pagination?: PaginationInfo;
}
```

## Key Differences from CRM System

### ❌ What This System is NOT
- Not a customer relationship management system
- Not focused on sales opportunities or accounts
- Not territory-based (territories don't exist)
- Not focused on equipment sales or consulting services
- Not a multi-company platform (single organization, multiple plants)

### ✅ What This System IS
- Safety training and compliance management
- Plant-based multi-tenant architecture
- Employee training tracking and certification
- Compliance reporting and audit trails
- Role-based access control for training management
- Integration with existing auth system

## Prompt Rewriting Guidelines

When rewriting prompts, ensure:

1. **Replace CRM terminology**:
   - "territories" → "plants"
   - "accounts" → "plants" (organizational unit)
   - "contacts" → "users" or "user profiles"
   - "opportunities" → "enrollments"
   - "sales pipeline" → "training pipeline"
   - "products" → "courses"

2. **Focus on training workflows**:
   - Course creation and management
   - User enrollment and assignment
   - Progress tracking and completion
   - Compliance monitoring and reporting
   - Certificate generation and tracking

3. **Emphasize plant-based scoping**:
   - All operations are plant-scoped
   - Users belong to specific plants
   - Data isolation between plants
   - Role-based access within plants

4. **Include safety-specific features**:
   - Compliance tracking and reporting
   - Training expiration and renewal
   - Audit trails and activity logging
   - Safety certification management
   - Incident tracking and follow-up training

5. **Maintain auth integration**:
   - Preserve existing Supabase auth system
   - Extend with plant and role information
   - Maintain user profile relationships
   - Ensure backward compatibility

## Implementation Priorities

### Phase 1: Core Training System
- Plant management and user assignment
- Course creation and management
- Basic enrollment and progress tracking

### Phase 2: Advanced Features
- Comprehensive reporting and analytics
- Compliance monitoring and alerts
- Advanced role-based permissions

### Phase 3: Integration & Optimization
- External system integrations
- Performance optimization
- Advanced audit and logging

## File Structure Guidelines

```
src/
├── lib/
│   ├── validations/
│   │   ├── safety-business.ts      # Core safety training schemas
│   │   ├── plant-role-validation.ts # Plant and role validation utilities
│   │   └── auth.ts                 # Existing auth schemas (preserve)
│   ├── db/
│   │   └── schema/                 # Plant-based schema files
│   └── utils/
├── components/                     # Plant-scoped UI components
├── app/                           # Plant-scoped API routes
└── types/                         # Safety training TypeScript types
```

This architecture guide should be referenced when rewriting any prompts to ensure they align with the actual safety training system requirements rather than CRM assumptions.
