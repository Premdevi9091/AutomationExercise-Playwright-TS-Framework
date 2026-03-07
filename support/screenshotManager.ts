import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";

export const takeScreenshot = async(
    page: Page,
    scenario: string,
    step: string
): Promise<Buffer> => {
    const dir = `test-reports/screenshots/${scenario}`;

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true});
    }

    const filePath = path.join(
        dir, 
        `${Date.now()}-${step.replace(/[^a-zA-Z0-9]/g, "_")}.png`
    );

    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    const buffer = await page.screenshot({
            path: filePath,
            fullPage: true
        });
    return buffer;
};