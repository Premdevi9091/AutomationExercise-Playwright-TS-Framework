import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world/customWorld";
import { SubscriptionPage } from "../pages/SubscriptionPage";

Then('verify subscription text and fields', async function(this: CustomWorld) {
    await this.pages.get(SubscriptionPage).verifySubscriptionBlock();

});

Then('enter the {string}', async function(this: CustomWorld, userKey: string) {
    await this.pages.get(SubscriptionPage).enterEmail(userKey);
});

Then('submit and verify {string} is visible', async function(this: CustomWorld, message: string) {
    await this.pages.get(SubscriptionPage).verifySuccessMessage(message);
});
