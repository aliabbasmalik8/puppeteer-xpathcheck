const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsTwitter(browser) {
  let results = [];
  const context = browser.defaultBrowserContext();

  context.overridePermissions("https://twitter.com", [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  const pageXPaths = xPaths["twitter"];

  // Replace with your login credentials
  const username = process.env.TWITTER_LOGIN_USERNAME;
  const password = process.env.TWITTER_LOGIN_PASSWORD;

  // Navigate to the login page
  await page.goto("https://twitter.com/i/flow/login", {
    waitUntil: "networkidle0",
  });

  await page.waitForTimeout(6000);
  // Fill in and submit the login form
  await page.type("input[autocomplete]", username, { delay: 50 });

  const [nextButton] = await page.$x('//span[text()="Next"]');

  if (nextButton) await nextButton.click();

  await page.waitForTimeout(3000);
  await page.type('input[type="password"]', password, { delay: 50 });

  await page.click('div[data-testid="LoginForm_Login_Button"]');

  await page.waitForNavigation();
  await page.waitForTimeout(3000);

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://twitter.com/home");
    await page.waitForTimeout(3000);
    if (expectedXPaths.tab === "Messages") {
      await page.click('a[href="/messages"]');
      await page.waitForTimeout(3000);
      await page.click('div[data-testid="activeRoute"]');
      await page.waitForTimeout(3000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://twitter.com"
      );

      results = [...results, ...response];
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://twitter.com"
      );

      results = [...results, ...response];
    }
  }
  return results;
}
module.exports = checkXPathsTwitter;
