import { getUser } from "../lib/db/queries/users";
import { createFeed } from "../lib/db/queries/feeds";
import { readConfig } from "../config";
import { Feed, User } from "../lib/db/schema";

export const handleAddFeed = async (_cmdName: string, name: string, url: string) => {
    console.log("handleFeed");
    console.log("Parameters received:", { name, url }); // Add this line
    const currentUserName = readConfig().currentUserName;
    const user = await getUser(currentUserName);
    if (!user) {
        throw new Error("user not found!");
    }

    console.log("About to create feed with:", { name, url, userId: user.id }); // Add this line
    const feed = await createFeed(name, url, user.id);
    printFeed(feed, user);
}

export const printFeed = (feed: Feed, user: User) => {
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}