// fetch the feed found at https://www.wagslane.dev/index.xml and print the entire object to the console
import { fetchFeed } from "../lib/rss/fetch";

export const handleAgg = async (_: string) => {
    const tempFeedURL = "https://www.wagslane.dev/index.xml"

    const result = await fetchFeed(tempFeedURL);
    const feedDataStr = JSON.stringify(result, null, 2);
    console.log(feedDataStr);
}