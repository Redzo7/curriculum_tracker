import {integer, pgTable, text} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

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