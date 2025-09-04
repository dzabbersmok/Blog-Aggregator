import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
    console.log("createFeed called with:", { name, url, userId });
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
        console.error("Full error details:", error);
        throw error;
    }
}

export async function getFeeds() {
    return await db.select().from(feeds);
}