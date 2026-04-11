import { BasePage } from "../pages/BasePage";
import { UIActions} from "../../utils/page-interaction/UIActions";
import { Page } from "@playwright/test";

export class HomePage extends BasePage{

    private actions: UIActions | undefined;

    constructor(page: Page){
        super(page);
        this.actions = new UIActions(page);
    }

    //Locators
    private homePageLogo = this.page.getByAltText('Website for automation practice');
    private signUpLink = this.page.getByRole("link", {name: "Signup / Login"});
    private cartLink = this.page.locator("a[href='/view_cart']").first();
    private contactUsLink = this.page.getByText('Contact us');
    private productLink = this.page.getByText("Products");
    private testCasesLink = this.page.locator('a[href="/test_cases"]').first();
    private homePageLink = this.page.getByRole("link", { name: "Home"});
    private arrowUpBtn = this.page.locator("a#scrollUp");
    private homeText = this.page.locator(".item h2").first();

    async verifyHomePageVisible(){
        await this.actions?.isVisible(this.homePageLogo, "Home Page");
    }

    async clickSignupLogin(){
        await this.actions?.click(this.signUpLink, "Signup/Login Button");
    }

    async clickCart(){
        await this.actions?.click(this.cartLink, "Cart");
    }

    async clickProduct(){
        await this.actions?.click(this.productLink, "Products");
    }

    async clickContactUs(){
        await this.actions?.click(this.contactUsLink, "Contact Us");
    }

    async clickTestCases(){
        await this.actions?.click(this.testCasesLink, "Test Cases");
    }

    async clickHome(){
        await this.actions?.click(this.homePageLink, "Home");
    }

    async clickArrow(){
        await this.actions?.click(this.arrowUpBtn, "Arrow Up");
    }

    async scrollUpWOButtn(){
        await this.actions?.click(this.arrowUpBtn, "Arrow Up");
    }

    async verifyHomePageText(text: string){
        await this.actions?.assertText(this.homeText, text, "Home Page Text");
    }
}