import { BeforeAll, Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, firefox, webkit } from "@playwright/test";
import { CustomWorld } from "../../world/customWorld";
import logger from "../../utils/logger";
import { takeScreenshot } from "../screenshotManager";
import { config } from "../../utils/config";
import { TestLogger } from "../../utils/testlogger";
import fs from "fs";

setDefaultTimeout(config.defaultTimeout);
let browser : Browser;

Before(async function (this: CustomWorld, scenario){
    this.scenarioName = scenario.pickle.name;
    
    logger.info(`===== Starting Scenario: ${this.scenarioName} =====`);
    
    //Initialize Scenario-based TestLogger
    this.testLogger = new TestLogger();
    this.testLogger.initialize(this.scenarioName);
    
    //Launch brwoser based on ENV config
    switch(config.browser.toLowerCase()){
        case "firefox":
            browser = await firefox.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });
            break;
        
        case "webkit":
            browser = await webkit.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });
            break;
        
        default:
            browser = await chromium.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });
    }

    this.browser = browser;
    this.context = await browser.newContext();
    this.page = await this.context.newPage();

    //Apply timeouts from env
    this.page.setDefaultTimeout(config.defaultTimeout);
    this.page.setDefaultNavigationTimeout(config.navigationTimeout);

    logger.info(`Browser: ${config.browser} || Headless: ${config.headless} || SlowMo: ${config.slowMo}`);
});

AfterStep(async function (this: CustomWorld, step) {
    logger.info(`Step Executed: ${step.pickleStep.text}`);

    if(!config.screenshotEachStep) return;
    
    //Wait for page stability
    await this.page.waitForLoadState("domcontentloaded").catch(() => {});
    await this.page.waitForTimeout(400);

    await takeScreenshot(
        this.page,
        this.scenarioName,
        step.pickleStep.text
    );
});

After(async function (this: CustomWorld, scenario) {
    try{
        if(scenario.result?.status === Status.FAILED){
            logger.error(`❌ Scenario Failed: ${this.scenarioName}`);

            if(config.screenshotOnFailure){
                await takeScreenshot(
                    this.page,
                    this.scenarioName,
                    "FAILED_STEP"
                );
            }
        }
        else{
            logger.info(`✅ Scenario Passed: ${this.scenarioName}`);
        }
    }
    catch(error){
        logger.error(`Error in After Hook: ${error}`);
    }
    finally{
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
        logger.info(`===== Ending Scenario: ${this.scenarioName} =====\n`);
    }
});