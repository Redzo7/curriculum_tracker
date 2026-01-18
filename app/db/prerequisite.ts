import { primaryKey, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { timestamps } from "./columns.helpers";

const prerequisiteType = pgEnum("prereq_type", ["weak", "strong"]);

export const coursePrerequisite = pgTable(
    "course_prerequisite",
    {
        "courseId": text("course_id").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "prerequisiteId": text("prereq_id").references(() => courses.code, {onDelete: "cascade"}).notNull(),
        "type": prerequisiteType("type").default("strong"),
        ...timestamps
    },
    (table) => [
        primaryKey({columns: [table.courseId, table.prerequisiteId]})
    ]
);