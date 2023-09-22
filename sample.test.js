const expect_puppeteer = require("expect-puppeteer");
const checkXPathsYoutube = require("./src/controllers/youtubeXpath.controller");
const checkXPathsInstagram = require("./src/controllers/instagramXpath.controller");
const checkXPathsLinkedin = require("./src/controllers/linkedinXpath.controller");
const checkXPathsTiktok = require("./src/controllers/tiktokXpath.controller");
const checkXPathsTwitter = require("./src/controllers/twitterXpath.controller");
const checkXPathsFacebook = require("./src/controllers/facebookXpath.controller");
const createBrowser = require("./src/utils/createBrowser");
const result = require("./src/data/result.json");

describe("Xpaths check", () => {
  let browser;
  beforeAll(async () => {
    browser = await createBrowser();
  });

  afterAll(async () => {
    await browser?.close();
  });

  // it('should check "YOUTUBE" xpaths on page', async () => {
  //   expect(await checkXPathsYoutube(browser)).toStrictEqual(result["youtube"]);
  // }, 200000);

  // it('should check "INSTAGRAM" xpaths on page', async () => {
  //   expect(await checkXPathsInstagram(browser)).toStrictEqual(
  //     result["instagram"]
  //   );
  // }, 200000);

  // it('should check "TWITTER" xpaths on page', async () => {
  //   expect(await checkXPathsTwitter(browser)).toStrictEqual(result["twitter"]);
  // }, 200000);

  // it('should check "FACEBOOK" xpaths on page', async () => {
  //   expect(await checkXPathsFacebook(browser)).toStrictEqual(
  //     result["facebook"]
  //   );
  // }, 200000);

  // it('should check "LINKEDIN" xpaths on page', async () => {
  //   expect(await checkXPathsLinkedin(browser)).toStrictEqual(
  //     result["linkedIn"]
  //   );
  // }, 200000);

  it('should check "TIKTOK" xpaths on page', async () => {
    expect(await checkXPathsTiktok(browser)).toStrictEqual(result["tiktok"]);
  }, 200000);
});
