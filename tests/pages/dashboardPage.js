exports.DashboardPage = class DashboardPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.menu_sidebar = page.getByRole('button', { name: 'Open Menu' });
        this.logout_buttom = page.locator('[data-test="logout-sidebar-link"]');
        this.products_text = page.locator('[data-test="title"]');
        this.bagpack_cart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.bikelight_cart = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartlink_button = page.locator('[data-test="shopping-cart-link"]');
    }

    async logout() {
        await this.menu_sidebar.click();
        await this.logout_buttom.click();
        console.log('Logged out');
    }

    async products_available() {
        await this.expect(this.products_text).toHaveText('Products');
        console.log('Items available');
    }

    async addItems() {
        await this.bagpack_cart.click();
        await this.bikelight_cart.click();
        console.log('Items added');
    }

    async cartLink() {
        await this.cartlink_button.click();
        console.log('Clicked cart link');
    }
}