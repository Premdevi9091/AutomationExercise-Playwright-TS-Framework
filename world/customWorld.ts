import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page} from "@playwright/test";
import { TestLogger } from "../utils/testlogger";

export class CustomWorld extends World{
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    scenarioName!: string;
    testData: any = {};

    testLogger!: TestLogger;
}
setWorldConstructor(CustomWorld);