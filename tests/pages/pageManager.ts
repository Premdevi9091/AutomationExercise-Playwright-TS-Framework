import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/core/testLogger";

export class PageManager{

    private page: Page;
    private logger: TestLogger;
    private pages: Record<string, any> = {};

    constructor(page: Page, logger: TestLogger){
        this.page = page;
        this.logger = logger;
    }

    get<T> (PageClass: new (page: Page, logger: TestLogger) => T): T{
        const pageName = PageClass.name;

        if(!this.pages[pageName]){
            this.pages[pageName] = new PageClass(this.page, this.logger);
        }
        return this.pages[pageName];
    }
}