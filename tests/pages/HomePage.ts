import { BasePage } from "../pages/BasePage";
import { UIActions} from "../../utils/UIActions";
import { Page, expect } from "@playwright/test";

export class HomePage extends BasePage{

    private actions: UIActions | undefined;

    constructor(page: Page){
        super(page);
        this.actions = new UIActions(page);
    }

    //Locators
    private homePageLogo = this.page.getByAltText('Website for automation practice');
    private signUpLink = this.page.locator("a[href='/login']");

    async verifyHomePageVisible(){
        await this.actions?.isVisible(this.homePageLogo, "Home Page");
    }

    async clickSignupLogin(){
        await this.actions?.click(this.signUpLink, "Signup/Login Button");
    }

}