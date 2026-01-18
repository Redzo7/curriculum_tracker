import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

const knowledgeType = pgEnum("knowledge_type", ["mathematics", "informatics", "computer_science", "other"]);
const courseEvaluationType = pgEnum("course_evaluation_type", ["practical", "colloquium", "continuous_practical", "combined_practical", "combined_continuous_practical", "combined_colloquium"])

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

        "knowledgeType": knowledgeType().default("other"),
        "evaluationType": courseEvaluationType().default("practical").notNull(),

        ...timestamps
    }
)