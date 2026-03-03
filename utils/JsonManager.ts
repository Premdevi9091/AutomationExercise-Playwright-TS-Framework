import fs from "fs";
import path from "path";

export class JsonManager{
    
    //read the data
    static read(filePath: string): any {
        
        if(!fs.existsSync(filePath)){
            throw new Error(`File not found: ${filePath}`);
        }
        
        const content = fs.readFileSync(filePath, "utf-8");
        return content ? JSON.parse(content) : {};
    }

    //write the data
    static write(filePath: string, data: any){
        
        if(!filePath){
            throw new Error("JsonManager.write received undefined filePath");
        }

        const dir = path.dirname(filePath);

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true});
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    
    //update the data
    static update(filePath: string, updater: (data: any) => any){
        const existing = fs.existsSync(filePath)
            ? this.read(filePath)
            : {};
        const updated = updater(existing);
        this.write(filePath, updated);
    }
}