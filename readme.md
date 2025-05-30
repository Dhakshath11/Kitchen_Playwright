Kitchen Playwright is a playwright automated project, with supports both local & lambdatest execution (SAAS & On_Prem)

--------------------------------------------------------------------------------------------

Test are kept inside tests folder
test class : page_test.spec.js

Two config files namely :
1. playwirght.config.js => Local Execution
2. playwright_onprem.config.js => Lambdatest Execution

--------------------------------------------------------------------------------------------
Why Remote Driver creation is different for lambdatest-public & lambdatest-on_prem env?
Triage: First thing, we need to how, How playwright creates driver connection. Playwright was build by MS which is compatible with chromium API, API which is used by both Chrome & Edge.
Hence when we install playwright, automatically browsers gets installed.
Connection to this browser is automatiocally made via 'chromium.connect().launch()'. No need to provide method, playwright automatically manages and launches it as per playwright.config.js file.
For remote connection like lambdatest, playwirght provides options to pass remote_url with capabilities inside 'chromium.connect()', something like this ==>
browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
This makes connection with remote url.

Why it fails in on_prem?
Basically when chromium.connect is called with remote_url, even though browser is specified in capabilities, chromium.connect automatically calls for pre_installed_browser cache. Since browser installing is blocked due to FIREWALL in ON_PREM, we get file_not_found.

Hence to bypass this, WEBSOCKET_CONNECTION is made inside of chromium.connect.

More over, whenever user makes remote_url connection, to be noted and setup.js file needs to be created to tell Playwright, use the browser page created from setup.js file instead of default. Thast reason, we bypass or call base.test.extend()

--------------------------------------------------------------------------------------------

For Local Execution 
Command : npx playwright test --config=playwright.config.js

Inside page_test.spec.js, Change the test import to "import { test } from '@playwright/test'".

--------------------------------------------------------------------------------------------

For Lambdatest Execution

UNCOMMENT LINES for SAAS run in setup.js file (Uses Chromium connect)
Command : npx playwright test --config=playwright.config.js

KEEP files as it is for Hyper Execution (Uses websocket connection)

--------------------------------------------------------------------------------------------