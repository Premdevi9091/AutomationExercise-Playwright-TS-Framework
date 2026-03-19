import path from "path";
import { JsonManager } from "./JsonManager";
import { arrayBuffer } from "stream/consumers";
import logger from "./logger";

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

    put(key: string, value:any, type: 'array' | 'object' = 'object'){
        if(!this.filePath){
            throw new Error("TestLogger not initialized");
        }

        // if(this.data[key]){
        //     this.data[key] = Array.isArray(this.data[key])
        //         ? [...this.data[key], value]
        //         : [this.data[key], value];
        // }
        // else{
        //     this.data[key] = value;
        // }

        const existing = this.data[key];
    
        if(type === 'array'){
            if(!existing){
                this.data[key] = [value];
            } else{
                this.data[key].push(value);
            }
        }
        else{
            if(!existing){
                this.data[key] = value;
            } else{
                this.data[key] = {...existing, ...value};
            }
        }
        
        JsonManager.write(this.filePath, this.data);
        logger.info(`Added in testlogger: ${JSON.stringify(this.data)}`);
        
    }

    get(key: string){
        return this.data[key];
    }

}