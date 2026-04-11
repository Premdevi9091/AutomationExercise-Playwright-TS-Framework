import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page} from "@playwright/test";
import { TestLogger } from "../../../utils/core/testLogger";
import { PageManager } from "../../pages/pageManager";

export class CustomWorld extends World{
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    pages!: PageManager;
    scenarioName!: string;
    testData: any = {};
    testLogger!: TestLogger;
    stepIndex!: number;
    timestamp!: string;
    runID!: string;
}
setWorldConstructor(CustomWorld);