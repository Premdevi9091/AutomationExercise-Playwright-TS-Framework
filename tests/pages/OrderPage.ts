import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import test, { expect, Locator, Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { DataGenerator } from "../../utils/generateRandom";

type AddressDetails = {
    name: string;
    company: string;
    address1: string;
    cityStateZip: string;
    country: string;
    mobile: string;
};

export class OrderPage extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private user : any;

    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private proceedToCheckoutBtn = this.page.getByText("Proceed To Checkout");
    private registerLoginLink = this.page.getByRole('link', { name: 'Register / Login' });
    private modelAddedText = this.page.locator('.modal-content h4');
    private modelAddedMsg = this.page.locator('.modal-content p').first();
    private addressDetailsHeading = this.page.locator('h2.heading').first();
    private reviewOrderHeading = this.page.locator('h2.heading').last();
    private deliveryAddressEle = this.page.locator("#address_delivery");
    private deliveryInvoiceEle = this.page.locator('#address_invoice');
    private addressTitleEle = this.page.locator('li.address_title');
    private firstLastNameEle = this.page.locator('li.address_firstname.address_lastname');
    private companyEle = this.page.locator("li.address_address1").first();
    private address1Ele = this.page.locator("li.address_address1").nth(1);
    private cityStatePincodeEle = this.page.locator('li.address_city');
    private countryEle = this.page.locator('li.address_country_name');
    private mobileEle = this.page.locator('li.address_phone');
    private totalAmountEle = this.page.locator('#cart_info tr').last();
    private commentLabel = this.page.locator('#ordermsg label');
    private commentTextbox = this.page.locator('#ordermsg textarea');
    private placeOrderBtn = this.page.locator('a[href="/payment"]');
    private cardNameEle = this.page.locator('input[name="name_on_card"]');
    private cardNumberEle = this.page.locator('input[name="card_number"]');
    private cvcEle = this.page.locator('input[name="cvc"]');
    private monthEle = this.page.locator('input[name="expiry_month"]');
    private yearEle = this.page.locator('input[name="expiry_year"]');
    private payandConfirmBtn = this.page.locator('button[data-qa="pay-button"]');
    private successMsg = this.page.locator('div#success_message');
    private orderPlaceLabel = this.page.locator('.text-center');
    private successMsg2 = this.page.locator('.container p').first();
    private downloadInvoiceBtn = this.page.locator('a[href="/download_invoice/500"]');
    private continueBtn = this.page.locator("a[data-qa='continue-button']");


    async clickProceedToCheckout(){
        await this.actions?.click(this.proceedToCheckoutBtn, "Proceed To Checkout");
    }

    async clickRegisterLogin(){
        await this.actions?.assertText(this.modelAddedText, "Checkout", "Checkout Text");
        await this.actions?.assertText(this.modelAddedMsg, "Register / Login account to proceed on checkout.", "Success Message for Register/Login");
        await this.actions?.click(this.registerLoginLink, "Register/Login");     
    }

    async verifyAddressSection(){
        await this.actions?.assertText(this.addressDetailsHeading, "Address Details", "Address Details");
        await this.actions?.assertText(this.deliveryAddressEle.locator(this.addressTitleEle), "Your delivery address", "Your delivery address");
        await this.compareDeliveryData(this.deliveryAddressEle);
        await this.actions?.assertText(this.deliveryInvoiceEle.locator(this.addressTitleEle), "Your billing address", "Your billing addresss");
        await this.compareDeliveryData(this.deliveryInvoiceEle);
    }

    async verifyReviewYourOrder(){
        await this.actions?.assertText(this.reviewOrderHeading, "Review Your Order", "Review Your Order");
        const actualTotalAmount = Number((await this.actions?.getText(this.totalAmountEle, "Total Amount"))?.replace(/[^\d]/g, ""));
        const expectedTotalAmount = await this.calculateExpectedTotalAmount();
        await this.actions?.compareValues(actualTotalAmount, expectedTotalAmount, "Total Amount");    
    }

    async enterComment(){
        await this.actions?.assertText(this.commentLabel, "If you would like to add a comment about your order, please write it in the field below.", "Comment Label");
        const comment = DataGenerator.generateRandomAlphaNumberic(100);
        await this.actions?.fill(this.commentTextbox, comment, "Comment");
        this.testLogger.put("comment", comment);
    }

    async clickPlaceOrder(){
        await this.actions?.click(this.placeOrderBtn, "Place Order");
    }

    async enterCardDetails(){
        const cardName = DataGenerator.generateRandomString(10);
        const cardNumber = DataGenerator.generateRandomNumber(1234567890987, 987654321234);
        const cvc = DataGenerator.generateRandomNumber(111, 999);
        const month = DataGenerator.generateRandomNumber(1, 12);
        const year = DataGenerator.generateRandomNumber(2000, 2026);

        await this.actions?.fill(this.cardNameEle, cardName, "Card Name");
        await this.actions?.fill(this.cardNumberEle, cardNumber, "Card Number");
        await this.actions?.fill(this.cvcEle, cvc, "Card CVV");
        await this.actions?.fill(this.monthEle, month, "Card Expiry Month");
        await this.actions?.fill(this.yearEle, year, "Card Expiry Year");

        const cardDetails = {
            name: cardName,
            number: cardNumber,
            cvc: cvc,
            month: month,
            year: year
        }
        this.testLogger.put("cardDetails", cardDetails);
    }

    async clickPayAndConfirmOrder(){
        await this.actions?.click(this.payandConfirmBtn, "Pay and Confirm Order");
        //await this.actions?.assertText(this.successMsg, "Your order has been placed successfully!", "Success Message");
    }

    async verifyOrderPlaced(){
        await this.actions?.assertText(this.orderPlaceLabel, "Order Placed!", "Order Placed");
        await this.actions?.assertText(this.successMsg2, "Congratulations! Your order has been confirmed!", "Success Message 2");
        await this.actions?.click(this.continueBtn, "Continue");
    }

    //created to get Actual delivery address from UI
    async getActualDeliveryAddress(locator: Locator): Promise<AddressDetails>{
        const deliveryAddress = locator;
        return {
            name: await this.actions!.getText(deliveryAddress.locator(this.firstLastNameEle), "First & Last Name"),
            company: await this.actions!.getText(deliveryAddress.locator(this.companyEle), "Company"),
            address1:  await this.actions!.getText(deliveryAddress.locator(this.address1Ele), "Address 1"),
            cityStateZip: await this.actions!.getText(deliveryAddress.locator(this.cityStatePincodeEle), "City State Pincode"),
            country: await this.actions!.getText(deliveryAddress.locator(this.countryEle), "Country"),
            mobile: await this.actions!.getText(deliveryAddress.locator(this.mobileEle), "Mobile")
        };
    }

    //created to get expected delivery address from textLogger
    async getExpectedDeliveryAddress(): Promise<AddressDetails>{
        const userData = this.testLogger.get("userDetails");
        const address = userData.address;
        return {
            name: `${userData.gender} ${userData.firstName} ${userData.lastName}`,
            company: address.company,
            address1: address.address,
            cityStateZip: `${address.city} ${address.state} ${address.zipcode}`,
            country: address.country,
            mobile: address.mobile
        };
    }

    //comparing each data from UI & testLogger
    async compareDeliveryData(locator: Locator){
        const actualData = await this.getActualDeliveryAddress(locator);
        const expectedData = await this.getExpectedDeliveryAddress();
        for (const key of Object.keys(expectedData)) {
            await this.actions?.compareValues(
            actualData[key as keyof AddressDetails],
            expectedData[key as keyof AddressDetails],
            `Delivery Address - ${key}`
            );
        }
    }

    //calculating total amount from testlogger
    async calculateExpectedTotalAmount(): Promise<number>{
        const productsData = this.testLogger.get("Products");
        let total = 0;

        //case 1: Array(Home page add to cart)
        if(Array.isArray(productsData)){
            const grouped = new Map<string, {price: number, qty: number}>();
            for(const item of productsData){
                const price = Number(item.price.replace(/[^\d]/g, ""));
                if(!grouped.has(item.id)){
                    grouped.set(item.id, {price, qty: 1});
                } else {
                    grouped.get(item.id)!.qty += 1;
                }
            }
            for(const value of grouped.values()){
                total += value.price * value.qty;
            }
        }
        //Case 2: object (Prodcut details page)
        else{
            const price = Number(productsData.price.replace(/[^\d]/g, ""));
            const qty = Number(productsData.quantity);
            total = price * qty;
        }
        return total;
    }  
    
    
}