import { Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, firefox, webkit } from "@playwright/test";
import { CustomWorld } from "../../world/customWorld";
import logger, { initLogger } from "../../../utils/logger";
import { takeScreenshot } from "../screenshotManager";
import { config } from "../../../utils/config";
import { TestLogger } from "../../../utils/testlogger";
import { PageManager } from "../../../utils/pageManager";

setDefaultTimeout(config.defaultTimeout);
let browser : Browser;

//create to handle scenario examples screenshot folder
const scenarioMap = new Map<string, number>();

Before(async function (this: CustomWorld, scenario){

    //clean & unqiue scenario name
    const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");

    const count = (scenarioMap.get(safeName) || 0) + 1;
    scenarioMap.set(safeName, count);

    this.scenarioName = `${safeName}_${count}`; //per-scenario counter
    this.stepIndex = 0;

    //Initialize Scenario-based logger
    initLogger(this.scenarioName);
    logger.info(`===== Starting Scenario: ${this.scenarioName} =====`);
    
    //Initialize Scenario-based TestLogger
    this.testLogger = new TestLogger();
    this.testLogger.initialize(this.scenarioName);
    
    //browser launch
    const browserType = 
            config.browser.toLowerCase() === 'firebox'
            ? firefox
            : config.browser.toLowerCase() === 'webkit'
            ? webkit
            : chromium;

    browser = await browserType.launch({
        headless: config.headless,
        slowMo: config.slowMo,
        args: ["--window-size=1020, 520"]
    });

    this.browser = browser;
    this.context = await browser.newContext({
        viewport: {width: 1020, height: 520}
    });

    this.page = await this.context.newPage();
    this.pages = new PageManager(this.page, this.testLogger);

    //Block ads
    await this.page.route('**/*', (route) => {
        const url = route.request().url();
        if(
            url.includes("doubleclick") ||
            url.includes("googleads") ||
            url.includes("googlesyndication") ||
            url.includes("adsystem")
        ){
            return route.abort();
        }
        return route.continue();
    });

    //Hide remaining ad elements
    await this.page.addScriptTag({
        content: `
        iframe, 
        .adsbygoogle,
        [id*="google_ads"],
        [class*="ads"],
        [class*="banner"]
        {
         display: none !important;
         visibility: hideen !important;
        }`
    });

    //Apply timeouts from env
    this.page.setDefaultTimeout(config.defaultTimeout);
    this.page.setDefaultNavigationTimeout(config.navigationTimeout);

    logger.info(`Browser: ${config.browser} || Headless: ${config.headless} || SlowMo: ${config.slowMo}`);
});

AfterStep(async function (this: CustomWorld, step) {
    logger.info(`Step Executed: ${step.pickleStep.text}`);

    if(!config.screenshotEachStep) return;

    this.stepIndex++;
    
    //clean step name
    const stepName = step.pickleStep.text
                        .replace(/[^a-zA-Z0-9]/g, "_")
                        .substring(0, 50);  //option to avoid super long names
    
    const screenshotBuffer = await takeScreenshot(
        this.page,
        this.scenarioName,
        `${this.stepIndex}_${stepName}`
    );
});

After(async function (this: CustomWorld, scenario,) {
    
    try{
        if(scenario.result?.status === Status.FAILED){
            logger.error(`❌ Scenario Failed: ${this.scenarioName}`);

            if(config.screenshotOnFailure){
                const screenshotBuffer= await takeScreenshot(
                    this.page,
                    this.scenarioName,
                    `FAILED_STEP_${this.stepIndex}`
                );
                
                //attach to cucumber report
                this.attach(screenshotBuffer, "image/png");
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