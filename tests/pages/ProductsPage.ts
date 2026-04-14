import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/page-interaction/UIActions";
import { expect, Page } from "@playwright/test";
import { TestLogger } from "../../utils/core/testLogger";
import logger from "../../utils/core/logger";
import { AppDataManager } from "../../utils/data/AppDataManager";
import { UserDataManager } from "../../utils/data/UserDataManager";
import { DataGenerator } from "../../utils/helpers/generateRandom";

interface CartItem  {
    id: string;
    name: string;
    price: string;
    quantity: number;
};

export class ProductsPage extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private product_no : number | undefined;


    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private productLink = this.page.getByRole('link', { name: 'Products' });
    private allProductsTitle = this.page.locator(".features_items h2.title");
    private totalProducts = this.page.locator(".features_items div.col-sm-4");
    private productInformation = this.page.locator(".product-information");
    private searchBar = this.page.locator("input#search_product");
    private searchBtn = this.page.locator("button#submit_search");
    private productNames = this.page.locator(".productinfo p");
    private hoverEle = this.page.locator(".product-image-wrapper");
    private continueShoppingBtn = this.page.getByText('Continue Shopping');
    private viewCart = this.page.getByText('View Cart');
    private modelAddedText = this.page.locator('.modal-content h4');
    private modelAddedMsg = this.page.locator('.modal-content p').first();
    private productImg = this.page.locator("img[alt='ecommerce website products']");
    private viewProduct = (productId: number) => this.page.locator(`a[href='/product_details/${productId}']`);
    private addtoCart = this.page.getByRole("button", {name: "Add to cart"});
    private sidePanel = this.page.locator('.left-sidebar');
    private productTitle = this.page.locator('.title');
    private displayProducts = this.page.locator('.productinfo p');
    private reviewTitle = this.page.locator('a[href="#reviews"]');
    private reviewName = this.page.getByPlaceholder('Your Name');
    private reviewEmail = this.page.locator('#email');
    private reviewMessage = this.page.getByPlaceholder('Add Review Here!');
    private reviewSubmitBtn = this.page.locator('#button-review');
    private reviewSuccessMessage = this.page.locator('.alert-success span');
    private recommandSection = this.page.locator('.recommended_items .title');
    private recommandProducts = this.page.locator('.recommended_items .productinfo a');
        
    
    
    async clickProduct(){
        await this.actions?.click(this.productLink, "Products");
    }

    async verfiyProductsPage(){
        await this.actions?.assertText(this.allProductsTitle, "All Products", "All Products Text");
        await this.actions?.validateCount(this.totalProducts, 34, "Total products validate");
    }

    async clickOnViewProduct(){
        for(let i = 1; i <= 5; i++){
            await this.actions?.click(this.viewProduct(i), `Clicked on View Product for: ${i + 1} product`);
            await this.verifyProductDetails('array');
            await this.actions?.click(this.productLink, "Products");
        }
    }

    async verifyProductDetails(type: 'array' | 'object' = 'object'){
        const productId = (await this.actions?.getAttribute(this.productImg.nth(0), "src", "src"))?.split("/").pop();
        const name = await this.actions?.getText(this.productInformation.locator("h2"), "Product Name");
        const category = (await this.actions?.getText(this.productInformation.locator("p").nth(0), "Product Category"))?.split(":")[1].trim();
        const availability = (await this.actions?.getText(this.productInformation.locator("p").nth(1), "Product Availability"))?.split(":")[1].trim();
        const price = await this.actions?.getText(this.productInformation.locator("span").nth(1), "Product Price");
        const condition = (await this.actions?.getText(this.productInformation.locator("p").nth(2), "Product Condition"))?.split(":")[1].trim();
        const brand = (await this.actions?.getText(this.productInformation.locator("p").nth(3), "Product Brand"))?.split(":")[1].trim();
        const qty = (await this.actions?.getInputValue(this.productInformation.locator("input").nth(0), "Product Quantity"));

        const productsDetails = {
            id: productId,
            name: name,
            cateogory: category,
            availability: availability,
            price: price,
            quantity: qty,
            condition: condition,
            brand: brand
        }
        this.testLogger.put(`Products`, productsDetails, type);        
    }

    async searchProduct(product_name : string){
        await this.actions?.fill(this.searchBar, product_name, "Product Name input in Search bar");
    }

    async clickSearchButton(){
        await this.actions?.click(this.searchBtn, "Search");
    }

    async verifySearchProducts(product_name: string){
        await this.actions?.assertText(this.allProductsTitle, "Searched Products", "Searched Products Text");
        const count: any = await this.actions?.getCount(this.productNames, "Searched Products count");
        let searchProducts: string[] = []; 
        let matchFound = false;
        for(let i = 0; i < count; i++){
            const productName: any = await this.actions?.getText(this.productNames.nth(i), "ProductName");
            searchProducts.push(productName);
            if(productName?.toLowerCase().includes(product_name)){
                matchFound = true;
            }
        }
        expect(matchFound).toBeTruthy();
        this.testLogger.put(`SearchProducts_${product_name}`, searchProducts);
    }

    async hoverOnProduct(product_number: number){
        this.product_no = product_number;
        const hover = this.hoverEle.nth(product_number - 1);
        await this.actions?.hoverElement(hover, `Product ${product_number}`);

        const name = await this.actions?.getText(hover.locator(".productinfo p"), "Product Name");
        const price = await this.actions?.getText(hover.locator(".productinfo h2"), "Product Price");
        const productsDetails = {
            id: product_number,
            name: name,
            price: price
        }
        this.testLogger.put(`Products`, productsDetails, 'array');

    }

    async clickAddtoCartHomePage(){
        const addtoCart = this.page.locator(`.overlay-content a[data-product-id='${this.product_no}']`);
        await this.actions?.click(addtoCart, "Add to cart");
        await this.actions?.assertText(this.modelAddedText, "Added!", "Added Text");
        await this.actions?.assertText(this.modelAddedMsg, "Your product has been added to cart.", "Success Message for cart");
    }

    async clickContinueShopping(){
        await this.actions?.click(this.continueShoppingBtn, "Continue Shopping");
    }

    async clickViewCart(){
        await this.actions?.click(this.viewCart, "View Cart");
    }

    private normalizedCartData(data: any): CartItem[]{

        //Product added from Home Page(array format)
        if(Array.isArray(data)){
            const grouped = new Map<string, CartItem>();
            for(const item of data){
                if(!grouped.has(item.id)){
                    grouped.set(item.id, {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1
                    });
                } else{
                    grouped.get(item.id)!.quantity += 1;
                }
            }
            return [...grouped.values()];
        }

        //Product added from Product Detail page(object format)
        return [{
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: Number(data.quantity) || 1
        }];
    }

    private async validateCartRow(item: CartItem){
        const row = this.page.locator(`#product-${item.id}`);
        //convert price "Rs. 500 -> 500"
        const priceValue = Number(item.price.replace(/[^\d]/g, ""));
        const expectedTotal: any = priceValue * item.quantity;

        //Format back to UI format
        const expectedTotalText = `Rs. ${expectedTotal}`;

        const productNameEle = row.locator(`td.cart_description h4`);
        await this.actions?.compareText(productNameEle, item.name, `Product Id ${item.id} : Name`);

        const productPriceEle = row.locator(`td.cart_price p`);
        await this.actions?.compareText(productPriceEle, item.price, `Product Id ${item.id} : Price`);

        const productQtyEle= row.locator(`td.cart_quantity button`);
        await this.actions?.compareText(productQtyEle, String(item.quantity), `Product Id ${item.id} : Quantity`);

        const productTotalPriceEle= row.locator(`td.cart_total p`);
        await this.actions?.compareText(productTotalPriceEle, expectedTotalText, `Product Id ${item.id} : Total price`);
    }

    async verifyCartDetails(){
        const rawData = this.testLogger.get("Products");
        const items = this.normalizedCartData(rawData);
        logger.info(`Cart items to validate: ${JSON.stringify(items)}`);
        for(const item of items){
            await this.validateCartRow(item);
        }
        
    }

    async clickViewProduct(product_id : number){
        await this.actions?.click(this.viewProduct(product_id), "View Product");
        await this.verifyProductDetails();
    }

    async increaseQty(qty: number){
        await this.actions?.fill(this.productInformation.locator("input").nth(0), qty,  `Quantity input`);
        await this.verifyProductDetails();
    }

    async clickAddtoCartDetailPage(){
        await this.actions?.click(this.addtoCart, "Add to Cart");
    }

    async removeProductFromCart(product_id: string){
        const removeEle = this.page.locator(`tr#product-${product_id} td.cart_delete a`);
        await this.actions?.click(removeEle, `Removed ${product_id} from cart`);
        await this.actions?.isNotVisible(removeEle, `Product ${product_id}`);
    }

    async verifyCategory(){
        const categoryEle = this.sidePanel.locator('h2').first();
        const categoryTypeEle = this.sidePanel.locator('div#accordian h4');
        const expectedCategoryType = AppDataManager.get("Category");
        const actualCategoryType: any = await this.actions?.getAllTexts(categoryTypeEle, "Categories Name");
        
        await this.actions?.assertText(categoryEle, "Category", "Category Name");
        await this.actions?.compareValuesArray(actualCategoryType, expectedCategoryType, 'Compare Catergory');
        this.testLogger.put("Category", actualCategoryType);
    }

    async selectCategory(type: string){
        this.clickProductType(type);
        const subCategoryEle = this.page.locator(`#${type} li`);
        const actualSubCategoryType: any = await this.actions?.getAllTexts(subCategoryEle, " SubCategory Name");
        const expectedSubCategoryType = AppDataManager.get(`${type}`);
        await this.actions?.compareValuesArray(actualSubCategoryType, expectedSubCategoryType, "Compare SubCategory");
        this.testLogger.put("Sub-Category", actualSubCategoryType);
    }

    async clickProductType(type: string){
        const catTypeEle = this.page.getByRole('link', { name: `${type}` }).first();
        await this.actions?.click(catTypeEle, `${type}`);
        
    }
    async verifyCategoryProducts(category: string, sub_cateogry: string){
        const cateogryName = `${category} - ${sub_cateogry} Products`
        await this.actions?.assertText(this.productTitle, cateogryName, "Category Title");
        const cateogryProducts: any = await this.actions?.getAllTexts(this.displayProducts, "Category Products");
        this.testLogger.put("cateogryProducts", cateogryProducts);
    }

    async verifyBrands(){
        const brandEle = this.sidePanel.locator('h2').last();
        const brandNameEle = this.sidePanel.locator('div.brands-name li');
        const expectedBrandName = AppDataManager.get("Brands");
        const actualBrandName: any = (await this.actions?.getAllTexts(brandNameEle, "Brand Names"))
                                            ?.map((item: string) => item.replace(/^\(\d+\)/, ''));
        
        await this.actions?.assertText(brandEle, "Brands", "Brand Name");
        await this.actions?.compareValuesArray(actualBrandName, expectedBrandName, "Compare Brands");
        this.testLogger.put("Brands", actualBrandName);
    }

    async verifyBrandsProducts(brand: string){
        const brandName = `Brand - ${brand} Products`
        await this.actions?.assertText(this.productTitle, brandName, "Category Title");
        const brandProducts: any = await this.actions?.getAllTexts(this.displayProducts, "Brand Products");
        this.testLogger.put("cateogryProducts", brandProducts);
    }

    async addProducts(num: number){
        const addtoCart = this.page.locator('.productinfo a');
        for(let i = 0; i < num; i++){
            const addBtn = addtoCart.nth(i);
            await this.actions?.click(addBtn, `added ${i} product`);
            const productsDetails = {
                id: await this.actions?.getAttribute(addBtn, "data-product-id", `get product ${i + 1} id`),
                name: await this.actions?.getText(this.page.locator(".productinfo p").nth(i), "Product Name"),
                price: await this.actions?.getText(this.page.locator(".productinfo h2").nth(i), "Product Price"),
            }
            await this.actions?.click(this.continueShoppingBtn, "Continue shopping");
            this.testLogger.put(`Products`, productsDetails, 'array');
        }
    }

    async reviewSection(){
        await this.actions?.assertText(this.reviewTitle, "Write Your Review", "Write Your Review");
        await this.actions?.isVisible(this.reviewName, "Review Name");
        await this.actions?.isVisible(this.reviewEmail, "Review Email");
        await this.actions?.isVisible(this.reviewMessage, "Review Message");
    }

    async enterReviewDetails(userkey: string){
        const user = UserDataManager.getUser(userkey);
        const username = user.username;
        const email = user.email;
        const reviewMsg = DataGenerator.generateRandomAlphaNumberic(60);
        await this.actions?.fill(this.reviewName, username, "Name input");
        await this.actions?.fill(this.reviewEmail, email, "Email input");
        await this.actions?.fill(this.reviewMessage, reviewMsg, "Review Message input");
        const reviewDetails = {
                name: username,
                email: email,
                message: reviewMsg
            }
        this.testLogger.put(`ReviewDetails`, reviewDetails);
    }

    async clickReviewSubmit(){
        await this.actions?.click(this.reviewSubmitBtn, "Review Submit button");
    }

    async verifyReviewSuccess(){
        await this.actions?.assertText(this.reviewSuccessMessage, "Thank you for your review.", "Review Success Message");
    }

    async recommandedSection(){
        await this.actions?.assertText(this.recommandSection, "recommended items", "Recommended Items Title");
    }

    async addProductRecommandedSection(){
        const count: any = await this.recommandProducts.count();
        for(let i = 0; i < count; i++){
            const id: any = await this.actions?.getAttribute(this.recommandProducts.nth(i), "data-product-id", "product id");
            const addBtn = this.page.locator(`.recommended_items .productinfo a[data-product-id='${id}']`);
            await this.actions?.click(addBtn, `add ${id} product`);
            const productsDetails = {
                id: id,
                name: await this.actions?.getText(this.page.locator(".productinfo p").nth(i), "Product Name"),
                price: await this.actions?.getText(this.page.locator(".productinfo h2").nth(i), "Product Price"),
            }
            await this.actions?.click(this.continueShoppingBtn, "Continue shopping");
            this.testLogger.put(`Products`, productsDetails, 'array');
        }
    }

    async clearCart(){
        const product = this.testLogger.get("Products");
        for(let prod of product){
            await this.removeProductFromCart(prod.id);
        }
    }


}

