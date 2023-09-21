async function xPathChecker(page, xpathsToCheck, website) {
  var flag = true;
  for (const expectedXPaths of xpathsToCheck) {
    if (expectedXPaths === "//*[text()='Suggested job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        console.log(`XPath for ${expectedXPaths} ${website} has changed.`);
        //console.log(await mailSender(expectedXPaths, website))
      } else {
        flag = false;
        console.log(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    } else if (expectedXPaths === "//h2[text()='Recent job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        console.log(`XPath ${expectedXPaths} for ${website} has changed.`);
        //console.log(await mailSender(expectedXPaths, website))
      } else {
        flag = false;
        console.log(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    } else {
      const element = await page.$x(expectedXPaths);
      await page.waitForTimeout(1000);
      if (element.length === 0) {
        console.log(`XPath ${expectedXPaths} for ${website} has changed.`);
        //console.log(await mailSender(expectedXPaths, website))
      } else {
        console.log(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    }
  }
}

module.exports = xPathChecker;
