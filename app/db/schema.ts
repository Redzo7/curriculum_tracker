import { integer, pgEnum, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";


export const knowledgeType = pgEnum("knowledge_type", ["mathematics", "informatics", "computer_science", "other"]);
export const courseEvaluationType = pgEnum("course_evaluation_type", ["practical", "colloquium", "continuous_practical", "combined_practical", "combined_continuous_practical", "combined_colloquium"])
export const courseType = pgEnum("course_type", ["core", "spec_mandatory", "spec_selectable"]);
export const prerequisiteType = pgEnum("prerequisite_type", ["weak", "strong"]);

export const courses = pgTable(
    "courses", 
    {
        "code": text("code").primaryKey(),
        "name": text("name").notNull(),

        "lectureHours": integer("lecture_h").notNull().default(0),
        "practiceHours": integer("practice_h").notNull().default(0),
        "laboratoryHours": integer("lab_h").notNull().default(0),
        "constultationHours": integer("consultation_h").notNull().default(0),

        "credit": integer("credit").notNull(),

        "knowledgeType": knowledgeType("knowledge_type").default("other"),
        "evaluationType": courseEvaluationType("evaluation_type").default("practical").notNull(),

        ...timestamps
    }
)

export const curriculum = pgTable(
    "curriculum",
    {
        "id": serial("id").primaryKey(),
        "name": text("name").notNull(),
        "validFromYear": integer("valid_from_year").notNull(),

        ...timestamps
    }
)

export const curriculumCourse = pgTable(
    "curriculum_course",
    {
        "curriculumId": integer("curriculum_id").references(() => curriculum.id, {onDelete: "cascade"}).notNull(),
        "courseCode": text("course_code").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "type": courseType("type").default("core").notNull()
    },
    (table) => [
        primaryKey({columns: [table.curriculumId, table.courseCode]})
    ]
);

export const coursePrerequisite = pgTable(
    "course_prerequisite",
    {
        "courseId": text("course_id").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "prerequisiteCode": text("prerequisite_code").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "type": prerequisiteType("type").default("strong"),
        ...timestamps
    },
    (table) => [
        primaryKey({columns: [table.courseId, table.prerequisiteCode]})
    ]
);

export const users = pgTable(
    "users", 
    {
        id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
        firstName: text("firstName").notNull(),
        lastName: text("lastName").notNull(),
        email: text("email").notNull().unique(),

        password: text("password").notNull(),

        ...timestamps
    }
);