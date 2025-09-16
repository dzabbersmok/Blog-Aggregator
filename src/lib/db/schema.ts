import { pgTable, timestamp, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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
  createdAt: timestamp("created_at").notNull().default(new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  lastFetchedAt: timestamp("last_fetched_at")
});

export type Feed = typeof feeds.$inferSelect;

export const feedFollows = pgTable("feed_follows", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom()
    .notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  feedId: uuid("feed_id")
    .references(() => feeds.id, { onDelete: "cascade" })
    .notNull()
}, (table) => [
  uniqueIndex("user_feed_unique").on(table.userId, table.feedId)
]);

export const posts = pgTable("posts", {
  id: uuid("id")
        .primaryKey()
        .defaultRandom()
        .notNull(),
  createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),
  updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
  title: text("title")
        .notNull(),
  url: text("url")
        .notNull(),
  description: text("description"),
  publishedAt: timestamp("published_at")
        .notNull(),
  feedId: uuid("feed_id")
        .notNull()
        .references(() => feeds.id, { onDelete: "cascade" })
}, (table) => [
  uniqueIndex("posts_feed_url_unique").on(table.feedId, table.url)
]);