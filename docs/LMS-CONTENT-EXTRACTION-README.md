# LMS Content Extraction - Complete Package

This package contains all the extracted content from the HazMat training ebook, formatted for easy import into a Supabase PostgreSQL database.

## 📁 Generated Files

### Database Schema
- **`lms-content-database-schema.sql`** - Complete PostgreSQL schema with tables, indexes, RLS policies, and functions

### Content Data
- **`lms-content-inserts.sql`** - SQL INSERT statements ready to run in Supabase
- **`lms-content-export.json`** - Comprehensive JSON export with metadata and statistics
- **`supabase-import.sh`** - Automated import script for Supabase CLI

### CSV Files (for bulk import)
- **`courses.csv`** - Course information
- **`course_sections.csv`** - Section data with ordering
- **`content_blocks.csv`** - All content blocks with structured data
- **`quiz_questions.csv`** - Quiz questions with answers and explanations

## 📊 Content Statistics

- **9 Course Sections** - Complete training modules
- **39 Content Blocks** - Text, images, tables, lists, callouts, etc.
- **7 Quiz Questions** - True/false and multiple choice questions
- **Content Types**: Hero, Text, Card, Image, Table, List, Grid, Callout, Quote, Divider

## 🚀 Quick Start Guide

### Option 1: Using SQL Insert Statements (Recommended)

1. **Set up your Supabase database:**
   ```bash
   # Run the schema file first
   psql -h your-supabase-host -U postgres -d postgres -f lms-content-database-schema.sql
   
   # Then run the insert statements
   psql -h your-supabase-host -U postgres -d postgres -f lms-content-inserts.sql
   ```

2. **Verify the data:**
   ```sql
   SELECT COUNT(*) FROM courses;
   SELECT COUNT(*) FROM course_sections;
   SELECT COUNT(*) FROM content_blocks;
   SELECT COUNT(*) FROM quiz_questions;
   ```

### Option 2: Using Supabase CLI

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login and link your project:**
   ```bash
   supabase login
   supabase link --project-ref your-project-ref
   ```

3. **Run the import script:**
   ```bash
   chmod +x supabase-import.sh
   ./supabase-import.sh
   ```

### Option 3: Using CSV Import via Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Import each CSV file:
   - `courses.csv` → `courses` table
   - `course_sections.csv` → `course_sections` table
   - `content_blocks.csv` → `content_blocks` table
   - `quiz_questions.csv` → `quiz_questions` table

## 🗄️ Database Schema Overview

### Core Tables

#### `courses`
- Main course information
- Version control and publishing status

#### `course_sections`
- Individual training sections
- Ordered sequence with icons
- Publishing controls

#### `content_blocks`
- Structured content within sections
- JSON content storage for flexibility
- Support for multiple content types

#### `quiz_questions`
- Assessment questions
- Multiple question types (true/false, multiple choice)
- Answer validation and explanations

### Multilingual Support

#### Translation Tables
- `course_translations`
- `section_translations`
- `content_block_translations`
- `quiz_question_translations`

### User Progress & Analytics

#### Progress Tracking
- `user_progress` - Section completion tracking
- `quiz_attempts` - Quiz answer history
- `content_interactions` - User engagement analytics

## 📝 Content Structure

### Course: Function-Specific HazMat Training

#### Section 1: Introduction & Overview
- Welcome message and training overview
- Learning objectives
- Training requirements explanation

#### Section 2: UN-Rated Packaging Fundamentals
- Understanding UN-rated packaging
- Testing standards and requirements
- Visual examples and explanations

#### Section 3: When UN-Rated Packaging is Required
- Hazard class identification
- SpecChem-specific materials
- Critical compliance rules
- **Quiz 1**: True/False question about packaging substitution

#### Section 4: Responsibility & Compliance
- DOT vs Shipper responsibilities
- Compliance requirements
- **Quiz 2**: Multiple choice about UN packaging enforcement

#### Section 5: Finding Information Sources
- Three primary information sources
- SDS, Production Orders, Excel files
- **Quiz 3**: Multiple choice about common materials

#### Section 6: Package Marking Requirements
- I-SHIP system explanation
- Label placement guidelines
- **Quiz 4**: Multiple choice about information sources

#### Section 7: Proper Closure Procedures
- Drum, pail, and tote closure procedures
- Torque requirements and tools
- **Quiz 5**: Multiple choice about closing instructions

#### Section 8: Knowledge Check
- Comprehensive quiz questions
- **Quiz 6**: True/False about marking requirements

#### Section 9: Quick Reference
- Emergency procedures
- Key reminders
- File locations
- **Quiz 7**: True/False about torque requirements

## 🔧 API Integration

### Example API Endpoints

```typescript
// Get course content
GET /api/courses/hazmat-function-specific/content?lang=en

// Get specific section
GET /api/courses/hazmat-function-specific/sections/introduction

// Submit quiz answer
POST /api/courses/hazmat-function-specific/sections/introduction/quiz
{
  "questionId": "quiz-1",
  "answer": "False"
}

// Track progress
POST /api/courses/hazmat-function-specific/sections/introduction/progress
{
  "isCompleted": true,
  "completionPercentage": 100
}
```

## 🎯 Next Steps

1. **Import the data** using one of the methods above
2. **Verify the import** by checking record counts
3. **Test API endpoints** if you have a backend
4. **Update your frontend** to consume the new database structure
5. **Set up analytics** to track user progress and engagement

## 🔍 Content Block Types

### Hero Blocks
- Course titles and introductions
- Badge information
- Visual headers

### Text Blocks
- Paragraph content
- Formatted text with headings
- Explanatory content

### Card Blocks
- Information containers
- Structured data presentation
- Visual content grouping

### Image Blocks
- Training images and diagrams
- Clickable images with lightbox
- Captions and alt text

### Table Blocks
- Structured data tables
- Comparison charts
- Reference information

### List Blocks
- Bulleted and numbered lists
- Checklist items
- Step-by-step procedures

### Grid Blocks
- Multi-column layouts
- Feature comparisons
- Visual content grids

### Callout Blocks
- Important information highlights
- Warning messages
- Key reminders

## 📈 Analytics & Tracking

The schema includes comprehensive tracking for:
- User progress through sections
- Quiz attempt history
- Content interaction analytics
- Completion rates and time spent

## 🛡️ Security Features

- Row Level Security (RLS) policies
- Public read access for published content
- User-specific access for progress tracking
- Secure quiz answer storage

## 📞 Support

If you encounter any issues with the import process:

1. Check the Supabase logs for errors
2. Verify your database permissions
3. Ensure all required tables exist
4. Check for foreign key constraint violations

The extracted content is ready for immediate use in your Supabase PostgreSQL database!
