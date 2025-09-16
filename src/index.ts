import process from "process";

import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handleReset } from "./commands/reset";
import { handlerUsers } from "./commands/users";
import { handlerAgg } from "./commands/aggregate";
import { handleAddFeed } from "./commands/addfeed";
import { handleFeeds } from "./commands/feeds";
import { handleFollow } from "./commands/follow";
import { handleFollowing } from "./commands/following";
import { middlewareLoggedIn } from "./middleware";
import { handleUnfollow } from "./commands/unfollow";
import { handlerBrowse } from "./commands/browse";

async function main() {
    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handleReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handleAddFeed));
    registerCommand(registry, "feeds", handleFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handleFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handleFollowing));
    registerCommand(registry, "unfollow", middlewareLoggedIn(handleUnfollow));
    registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));

    const commandLineArgs = process.argv.slice(2);
    if (commandLineArgs.length === 0) {
        console.error("missing arguments");
        process.exit(1);
    }

    const commandName = commandLineArgs[0];
    const commandArgs = commandLineArgs.slice(1);
    try {
        await runCommand(registry, commandName, ...commandArgs);
    } catch (err: any) {
        console.error(err?.message ?? String(err));
        process.exit(1);
    }

    process.exit(0);
}

main();