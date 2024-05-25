import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const exampleModel = pgTable("example", {
    id: serial("id").primaryKey(),
    image: text("image").notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
});