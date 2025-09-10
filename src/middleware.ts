import { User } from "./lib/db/schema";
import { CommandHandler } from "./commands/commands";
import { getUserByName } from "./lib/db/queries/users";
import { readConfig } from "./config";

export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn: middlewareLoggedIn = (handler) => {
    return async (cmdName, ...args) => {
        const userName = readConfig().currentUserName;
        if (!userName) {
            throw new Error(`User ${userName} not found`);
        }
        const user = await getUserByName(userName);
        if (!user) {
            throw new Error(`User ${userName} not found`);
        }
        await handler(cmdName, user, ...args);
    }
}