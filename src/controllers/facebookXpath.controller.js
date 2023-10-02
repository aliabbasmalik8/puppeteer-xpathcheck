const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsFB(browser) {
  let results = [];
  context.overridePermissions("https://www.facebook.com", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  // Replace with your login credentials
  const username = process.env.FACEBOOK_LOGIN_EMAIL;
  const password = process.env.FACEBOOK_LOGIN_PASSWORD;

  const pageXPaths = xPaths["facebook"];

  // Navigate to the login page
  await page.goto("https://www.facebook.com", { waitUntil: "networkidle0" });

  // Fill in and submit the login form
  await page.type("input[name='email']", username, { delay: 50 });
  await page.type("input[name='pass']", password, { delay: 50 });
  await page.click("button[data-testid='royal_login_button']");
  await page.waitForTimeout(3000);
  // Wait for login to complete (you may need to adjust the selectors and wait time)
  await page.waitForSelector("div[role='navigation']");

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.facebook.com/");
    if (expectedXPaths.tab === "reels") {
      await page.waitForTimeout(6000);
      const [reels] = await page.$x("//span[contains(., 'Reels')]");
      if (reels) {
        await reels.click();
      }

      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.facebook.com/"
      );

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Marketplace") {
      await page.click(
        'a[href="https://www.facebook.com/marketplace/?ref=bookmark"]'
      );
      await page.waitForTimeout(7000);

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
}

module.exports = checkXPathsFB;
