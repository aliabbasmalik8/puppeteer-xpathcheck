const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsLinkedIn(browser) {
  let results = [];
  context.overridePermissions("https://www.linkedin.com/", [
    "geolocation",
    "notifications",
  ]);
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));
  // Replace with your login credentials
  const username = process.env.LINKEDIN_LOGIN_EMAIL;
  const password = process.env.LINKEDIN_LOGIN_PASSWORD;

  const pageXPaths = xPaths["linkedIn"];
  // Navigate to the login page
  await page.goto("https://www.linkedin.com/", {
    waitUntil: "networkidle0",
  });

  await page.waitForTimeout(6000);

  // Fill in and submit the login form
  await page.type("input[name='session_key']", username, { delay: 100 });
  await page.type("input[name='session_password']", password, { delay: 100 });
  await page.click("button[data-id='sign-in-form__submit-btn']");

  await page.waitForSelector("div[class='scaffold-layout__sidebar']");

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

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Comments") {
      await page.click('li-icon[type="comment"]');
      await delay(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );

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

      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Message") {
      await page.click("span[title='Messaging']");
      await delay(4000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );

      results = [...results, ...response];
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.linkedin.com/"
      );
      results = [...results, ...response];
    }
  }
  return results;
}

module.exports = checkXPathsLinkedIn;
