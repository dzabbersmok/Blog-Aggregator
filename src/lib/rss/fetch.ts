import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    const res = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator",
            "accept": "application/rss+xml",
        }
    });

    if (!res.ok) {
        throw new Error(`failed to fetch feed: ${res.status} ${res.statusText}`)
    }

    const XMLString = await res.text();
    const parser = new XMLParser();
    const metadata = parser.parse(XMLString).rss.channel;
    if (!metadata) {
        throw new Error("failed to parse channel");
    }

    if (!metadata.title || !metadata.link || !metadata.description) {
        throw new Error("failed to parse channel");
    }
    const {title, link, description} = metadata;

    if (metadata.item && !Array.isArray(metadata.item)) {
        metadata.item = [];
    }

    const items: any[] = Array.isArray(metadata.item)
    ? metadata.item
    : [metadata.item];

    const rssItems: RSSItem[] = [];

    for (const item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }

        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
        });
    }
    

    const rss: RSSFeed = {
        channel: {
            title,
            link,
            description,
            item: rssItems
        }
        
    }

    return rss;
}