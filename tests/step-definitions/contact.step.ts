import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { ContactUs } from "../pages/ContactUsPage";

let contactUs: ContactUs;

When('User click on Contact Us link', async function(this:CustomWorld) {
    contactUs = new ContactUs(this.page, this.testLogger);
    await contactUs.clickContactUs();
});

When('{string} fill the form details', async function(this: CustomWorld, user:string) {
   await contactUs.verifyFormDetails(user);
});

When('upload the {string}', async function(this:CustomWorld, fileName: string) {
    await contactUs.verifyUploadFile(fileName);
});

When('click on submit button', async function(this: CustomWorld) {
    await contactUs.clickSubmit();
});

Then('verify success message', async function(this: CustomWorld) {
    await contactUs.verifyFormSubmission();
});

Then('User click on Home button', async function(this: CustomWorld) {
    await contactUs.clickHome();
});


