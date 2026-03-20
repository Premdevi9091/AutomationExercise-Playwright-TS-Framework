import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/logger";
import path from "path";
import console from "console";

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
            await locator.scrollIntoViewIfNeeded();
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

    async compareText(locator: Locator, expectedText: any, elementName: string): Promise<void>{
        try{
            await locator.waitFor({ state: "attached", timeout: 5000 });
            //await expect(locator).toBeVisible({timeout: 5000});
            const actualText = (await locator.textContent())?.trim() || "";
            expect (actualText).toBe(expectedText.trim());
            logger.info(`compareText passed for ${elementName} | actual: "${actualText}" | expected: "${expectedText}"`);
        } catch (error) {
            logger.error(`compareText failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //upload file
    async uploadFile(locator: Locator, fileName: string, elementName: string): Promise<void>{
        try{
            await expect(locator).toBeAttached({timeout: 5000});
            const filePath = path.join(process.cwd(), "tests/test-data/upload-file", fileName);
            await locator.setInputFiles(filePath);
            logger.info(`uploadFile passed for ${elementName} | uploaded: "${fileName}"`);
        }catch(error){
            logger.error(`uploadFIle failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //Handle Alert
    async clickAndHandleAlert(locator: Locator, elementName: string): Promise<void> {
        try {
            this.page.once("dialog", async (dialog) => {
            const message = dialog.message();
            logger.info(`Alert appeared for ${elementName}: "${message}"`);
            await dialog.accept();
            });

            await locator.click();
            logger.info(`Click performed for ${elementName}`);
        } catch (error) {
            logger.error(`clickAndHandleAlert failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //number of elements
    async getCount(locator: Locator, elementName: string): Promise<number>{
        try{
            
            await expect((locator).first()).toBeVisible();
            const total = await locator.count();
            logger.info(`Fetched count from ${elementName} | count: ${total}`);
            return total;
        } catch(error){
            logger.error(`Fetched count failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //Validate actual vs expected number of elements
    async validateCount(locator: Locator, value: any, elementName: string){
        try{
            await expect(locator).toHaveCount(value);
            logger.info(`Validate count for ${elementName} | actual: ${await locator.count()} | expected: ${value}`);
        } catch(error){
            logger.error(`Validate count failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //hover
    async hoverElement(locator: Locator, elementName: string){
        await this.retry(async () => {
            await expect(locator).toBeVisible({ timeout: 10000 });
            await locator.scrollIntoViewIfNeeded();
            await locator.hover();
            logger.info(`Hovered on '${elementName}'`);
        }, elementName);
    }

    //input value
    async getInputValue(locator: Locator, elementName: string): Promise<string>{
        try{
            await expect(locator).toBeVisible();
            const value = await locator.inputValue();
            logger.info(`Retrieved input value from ${elementName}: "${value}`);
            return value;
        }catch(error){
            logger.error(`getInputValue failed for ${elementName}: ${error}`);
            throw error;
        }
    }

    //getAttribute
    async getAttribute(locator: Locator, attribute: string, elementName: string){
        try{
            const value = await locator.getAttribute(attribute);
            logger.info(`Retrieved "${attribute}" from ${elementName} attribute: "${value}"`);
            return value;
        }catch(error){
            logger.error(`getAttribute failed for ${elementName}: ${error}`);
            throw error;
        }
    }
    //compareValue
    async compareValues(actual: string | number, expected: string | number, elementName: string, options?: {ignoreCase?: boolean, trim?: boolean, contains?: boolean}): Promise<void>{
        try{
            let actualValue = String(actual);
            let expectedValue = String(expected);
            const normalize = (val: string) => val.replace(/\s+/g, " ").trim();
            
            //trim (default true)
            if(options?.trim !== false){
                actualValue = normalize(actualValue);
                expectedValue = normalize(expectedValue);
            }
            //case insensitive
            if(options?.ignoreCase){
                actualValue = actualValue.toLowerCase();
                expectedValue = expectedValue.toLowerCase();
            }
            //conatins support
            if(options?.contains){
                expect(actualValue).toContain(expectedValue);
            } else{
                expect(actualValue).toBe(expectedValue);
            }
            logger.info(`compareValues passed for ${elementName} | actual: "${actualValue}" | expected: "${expectedValue}"`);
        } catch(error){
            logger.error(`compareValues failed for ${elementName}: ${error}`);
            throw error;
        }
    }
}