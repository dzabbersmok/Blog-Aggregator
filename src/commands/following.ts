import { getFeedFollowsForUser } from "../lib/db/queries/feed-follows";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import { CommandHandler } from "./commands";

export const handleFollowing: CommandHandler = async (_cmdName, ..._args) => {
    const user = await getUserByName(readConfig().currentUserName);
    console.log("user", user)
    if (!user) return;

    const feeds = await getFeedFollowsForUser(user.id);
    console.log("feeds", feeds);
    feeds.forEach(feed => console.log(feed.feedName));
}