# Safety LMS Frontend Design Specification

## Overview

This document outlines the complete frontend architecture for the SpecChem Safety Learning Management System (LMS), designed to be deployed at `safety.specchem.com`. The system provides role-based access to safety training content in both English and Spanish, with comprehensive dashboards and management interfaces.

## Authentication & Authorization Strategy

### Authentication Flow

1. **Entry Point**: All routes require authentication via Supabase Auth
2. **User Profile Resolution**: After authentication, user profile is fetched from `user_profiles` table
3. **Role-Based Routing**: Users are redirected based on their role and permissions
4. **Session Management**: Persistent sessions with automatic refresh

### User Roles & Permissions

#### Safety Roles (user_profiles.role)

- **safety_admin**: Full system access, all management capabilities
- **safety_manager**: Plant-level management, course oversight
- **safety_coordinator**: Training coordination, user management
- **safety_instructor**: Course delivery, progress monitoring
- **safety_rep**: Employee representative, limited oversight
- **plant_manager**: Plant operations, compliance reporting
- **hr_admin**: Human resources, user lifecycle management
- **employee**: Standard learner access

#### Admin Roles (admin_roles.role)

- **hr_admin**: Cross-system HR management
- **dev_admin**: System administration, technical oversight
- **plant_manager**: Plant-specific administrative control

## Page Structure & Navigation

### 1. Landing Page (`/`)

**Authentication Required**: Yes
**Purpose**: Role-based dashboard entry point

```typescript
interface LandingPageProps {
  userRole: UserRole;
  plantId: string;
  territoryId: string;
}
```

**Layout**:

- Header with user info, plant context, language toggle
- Role-specific dashboard widgets
- Quick access to assigned courses
- Announcements and notifications

### 2. Authentication Pages

#### Login Page (`/auth/login`)

- Clean, professional login form
- Company branding (SpecChem)
- Language selection (EN/ES)
- Password reset integration
- SSO option for enterprise users

#### Password Reset (`/auth/reset-password`)

- Email-based password reset flow
- Multi-language support
- Security best practices

### 3. Dashboard Pages

#### Employee Dashboard (`/dashboard/employee`)

**Access**: `employee` role
**Features**:

- Assigned courses overview
- Progress tracking
- Upcoming deadlines
- Completion certificates
- Training history

#### Safety Rep Dashboard (`/dashboard/safety-rep`)

**Access**: `safety_rep` role
**Features**:

- Employee progress monitoring
- Safety incident reporting
- Training compliance status
- Basic reporting tools

#### Safety Instructor Dashboard (`/dashboard/instructor`)

**Access**: `safety_instructor` role
**Features**:

- Course delivery tools
- Student progress tracking
- Live session management
- Assessment tools
- Performance analytics

#### Safety Coordinator Dashboard (`/dashboard/coordinator`)

**Access**: `safety_coordinator` role
**Features**:

- Training program management
- Enrollment oversight
- Compliance reporting
- Instructor coordination
- Resource management

#### Safety Manager Dashboard (`/dashboard/manager`)

**Access**: `safety_manager` role
**Features**:

- Plant-wide training oversight
- Compliance dashboards
- Performance metrics
- Resource allocation
- Strategic planning tools

#### Safety Admin Dashboard (`/dashboard/admin`)

**Access**: `safety_admin` role
**Features**:

- System-wide administration
- User management
- Course creation/management
- Advanced reporting
- System configuration

### 4. Course Management Pages

#### Course Catalog (`/courses`)

**Access**: All authenticated users
**Features**:

- Browse available courses
- Filter by category, language, plant
- Search functionality
- Enrollment options
- Course prerequisites

#### Course Detail (`/courses/[courseId]`)

**Access**: Enrolled users or course managers
**Features**:

- Course overview and objectives
- Learning outcomes
- Prerequisites
- Enrollment status
- Progress tracking

#### Course Player (`/courses/[courseId]/learn`)

**Access**: Enrolled users
**Features**:

- Interactive course content
- Progress saving
- Bookmarking
- Notes functionality
- Assessment integration
- Mobile-responsive design

### 5. User Management Pages

#### User Directory (`/users`)

**Access**: `safety_manager`, `safety_admin`, `hr_admin`
**Features**:

- User listing with filters
- Search functionality
- Bulk operations
- User status management
- Export capabilities

