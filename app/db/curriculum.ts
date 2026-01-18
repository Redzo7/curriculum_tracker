import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const curriculum = pgTable(
    "curriculum",
    {
        "id": serial("id").primaryKey(),
        "name": text("name").notNull(),
        "validFromYear": integer("valid_from_year").notNull(),

        ...timestamps
    }
)