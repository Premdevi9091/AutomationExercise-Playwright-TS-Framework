import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world/customWorld";
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
});

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

When('remove the {string} from cart', async function(this: CustomWorld, product_id: string) {
    await this.pages.get(ProductsPage).removeProductFromCart(product_id);
});

Then('verify the Category', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).verifyCategory();
});

When('user select category {string}', async function(this:CustomWorld, category: string) {
    await this.pages.get(ProductsPage).selectCategory(category);
});

When('user select sub-category {string}', async function(this:CustomWorld, sub_category: string) {
    await this.pages.get(ProductsPage).clickProductType(sub_category);
});

Then('all products related to {string} and {string} should be display', async function(this:CustomWorld, category: string, sub_category: string) {
    await this.pages.get(ProductsPage).verifyCategoryProducts(category, sub_category);
});

Then('verify the Brands', async function(this:CustomWorld)  {
    await this.pages.get(ProductsPage).verifyBrands();
});

When('user select brand {string}', async function(this:CustomWorld, type: string) {
    await this.pages.get(ProductsPage).clickProductType(type);
});

Then('all products related to {string} should be display', async function(this:CustomWorld, type: string) {
    await this.pages.get(ProductsPage).verifyBrandsProducts(type);
});

Then('add first {string} products to cart', async function(this:CustomWorld, num: number) {
    await this.pages.get(ProductsPage).addProducts(num);
});

When('verify review section', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).reviewSection();
});

When('enter the {string} details and review', async function(this:CustomWorld, user: string) {
    await this.pages.get(ProductsPage).enterReviewDetails(user);
});

When('click on submit', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).clickReviewSubmit();
});

When('verify review success message', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).verifyReviewSuccess();
});

Then('verify recommended items section', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).recommandedSection();
})
Then('add product from recommended section', async function(this:CustomWorld) {
    await this.pages.get(ProductsPage).addProductRecommandedSection();
})