#### User Profile (`/users/[userId]`)

**Access**: Self or management roles
**Features**:

- Personal information
- Training history
- Certifications
- Performance metrics
- Role management (admin only)

#### User Enrollment (`/users/[userId]/enrollments`)

**Access**: User self or management roles
**Features**:

- Current enrollments
- Enrollment history
- Progress tracking
- Certificate management

### 6. Plant Management Pages

#### Plant Overview (`/plants`)

**Access**: `safety_manager`, `safety_admin`, `plant_manager`
**Features**:

- Plant listing
- Compliance status
- Training metrics
- Resource allocation

#### Plant Detail (`/plants/[plantId]`)

**Access**: Plant-specific or admin roles
**Features**:

- Plant information
- Employee roster
- Training compliance
- Safety metrics
- Resource management

### 7. Reporting & Analytics Pages

#### Compliance Reports (`/reports/compliance`)

**Access**: Management roles
**Features**:

- Training compliance status
- Regulatory reporting
- Audit trails
- Export capabilities
- Scheduled reports

#### Performance Analytics (`/reports/performance`)

**Access**: Management roles
**Features**:

- Training effectiveness metrics
- User engagement analytics
- Course completion rates
- Performance trends
- Custom dashboards

### 8. Administration Pages

#### System Settings (`/admin/settings`)

**Access**: `safety_admin`, `dev_admin`
**Features**:

- System configuration
- Integration settings
- Security policies
- Backup management

#### Course Administration (`/admin/courses`)

**Access**: `safety_admin`, `safety_manager`
**Features**:

- Course creation/editing
- Content management
- Version control
- Publishing workflow

#### User Administration (`/admin/users`)

**Access**: `safety_admin`, `hr_admin`
**Features**:

- User lifecycle management
- Role assignments
- Bulk operations
- Import/export tools

## Course Content Structure

### Bilingual Content Strategy

#### Language Support

- **Primary Languages**: English (EN) and Spanish (ES)
- **Language Toggle**: Available on all pages
- **Content Storage**: Separate content blocks for each language
- **Fallback**: English as default if Spanish content unavailable

#### Course Content Types

1. **Video Content**
   - Interactive video lessons
   - Closed captions in both languages
   - Multiple playback speeds
   - Progress tracking

2. **Interactive Modules**
   - Scenario-based learning
   - Drag-and-drop exercises
   - Simulation activities
   - Real-time feedback

3. **Assessment Tools**
   - Quizzes and exams
   - Practical assessments
   - Peer evaluations
   - Certification tests

4. **Documentation**
   - PDF resources
   - Interactive manuals
   - Reference materials
   - Downloadable content

### Course Categories

1. **General Safety**
   - Workplace safety fundamentals
   - Personal protective equipment
   - Emergency procedures
   - Hazard identification

2. **Chemical Safety**
   - Chemical handling procedures
   - Material safety data sheets
   - Storage requirements
   - Spill response

3. **Equipment Safety**
   - Machinery operation
   - Lockout/tagout procedures
   - Maintenance protocols
   - Equipment inspection

4. **Environmental Safety**
   - Environmental compliance
   - Waste management
   - Pollution prevention
   - Sustainability practices

5. **Regulatory Compliance**
   - OSHA requirements
   - EPA regulations
   - Industry standards
   - Audit preparation

## Dashboard Design Specifications

### Employee Dashboard

```typescript
interface EmployeeDashboard {
  assignedCourses: Course[];
  progressOverview: ProgressSummary;
  upcomingDeadlines: Deadline[];
  completedCertifications: Certificate[];
  recentActivity: ActivityEvent[];
  notifications: Notification[];
}
```

### Management Dashboard

```typescript
interface ManagementDashboard {
  plantMetrics: PlantMetrics;
  complianceStatus: ComplianceReport;
  trainingProgress: TrainingProgress;
  resourceUtilization: ResourceMetrics;
  alerts: Alert[];
  quickActions: Action[];
}
```

### Admin Dashboard

```typescript
interface AdminDashboard {
  systemHealth: SystemStatus;
  userMetrics: UserStatistics;
  courseMetrics: CourseStatistics;
  complianceOverview: ComplianceSummary;
  systemAlerts: SystemAlert[];
  maintenanceTasks: MaintenanceTask[];
}
```

