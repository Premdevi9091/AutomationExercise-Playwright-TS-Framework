import { BasePage } from "../pages/BasePage";
import { UIActions} from "../../utils/UIActions";
import { Page } from "@playwright/test";

export class HomePage extends BasePage{

    private actions: UIActions | undefined;

    constructor(page: Page){
        super(page);
        this.actions = new UIActions(page);
    }

    //Locators
    private homePageLogo = this.page.getByAltText('Website for automation practice');
    private signUpLink = this.page.locator("a[href='/login']");
    private cartLink = this.page.locator("a[href='/view_cart']").first();
    private contactUsLink = this.page.getByText('Contact us');
    private productLink = this.page.getByText("Products");

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
}