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
            await expect(locator).toBeVisible({ timeout: 10000 });
            await expect(locator).toBeEnabled({ timeout: 10000 });
            await locator.scrollIntoViewIfNeeded();
            // trial click ensures element is clickable
            await locator.click({ trial: true });
            await locator.click();
            logger.info(`Clicked on '${elementName}' `);
            await this.page.waitForLoadState("domcontentloaded").catch(() => {});
        }, elementName);
    }

    async fill(locator: Locator, value: any, elementName: string){
        await this.retry(async() => {
            await locator.waitFor({ state: "visible"});
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(value));
            logger.info(`Entered '${value}' in ${elementName}`);
        }, elementName);
    }

    async select(locator: Locator, value: string, elementName: string){
        await this.retry(async () => {
            await locator.waitFor({ state: "visible"});
            await locator.scrollIntoViewIfNeeded();
            await locator.selectOption(String(value));
            logger.info(`Selected '${value}' from ${elementName}`);
        }, elementName);
    }

    async isVisible(locator: Locator, elementName: string): Promise<boolean>{
        try{
            await locator.scrollIntoViewIfNeeded();
            await locator.waitFor({ state: "visible", timeout: 5000});
            logger.info(`${elementName} is visible`);
            return true;
        }catch (error){
            logger.error(`Visibility check failed for '${elementName}': ${error}`);
            return false;
        }
    }

    async assertText(locator: Locator, value: string, elementName: string){
        try{
            await locator.scrollIntoViewIfNeeded();
            await expect(locator).toBeVisible();
            await expect(locator).toHaveText(value);
            logger.info(`Assert text '${value}' passed for ${elementName}`);
        }catch (error){
            logger.error(`Assert text failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    async getText(locator: Locator, elementName: string): Promise<string>{
        try{
            await expect(locator).toBeVisible();
            const text = (await locator.textContent())?.trim() || "";
            logger.info(`Retrieved text from ${elementName} : "${text}"`);
            return text;
        }
        catch (error){
            logger.error(`getText failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    async compareText(locator: Locator, expectedText: string, elementName: string): Promise<void>{
        try{
            await expect(locator).toBeVisible({timeout: 5000});
            const actualText = (await locator.textContent())?.trim() || "";
            expect (actualText).toBe(expectedText.trim());
            logger.info(`compareText passed for ${elementName} | actual: "${actualText}" | expected: "${expectedText}"`);
        } catch (error) {
            logger.error(`compareText failed for ${elementName}: ${error}`);
            throw error;
        }
    }
}