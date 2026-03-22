import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../tests/world/customWorld";
import { TestCasesPage } from "../pages/TestCasesPage";

Then('User should navigated to Test Cases page', async function(this:CustomWorld) {
    await this.pages.get(TestCasesPage).verifyPageTitle();
});
Then('verify the list of TestCases', async function(this:CustomWorld) {
    await this.pages.get(TestCasesPage).verifyTestCases();
})
