import { Locator, Page } from "@playwright/test";
const data = JSON.parse(JSON.stringify(require("../Data/login.json")));

export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;
  private adminButton: Locator;
  private logOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(
      "//input[@placeholder='username' or @placeholder='Username']"
    );
    this.passwordInput = page.locator(
      "//input[@placeholder='password' or @placeholder='Password']"
    );
    this.loginButton = page.locator("//button[@type='submit']");
    this.loginErrorMessage = page.locator(``);
    this.adminButton = page.locator('//li[@class="oxd-userdropdown"]');
    this.logOut = page.locator("//ul[@class='oxd-dropdown-menu']/li[4]");
  }
  async performLogin() {
    await this.usernameInput.fill(data.ValidLogin.ValidUserName);
    await this.passwordInput.fill(data.ValidLogin.ValidPassword);
    await this.loginButton.click();
  }
  
}




module.exports = { LoginPage };
