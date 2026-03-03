import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/logger";
import { log } from "console";

export class UIActions{
    constructor(private page: Page){}

    private async retry(action: () => Promise<void>, elementName: string){
        const retries = 2;

        for(let attempt = 1; attempt <= retries; attempt++){
            try{
                await action();
                return;
            }catch(error){
                logger.error(`Attempt ${attempt} failed for ${elementName}: ${error}`);
            if(attempt === retries) throw error;
            await this.page.waitForTimeout(500);
            }
        }
    }

    async click(locator: Locator, elementName: string){
        await this.retry(async() => {
            logger.info(`Clicked on ${elementName}`);
            await locator.scrollIntoViewIfNeeded();
            await locator.click();
            await this.page.waitForLoadState("domcontentloaded").catch(() => {});
        }, elementName);
    }

    async fill(locator: Locator, value: any, elementName: string){
        await this.retry(async() => {
            logger.info(`Entered '${value}' in ${elementName}`);
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(value));
        }, elementName);
    }

    async select(locator: Locator, value: string, elementName: string){
        await this.retry(async () => {
            logger.info(`Selected '${value}' from ${elementName}`);
            await locator.scrollIntoViewIfNeeded();
            await locator.click();
            await locator.selectOption(String(value));
        }, elementName);
    }

    async isVisible(locator: Locator, elementName: string){
        try{
            logger.info(`Checking visibility of '${elementName}' `);
            await locator.scrollIntoViewIfNeeded();
            return await locator.isVisible();
        }catch (error){
            logger.error(`Visibility check failed for '${elementName}': ${error}`);
            throw error;
        }
    }

    async assertText(locator: Locator, value: string, elementName: string){
        try{
            await locator.isVisible();
            logger.info(`Assert text '${value}' for ${elementName}`);
            return await expect(locator).toHaveText(value);
        }catch (error){
            logger.error(`Assert failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    async getText(locator: Locator, elementName: string): Promise<string>{
        try{
            logger.info(`getText ${elementName}`);
            if(!(await locator.isVisible())){
                throw new Error(`${elementName} is not visible`);
            }
            const text = await locator.innerText();
            return text.trim();
        }
        catch (error){
            logger.error(`getText failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    async compareText(locator: Locator, expectedText: string, elementName: string): Promise<void>{
        try{
            await expect(locator, `${elementName} should be visible`).toBeVisible();
            const actualText = (await locator.innerText()).trim();
            expect (actualText, `${elementName} text mismatch`).toBe(expectedText.trim());
            logger.info(`compareText passed for ${elementName} | actual: "${actualText}"`);
        } catch (error) {
            logger.error(`compareText failed for ${elementName}: ${error}`);
            throw error;
        }
    }
}