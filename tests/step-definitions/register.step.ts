import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { config } from "../../utils/config";

let homePage: HomePage;
let registerPage: RegisterPage;


Given('User navigates to Automation Exercise website', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.navigate(config.baseURL);
});

Then('Home page should be visible', async function (this: CustomWorld) {
    await homePage.verifyHomePageVisible();
});

When('User clicks on SignUp Login', async function (this: CustomWorld) {
   await homePage.clickSignupLogin(); 
});

Then('Signup page should be visible', async function (this: CustomWorld) {
    registerPage = new RegisterPage(this.page, this.testLogger);
    await registerPage.verifyNewSignUpLabel();
});

When('{string} enters name and email', async function(this: CustomWorld, user: string) {
    await registerPage.enterNameAndEmail(user);
})

When('User clicks Signup button', async function (this: CustomWorld) {
    await registerPage.clickSignup();
});

When('User fills account information', async function (this: CustomWorld){
    await registerPage.fillAccountDetails();
});

When('User clicks Create Account button', async function (this: CustomWorld) {
    await registerPage.clickCreateAccount();
});

Then('Account should be created successfully', async function (this: CustomWorld) {
    await registerPage.verifyAccountCreation();
});

Then('User click on Delete Account', async function(this: CustomWorld) {
    await registerPage.clickDeleteAccount();
});

Then('User account should be deleted successfully',async function(this: CustomWorld) {
    await registerPage.verifyAccountDelete();
})

Then('verify Logged in as {string} should be display', async function(this: CustomWorld, user: string) {
    await registerPage.verifyUserLoggedIn(user);
})





