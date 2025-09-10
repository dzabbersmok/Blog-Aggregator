import { deleteFeedFollows } from "../lib/db/queries/feed-follows";
import { UserCommandHandler } from "../middleware";

export const handleUnfollow: UserCommandHandler = async (_cmdName, user, ...args) => {
    // command accepts a feed's URL as an argument and unfollows it for the current user
    // use the new middleware
    // npm run start follow "https://hnrss.org/newest"
    // npm run start unfollow "https://hnrss.org/newest"
    const url = args[0];
    if (!url) {
        throw new Error("url is required");
    }

    await deleteFeedFollows(user.id, url);
}