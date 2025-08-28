import process from "process";

import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handleReset } from "./commands/reset";

async function main() {
    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handleReset);

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