import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { expect, Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";
import { DataGenerator } from "../../utils/generateRandom";


export class Products extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;

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

    
    async clickProduct(){
        await this.actions?.click(this.productLink, "Products");
    }

    async verfiyProductsPage(){
        await this.actions?.assertText(this.allProductsTitle, "All Products", "All Products Text");
        await this.actions?.validateCount(this.totalProducts, 34, "Total products validate");
    }

    async clickOnViewProduct(){
        for(let i = 0; i < 10; i++){
            const viewProducts = this.page.locator("a[href*='product_details']");
            await this.actions?.click(viewProducts.nth(i), `Clicked on View Product for: ${i + 1} product`);
            await this.verifyProductDetails(i + 1);
            await this.actions?.click(this.productLink, "Products");
        }
    }

    async verifyProductDetails(product_id: any){
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
        this.testLogger.put(`product_${product_id}`, productsDetails);        
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
}