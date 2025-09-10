import { eq, and } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";

export async function deleteFeedFollows(userId: string, feedUrl: string) {
    const [ feed ] = await db.select().from(feeds).where(eq(feeds.url, feedUrl));
    if (!feed) {
        throw new Error(`Feed not found for url: ${feedUrl}`);
    }

    await db.delete(feedFollows)
            .where(
                and(
                    eq(feedFollows.feedId, feed.id), 
                    eq(feedFollows.userId, userId)
            ));
}

export async function getFeedFollowsForUser(userId: string) {
    const query = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            feedName: feeds.name,
            userName: users.name,
        })
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .where(eq(feedFollows.userId, userId));

    return query;
}

export async function createFeedFollow(userId: string, feedId: string) {
    try {
        const [ newFeedFollow ] = await db
            .insert(feedFollows)
            .values({userId, feedId})
            .returning();

        const query = await db
            .select({
                id: feedFollows.id,
                createdAt: feedFollows.createdAt,
                updatedAt: feedFollows.updatedAt,
                userId: feedFollows.userId,
                feedId: feedFollows.feedId,
                feedName: feeds.name,
                userName: users.name,
            })
            .from(feedFollows)
            .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
            .innerJoin(users, eq(feedFollows.userId, users.id))
            .where(eq(feedFollows.id, newFeedFollow.id))

        return query;
    } catch (error) {
        console.log("ERROR", (error as Error).message);
    }
};