## Component Architecture

### Core Components

1. **Authentication Components**
   - `AuthProvider`: Context provider for authentication state
   - `ProtectedRoute`: Route wrapper for authentication
   - `LoginForm`: Login form component
   - `PasswordResetForm`: Password reset component

2. **Navigation Components**
   - `MainNavigation`: Primary navigation bar
   - `Sidebar`: Collapsible sidebar navigation
   - `Breadcrumbs`: Navigation breadcrumbs
   - `UserMenu`: User account dropdown

3. **Dashboard Components**
   - `DashboardWidget`: Reusable dashboard widget
   - `ProgressChart`: Progress visualization
   - `MetricCard`: Key metric display
   - `ActivityFeed`: Recent activity display

4. **Course Components**
   - `CourseCard`: Course display card
   - `CoursePlayer`: Interactive course player
   - `ProgressTracker`: Learning progress display
   - `AssessmentComponent`: Quiz and exam interface

5. **Management Components**
   - `UserTable`: User management table
   - `EnrollmentManager`: Course enrollment interface
   - `ReportGenerator`: Report creation tools
   - `ComplianceMonitor`: Compliance tracking

### UI Component Library

Based on shadcn/ui components:

- `Button`, `Input`, `Select`, `Checkbox`, `Radio`
- `Card`, `Dialog`, `Sheet`, `Dropdown`
- `Table`, `Pagination`, `Search`
- `Alert`, `Toast`, `Loading`
- `Chart`, `Progress`, `Badge`

## Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Mobile-First Approach

- Touch-friendly interfaces
- Optimized course player for mobile
- Offline capability for downloaded content
- Progressive Web App features

## Accessibility Features

### WCAG 2.1 AA Compliance

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Text scaling support
- Alternative text for images
- Focus indicators

### Language Accessibility

- Right-to-left language support (future)
- Multiple language content
- Cultural adaptation for content
- Localized date/time formats

## Security Considerations

### Client-Side Security

- Role-based component rendering
- Secure token storage
- XSS prevention
- CSRF protection
- Content Security Policy

### Data Protection

- Sensitive data encryption
- Secure API communication
- Audit logging
- Privacy controls
- GDPR compliance

## Performance Optimization

### Loading Strategy

- Lazy loading for course content
- Code splitting by route
- Image optimization
- Caching strategies
- CDN integration

### Offline Support

- Service worker implementation
- Cached course content
- Offline progress tracking
- Sync when online

## Integration Points

### Supabase Integration

- Authentication service
- Real-time subscriptions
- File storage
- Database operations

### External Integrations

- HR systems (future)
- Learning record stores
- Single sign-on providers
- Email notification services

## Development Phases

### Phase 1: Foundation (Weeks 1-2)

- Authentication system
- Basic routing
- Core dashboard layouts
- User management basics

### Phase 2: Core Features (Weeks 3-4)

- Course catalog and player
- Progress tracking
- Basic reporting
- User enrollment

### Phase 3: Advanced Features (Weeks 5-6)

- Advanced dashboards
- Comprehensive reporting
- Admin tools
- Mobile optimization

### Phase 4: Polish & Testing (Weeks 7-8)

- Accessibility improvements
- Performance optimization
- Security hardening
- User testing and refinement

## Deployment Strategy

### Environment Configuration

- **Development**: Local development with Supabase dev instance
- **Staging**: Staging environment for testing
- **Production**: `safety.specchem.com` with production Supabase

### Vercel Deployment

- Automatic deployments from main branch
- Environment variable management
- Preview deployments for feature branches
- Analytics and monitoring integration

## Monitoring & Analytics

### User Analytics

- Course completion rates
- User engagement metrics
- Performance tracking
- Error monitoring

### System Monitoring

- Application performance
- Database performance
- Authentication metrics
- Security monitoring

## Future Enhancements

### Advanced Features

- AI-powered course recommendations
- Advanced analytics and insights
- Mobile app development
- Integration with external LMS systems
- Advanced assessment tools

### Scalability Considerations

- Multi-tenant architecture
- International expansion
- Advanced reporting capabilities
- Integration with enterprise systems

---

This comprehensive design specification provides the foundation for building a robust, scalable, and user-friendly Safety LMS that meets the needs of SpecChem's diverse workforce while maintaining security and compliance requirements.


