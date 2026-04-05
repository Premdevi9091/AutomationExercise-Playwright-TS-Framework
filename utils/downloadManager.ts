import * as path from "path";
import * as fs from "fs";
import { Download } from "@playwright/test";

export class DownloadManager{
    private static downloadDir = path.join(process.cwd(), 'tests/test-reports', 'downloads');


    //ensure directory exists
    private static ensureDir(){
        if(!fs.existsSync(this.downloadDir)){
            fs.mkdirSync(this.downloadDir, { recursive: true});
            console.log(`created download folder: `, this.downloadDir);
        }
    }

    //save downloaded file
    static async save(download: Download, fileName?: string): Promise<string>{
        const suggested = download.suggestedFilename();
        if(!suggested){
            throw new Error(`Download filename is undefined `);
        }
        const finalName = fileName || suggested;
        const filePath = path.join(this.downloadDir, finalName);
        await download.saveAs(filePath);
        return filePath;
    }

    
    //read file as text
    static readFile(filePath: string): string{
        if(!fs.existsSync(filePath)){
            throw new Error(`File not found: ${filePath}`);
        }
        return fs.readFileSync(filePath, "utf-8");
    }

    //read JSON file
    static readJSON(filePath: string): any{
        const content = this.readFile(filePath);
        return JSON.parse(content);
    }
}
