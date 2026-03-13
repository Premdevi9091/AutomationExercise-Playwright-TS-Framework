import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { Products } from "../pages/Products";

let products: Products;

When('User click on Product button', async function(this: CustomWorld)  {
    products = new Products(this.page, this.testLogger);
    await products.clickProduct();
});

Then('User should navigated to All Product page', async function(this: CustomWorld) {
    await products.verfiyProductsPage();
});

Then('click on view products and verify details', async function(this: CustomWorld) {
   await products.clickOnViewProduct();
});

Then('enter the {string} and click on search', async function(this: CustomWorld, product_name: string) {
    await products.searchProduct(product_name);
    await products.clickSearchButton();
}); 

Then('Verify all the products related to {string} are visible', async function(this: CustomWorld, product_name: string) {
    await products.verifySearchProducts(product_name);
});

Then('click on continue shopping', async function(this: CustomWorld) {
    await products.clickContinueShopping();
})

Then('click on Add to cart', async function(this:CustomWorld) {
    await products.clickAddtoCart();
});

Then('hover on the {string} product', async function(this:CustomWorld, product_number: string) {
    await products.hoverOnProduct(product_number);
});

Then('click on view cart',  async function(this:CustomWorld) {
    await products.clickViewCart();
})

Then('verify the products in cart', async function(this:CustomWorld) {
    await products.verifyCartDetails();
});

