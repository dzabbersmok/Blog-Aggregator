import { pgTable, timestamp, uuid, text, foreignKey } from "drizzle-orm/pg-core";

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
export type User = typeof users.$inferSelect;
// The $onUpdate function sets the updatedAt field to a default value whenever the row is updated.

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export type Feed = typeof feeds.$inferSelect;