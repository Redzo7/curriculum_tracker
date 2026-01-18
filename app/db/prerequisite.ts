import { primaryKey, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { courses } from "./course";

const prerequisiteType = pgEnum("prereq_type", ["weak", "strong"]);

export const coursePrerequisite = pgTable(
    "course_prerequisite",
    {
        "courseId": text("course_id").references(() => courses.code),
        "prerequisiteId": text("prereq_id").references(() => courses.code),
        "type": prerequisiteType().default("strong")
    },
    (table) => [
        primaryKey({columns: [table.courseId, table.prerequisiteId]})
    ]
);