import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../tests/world/customWorld";
import { OrderPage } from "../pages/OrderPage";

Then('click on Proceed To Checkout', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickProceedToCheckout();
});

Then('click on Register Login', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickRegisterLogin();
});

Then('verify Address Details section', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).verifyAddressSection();
});

Then('verify Review Your Order', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).verifyReviewYourOrder();
});

Then('click on Place Order', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickPlaceOrder();
});

Then('enter description in comment text', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).enterComment();
})

Then('enter the card details', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).enterCardDetails();
});

Then('click on Pay and Confirm Order', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickPayAndConfirmOrder();
})

Then('verify order placed successfully', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).verifyOrderPlaced();
});

Then('verify the Category', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).verifyCategory();
});

When('user select category {string}', async function(this:CustomWorld, category: string) {
    await this.pages.get(OrderPage).selectCategory(category);
});

When('user select sub-category {string}', async function(this:CustomWorld, sub_category: string) {
    await this.pages.get(OrderPage).clickCategory(sub_category);
});

Then('all products related to {string} and {string} should be display', async function(this:CustomWorld, category: string, sub_category: string) {
    await this.pages.get(OrderPage).verifyCategoryProducts(category, sub_category);
})


