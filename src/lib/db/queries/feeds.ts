import { db } from "..";
import { eq, sql } from "drizzle-orm";
import { Feed, feeds } from "../schema";

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

export async function markFeedFetched(feedId: string) {
    const res = await db.update(feeds)
                        .set({lastFetchedAt: new Date()})
                        .where(eq(feeds.id, feedId))
                        .returning({ id: feeds.id, lastFetchedAt: feeds.lastFetchedAt, updatedAt: feeds.updatedAt });

    if (res.length === 0) {
        // Something went wrong?
        throw new Error('missing response');
    }

    return res;
}

export async function getNextFeedToFetch() {
    const test = await db.select().from(feeds).limit(1);

    console.log("START", test);
    const [ result ] = await db
        .select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchedAt} asc nulls first`)
        .limit(1);
    console.log("RESULT");
    return result ?? null;
}

// export async function getNextFeedToFetch(): Promise<Feed | null> {
//     console.log("Ho")
//     const [ rows ] = await db.execute(sql`
//         SELECT id, name, created_at, updated_at, url, user_id, last_fetched_at
//         FROM ${feeds}
//         ORDER BY last_fetched_at NULLS FIRST, updated_at ASC, id ASC
//         LIMIT 1
//     `) as unknown as Array<{
//         id: string;
//         name: string;
//         created_at: string | Date;
//         updated_at: string | Date;
//         url: string;
//         user_id: string;
//         last_fetched_at: string | Date | null;
//     }>;

//     console.log("rows", rows);
//     if (!rows) return null;

//     const result: Feed = {
//         id: rows.id,
//         name: rows.name,
//         createdAt: new Date(rows.created_at),
//         updatedAt: new Date(rows.updated_at),
//         url: rows.url,
//         userId: rows.user_id,
//         lastFetchedAt: rows.last_fetched_at ? new Date(rows.last_fetched_at) : null,
//     };
//     console.log("res", result);
//     return result;
// }

/*
npm run start reset
npm run start register kahya
npm run start addfeed "Hacker News RSS" "https://hnrss.org/newest"
npm run start addfeed "Lanes Blog" "https://www.wagslane.dev/index.xml"
*/