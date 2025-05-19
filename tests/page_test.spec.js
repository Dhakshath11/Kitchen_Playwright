import { test } from '../lambdatest-setup.js' // Test needs to be imported from lamndatest-setup.js as we customized the driver creation
import { expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage';
import { CartPage } from './pages/cartPage';

let Login;

// Before All
test.beforeAll(async () => {
  console.log('*** Commencing Test Suite ***');
})

// Before Each Test
test.beforeEach(async ({ page }) => {
  Login = new LoginPage(page);
  await Login.navigate();
  await Login.inLoginPage();
})

// After Each Test
test.afterEach(async ({ page }) => {
  // Redundent Code, hence commented. >>> Refer Line >> 62 : 70 in Lambdatest-Setup.js code

  /** 
    //Lambdatest Test Status Update
    const title = await page.title()
    try {
      expect(title).toEqual('Swag Labs')
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    } catch {
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' }})}`)
    }
  
    await page.close();
    console.log('Browser Closed');
    */
})

// After All
test.beforeAll(async () => {
  console.log('*** Closing Test Suite ***');
})

test.describe('Page Object Model', () => {  // Grouping the tests
  // Main Test
  test('login @test @Login', async ({ page }) => {
    let Dashboard = new DashboardPage(page, expect);

    await Login.login('standard_user', 'secret_sauce');
    await Dashboard.products_available();
    await Dashboard.logout();

    //   Without page strategy
    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').click();
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="login-button"]').click();
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="error"]').click();
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="password"]').press('Enter');
    // await page.locator('[data-test="login-button"]').click();
    // await page.locator('[data-test="title"]').click();
    // await page.getByRole('button', { name: 'Open Menu' }).click();
    // await page.locator('[data-test="logout-sidebar-link"]').click();
  });

  // Main Test
  test('notLogin @test @NotLogin', async ({ page }) => {
    await Login.login('standard_user', '12345');

    //   Without page strategy
    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').click();
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="login-button"]').click();
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="error"]').click();
  });

  //
  test('cartAdd @test @CartTest', async ({ page }) => {
    let Dashboard = new DashboardPage(page, expect);
    let Cart = new CartPage(page, expect);

    await Login.login('standard_user', 'secret_sauce');
    await Dashboard.products_available();
    await Dashboard.addItems();
    await Dashboard.cartLink();
    await Cart.removeItems();

    //   Without page strategy
    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').click();
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    // await page.locator('[data-test="shopping-cart-link"]').click();
    // await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    // await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    // await page.getByRole('button', { name: 'Open Menu' }).click();
    // await page.locator('[data-test="logout-sidebar-link"]').click();
  });
})