import { setUser } from "../config";
import { CommandHandler } from "./commands";

export const handlerLogin: CommandHandler = (_cmdName, ...args) => {
    const username = args[0];
    if (!username) {
        throw new Error("username is REQUIRED!");
    }

    setUser(username);
    console.log(`user set: ${username}`);
}