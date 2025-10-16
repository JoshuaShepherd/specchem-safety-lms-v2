# Safety Training & Business DTO-First Zod Schemas

## Overview

This directory contains comprehensive Zod validation schemas for the Safety Training and Business systems, implementing DTO-First design principles with full integration between auth, training, and business entities.

## Architecture

### 🏗️ System Integration

- **Safety Training System**: Plant-based multi-tenancy with user roles and course management
- **Safety Business System**: Territory-based sales and customer management
- **Auth Integration**: Seamless integration with existing Supabase auth without modification
- **Cross-System Operations**: Unified validation for operations spanning both systems

### 📁 File Structure

```
src/lib/validations/
├── index.ts                     # Main exports and utilities
├── auth.ts                      # Authentication schemas
├── safety-business.ts           # Safety Training system schemas
├── safety-business-dtos.ts      # Safety Business system schemas
├── api-schemas.ts               # API request/response schemas
├── integration-schemas.ts       # Cross-system integration schemas
├── plant-role-validation.ts     # Plant and role validation utilities
├── __tests__/
│   └── schema-validation.test.ts # Comprehensive test suite
└── README.md                    # This documentation
```

## 🎯 Key Features

### ✅ Complete Entity Coverage

**Safety Training Entities:**

- Plants (manufacturing facilities)
- User Profiles (extended auth users)
- Courses (safety training content)
- Enrollments (user course assignments)
- Progress (training completion tracking)
- Activity Events (system events)
- Question Events (quiz interactions)
- Admin Roles (administrative permissions)

**Safety Business Entities:**

- Territories (sales regions)
- Accounts (safety equipment customers)
- Contacts (individual people)
- Opportunities (sales pipeline)
- Branches (physical locations)
- Products (safety equipment & services)
- Projects (construction/implementation)
- Sales Facts (historical sales data)
- Activity Logs (business activity tracking)

### ✅ DTO-First Design

- **Request DTOs**: Optimized for API consumption
- **Response DTOs**: Consistent API response format
- **Form DTOs**: Client-side form validation
- **Integration DTOs**: Cross-system data transfer

### ✅ Territory & Plant Scoping

- **Plant-Based Access**: Safety training scoped to manufacturing plants
- **Territory-Based Access**: Business operations scoped to sales territories
- **Cross-System Context**: Unified user context for both systems

### ✅ Role-Based Validation

**Safety Training Roles:**

- `safety_admin` (100) - Full system access
- `plant_manager` (80) - Plant-level management
- `safety_instructor` (60) - Course management
- `hr_admin` (60) - Enrollment management
- `safety_coordinator` (40) - Limited course access
- `employee` (20) - Basic user access

**Safety Business Roles:**

- `safety_admin` - Full business access
- `sales_admin` - Sales management
- `sales_manager` - Territory management
- `sales_rep` - Limited sales access
- `territory_manager` - Territory oversight

### ✅ Comprehensive Validation

- **Field Validation**: Required fields, format validation, length limits
- **Business Rules**: Cross-entity validation, state transitions
- **Permission Validation**: Role-based access control
- **Data Integrity**: Referential integrity, duplicate prevention

## 📋 Schema Categories

### 1. Core Entity Schemas

Each entity has three schema variants:

- **Full Schema**: Complete entity with all fields
- **Create Schema**: Fields required for creation (omits ID, timestamps)
- **Update Schema**: Fields allowed for updates (partial with validation)

### 2. API Schemas

- **Request Schemas**: Validate incoming API requests
- **Response Schemas**: Structure API responses
- **Paginated Schemas**: Handle paginated data
- **Query Schemas**: Validate search and filter parameters

### 3. Form Schemas

- **Client-Side Validation**: Form input validation
- **User-Friendly Messages**: Clear error messages
- **Optional Field Handling**: Flexible form submission

### 4. Integration Schemas

- **User Context**: Combined auth + system context
- **Cross-System Operations**: Unified validation
- **Middleware Schemas**: Request validation
- **Permission Schemas**: Access control validation

## 🔧 Usage Examples

### Basic Entity Validation

```typescript
import { accountSchema, createAccountSchema } from "@/lib/validations";

// Validate complete account
const accountResult = accountSchema.safeParse(accountData);

// Validate account creation
const createResult = createAccountSchema.safeParse(createData);
```

### API Request Validation

