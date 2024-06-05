import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { $schema } from ".";

export const exampleModel = $schema.table("example", {
    id: serial("id").primaryKey(),
    image: text("image").notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
});