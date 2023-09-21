const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsYoutube(browser) {
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.youtube.com/", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();
  const pageXPaths = xPaths["youtube"];
  // Replace with your login credentials
  const username = "androediot@gmail.com";
  const password = "Helloworld81@";

  // Navigate to the login page
  await page.goto("https://www.youtube.com/", {
    waitUntil: "networkidle0",
  });

  await page.click("a[aria-label='Sign in']");

  await page.waitForNavigation();

  // Fill in and submit the login form
  await page.type("input[type='email']", username, { delay: 50 });

  await page.click("#identifierNext");

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.type("input[type='password']", password, { delay: 50 });

  await page.click("#passwordNext");
  await page.waitForNavigation();
  await page.waitForTimeout(2000);

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.youtube.com/");
    if (expectedXPaths.tab === "Comments") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 700);
      });
      await page.waitForTimeout(2000);
      //await page.click('svg[class="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj x1qx5ct2 xw4jnvo"]')
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
      //await page.click('svg[class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"]')
    } else if (expectedXPaths.tab === "Comment") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 700);
      });
      await page.waitForTimeout(2000);
      await page.click("#reply-button-end");
      await page.waitForTimeout(4000);
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
    } else if (expectedXPaths.tab === "Reply") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 700);
      });
      await page.waitForTimeout(2000);
      await page.click("#reply-button-end");
      await page.waitForTimeout(1000);
      await page.click("#more-replies", { multiple: true });
      await page.waitForTimeout(1000);
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
    } else {
      page.waitForTimeout(2000);
      await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
    }
  }
}

module.exports = checkXPathsYoutube;
