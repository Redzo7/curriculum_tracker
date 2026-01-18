CREATE TYPE "public"."course_evaluation_type" AS ENUM('practical', 'colloquium', 'continuous_practical', 'combined_practical', 'combined_continuous_practical', 'combined_colloquium');--> statement-breakpoint
CREATE TYPE "public"."course_type" AS ENUM('core', 'spec_mandatory', 'spec_selectable');--> statement-breakpoint
CREATE TYPE "public"."knowledge_type" AS ENUM('mathematics', 'informatics', 'computer_science', 'other');--> statement-breakpoint
CREATE TYPE "public"."prerequisite_type" AS ENUM('weak', 'strong');--> statement-breakpoint
CREATE TABLE "course_prerequisite" (
	"course_id" text NOT NULL,
	"prerequisite_code" text NOT NULL,
	"type" "prerequisite_type" DEFAULT 'strong',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_prerequisite_course_id_prerequisite_code_pk" PRIMARY KEY("course_id","prerequisite_code")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"lecture_h" integer DEFAULT 0 NOT NULL,
	"practice_h" integer DEFAULT 0 NOT NULL,
	"lab_h" integer DEFAULT 0 NOT NULL,
	"consultation_h" integer DEFAULT 0 NOT NULL,
	"credit" integer NOT NULL,
	"knowledge_type" "knowledge_type" DEFAULT 'other',
	"evaluation_type" "course_evaluation_type" DEFAULT 'practical' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"valid_from_year" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum_course" (
	"curriculum_id" integer NOT NULL,
	"course_code" text NOT NULL,
	"type" "course_type" DEFAULT 'core' NOT NULL,
	CONSTRAINT "curriculum_course_curriculum_id_course_code_pk" PRIMARY KEY("curriculum_id","course_code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "course_prerequisite" ADD CONSTRAINT "course_prerequisite_course_id_courses_code_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_prerequisite" ADD CONSTRAINT "course_prerequisite_prerequisite_code_courses_code_fk" FOREIGN KEY ("prerequisite_code") REFERENCES "public"."courses"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_course" ADD CONSTRAINT "curriculum_course_curriculum_id_curriculum_id_fk" FOREIGN KEY ("curriculum_id") REFERENCES "public"."curriculum"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_course" ADD CONSTRAINT "curriculum_course_course_code_courses_code_fk" FOREIGN KEY ("course_code") REFERENCES "public"."courses"("code") ON DELETE cascade ON UPDATE no action;