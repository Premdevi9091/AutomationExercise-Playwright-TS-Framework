import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world/customWorld";
import { ContactUsPage } from "../pages/ContactUsPage";
import { HomePage } from "../pages/HomePage";

When('User click on Contact Us', async function(this:CustomWorld) {
    await this.pages.get(HomePage).clickContactUs();
});

When('{string} fill the form details', async function(this: CustomWorld, user:string) {
   await this.pages.get(ContactUsPage).verifyFormDetails(user);
});

When('upload the {string}', async function(this:CustomWorld, fileName: string) {
    await this.pages.get(ContactUsPage).verifyUploadFile(fileName);
});

When('click on submit button', async function(this: CustomWorld) {
    await this.pages.get(ContactUsPage).clickSubmit();
});

Then('verify success message', async function(this: CustomWorld) {
    await this.pages.get(ContactUsPage).verifyFormSubmission();
});

Then('User click on Home button', async function(this: CustomWorld) {
    await this.pages.get(ContactUsPage).clickHome();
});


