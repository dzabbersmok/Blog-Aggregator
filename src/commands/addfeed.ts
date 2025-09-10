import { createFeed } from "../lib/db/queries/feeds";
import { Feed, User } from "../lib/db/schema";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { UserCommandHandler } from "../middleware";

export const handleAddFeed: UserCommandHandler = async (_cmdName, user, ...args) => {
    const name = args[0];
    const url = args[1];

    try {
        const feed = await createFeed(name, url, user.id);
        const test = await createFeedFollow(user.id, feed.id);
        // console.log("test", test);
        printFeed(feed, user);
    } catch (error) {
        if (typeof error === "object" && error !== null && "cause" in error) {
            const cause = (error as { cause?: object }).cause;

            if (typeof cause === "object" && cause !== null && "code" in cause && "constraint_name" in cause) {
                if (cause.code === '23505' && cause.constraint_name === 'feeds_url_unique') {
                    console.log("This is a duplicate key error for feeds_url_unique!");
                }
            }
        }
    }
}

export const printFeed = (feed: Feed, user: User) => {
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}