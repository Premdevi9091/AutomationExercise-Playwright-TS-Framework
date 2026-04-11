import readline from "readline";
import { UserDataManager } from "../utils/data/UserDataManager";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (q: string) => 
    new Promise<string>((resolve) => r1.question(q, resolve));

(async () => {
    const key = await ask("Enter user key(e.g., user1): ");
    const username = await ask("Enter username: ");
    const email = await ask("Enter email: ");
    const password = await ask("Enter password: ");

    UserDataManager.addUser(key, username, email, password);
    
    r1.close();
})();