const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsTikTok(browser) {
  // const browser = await createBrowser();

  let results = [];
  const context = browser.defaultBrowserContext();

  context.overridePermissions("https://www.tiktok.com", [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  // Replace with your login credentials
  const username = "ali@truenation.ai";
  const password = "Helloworld91@";
  const pageXPaths = xPaths["tiktok"];

  // Navigate to the login page
  await page.goto("https://www.tiktok.com/login/phone-or-email/email", {
    waitUntil: "networkidle0",
  });

  await page.waitForTimeout(6000);

  console.debug("HERE ====> 1");

  // await page.setUserAgent(userAgent.random().toString());

  // Fill in and submit the login form
  await page.type("input[name='username']", username, { delay: 50 });

  await page.type("input[type='password']", password, { delay: 50 });

  await page.click("button[type='submit']");

  console.debug("HERE ====> 2");

  await page.waitForTimeout(8000);
  // await page.screenshot({ path: "tiktok.png" });

  for (const expectedXPaths of pageXPaths) {
    if (expectedXPaths.tab === "Comments") {
      const [comments] = await page.$x('//div[@data-e2e="feed-video"]');

      if (comments) await comments.click();

      await page.waitForTimeout(3000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.tiktok.com/"
      );
      console.debug("HERE ====> 3", response);

      results = [...results, ...response];
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.tiktok.com/"
      );
      console.debug("HERE ====> 3", response);

      results = [...results, ...response];
    }
  }
  return results;
  // await browser.close();
}

module.exports = checkXPathsTikTok;
