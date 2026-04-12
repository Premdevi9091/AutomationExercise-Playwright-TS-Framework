import { Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, firefox, webkit } from "@playwright/test";
import { CustomWorld } from "../world/customWorld";
import logger, { initLogger } from "../../../utils/core/logger";
import { takeScreenshot } from "../managers/screenshotManager";
import { config } from "../../../utils/core/config";
import { TestLogger } from "../../../utils/core/testLogger";
import { PageManager } from "../../pages/pageManager";
import { setRunId } from "../../../utils/core/runContext";

setDefaultTimeout(config.defaultTimeout);
let browser: Browser;

// Track scenario iterations (Run1, Run2...)
const scenarioMap = new Map<string, number>();

// Generate RUN_ID once
const getRunId = () => {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}_${hh}_${min}_${ss}`;
};

//GLOBAL RUN ID (single per execution)
const RUN_ID = getRunId();
setRunId(RUN_ID);

// ================= BEFORE =================
Before(async function (this: CustomWorld, scenario) {

    this.runID = RUN_ID;

    const safeName = scenario.pickle.name
        .replace(/#\d+/g, "")
        .replace(/[^a-zA-Z0-9]/g, "_");

    // Track iteration (Run1, Run2...)
    const count = (scenarioMap.get(safeName) || 0) + 1;
    scenarioMap.set(safeName, count);

    // Final scenario name
    this.scenarioName = `${safeName}_Run${count}`;
    this.stepIndex = 0;

    // Initialize logger
    initLogger(this.runID, this.scenarioName);
    logger.info(`===== Starting Scenario: ${this.scenarioName} =====`);

    // Initialize TestLogger
    this.testLogger = new TestLogger();
    this.testLogger.initialize(this.scenarioName);

    // Browser selection
    const browserType =
        config.browser.toLowerCase() === 'firefox'
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
        viewport: { width: 1020, height: 520 }
    });

    this.page = await this.context.newPage();
    this.pages = new PageManager(this.page, this.testLogger);

    // Block ads
    await this.page.route('**/*', (route) => {
        const url = route.request().url();
        if (
            url.includes("doubleclick") ||
            url.includes("googleads") ||
            url.includes("googlesyndication") ||
            url.includes("adsystem")
        ) {
            return route.abort();
        }
        return route.continue();
    });

    // Hide ad elements
    await this.page.addScriptTag({
        content: `
        iframe, 
        .adsbygoogle,
        [id*="google_ads"],
        [class*="ads"],
        [class*="banner"] {
            display: none !important;
            visibility: hidden !important;
        }`
    });

    this.page.setDefaultTimeout(config.defaultTimeout);
    this.page.setDefaultNavigationTimeout(config.navigationTimeout);

    logger.info(`Browser: ${config.browser} || Headless: ${config.headless} || SlowMo: ${config.slowMo}`);
});


// ================= AFTER STEP =================

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
        this.runID,
        this.scenarioName,
        `${this.stepIndex}_${stepName}`
    );
});


// ================= AFTER =================
After(async function (this: CustomWorld, scenario) {

    try {
        if (scenario.result?.status === Status.FAILED) {
            logger.error(`❌ Scenario Failed: ${this.scenarioName}`);

            if (config.screenshotOnFailure) {
                const screenshotBuffer = await takeScreenshot(
                    this.page,
                    this.runID,
                    this.scenarioName,
                    `FAILED_STEP_${this.stepIndex}`
                );

                // Attach to Cucumber report
                this.attach(screenshotBuffer, "image/png");
            }
        } else {
            logger.info(`✅ Scenario Passed: ${this.scenarioName}`);
        }
    }
    catch (error) {
        logger.error(`Error in After Hook: ${error}`);
    }
    finally {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();

        logger.info(`===== Ending Scenario: ${this.scenarioName} =====\n`);
    }
});