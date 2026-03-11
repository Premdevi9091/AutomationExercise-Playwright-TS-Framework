import { BasePage } from "./BasePage";
import { UIActions } from "../../utils/UIActions";
import { Page } from "@playwright/test";
import { TestLogger } from "../../utils/testlogger";
import { UserDataManager } from "../../utils/UserDataManager";
import { DataGenerator } from "../../utils/generateRandom";


export class ContactUs extends BasePage{
    private actions: UIActions | undefined;
    private testLogger: TestLogger;
    private user : any;

    constructor(page: Page, testLogger: TestLogger){
        super(page);
        this.actions = new UIActions(page);
        this.testLogger = testLogger;
    }

    //Locators
    private contactUsLink = this.page.getByText('Contact us');
    private title = this.page.locator(".contact-form h2");
    private nameField = this.page.locator("[data-qa='name']");
    private emailField = this.page.locator("[data-qa='email']");
    private subjectField = this.page.locator("[data-qa='subject']");
    private messageField = this.page.locator("#message");
    private uploadFile = this.page.locator("[name='upload_file']");
    private submitBtn = this.page.locator("input[data-qa='submit-button']");
    private successMsg = this.page.locator(".status");
    private homeBtn = this.page.locator(".btn-success");

    private contactFormDetails: Record<string, any> = {};

    async clickContactUs(){
        await this.actions?.click(this.contactUsLink, "Contact Us");
    }

    async verifyFormDetails(userKey: string){
        await this.actions?.assertText(this.title, "Get In Touch", "Title: Get In Touch");

        this.user = UserDataManager.getUser(userKey);
        const name = this.user.username;
        const email = this.user.email;
        const subject = DataGenerator.generateRandomString(15);
        const message = DataGenerator.generateRandomString(50);
        
        await this.actions?.fill(this.nameField, name, "Name Input");
        await this.actions?.fill(this.emailField, email, "Email Input");
        await this.actions?.fill(this.subjectField, subject, "Subject Input");
        await this.actions?.fill(this.messageField, message, "Message Input");
        
        this.contactFormDetails = {
            Username: name,
            Email: email,
            Subject: subject,
            Message: message
        };
        this.testLogger.put("contactFormDetails", this.contactFormDetails);
        
    }

    async verifyUploadFile(fileName: string){
        await this.actions?.uploadFile(this.uploadFile, fileName, "Upload File");
        
        this.contactFormDetails = {
            fileName: fileName
        };
        this.testLogger.put("contactFormDetails", this.contactFormDetails);
    }

    async clickSubmit(){
        //await this.actions?.click(this.submitBtn, "Submit");
        await this.actions?.clickAndHandleAlert(this.submitBtn, "Submit Alert");
    }

    async verifyFormSubmission(){
        await this.actions?.assertText(this.successMsg, "Success! Your details have been submitted successfully.", "Success Message");
    }

    async clickHome(){
        await this.actions?.click(this.homeBtn, "Home");
    }
}