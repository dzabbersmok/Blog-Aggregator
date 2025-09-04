import { eq } from "drizzle-orm";

import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    const userInDB = await getUserByName(name);

    if (userInDB) {
        throw new Error("user already exists!");
    }

    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUserByName(name: string) {
    const user = await db.select().from(users).where(eq(users.name, name));
    if (user.length === 0) return;
    
    return user[0];
}

export async function deleteDB() {
    return await db.delete(users);
}

export async function getUsers() {
    return await db.select().from(users);
}

export async function getUserById(id: string) {
    const [ user ] = await db.select().from(users).where(eq(users.id, id));
    return user;
}