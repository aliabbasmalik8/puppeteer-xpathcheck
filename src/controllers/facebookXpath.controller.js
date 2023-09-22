const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsFB(browser) {
  // const browser = await createBrowser();
  // const context = browser.defaultBrowserContext();
  let results = [];
  context.overridePermissions("https://www.facebook.com", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  // Replace with your login credentials
  const username = "androediot@gmail.com";
  const password = "Helloworld91@";
  const pageXPaths = xPaths["facebook"];

  // Navigate to the login page
  await page.goto("https://www.facebook.com", { waitUntil: "networkidle0" });

  await page.screenshot({ path: "home.png" });

  // await page.setUserAgent(userAgent.random().toString());

  // Fill in and submit the login form
  await page.type("input[name='email']", username, { delay: 50 });
  await page.type("input[name='pass']", password, { delay: 50 });
  await page.click("button[data-testid='royal_login_button']");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "home1.png" });
  // Wait for login to complete (you may need to adjust the selectors and wait time)
  await page.waitForSelector("div[role='navigation']");

  await page.screenshot({ path: "home122222.png" });

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.facebook.com/");
    if (expectedXPaths.tab === "reels") {
      await page.waitForTimeout(6000);
      // await page.waitForNetworkIdle();
      const [reels] = await page.$x("//span[contains(., 'Reels')]");
      if (reels) {
        await reels.click();
      }

      await page.screenshot({ path: "reelks.png" });

      // await page.waitForSelector("a[href='/reels/create/']");
      // await page.screenshot({ path: "screenshot.png" });
      //await page.click('svg[class="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj x1qx5ct2 xw4jnvo"]')
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.facebook.com/"
      );
      // await page.screenshot({ path: "screenshot1.png" });

      results = [...results, ...response];

      // const [stories] = await page.$x("//span[contains(., 'Stories')]");
      // if (stories) {
      //   await stories.click();
      // }
      //await page.click('svg[class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"]')
    } else if (expectedXPaths.tab === "Marketplace") {
      await page.click(
        'a[href="https://www.facebook.com/marketplace/?ref=bookmark"]'
      );
      await page.waitForTimeout(7000);
      // await page.waitForNetworkIdle();

      await page.screenshot({ path: "maket.png" });

      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.facebook.com/"
      );

      results = [...results, ...response];
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.facebook.com/"
      );
      results = [...results, ...response];
    }
  }

  return results;
  // await browser.close();
}

module.exports = checkXPathsFB;
