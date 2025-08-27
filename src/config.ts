import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName: string): void {
    const cfg = readConfig();
    if (userName === cfg.currentUserName) return;

    cfg.currentUserName = userName;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const file = fs.readFileSync(getConfigFilePath(), "utf-8");
    const rawJSON = JSON.parse(file);
    return validateConfig(rawJSON);
}

// Start: Helper functions
function getConfigFilePath(): string {
    return path.join(path.resolve(os.homedir()), ".gatorconfig.json");;
}

function writeConfig(cfg: Config): void {
    const path = getConfigFilePath();
    const json = JSON.stringify({
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    });

    fs.writeFileSync(path, json);
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || typeof(rawConfig.db_url) !== "string") {
        throw new Error("db_url is required and it needs to be a string!");
    }

    if (rawConfig.current_user_name && typeof(rawConfig.current_user_name) !== "string") {
        throw new Error("current_user_name needs to be a string!");
    }

    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name || ""
    };
}
// END: Helper functions