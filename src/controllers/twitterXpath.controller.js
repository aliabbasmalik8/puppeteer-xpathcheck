const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsTwitter(browser) {
  // const browser = await createBrowser();

  const context = browser.defaultBrowserContext();

  context.overridePermissions("https://twitter.com", [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  // Replace with your login credentials
  const username = "AliMali82930864";
  const password = "Helloworld91@";

  // Navigate to the login page
  await page.goto("https://twitter.com/i/flow/login", {
    waitUntil: "networkidle0",
  });

  // await page.setUserAgent(userAgent.random().toString());

  // Fill in and submit the login form
  await page.type("input[autocomplete]", username, { delay: 50 });

  const [nextButton] = await page.$x('//span[text()="Next"]');

  if (nextButton) await nextButton.click();

  await page.waitForTimeout(2000);
  await page.type('input[type="password"]', password, { delay: 50 });

  await page.click('div[data-testid="LoginForm_Login_Button"]');

  // await browser.close();
}
module.exports = checkXPathsTwitter;
