import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";


export class SubscriptionPage extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;

    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private subscriptionText = this.page.locator(".single-widget h2");
    private subscriptionField = this.page.locator("#susbscribe_email");
    private subscriptionSendBtn = this.page.locator("#subscribe");
    private successMessage = this.page.locator(".alert-success").first();

    async verifySubscriptionBlock(){
        await this.actions?.assertText(this.subscriptionText, "Subscription", "Subscription Text");
    }

    async enterEmail(userkey: string){
        const user = UserDataManager.getUser(userkey);
        const email = user.email;
        await this.actions?.fill(this.subscriptionField, email, "Email input");
        this.testLogger.put("Email", email);
    }

    async verifySuccessMessage(expected: string){
        await this.actions?.click(this.subscriptionSendBtn, "Submit");
        await this.actions?.compareText(this.successMessage, expected, "Success Message");
    }
    
}