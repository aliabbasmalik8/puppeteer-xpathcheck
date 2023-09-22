const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsInstagram(browser) {
  let results = [];
  const page = await browser.newPage();

  await page.authenticate({ username: "cmbplwjb", password: "ega3yo93e10a" });

  const username = "monic16032@nickolis.com";
  const password = "Helloworld91@";
  const pageXPaths = xPaths["instagram"];

  // Navigate to the login page
  await page.goto("https://www.instagram.com/accounts/login", {
    waitUntil: "networkidle0",
  });

  // Fill in and submit the login form
  await page.type("input[name='username']", username, { delay: 50 });
  await page.type("input[name='password']", password, { delay: 50 });
  await page.click("button[type='submit']");
  await page.waitForNavigation();
  await page.click("button[type='button']");

  await page.waitForTimeout(3000);

  const notNowButton = await page.$x("//button[text()='Not Now']");

  if (notNowButton.length > 0) await notNowButton[0].click();

  for (const expectedXPaths of pageXPaths) {
    await page.goto("https://www.instagram.com", { waitUntil: "networkidle0" });

    if (expectedXPaths.tab === "Comments") {
      const [comments] = await page.$x("//*[starts-with(text(), 'View all')]");

      if (comments) {
        await comments.click();
      }
      await page.waitForTimeout(3000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.instagram.com"
      );
      results = [...results, ...response];
    } else if (expectedXPaths.tab === "Message") {
      const [messages] = await page.$x("//span[contains(., 'Messages')]");

      if (messages) {
        await messages.click();
      }
      await page.waitForTimeout(3000);
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.instagram.com"
      );
      results = [...results, ...response];
    } else {
      const response = await xPathChecker(
        page,
        expectedXPaths.xPaths,
        "https://www.instagram.com"
      );
      results = [...results, ...response];
    }
  }
  return results;
}

module.exports = checkXPathsInstagram;
