const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsLinkedIn(browser) {
  let results = [];
  // const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.linkedin.com/", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));
  // Replace with your login credentials
  const username = "ali@truenation.ai";
  const password = "Helloworld91@";
  const pageXPaths = xPaths["linkedIn"];
  // Navigate to the login page
  await page.goto("https://www.linkedin.com/", {
    waitUntil: "networkidle0",
  });

  console.debug("HERE===1");

  // await page.waitForNavigation();

  await page.waitForTimeout(6000);

  console.debug("HERE===2");

  // Fill in and submit the login form
  await page.type("input[name='session_key']", username, { delay: 100 });
  await page.type("input[name='session_password']", password, { delay: 100 });
  await page.click("button[data-id='sign-in-form__submit-btn']");
  console.log("====>> hello world122");

  await page.waitForSelector("div[class='scaffold-layout__sidebar']");

  console.debug("HERE===3");

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.linkedin.com/feed");
    if (expectedXPaths.tab === "Jobs") {
      await page.click("span[title='Jobs']");
      await delay(4000);
      await page.waitForSelector("nav[class='jobs-home-scalable-nav']");
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      await page.click("span[title='Home']");
      console.debug("HERE===4", response);

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Comments") {
      await page.click('li-icon[type="comment"]');
      await delay(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      console.debug("HERE===5", response);

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Reply") {
      await page.click('li-icon[type="comment"]');
      await delay(4000);
      await page.click(
        "button[class='artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view comments-comment-social-bar__reply-action-button comments-comment-social-bar__action-button button reply']"
      );
      await delay(4000);
      await page.type('div[aria-placeholder="Add a reply…"]', "Reply", {
        delay: 100,
      });
      await delay(2000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      console.debug("HERE===6", response);

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Message") {
      await page.click("span[title='Messaging']");
      await delay(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      console.debug("HERE===7", response);

      results = [...results, ...response];
      //await page.click('svg[class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"]')
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      results = [...results, ...response];
      console.debug("HERE===8", response);
    }
  }
  return results;
}

module.exports = checkXPathsLinkedIn;
