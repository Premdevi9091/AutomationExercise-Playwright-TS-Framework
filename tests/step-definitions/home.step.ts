import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../tests/world/customWorld";
import { HomePage } from "../pages/HomePage";
import { config } from "../../utils/config";

Given('User navigates to Automation Exercise website', async function (this: CustomWorld) {
    await this.pages.get(HomePage).navigate(config.baseURL);
});

Then('Home page should be visible', async function (this: CustomWorld) {
    await this.pages.get(HomePage).verifyHomePageVisible();
});

When('User clicks on SignUp Login', async function (this: CustomWorld) {
   await this.pages.get(HomePage).clickSignupLogin(); 
});

Then('click on Cart', async function(this:CustomWorld) {
    await this.pages.get(HomePage).clickCart();
});
Then('click on Test Cases', async function(this:CustomWorld) {
    await this.pages.get(HomePage).clickTestCases();
});

When('User click on Home page', async function(this:CustomWorld) {
    await this.pages.get(HomePage).clickHome();
});

Then('click on arrow button', async function(this:CustomWorld) {
    await this.pages.get(HomePage).clickArrow();
});

Then('verify page is scrolled up and {string} text is visible on screen', async function(this:CustomWorld, str: string) {
    await this.pages.get(HomePage).verifyHomePageText(str);
});
