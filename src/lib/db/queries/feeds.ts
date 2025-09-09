import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
    try {
        const result = await db
            .insert(feeds)
            .values({
                name: name,
                url: url,
                userId: userId,
            })
            .returning();
        
        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function getFeeds() {
    return await db.select().from(feeds);
}