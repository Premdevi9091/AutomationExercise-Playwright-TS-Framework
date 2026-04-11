import path from "path";
import { JsonManager } from "../core/JsonManager";
import { encrypt, decrypt } from "../helpers/encryption";

/* to add user run command:: npm run addUser */
const filePath = path.join("tests/data", "userData.json");

export class UserDataManager{

    static addUser(key: string, username: string, email: string, password: string){
        
        JsonManager.update(filePath, (data) => {
            data[key] = {
                username, 
                email, 
                password: encrypt(password)
            };
            console.log(`${key} is added in ${filePath}`);
            return data;
        });
    }

    static getUser(key: string){
        
        const data = JsonManager.read(filePath);

        if(!data[key]){
            throw new Error(`User ${key} not found`);
        }

        return {
            ...data[key],
            password: decrypt(data[key].password) 
        };
    }
}