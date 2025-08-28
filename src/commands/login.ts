import { getUser } from "../lib/db/queries/users";
import { setUser } from "../config";
import { CommandHandler } from "./commands";

export const handlerLogin: CommandHandler = async (_cmdName, ...args) => {
    const username = args[0];
    if (!username) {
        throw new Error("username is REQUIRED!");
    }

    const userInDB = await getUser(username);
    if (!userInDB) {
        throw new Error("user does NOT exist!");
    }

    setUser(username);
    console.log(`user set: ${username}`);
}