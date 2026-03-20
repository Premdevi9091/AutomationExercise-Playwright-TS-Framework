import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../tests/world/customWorld";
import { LoginPage } from "../pages/LoginPage";


When('User clicks Login button', async function (this: CustomWorld) {
    await this.pages.get(LoginPage).clickLogin();
});
When('{string} enters email and password', async function(this: CustomWorld, user:string)  {
    await this.pages.get(LoginPage).enterEmailAndPassword(user);
});

Then('verify error message for invalid login', async function (this: CustomWorld) {
    await this.pages.get(LoginPage).errorMessageInvalidLogin();
});

Then('click on logout button', async function(this: CustomWorld)  {
    await this.pages.get(LoginPage).clickLogout();
});
