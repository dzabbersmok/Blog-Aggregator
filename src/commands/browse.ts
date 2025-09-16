import { UserCommandHandler } from "../middleware";
import { getPostsForUser } from "../lib/db/queries/posts";

export const handlerBrowse: UserCommandHandler = async (_cmdName, user, ...args) => {
    let limit = 2;
    if (args[0]) limit = Number(args[0]);
    const userId = user.id;

    const latestPosts = await getPostsForUser(userId, limit);

    console.log(latestPosts);
    for (const post of latestPosts) {
        console.log(`[${post.publishedAt?.toISOString() ?? post.createdAt?.toISOString()}] ${post.title} - ${post.url}`);
    }
}