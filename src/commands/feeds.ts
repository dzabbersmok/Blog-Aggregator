import { getUserById } from "src/lib/db/queries/users";
import { getFeeds } from "../lib/db/queries/feeds";
import { CommandHandler } from "./commands";
import {printFeed} from "./addfeed"

export const handleFeeds: CommandHandler = async (_cmdName, ..._args) => {
    const feeds = await getFeeds();

    if (feeds.length === 0) {
        console.log(`No feeds found.`);
        return;
    }

    console.log(`Found %d feeds:\n`, feeds.length);
    for (const feed of feeds) {
        const user = await getUserById(feed.userId);
        if (!user) {
            throw new Error(`Failed to find user for feed ${feed.id}`);
        }
        printFeed(feed, user);
    }
};