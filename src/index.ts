import { setUser } from "./config";
import { readConfig } from "./config";

function main() {
    setUser("Sebastian");
    console.log(readConfig());
}

main();