async function xPathChecker(page, xpathsToCheck, website) {
  var flag = true;
  let result = [];
  for (const expectedXPaths of xpathsToCheck) {
    if (expectedXPaths === "//*[text()='Suggested job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        result.push(`XPath for ${expectedXPaths} ${website} has changed.`);
      } else {
        flag = false;
        result.push(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    } else if (expectedXPaths === "//h2[text()='Recent job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        result.push(`XPath for ${expectedXPaths} ${website} has changed.`);
      } else {
        flag = false;
        result.push(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    } else {
      const element = await page.$x(expectedXPaths);
      if (element.length === 0) {
        console.log(`XPath ${expectedXPaths} for ${website} has changed.`);

        result.push(`XPath for ${expectedXPaths} ${website} has changed.`);
      } else {
        console.log(`XPath ${expectedXPaths} for ${website} is still the same`);
        result.push(
          `XPath ${expectedXPaths} for ${website} is still the same.`
        );
      }
    }
  }

  return result;
}

module.exports = xPathChecker;