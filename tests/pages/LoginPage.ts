import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";


export class LoginPage extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private user : any;

    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private emailField = this.page.locator("input[data-qa='login-email']");
    private passwordField = this.page.locator("input[data-qa='login-password']");
    private loginBtn = this.page.locator("button[data-qa='login-button']");
    private errorMsg = this.page.locator("div.login-form p");

    async enterEmailAndPassword(userKey: string){
        this.user = UserDataManager.getUser(userKey);
        const email = this.user.email;
        const password = this.user.password;
        await this.actions?.fill(this.emailField, email, "Email Input");
        await this.actions?.fill(this.passwordField, password, "Password input");
    }
    
    async clickLogin(){
        await this.actions?.click(this.loginBtn, "Login");
    }

    async errorMessageInvalidLogin(){
        await this.actions?.assertText(this.errorMsg, "Your email or password is incorrect!", "Invalid Login error Message");
    }
}