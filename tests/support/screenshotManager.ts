import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";
import logger from "../../utils/logger";

export const takeScreenshot = async(
    page: Page,
    scenario: string,
    step: string
): Promise<Buffer> => {
    const dir = `tests/test-reports/screenshots/${runContext.runId}/${scenario}`;

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true});
    }

    const filePath = path.join(dir, `${step}.jpeg`);

    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    //take only once
    const buffer = await page.screenshot({
            fullPage: false,
            type: 'png' 
        });

    //save same buffer
    fs.writeFileSync(filePath, buffer);
    return buffer;
};

const runContext = {
    runId: (() => {
        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const runID = `${pad(now.getDate())}_${pad(now.getMonth()+1)}_${now.getFullYear()}_${pad(now.getHours())}_${pad(now.getMinutes())}_${pad(now.getSeconds())}`;
        logger.info(`Run ID: ${runID}`);
        return runID;
    })()    
};