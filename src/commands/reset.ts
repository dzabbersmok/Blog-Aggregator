import { deleteDB } from "../lib/db/queries/users";

export const handleReset = async () => {
    await deleteDB()
    console.log("Database reset successfully!");
}