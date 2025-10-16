-- LMS Content Database Schema for Supabase PostgreSQL
-- This schema is designed to store all course content from the HazMat training ebook

-- ========================================
-- ENUM TYPES
-- ========================================

CREATE TYPE "public"."content_block_type" AS ENUM(
  'hero', 'text', 'card', 'image', 'table', 'list', 'grid', 
  'callout', 'quote', 'divider', 'video', 'audio'
);

CREATE TYPE "public"."question_type" AS ENUM('true-false', 'multiple-choice');

CREATE TYPE "public"."language_code" AS ENUM('en', 'es', 'fr', 'de');

CREATE TYPE "public"."interaction_type" AS ENUM(
  'view', 'click', 'expand', 'collapse', 'download', 'share'
);

-- ========================================
-- MAIN COURSE TABLES
-- ========================================

-- Courses table
CREATE TABLE "courses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_key" text UNIQUE NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "version" text DEFAULT '1.0',
  "is_published" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Course sections
CREATE TABLE "course_sections" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  "section_key" text NOT NULL,
  "title" text NOT NULL,
  "order_index" integer NOT NULL,
  "icon_name" text,
  "is_published" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "course_sections_course_section_unique" UNIQUE("course_id", "section_key"),
  CONSTRAINT "course_sections_course_order_unique" UNIQUE("course_id", "order_index")
);

-- Content blocks (for structured content within sections)
CREATE TABLE "content_blocks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "section_id" uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  "block_type" "content_block_type" NOT NULL,
  "order_index" integer NOT NULL,
  "content" jsonb NOT NULL,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "content_blocks_section_order_unique" UNIQUE("section_id", "order_index")
);

-- Quiz questions
CREATE TABLE "quiz_questions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "section_id" uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  "question_key" text NOT NULL,
  "question_type" "question_type" NOT NULL,
  "question_text" text NOT NULL,
  "options" jsonb,
  "correct_answer" jsonb NOT NULL,
  "explanation" text,
  "order_index" integer DEFAULT 0 NOT NULL,
  "is_published" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "quiz_questions_section_key_unique" UNIQUE("section_id", "question_key")
);

-- ========================================
-- MULTILINGUAL SUPPORT
-- ========================================

-- Course translations
CREATE TABLE "course_translations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  "language_code" "language_code" NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "course_translations_course_language_unique" UNIQUE("course_id", "language_code")
);

-- Section translations
CREATE TABLE "section_translations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "section_id" uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  "language_code" "language_code" NOT NULL,
  "title" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "section_translations_section_language_unique" UNIQUE("section_id", "language_code")
);

-- Content block translations
CREATE TABLE "content_block_translations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "content_block_id" uuid NOT NULL REFERENCES content_blocks(id) ON DELETE CASCADE,
  "language_code" "language_code" NOT NULL,
  "content" jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "content_block_translations_block_language_unique" UNIQUE("content_block_id", "language_code")
);

-- Quiz question translations
CREATE TABLE "quiz_question_translations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "quiz_question_id" uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  "language_code" "language_code" NOT NULL,
  "question_text" text NOT NULL,
  "options" jsonb,
  "correct_answer" jsonb NOT NULL,
  "explanation" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "quiz_question_translations_question_language_unique" UNIQUE("quiz_question_id", "language_code")
);

-- ========================================
-- USER PROGRESS & ANALYTICS
-- ========================================

-- User progress tracking
CREATE TABLE "user_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "course_id" uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  "section_id" uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  "is_completed" boolean DEFAULT false NOT NULL,
  "completion_percentage" integer DEFAULT 0 NOT NULL,
  "time_spent_seconds" integer DEFAULT 0 NOT NULL,
  "last_accessed_at" timestamp DEFAULT now() NOT NULL,
  "completed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "user_progress_user_section_unique" UNIQUE("user_id", "section_id")
);

-- Quiz attempts
CREATE TABLE "quiz_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "quiz_question_id" uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  "user_answer" jsonb NOT NULL,
  "is_correct" boolean NOT NULL,
  "attempted_at" timestamp DEFAULT now() NOT NULL,
  "time_spent_seconds" integer DEFAULT 0 NOT NULL
);

-- Content interactions
CREATE TABLE "content_interactions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "content_block_id" uuid NOT NULL REFERENCES content_blocks(id) ON DELETE CASCADE,
  "interaction_type" "interaction_type" NOT NULL,
  "metadata" jsonb,
  "interacted_at" timestamp DEFAULT now() NOT NULL
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Course indexes
CREATE INDEX "idx_courses_course_key" ON "courses"("course_key");
CREATE INDEX "idx_courses_published" ON "courses"("is_published");

-- Section indexes
CREATE INDEX "idx_course_sections_course_id" ON "course_sections"("course_id");
CREATE INDEX "idx_course_sections_order" ON "course_sections"("course_id", "order_index");
CREATE INDEX "idx_course_sections_published" ON "course_sections"("is_published");

-- Content block indexes
CREATE INDEX "idx_content_blocks_section_id" ON "content_blocks"("section_id");
CREATE INDEX "idx_content_blocks_order" ON "content_blocks"("section_id", "order_index");
CREATE INDEX "idx_content_blocks_type" ON "content_blocks"("block_type");

-- Quiz question indexes
CREATE INDEX "idx_quiz_questions_section_id" ON "quiz_questions"("section_id");
CREATE INDEX "idx_quiz_questions_order" ON "quiz_questions"("section_id", "order_index");
CREATE INDEX "idx_quiz_questions_published" ON "quiz_questions"("is_published");

