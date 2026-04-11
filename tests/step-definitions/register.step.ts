import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world/customWorld";
import { RegisterPage } from "../pages/RegisterPage";

Then('Signup page should be visible', async function (this: CustomWorld) {
    await this.pages.get(RegisterPage).verifyNewSignUpLabel();
});

When('{string} enters name and email', async function(this: CustomWorld, user: string) {
    await this.pages.get(RegisterPage).enterNameAndEmail(user);
})

When('User clicks Signup button', async function (this: CustomWorld) {
    await this.pages.get(RegisterPage).clickSignup();
});

When('User fills account information', async function (this: CustomWorld){
    await this.pages.get(RegisterPage).fillAccountDetails();
});

When('User clicks Create Account button', async function (this: CustomWorld) {
    await this.pages.get(RegisterPage).clickCreateAccount();
});

Then('Account should be created successfully', async function (this: CustomWorld) {
    await this.pages.get(RegisterPage).verifyAccountCreation();
});

Then('User click on Delete Account', async function(this: CustomWorld) {
    await this.pages.get(RegisterPage).clickDeleteAccount();
});

Then('User account should be deleted successfully',async function(this: CustomWorld) {
    await this.pages.get(RegisterPage).verifyAccountDelete();
});

Then('verify Logged in as {string} should be display', async function(this: CustomWorld, user: string) {
    await this.pages.get(RegisterPage).verifyUserLoggedIn(user);
});

When('Then verify error message for existing account', async function(this: CustomWorld) {
    await this.pages.get(RegisterPage).errorMessageExistingAccount();
});





