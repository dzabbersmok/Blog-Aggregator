import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { getFeeds } from "../lib/db/queries/feeds";
import { UserCommandHandler } from "../middleware";

export const handleFollow: UserCommandHandler = async (_cmdName, user, ...args) => {
    if (args.length === 0) {
        throw new Error("url is required!");
    }

    const url = args[0];
    const feeds = await getFeeds();
    const feed = feeds.filter(feedObj => feedObj.url === url);

    if (feed.length === 0) return;
    
    const result = await createFeedFollow(user.id, feed[0].id);
    console.log("handleFollow", result);
}