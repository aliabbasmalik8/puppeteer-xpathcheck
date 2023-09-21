const expect_puppeteer = require("expect-puppeteer");
const checkXPathsYoutube = require("./src/controllers/youtubeXpath.controller");
const createBrowser = require("./src/utils/createBrowser");

describe("Google", () => {
  let browser;
  beforeAll(async () => {
    browser = await createBrowser();
    //await page.goto("https://google.com")
  });

  afterAll(async () => {
    await browser?.close();
  });

  it('should display "google" text on page', async () => {
    expect(await checkXPathsYoutube(browser)).toBe("Hello");
  }, 200000);
});
