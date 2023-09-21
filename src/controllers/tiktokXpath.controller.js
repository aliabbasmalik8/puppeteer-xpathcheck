const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsTikTok(browser) {
  // const browser = await createBrowser();

  const context = browser.defaultBrowserContext();

  context.overridePermissions("https://www.tiktok.com", [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  // Replace with your login credentials
  const username = "ali@truenation.ai";
  const password = "Helloworld91@";
  const pageXPaths = xPaths["tiktok"];

  // Navigate to the login page
  await page.goto("https://www.tiktok.com/login/phone-or-email/email", {
    waitUntil: "networkidle0",
  });

  // await page.setUserAgent(userAgent.random().toString());

  // Fill in and submit the login form
  await page.type("input[name='username']", username, { delay: 50 });

  await page.type("input[type='password']", password, { delay: 50 });

  await page.click("button[type='submit']");

  await page.waitForNavigation();

  for (const expectedXPaths of pageXPaths) {
    if (expectedXPaths.tab === "Comments") {
      const [comments] = await page.$x('//div[@data-e2e="feed-video"]');

      if (comments) await comments.click();

      await page.waitForTimeout(3000);
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.tiktok.com/"
      );
    } else {
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.tiktok.com/"
      );
    }
  }

  // await browser.close();
}

module.exports = checkXPathsTikTok;
