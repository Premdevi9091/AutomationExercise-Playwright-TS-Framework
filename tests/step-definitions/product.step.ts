import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/customWorld";
import { ProductsPage } from "../pages/ProductsPage";

Then('User should navigated to All Product page', async function(this: CustomWorld) {
    await this.pages.get(ProductsPage).verfiyProductsPage();
});

Then('click on view products and verify details', async function(this: CustomWorld) {
   await this.pages.get(ProductsPage).clickOnViewProduct();
});

Then('enter the {string} and click on search', async function(this: CustomWorld, product_name: string) {
    await this.pages.get(ProductsPage).searchProduct(product_name);
    await this.pages.get(ProductsPage).clickSearchButton();
}); 

Then('Verify all the products related to {string} are visible', async function(this: CustomWorld, product_name: string) {
    await this.pages.get(ProductsPage).verifySearchProducts(product_name);
});

Then('click on continue shopping', async function(this: CustomWorld) {
    await this.pages.get(ProductsPage).clickContinueShopping();
})

Then('click on Add to cart', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).clickAddtoCartHomePage();
});

Then('hover on the {string} product', async function(this:CustomWorld, product_number: number) {
    await this.pages.get(ProductsPage).hoverOnProduct(product_number);
});

Then('click on view cart',  async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).clickViewCart();
})

Then('verify the products in cart', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).verifyCartDetails();
});

When('User click on Products', async function(this: CustomWorld)  {
    await this.pages.get(ProductsPage).clickProduct();
});

Then('User increase quantity to {string} from product details page', async function(this: CustomWorld, qty: number) {
    await this.pages.get(ProductsPage).increaseQty(qty);
});

Then('User click on view Product for {string}', async function(this: CustomWorld, product_id: number) {
    await this.pages.get(ProductsPage).clickViewProduct(product_id);
});

Then('click on Add to cart from product details page', async function(this: CustomWorld) {
    await this.pages.get(ProductsPage).clickAddtoCartDetailPage();
});