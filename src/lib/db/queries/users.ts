import { eq } from "drizzle-orm";

import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    const userInDB = await getUser(name);

    if (userInDB) {
        throw new Error("user already exists!");
    }

    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUser(name: string) {
    const user = await db.select().from(users).where(eq(users.name, name));
    if (user.length === 0) return;
    
    return user[0];
}

export async function deleteDB() {
    return await db.delete(users);
}