import { deleteDB } from "../lib/db/queries/users";

export const handleReset = async () => {
    const result = await deleteDB()
    console.log("Database reset successfully!");
}