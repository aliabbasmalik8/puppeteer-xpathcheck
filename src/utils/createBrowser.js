const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");

const createBrowser = async () => {
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  puppeteer.use(StealthPlugin());
  puppeteer.use(require("puppeteer-extra-plugin-anonymize-ua")());
  puppeteer.use(
    require("puppeteer-extra-plugin-user-preferences")({
      userPrefs: {
        webkit: {
          webprefs: {
            default_font_size: 16,
          },
        },
      },
    })
  );

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: executablePath(),
  });

  return browser;
};

module.exports = createBrowser;
