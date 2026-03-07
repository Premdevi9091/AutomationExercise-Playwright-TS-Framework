import { BasePage } from "../pages/BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { DataGenerator } from "../../utils/generateRandom";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";

export class RegisterPage extends BasePage{

    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private user : any;
    
    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private newSignUpLabel = this.page.locator('.signup-form h2');
    private loginLabel = this.page.locator('.login-form h2');
    private nameField = this.page.getByPlaceholder('Name');
    private emailField = this.page.locator("input[data-qa='signup-email']");
    private signUpBtn = this.page.getByRole('button', {name: 'Signup'});
    private passwordField = this.page.locator('#password');
    private daySelect = this.page.locator("#days");
    private monthSelect = this.page.locator("#months");
    private yearSelect = this.page.locator("#years");
    private firstNameField = this.page.locator("#first_name");
    private lastNameField = this.page.locator("#last_name");
    private companyField = this.page.locator("#company");
    private addressField1 = this.page.locator("#address1");
    private countryDropdown = this.page.locator("#country");
    private stateField = this.page.locator("#state");
    private cityField = this.page.locator("#city");
    private zipcodeField = this.page.locator("#zipcode");
    private mobileField = this.page.locator("#mobile_number");
    private createAccountBtn = this.page.getByText("Create Account");
    private accountCreationLabel = this.page.locator("h2[data-qa='account-created']");
    private continueBtn = this.page.locator("a[data-qa='continue-button']");
    private loggedInText = this.page.locator("ul.navbar-nav li").last();
    private deleteAccountLink = this.page.getByText("Delete Account");
    private accountDeleteLabel = this.page.locator("h2[data-qa='account-deleted']");
    private errorMsg = this.page.locator("form p").first();

    private userDetails: Record<string, any> = {};

    async verifyNewSignUpLabel(){
        await this.actions?.isVisible(this.newSignUpLabel, "New User Signup!");
        await this.actions?.isVisible(this.loginLabel, 'Login to your account');
    }

    async enterNameAndEmail(userKey: string){
        this.user = UserDataManager.getUser(userKey);
        const name = this.user.username;
        const email = this.user.email;
        await this.actions?.fill(this.nameField, name, "Name input");
        await this.actions?.fill(this.emailField, email, "Email input");
        
        this.userDetails = {
            Username: name,
            Email: email
        };

        this.testLogger.put("userDetails", this.userDetails);
        //console.log(`***** ${this.testLogger.get("userDetails.Username")}*****`);
    }

    async clickSignup(){
        await this.actions?.click(this.signUpBtn, "SignUp");
    }

    async fillAccountDetails(){
        await this.actions?.fill(this.passwordField, this.user.password,"Password input");
        
        await this.actions?.select(this.daySelect, DataGenerator.generateRandomNumber(1, 31), "Date of Birth: Day input");
        await this.actions?.select(this.monthSelect, DataGenerator.generateRandomNumber(1, 12), "Date of Birth: Month input");
        await this.actions?.select(this.yearSelect, DataGenerator.generateRandomNumber(1990, 2021), "Date of Birth: Year input");
        
        await this.actions?.fill(this.firstNameField, DataGenerator.generateRandomString(6), "FirstName input");
        await this.actions?.fill(this.lastNameField, DataGenerator.generateRandomString(8), "LastName input");

        await this.actions?.fill(this.addressField1, DataGenerator.generateRandomString(15), "Address1 input");
        await this.actions?.select(this.countryDropdown, "India", "Country select");
        await this.actions?.fill(this.stateField, DataGenerator.generateRandomString(12), "State input");
        await this.actions?.fill(this.cityField, DataGenerator.generateRandomString(7), "City input");
        await this.actions?.fill(this.zipcodeField, DataGenerator.generateRandomNumber(49876, 698765), "Zipcode input");
        await this.actions?.fill(this.mobileField, DataGenerator.generateRandomPhone(), "Mobile Number input");
    }

    async clickCreateAccount(){
        await this.actions?.click(this.createAccountBtn, "Create Account");
    }

    async verifyAccountCreation(){
        await this.actions?.assertText(this.accountCreationLabel, "Account Created!", "Account Created label");
        await this.actions?.click(this.continueBtn, "Continue");
    }

    async verifyUserLoggedIn(userKey: string){
        const user = UserDataManager.getUser(userKey);
        await this.actions?.compareText(this.loggedInText, `Logged in as ${user.username}`, 'Logged Text');
    }

    async clickDeleteAccount(){
        await this.actions?.click(this.deleteAccountLink, "Delete Account");
    }

    async verifyAccountDelete(){
        await this.actions?.assertText(this.accountDeleteLabel, "Account Deleted!", "Account delete label");
        await this.actions?.click(this.continueBtn, "Continue");
    }

    async errorMessageExistingAccount(){
        await this.actions?.assertText(this.errorMsg, "Email Address already exist!", "Account Already exist");
    }
}
