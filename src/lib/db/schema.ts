import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

// id: a UUID that will serve as the primary key
// created_at: a TIMESTAMP that can not be null
// updated_at: a TIMESTAMP that can not be null
// name: a unique string that can not be null
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});
// The $onUpdate function sets the updatedAt field to a default value whenever the row is updated.
