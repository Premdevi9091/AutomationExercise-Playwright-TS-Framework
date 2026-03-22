import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";


export class TestCasesPage extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;

    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private pageTitle = this.page.locator(".text-center");
    private noOfTestcases = this.page.locator('a[href*="collapse"]');

    async verifyPageTitle(){
        await this.actions?.assertText(this.pageTitle, "Test Cases", "Test Cases title");
    }

    async verifyTestCases(){
        const count: any = await this.actions?.getCount(this.noOfTestcases, "Number of TestCases");
        for(let i = 1; i <= count; i++){
            const id = `collapse${i}`;
            const testCaseEle = this.page.locator(`a[href="#${id}"]`);
            
            await this.actions?.click(testCaseEle, `expanded test case ${i}`);

            const testcaseName: any = await this.actions?.getText(testCaseEle, `Test Case: ${i}`);
            const stepEle = this.page.locator(`div[id="${id}"] ul li`);
            let testSteps = await this.actions?.getAllTexts(stepEle, `Steps for Test Case ${i}`);

            this.testLogger.put(testcaseName, testSteps);
        }
    }
}