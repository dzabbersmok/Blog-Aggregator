import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";

export async function getFeedFollowsForUser(userId: string) {
    // console.log("userId", userId);
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

    // console.log("query", query);
    return query;
}

export async function createFeedFollow(userId: string, feedId: string) {
    console.log("createFeedFollow userId, url:", userId, feedId);
    try {
        // console.log("1");
        const [ newFeedFollow ] = await db
            .insert(feedFollows)
            .values({userId, feedId})
            .returning();


        // console.log("2", newFeedFollow.id);
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
            // .then(([row]) => row);
        
        // console.log("QUERY", query);
        return query;
    } catch (error) {
        console.log("ERROR", (error as Error).message);
    }
};

// RETURN for handleFollow
// WITHOUT .then(([row]) => row);
// [
//   {
//     id: '1fbcfa48-84ff-4847-8edd-52db85ad3a29',
//     createdAt: 2025-09-04T15:23:43.999Z,
//     updatedAt: 2025-09-04T15:23:43.999Z,
//     userId: 'cee54e89-4025-489d-adad-b88045707a15',
//     feedId: 'c34c223a-b73b-4324-b385-01bdd51fd76f',
//     feedName: 'Hacker News RSS',
//     userName: 'kahya'
//   }
// ]
// WITH .then(([row]) => row);
// {
//   id: '36654045-7b99-472b-a757-9c0ff062287a',
//   createdAt: 2025-09-04T15:22:48.396Z,
//   updatedAt: 2025-09-04T15:22:48.396Z,
//   userId: 'e0b27e36-990e-4007-a623-8348d9d80b05',
//   feedId: 'e826b12a-4dee-4c5b-993d-0003e6b315cb',
//   feedName: 'Hacker News RSS',
//   userName: 'kahya'
// }