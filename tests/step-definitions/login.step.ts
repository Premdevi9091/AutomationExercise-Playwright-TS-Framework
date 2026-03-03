import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

let loginPage: LoginPage;

When('User clicks Login button', async function (this: CustomWorld) {
    await loginPage.clickLogin();
});
When('{string} enters email and password', async function(this: CustomWorld, user:string)  {
    loginPage = new LoginPage(this.page, this.testLogger);
    await loginPage.enterEmailAndPassword(user);
})

Then('verify error message for invalid login', async function (this: CustomWorld) {
    await loginPage.errorMessageInvalidLogin();
})
