import { BasePage } from "../pages/BasePage";
import { UIActions } from "../../utils/page-interaction/UIActions";
import { Page } from "@playwright/test";
import { DataGenerator } from "../../utils/helpers/generateRandom";
import { TestLogger } from "../../utils/core/testLogger";
import { UserDataManager } from "../../utils/data/UserDataManager";

export class RegisterPage extends BasePage{

    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private user : any;
    private email: string | undefined;
    private name: string | undefined;
    
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
        this.name = this.user.username;
        this.email = this.user.email;
        await this.actions?.fill(this.nameField, this.name, "Name input");
        await this.actions?.fill(this.emailField, this.email, "Email input");
        this.userDetails = {
            username: this.name,
            email: this.email
        }
        this.testLogger.put("userDetails", this.userDetails);
    }

    async clickSignup(){
        await this.actions?.click(this.signUpBtn, "SignUp");
    }

    async fillAccountDetails(){
        const gender = DataGenerator.generateRandomNumber(1, 2);
        const genderRadio = this.page.locator(`label[for="id_gender${gender}"]`);
        const password = this.user.password;
        const firstName =  `first_${DataGenerator.generateRandomString(6)}`;
        const lastName = `last_${DataGenerator.generateRandomString(8)}`;
        const company = `comp_${DataGenerator.generateRandomString(10)}`;
        const day = DataGenerator.generateRandomNumber(1, 31);
        const month = DataGenerator.generateRandomNumber(1, 12)
        const year = DataGenerator.generateRandomNumber(1990, 2021);
        const address = DataGenerator.generateRandomString(15);
        const country = "India";
        const state = `state_${DataGenerator.generateRandomString(12)}`;
        const city = `city_${DataGenerator.generateRandomString(7)}`;
        const zipcode = DataGenerator.generateRandomNumber(49876, 698765);
        const mobile = DataGenerator.generateRandomPhone();

        //Gender
        await this.actions?.click(genderRadio.locator('input'), "Gender Radio");
        const genderText = await this.actions?.getText(genderRadio, "Gender Text");

        //Password
        await this.actions?.fill(this.passwordField, password,"Password input");

        //Date of Birth
        await this.actions?.select(this.daySelect, day, "Date of Birth: Day input");
        await this.actions?.select(this.monthSelect, month, "Date of Birth: Month input");
        await this.actions?.select(this.yearSelect, year, "Date of Birth: Year input");

        //FirstName LastName
        await this.actions?.fill(this.firstNameField, firstName, "FirstName input");
        await this.actions?.fill(this.lastNameField, lastName, "LastName input");

        //Company 
        await this.actions?.fill(this.companyField, company, "Company input");

        //Address
        await this.actions?.fill(this.addressField1, address, "Address1 input");
        await this.actions?.select(this.countryDropdown, country, "Country select");
        await this.actions?.fill(this.stateField, state, "State input");
        await this.actions?.fill(this.cityField, city, "City input");
        await this.actions?.fill(this.zipcodeField, zipcode, "Zipcode input");
        await this.actions?.fill(this.mobileField, mobile, "Mobile Number input");
        this.userDetails ={
            ...this.userDetails,
            gender: genderText,
            firstName: firstName,
            lastName: lastName,
            address: {
                company: company,
                address: address,
                country: country,
                state: state,
                city: city,
                zipcode: zipcode,
                mobile: mobile
            }
        }
        this.testLogger.put("userDetails", this.userDetails);
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
