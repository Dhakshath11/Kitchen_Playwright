exports.CartPage = class CartPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.remove_bagpack = page.getByRole('button', { name: 'Open Menu' });
        this.remove_bikelight = page.locator('[data-test="logout-sidebar-link"]');
    }

    async removeItems() {
        await this.remove_bagpack.click();
        await this.remove_bikelight.click();
        console.log('Items removed');
    }
}