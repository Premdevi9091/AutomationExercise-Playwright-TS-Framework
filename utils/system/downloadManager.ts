import * as path from "path";
import * as fs from "fs";
import { Download } from "@playwright/test";
import { getRunId } from "../core/runContext";

export class DownloadManager{
    
    private static getDownloadDir(runId: string): string {
        return path.join(process.cwd(), 'test-reports', runId, 'downloads');
    }

    //ensure directory exists
    private static ensureDir(runId: string){
        const dir = this.getDownloadDir(runId);

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true});
            console.log(`created download folder: `, dir);
        }
    }

    //save downloaded file
    static async save(download: Download,fileName?: string): Promise<string>{
        const runId = getRunId();
        // this.ensureDir(runId);
        const suggested = download.suggestedFilename();
        if(!suggested){
            throw new Error(`Download filename is undefined`);
        }
        const finalName = fileName || suggested;
        const dir = this.getDownloadDir(runId);
        const filePath = path.join(dir, finalName);
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
