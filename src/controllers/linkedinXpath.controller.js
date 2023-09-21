const userAgent = require("user-agents");
const createBrowser = require("../utils/createBrowser");
const xPathChecker = require("../utils/xPathChecker");
const xPaths = require("../data/xPaths.json");

async function checkXPathsLinkedIn(browser) {
  // const browser = await createBrowser();
  const page = await browser.newPage();

  // Replace with your login credentials
  const username = "ali@truenation.ai";
  const password = "Helloworld91@";

  // Navigate to the login page
  await page.goto("https://www.linkedin.com/home");
  await page.waitForTimeout(3000);

  // await page.setUserAgent(userAgent.random().toString());

  // Fill in and submit the login form
  await page.type("input[name='session_key']", username, { delay: 100 });
  await page.type("input[name='session_password']", password, { delay: 100 });
  await page.click("button[data-id='sign-in-form__submit-btn']");

  // await browser.close();
}

module.exports = checkXPathsLinkedIn;
