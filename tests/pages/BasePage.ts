import { Page } from "@playwright/test";
import logger from "../../utils/logger";

export class BasePage{
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigate(url: string){
        try{
            logger.info(`Navigating to: ${url}`);
            await this.page.goto(url, 
                {waitUntil: "domcontentloaded", timeout: 60000});
        }catch(error)
        {
            logger.error(`Navigation failed: ${error}`);
        }
    }
}