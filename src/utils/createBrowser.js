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

  const proxies = [
    "http://185.199.229.156:7492",
    "http://185.199.228.220:7300",
    "http://185.199.231.45:8382",
    "http://188.74.210.207:6286",
    "http://188.74.183.10:8279",
    "http://188.74.210.21:6100",
  ];
  // async function launchBrowserWithProxy() {
  //   // extract a random proxy from the list of proxies

  //   console.log("random pro==>", randomProxy);
  //   // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     ignoreHTTPSErrors: true,
  //     args: [`--proxy-server=${randomProxy}`],
  //   });

  //   return browser;
  // }

  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      "--start-maximized",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--proxy-server=${randomProxy}`,
    ],
    executablePath: executablePath(),
  });

  return browser;
};

module.exports = createBrowser;
