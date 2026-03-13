import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { expect, Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import logger from "../../utils/logger";


export class Products extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private product_no : string | undefined;


    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private productLink = this.page.getByText("Products");
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

    
    async clickProduct(){
        await this.actions?.click(this.productLink, "Products");
    }

    async verfiyProductsPage(){
        await this.actions?.assertText(this.allProductsTitle, "All Products", "All Products Text");
        await this.actions?.validateCount(this.totalProducts, 34, "Total products validate");
    }

    async clickOnViewProduct(){
        for(let i = 0; i < 5; i++){
            const viewProducts = this.page.locator("a[href*='product_details']");
            await this.actions?.click(viewProducts.nth(i), `Clicked on View Product for: ${i + 1} product`);
            await this.verifyProductDetails();
            await this.actions?.click(this.productLink, "Products");
        }
    }

    async verifyProductDetails(){
        let productsDetails: Record<string, any> = {};
        
        const name = await this.actions?.getText(this.productInformation.locator("h2"), "Product Name");
        const category = (await this.actions?.getText(this.productInformation.locator("p").nth(0), "Product Category"))?.split(":")[1].trim();
        const availability = (await this.actions?.getText(this.productInformation.locator("p").nth(1), "Product Availability"))?.split(":")[1].trim();
        const price = await this.actions?.getText(this.productInformation.locator("span").nth(1), "Product Price");
        const condition = (await this.actions?.getText(this.productInformation.locator("p").nth(2), "Product Condition"))?.split(":")[1].trim();
        const brand = (await this.actions?.getText(this.productInformation.locator("p").nth(3), "Product Brand"))?.split(":")[1].trim();

        productsDetails = {
            ProductName: name,
            Cateogory: category,
            Availability: availability,
            Price: price,
            Condition: condition,
            Brand: brand
        }
        this.testLogger.put(`Products`, productsDetails);        
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

    async hoverOnProduct(product_number: any){
        this.product_no = product_number;
        const hover = this.hoverEle.nth(product_number - 1);
        await this.actions?.hoverElement(hover, `Product ${product_number}`);
        let productsDetails: Record<string, any> = {};
        
        const name = await this.actions?.getText(hover.locator(".productinfo p"), "Product Name");
        const price = await this.actions?.getText(hover.locator(".productinfo h2"), "Product Price");
        productsDetails = {
            product_id: product_number,
            name: name,
            price: price
        }
        this.testLogger.put(`Products`, productsDetails);

    }
    async clickAddtoCart(){
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

    async verifyCartDetails(){
        const expectedDetails = this.testLogger.get("Products");
        const expectedDetailsMap = new Map();

        //Group products by product_id and calculate quantity
        for(const product of expectedDetails){
            if(!expectedDetailsMap.has(product.product_id)){
                expectedDetailsMap.set(product.product_id, {
                     name: product.name,
                     price: product.price,
                     quantity: 1
                });
            } else{
                expectedDetailsMap.get(product.product_id).quantity += 1;
            }
        }
        logger.info(`Expected cart map: ${JSON.stringify([...expectedDetailsMap])}`);
        
        for(const [productId, expected] of expectedDetailsMap){
            const row = this.page.locator(`#product-${productId}`);
            const qty = expected.quantity;

            //convert price "Rs. 500 -> 500"
            const priceValue = Number(expected.price.replace(/[^\d]/g, ""));
            const expectedTotal: any = priceValue * qty;

            //Format back to UI format
            const expectedTotalText = `Rs. ${expectedTotal}`;

            const productNameEle = row.locator(`td.cart_description h4`);
            await this.actions?.compareText(productNameEle, expected.name, `Product ${productId} : Name`);

            const productPriceEle = row.locator(`td.cart_price p`);
            await this.actions?.compareText(productPriceEle, expected.price, `Product ${productId} : Price`);

            const productQtyEle= row.locator(`td.cart_quantity button`);
            await this.actions?.compareText(productQtyEle, qty.toString(), `Product ${productId} : Quantity`);

            const productTotalPriceEle= row.locator(`td.cart_total p`);
            await this.actions?.compareText(productTotalPriceEle, expectedTotalText, `Product ${productId} : Total price`);
        }
    }
}
