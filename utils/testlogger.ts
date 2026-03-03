import path from "path";
import { JsonManager } from "./JsonManager";

export class TestLogger {

    private filePath!: string;
    private data: Record<string, any> = {};

    initialize(scenarioName: string){

        if(!scenarioName){
            throw new Error("Scenario name is undefined in TestLogger.initialize()");
        }

        const safeScenarioName = scenarioName.replace(/[^a-zA-Z0-9]/g,"_");
        const timestamp = this.getFormattedDateTime();

        const fileName = `${safeScenarioName}_${timestamp}.json`;
        this.filePath = path.join(process.cwd(), "testLogs", fileName);
        this.data = {};
        JsonManager.write(this.filePath, this.data);
    }

    private getFormattedDateTime(){
        const now = new Date();
        return now.toISOString().replace(/[\/:, ]/g, "_");
    }

    put(key: string, value:any){
        if(!this.filePath){
            throw new Error("TestLogger not initialized");
        }

        if(this.data[key]){
            this.data[key] = Array.isArray(this.data[key])
                ? [...this.data[key], value]
                : [this.data[key], value];
        }
        else{
            this.data[key] = value;
        }
        JsonManager.write(this.filePath, this.data);
    }

    get(key: string){
        return this.data[key];
    }

}