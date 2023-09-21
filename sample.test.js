const expect_puppeteer = require('expect-puppeteer');
const checkXPathsYoutube = require('./src/controllers/youtubeXpath.controller');
const createBrowser = require('./src/utils/createBrowser');
const result = require('./src/data/result.json')

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
  it('should check "youtube" xpaths on page', async () => {
    expect(await checkXPathsYoutube(browser)).toStrictEqual(result["youtube"]);
  }, 200000);
});
