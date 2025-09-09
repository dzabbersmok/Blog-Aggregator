import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { CommandHandler } from "./commands";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import { getFeeds } from "../lib/db/queries/feeds";

export const handleFollow: CommandHandler = async (_cmdName, ...args) => {
    if (args.length === 0) {
        throw new Error("url is required!");
    }

    const url = args[0];
    console.log("url", url);
    const feeds = await getFeeds();
    const feed = feeds.filter(feedObj => feedObj.url === url);
    console.log("feed", feed);
    if (feed.length === 0) return;
    
    const user = await getUserByName(readConfig().currentUserName);
    if (!user) {
        throw new Error("user not found!");
    }

    console.log("TEST", feed[0].id);
    const result = await createFeedFollow(user.id, feed[0].id);
    // create new feed follow record for the current user
    // print the name of the feed and the current user once the record is created
    console.log("handleFollow", result);
}