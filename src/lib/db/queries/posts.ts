import { desc, eq, inArray } from "drizzle-orm";
import { db } from "..";
import { RSSItem } from "../../rss/fetch";
import { posts } from "../schema";
import { getFeedFollowsForUser } from "./feed-follows";

// rssItem: {
//   title: 'Hieroglyphs are easier to read than they look [video]',
//   link: 'https://www.youtube.com/watch?v=90An1dnvwyc',
//   description: '\n' +
//     '<p>Article URL: <a href="https://www.youtube.com/watch?v=90An1dnvwyc">https://www.youtube.com/watch?v=90An1dnvwyc</a></p>\n' +
//     '<p>Comments URL: <a href="https://news.ycombinator.com/item?id=45259657">https://news.ycombinator.com/item?id=45259657</a></p>\n' +
//     '<p>Points: 1</p>\n' +
//     '<p># Comments: 0</p>\n',
//   pubDate: 'Tue, 16 Sep 2025 08:38:08 +0000'
// }

//   id:
//   createdAt:
//   updatedAt:
//   title:
//   url:
//   description:
//   publishedAt:
//   feedId:

// RSSItem =
//   title: string;
//   link: string;
//   description: string;
//   pubDate: string;

// const [result] = await db.insert(users).values({ name: name }).returning();
// return result;

// Create a createPost function. This should insert a new post into the database.
export async function createPost(rssItem: RSSItem, feedId: string) {
    const post = {
        title: rssItem.title ?? "",
        url: rssItem.link,
        description: rssItem.description ?? null,
        publishedAt: toDateOrNow(rssItem.pubDate),
        feedId
    }

    try {
        const test = await db.insert(posts).values(post).returning();
        console.log("ADDED", test);
    } catch (error: unknown) {
        const e = error as { code?: string; detail?: string; message?: string };
        if (e.code === "23505") {
            console.warn("Duplicate post skipped:", {
                feedId,
                url: rssItem.link,
                detail: e.detail ?? e.message,
            });
        return;
        }
        throw error;
    }
}

// Create a getPostsForUser function. Order the results so that the most recent posts are first. 
// Make the number of posts returned configurable.
export async function getPostsForUser(userId: string, limit: number) {
    const feedFollows = await getFeedFollowsForUser(userId);
    const feedsIds = feedFollows.map(feed => feed.feedId);
    if (feedsIds.length === 0) return [];

    return await db.select()
                   .from(posts)
                   .where(inArray(posts.feedId, feedsIds))
                   .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
                   .limit(limit);
}

function toDateOrNow(s?: string) {
  if (!s) return new Date();
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date() : d;
}