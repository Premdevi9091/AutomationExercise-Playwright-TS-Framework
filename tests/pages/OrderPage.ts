import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";
import { DataGenerator } from "../../utils/generateRandom";


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

    async clickProceedToCheckout(){
        await this.actions?.click(this.proceedToCheckoutBtn, "Proceed To Checkout");
    }

    async clickRegisterLogin(){
        await this.actions?.assertText(this.modelAddedText, "Checkout", "Checkout Text");
        await this.actions?.assertText(this.modelAddedMsg, "Register / Login account to proceed on checkout.", "Success Message for Register/Login");
        await this.actions?.click(this.registerLoginLink, "Register/Login");     
    }

}