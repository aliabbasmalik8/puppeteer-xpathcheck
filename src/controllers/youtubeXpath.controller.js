const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsYoutube(browser) {
  // const browser = await createBrowser();

  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.youtube.com/", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  // Replace with your login credentials
  const username = "androediot@gmail.com";
  const password = "Helloworld81@";

  // Navigate to the login page
  await page.goto("https://www.youtube.com/", {
    waitUntil: "networkidle0",
  });

  await page.setUserAgent(userAgent.random().toString());

  await page.click("a[aria-label='Sign in']");

  await page.waitForNavigation();

  // Fill in and submit the login form
  await page.type("input[type='email']", username, { delay: 50 });

  await page.click("#identifierNext");

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.type("input[type='password']", password, { delay: 50 });

  await page.click("#passwordNext");

  // await browser.close();
}

module.exports = checkXPathsYoutube;
