import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/users";
import { CommandHandler } from "./commands";

export const handlerUsers: CommandHandler = async () => {
    const users = await getUsers();
    if (users.length === 0) {
        console.log("There are no users in database!");
        return;
    }
    
    const currentUserName = readConfig().currentUserName;
    for (const user of users) {
        const current = user.name === currentUserName ? " (current)" : "";
        console.log(`* ${user.name}${current}`);
    }
};