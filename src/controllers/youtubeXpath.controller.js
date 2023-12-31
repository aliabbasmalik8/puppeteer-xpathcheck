const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsYoutube(browser) {
  let results = [];
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.youtube.com/", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  const pageXPaths = xPaths["youtube"];

  // Replace with your login credentials
  const username = process.env.YOUTUBE_LOGIN_EMAIL;
  const password = process.env.YOUTUBE_LOGIN_PASSWORD;
  // Navigate to the login page
  await page.goto("https://www.youtube.com/", {
    waitUntil: "networkidle0",
  });

  await page.click("a[aria-label='Sign in']");

  await page.waitForNavigation();

  const data = await page.evaluate(() => {
    return window.innerHeight;
  });

  // Fill in and submit the login form
  await page.type("input[type='email']", username, { delay: 50 });

  let test = await page.evaluate(() => {
    return window.location;
  });

  let wid = await page.evaluate(() => {
    return window.innerWidth;
  });

  let hit = await page.evaluate(() => {
    return window.innerHeight;
  });

  await page.click("#identifierNext");

  await page.waitForNavigation();
  await page.waitForTimeout(4000);

  await page.type("input[type='password']", password, { delay: 50 });

  await page.click("#passwordNext");
  await page.waitForNavigation();
  await page.waitForTimeout(4000);

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.youtube.com/");
    await page.waitForTimeout(4000);
    if (expectedXPaths.tab === "Comments") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 700);
      });
      await page.waitForTimeout(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Comment") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 800);
      });
      await page.waitForTimeout(4000);
      await page.click("#reply-button-end");
      await page.waitForTimeout(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Reply") {
      await page.click("#video-title-link");
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.scrollTo(0, 800);
      });
      await page.waitForTimeout(4000);
      await page.waitForSelector("#reply-button-end");
      await page.click("#reply-button-end");
      await page.waitForTimeout(4000);
      await page.waitForSelector("#more-replies");
      await page.click("#more-replies", { multiple: true });
      await page.waitForTimeout(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
      results = [...results, ...response];
    } else {
      page.waitForTimeout(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.youtube.com/"
      );
      results = [...results, ...response];
    }
  }
  return results;
}

module.exports = checkXPathsYoutube;
