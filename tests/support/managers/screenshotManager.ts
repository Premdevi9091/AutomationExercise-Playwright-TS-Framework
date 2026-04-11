import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";

export const takeScreenshot = async(
    page: Page,
    runId: string,
    scenario: string,
    step: string
): Promise<Buffer> => {

    const dir = `test-reports/${runId}/Scenarios/${scenario}/screenshots`;

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true});
    }

    const filePath = path.join(dir, `${step}.png`);

    const buffer = await page.screenshot({
        fullPage: false,
        type: 'png'
    });

    fs.writeFileSync(filePath, buffer);
    return buffer;
};