-- Translation indexes
CREATE INDEX "idx_course_translations_course_id" ON "course_translations"("course_id");
CREATE INDEX "idx_course_translations_language" ON "course_translations"("language_code");
CREATE INDEX "idx_section_translations_section_id" ON "section_translations"("section_id");
CREATE INDEX "idx_section_translations_language" ON "section_translations"("language_code");
CREATE INDEX "idx_content_block_translations_block_id" ON "content_block_translations"("content_block_id");
CREATE INDEX "idx_content_block_translations_language" ON "content_block_translations"("language_code");
CREATE INDEX "idx_quiz_question_translations_question_id" ON "quiz_question_translations"("quiz_question_id");
CREATE INDEX "idx_quiz_question_translations_language" ON "quiz_question_translations"("language_code");

-- User progress indexes
CREATE INDEX "idx_user_progress_user_id" ON "user_progress"("user_id");
CREATE INDEX "idx_user_progress_course_id" ON "user_progress"("course_id");
CREATE INDEX "idx_user_progress_section_id" ON "user_progress"("section_id");
CREATE INDEX "idx_user_progress_completed" ON "user_progress"("is_completed");

-- Quiz attempt indexes
CREATE INDEX "idx_quiz_attempts_user_id" ON "quiz_attempts"("user_id");
CREATE INDEX "idx_quiz_attempts_question_id" ON "quiz_attempts"("quiz_question_id");
CREATE INDEX "idx_quiz_attempts_correct" ON "quiz_attempts"("is_correct");
CREATE INDEX "idx_quiz_attempts_date" ON "quiz_attempts"("attempted_at");

-- Content interaction indexes
CREATE INDEX "idx_content_interactions_user_id" ON "content_interactions"("user_id");
CREATE INDEX "idx_content_interactions_block_id" ON "content_interactions"("content_block_id");
CREATE INDEX "idx_content_interactions_type" ON "content_interactions"("interaction_type");
CREATE INDEX "idx_content_interactions_date" ON "content_interactions"("interacted_at");

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE "courses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_sections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_blocks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "quiz_questions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_translations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "section_translations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_block_translations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "quiz_question_translations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_progress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "quiz_attempts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_interactions" ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "courses_public_read" ON "courses" FOR SELECT USING (is_published = true);
CREATE POLICY "course_sections_public_read" ON "course_sections" FOR SELECT USING (is_published = true);
CREATE POLICY "content_blocks_public_read" ON "content_blocks" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM course_sections cs 
    WHERE cs.id = content_blocks.section_id 
    AND cs.is_published = true
  )
);
CREATE POLICY "quiz_questions_public_read" ON "quiz_questions" FOR SELECT USING (is_published = true);

-- Translation policies (inherit from parent content)
CREATE POLICY "course_translations_public_read" ON "course_translations" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM courses c 
    WHERE c.id = course_translations.course_id 
    AND c.is_published = true
  )
);

CREATE POLICY "section_translations_public_read" ON "section_translations" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM course_sections cs 
    WHERE cs.id = section_translations.section_id 
    AND cs.is_published = true
  )
);

CREATE POLICY "content_block_translations_public_read" ON "content_block_translations" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM content_blocks cb
    JOIN course_sections cs ON cs.id = cb.section_id
    WHERE cb.id = content_block_translations.content_block_id 
    AND cs.is_published = true
  )
);

CREATE POLICY "quiz_question_translations_public_read" ON "quiz_question_translations" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM quiz_questions qq
    JOIN course_sections cs ON cs.id = qq.section_id
    WHERE qq.id = quiz_question_translations.quiz_question_id 
    AND cs.is_published = true
  )
);

-- User-specific policies for progress and interactions
CREATE POLICY "user_progress_user_access" ON "user_progress" FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY "quiz_attempts_user_access" ON "quiz_attempts" FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY "content_interactions_user_access" ON "content_interactions" FOR ALL USING (auth.uid()::text = user_id);

-- ========================================
-- FUNCTIONS AND TRIGGERS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_sections_updated_at BEFORE UPDATE ON course_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_translations_updated_at BEFORE UPDATE ON course_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section_translations_updated_at BEFORE UPDATE ON section_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_block_translations_updated_at BEFORE UPDATE ON content_block_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quiz_question_translations_updated_at BEFORE UPDATE ON quiz_question_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate course completion percentage
CREATE OR REPLACE FUNCTION calculate_course_completion(user_id_param text, course_id_param uuid)
RETURNS integer AS $$
DECLARE
    total_sections integer;
    completed_sections integer;
    completion_percentage integer;
BEGIN
    -- Get total sections for the course
    SELECT COUNT(*) INTO total_sections
    FROM course_sections
    WHERE course_id = course_id_param AND is_published = true;
    
    -- Get completed sections for the user
    SELECT COUNT(*) INTO completed_sections
    FROM user_progress
    WHERE user_id = user_id_param 
    AND course_id = course_id_param 
    AND is_completed = true;
    
    -- Calculate percentage
    IF total_sections = 0 THEN
        completion_percentage := 0;
    ELSE
        completion_percentage := (completed_sections * 100) / total_sections;
    END IF;
    
    RETURN completion_percentage;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- SAMPLE DATA INSERTION
-- ========================================

-- Insert the main HazMat course
INSERT INTO courses (course_key, title, description, version, is_published) VALUES 
('hazmat-function-specific', 'Function-Specific HazMat Training', 'Handling, Packaging, and Shipping DOT-Regulated Materials', '1.0', true);

-- Get the course ID for foreign key references
-- Note: In actual implementation, you would use the returned UUID from the INSERT
-- For this schema, we'll reference it as a placeholder
