import { setUser } from "src/config";
import { createUser } from "../lib/db/queries/users";
import { CommandHandler } from "./commands";

export const handlerRegister: CommandHandler = async (cmdName, ...args) => {
    const username = args[0];
    if (!username) {
        throw new Error("username is REQUIRED!");
    }

    const user = await createUser(username);
    setUser(user.name);
    console.log(`user set: ${user.id} - ${user.name}`);
}