import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page} from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { PageManager } from "../../utils/pageManager";

export class CustomWorld extends World{
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    pages!: PageManager;
    scenarioName!: string;
    testData: any = {};
    testLogger!: TestLogger;
}
setWorldConstructor(CustomWorld);