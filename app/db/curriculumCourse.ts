import { integer, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { curriculum } from "./curriculum";
import { courses } from "./course";

const courseType = pgEnum("course_type", ["core", "spec_mandatory", "spec_selectable"]);

export const curriculumCourse = pgTable(
    "curriculum_course",
    {
        "curriculumId": integer("curriculum_id").references(() => curriculum.id, {onDelete: "cascade"}).notNull(),
        "courseCode": integer("course_code").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "type": courseType("type").default("core").notNull()
    },
    (table) => [
        primaryKey({columns: [table.curriculumId, table.courseCode]})
    ]
);