import { expect } from '@playwright/test';
exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page
        this.username_testbox = page.locator('[data-test="username"]');
        this.password_testbox = page.locator('[data-test="password"]');
        this.login_button = page.locator('[data-test="login-button"]');
        this.password_incorrect_text = page.locator('[data-test="error"]');
    }

    async login(username, password) {
        await this.username_testbox.fill(username);
        await this.password_testbox.fill(password);
        await this.login_button.click();
        console.log('Logged In');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
        console.log('Navigated to website');
    }

    async inLoginPage() {
        await expect(this.login_button).toBeVisible();
        console.log('In Login Page');
    }

    async isPasswordIncorrect() {
        await expect(this.password_incorrect_text).toHaveValue(/.*Password is incorrect/);
        console.log('Password Incorrect');
    }

}