import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { OrderPage } from "../pages/OrderPage";

Then('click on Proceed To Checkout', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickProceedToCheckout();
});

Then('click on Register Login', async function(this:CustomWorld) {
    await this.pages.get(OrderPage).clickRegisterLogin();
});

/*
Your delivery address
Mr. firstXYZ lastXYZ
compnay
address
city state zipcode
India
mobile

Your billing address
Mr. firstXYZ lastXYZ
compnay
address
city state zipcode
India
*/