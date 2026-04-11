import path from "path";
import { JsonManager } from "./JsonManager";
import logger from "./logger";

export class TestLogger {

    private filePath!: string;
    private data: Record<string, any> = {};

    initialize(scenarioName: string){

        if(!scenarioName){
            throw new Error("Scenario name is undefined in TestLogger.initialize()");
        }

        const fileName = `${scenarioName}.json`;
        this.filePath = path.join("testLogs", fileName);
        this.data = {};
        JsonManager.write(this.filePath, this.data);
    }
    
    put(key: string, value:any, type: 'array' | 'object' = 'object'){
        if(!this.filePath){
            throw new Error("TestLogger not initialized");
        }
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