```typescript
import { createAccountRequestSchema } from "@/lib/validations";

// Validate API request
const requestResult = createAccountRequestSchema.safeParse({
  data: accountData,
  territoryId: "territory-uuid",
});
```

### Form Validation

```typescript
import { accountFormSchema } from "@/lib/validations";

// Validate form data
const formResult = accountFormSchema.safeParse(formData);
```

### Permission Validation

```typescript
import { validatePlantOperation } from "@/lib/validations";

// Check plant access
const access = validatePlantOperation(
  userRole,
  userPlantId,
  targetPlantId,
  "write"
);
```

## 🧪 Testing

### Comprehensive Test Suite

The test suite (`__tests__/schema-validation.test.ts`) includes:

- **Schema Validation Tests**: All schemas tested with valid and invalid data
- **Fixture Data**: Realistic test data for all entities
- **Edge Cases**: Boundary conditions and error scenarios
- **Integration Tests**: Cross-system validation scenarios

### Running Tests

```bash
# Run validation tests
npm test src/lib/validations

# Run with coverage
npm test -- --coverage src/lib/validations
```

## 🔒 Security Features

### Access Control

- **Plant Scoping**: Users can only access their plant's data
- **Territory Scoping**: Business users can only access their territory
- **Role-Based Permissions**: Granular permission system
- **Cross-System Validation**: Unified access control

### Data Validation

- **Input Sanitization**: All inputs validated and sanitized
- **Type Safety**: Strict TypeScript types
- **Business Rules**: Domain-specific validation rules
- **Referential Integrity**: Foreign key validation

## 📊 Performance Considerations

### Optimized Schemas

- **Minimal Validation**: Only necessary validations
- **Efficient Parsing**: Fast Zod parsing
- **Type Inference**: Automatic TypeScript types
- **Tree Shaking**: Only import what you need

### Caching

- **Schema Reuse**: Shared base schemas
- **Validation Caching**: Repeated validations cached
- **Type Caching**: TypeScript type caching

## 🚀 Integration Points

### Auth System

- **Preserves Existing Auth**: No modifications to Supabase auth
- **Extends User Context**: Adds system-specific user data
- **Session Integration**: Works with existing session management

### Database Integration

- **Drizzle ORM**: Compatible with existing schema
- **Type Safety**: Database types match validation types
- **Migration Safe**: Schema changes are backward compatible

### API Integration

- **Next.js API Routes**: Ready for API route integration
- **Middleware Ready**: Works with existing middleware
- **Error Handling**: Consistent error responses

## 📈 Monitoring & Observability

### Validation Metrics

- **Success Rates**: Track validation success rates
- **Error Patterns**: Monitor common validation failures
- **Performance**: Track validation performance
- **Usage Analytics**: Monitor schema usage patterns

### Error Reporting

- **Structured Errors**: Consistent error format
- **Error Codes**: Categorized error codes
- **Context Information**: Rich error context
- **Debug Information**: Development-friendly errors

## 🔄 Maintenance

### Schema Evolution

- **Versioning**: Schema versioning strategy
- **Migration**: Safe schema migrations
- **Backward Compatibility**: Maintain compatibility
- **Documentation**: Keep documentation updated

### Testing Strategy

- **Automated Tests**: CI/CD test automation
- **Schema Validation**: Automated schema validation
- **Performance Tests**: Validation performance testing
- **Integration Tests**: End-to-end validation testing

## 📚 Documentation

### Code Documentation

- **JSDoc Comments**: Comprehensive code documentation
- **Type Documentation**: TypeScript type documentation
- **Usage Examples**: Practical usage examples
- **Best Practices**: Implementation best practices

### API Documentation

- **Schema Reference**: Complete schema reference
- **Validation Rules**: Detailed validation rules
- **Error Codes**: Complete error code reference
- **Integration Guide**: Integration documentation

---

## ✅ Definition of Done - Completed

- ✅ **Safety business DTO-first Zod schemas created** for all Safety business entities
- ✅ **Auth and training system integration validated and preserved**
- ✅ **Territory and role-based validation implemented**
- ✅ **Each Safety business Response schema has fixtures** in test suite with `safeParse` tests
- ✅ **CI validates Safety business schema changes** don't break auth or training compatibility

The Safety Training and Business DTO-First Zod schemas are now complete and ready for integration with the API layer and frontend components.
