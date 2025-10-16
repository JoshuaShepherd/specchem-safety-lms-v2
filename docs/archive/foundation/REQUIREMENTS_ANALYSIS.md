# Requirements Analysis: Safety Training Platform Dependencies

## Current Dependencies vs Required Stack

### ✅ Already Installed
```json
{
  "react": "19.1.0",
  "react-dom": "19.1.0", 
  "next": "15.5.4",
  "typescript": "^5",
  "tailwindcss": "^4",
  "eslint": "^9"
}
```

### ❌ Missing Critical Dependencies

#### 1. **Supabase Integration**
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/ssr": "^0.1.0"
}
```
**Purpose**: Connect to existing Safety Training database, handle authentication, real-time progress updates

#### 2. **Database ORM & Schema Management**
```json
{
  "drizzle-orm": "^0.29.0",
  "drizzle-kit": "^0.20.0",
  "@libsql/client": "^0.8.0"
}
```
**Purpose**: Type-safe database queries, schema migrations, connection to existing Safety Training database

#### 3. **Form Handling & Validation**
```json
{
  "react-hook-form": "^7.48.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0"
}
```
**Purpose**: Form management, client-side validation, type-safe schemas

#### 4. **Component Library (shadcn/ui)**
```json
{
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-alert-dialog": "^1.0.5",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-progress": "^1.0.3",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-slot": "^1.0.2",
  "@radix-ui/react-switch": "^1.0.3",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-tooltip": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "lucide-react": "^0.294.0",
  "tailwind-merge": "^2.0.0",
  "tailwindcss-animate": "^1.0.7"
}
```
**Purpose**: Modern, accessible UI components, consistent design system

#### 5. **State Management**
```json
{
  "zustand": "^4.4.0",
  "immer": "^10.0.0"
}
```
**Purpose**: Global state management, optimistic updates, complex state logic

#### 6. **Data Visualization & Charts**
```json
{
  "recharts": "^2.8.0",
  "@tremor/react": "^3.14.0"
}
```
**Purpose**: Training dashboards, learning analytics, progress tracking, compliance reporting

#### 7. **Date & Time Handling**
```json
{
  "date-fns": "^2.30.0",
  "react-day-picker": "^8.9.0"
}
```
**Purpose**: Date pickers, time calculations, course scheduling, training periods

#### 8. **File Handling & Uploads**
```json
{
  "react-dropzone": "^14.2.0",
  "file-saver": "^2.0.5"
}
```
**Purpose**: Training material uploads, certificate exports, course attachment management

#### 9. **Search & Filtering**
```json
{
  "fuse.js": "^7.0.0",
  "react-select": "^5.8.0"
}
```
**Purpose**: Course search, user filtering, autocomplete, training data discovery

#### 10. **Development Tools**
```json
{
  "@types/file-saver": "^2.0.7",
  "prettier": "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.7"
}
```
**Purpose**: Code formatting, type safety, development experience

#### 11. **Testing Framework**
```json
{
  "@testing-library/react": "^14.1.0",
  "@testing-library/jest-dom": "^6.1.0",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "playwright": "^1.40.0"
}
```
**Purpose**: Unit tests, integration tests, E2E testing

## Package Manager Migration

### Current: npm
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack", 
    "start": "next start",
    "lint": "eslint"
  }
}
```

### Target: pnpm
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start", 
    "lint": "eslint",
    "lint:fix": "eslint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

## Environment Configuration

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://radbukphijxenmgiljtu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[REDACTED]
SUPABASE_SERVICE_ROLE_KEY=[REDACTED]

# Database Configuration  
DATABASE_URL=postgresql://[REDACTED]

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=[REDACTED]
NEXTAUTH_URL=http://localhost:3000

# Optional: Analytics & Monitoring
NEXT_PUBLIC_ANALYTICS_ID=[REDACTED]
SENTRY_DSN=[REDACTED]
```

## Configuration Files Needed

### 1. **components.json** (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 2. **drizzle.config.ts**
```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### 3. **tailwind.config.ts** (Enhanced)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

## Installation Priority

### Phase 1: Core Infrastructure (Day 1)
1. **Package Manager Migration**: npm → pnpm
2. **Supabase Integration**: Client libraries and Safety Training database connection
3. **Database ORM**: Drizzle setup and existing schema connection
4. **Environment Setup**: .env files and Safety database configuration

### Phase 2: UI Foundation (Day 2)
1. **shadcn/ui Setup**: Component library installation
2. **Enhanced Tailwind**: Configuration and theme setup
3. **Base Components**: Button, Input, Card, etc.

### Phase 3: Form & Validation (Day 3)
1. **React Hook Form**: Form management
2. **Zod Integration**: Schema validation
3. **Form Components**: Custom form components

### Phase 4: Advanced Features (Days 4-5)
1. **State Management**: Zustand setup for training state
2. **Charts & Visualization**: Recharts/Tremor for progress analytics
3. **Search & Filtering**: Fuse.js integration for course search

## Estimated Installation Time
- **Core Dependencies**: 2-3 hours
- **Component Library**: 1-2 hours  
- **Configuration**: 1-2 hours
- **Testing Setup**: 1-2 hours
- **Total**: 5-9 hours for complete setup

## Risk Assessment
- **Low Risk**: Standard Next.js/React dependencies
- **Medium Risk**: Supabase integration (existing Safety Training database)
- **Low Risk**: No database schema changes needed (using existing schema)

## Success Criteria
- ✅ All dependencies install without conflicts
- ✅ Supabase Safety Training database connection established
- ✅ Existing safety training schema accessible
- ✅ shadcn/ui components render correctly
- ✅ TypeScript compilation successful
- ✅ Development server runs without errors
