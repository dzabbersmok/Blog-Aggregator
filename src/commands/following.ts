import { getFeedFollowsForUser } from "../lib/db/queries/feed-follows";
import { UserCommandHandler } from "../middleware";

export const handleFollowing: UserCommandHandler = async (_cmdName, user, ..._args) => {
    const feeds = await getFeedFollowsForUser(user.id);
    feeds.forEach(feed => console.log(feed.feedName));
}