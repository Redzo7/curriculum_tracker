import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

const knowledgeType = pgEnum("knowledge_type", ["Mathematics", "Informatics", "Computer Science", "Other"]);

export const courses = pgTable(
    "courses", 
    {
        "code": text("code").primaryKey(),
        "name": text("name").notNull(),
        "credit": integer("credit").notNull(),
        "knowledgeType": knowledgeType().default("Other"),
        
    }
)