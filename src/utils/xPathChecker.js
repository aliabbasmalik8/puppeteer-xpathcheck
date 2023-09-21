async function xPathChecker(page, xpathsToCheck, website) {
  var flag = true;
  for (const expectedXPaths of xpathsToCheck) {
    if (expectedXPaths === "//*[text()='Suggested job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        return `XPath for ${expectedXPaths} ${website} has changed.`;
        //console.log(await mailSender(expectedXPaths, website))
      } else {
        flag = false;
        return `XPath ${expectedXPaths} for ${website} is still the same.`
      
      }
    } else if (expectedXPaths === "//h2[text()='Recent job searches']/../..") {
      //Linkedin
      const el = await page.$x(expectedXPaths);
      if (el.length !== 0 && flag) {
        return `XPath ${expectedXPaths} for ${website} has changed.`
        //console.log(await mailSender(expectedXPaths, website))
      } else {
        flag = false;
       return   `XPath ${expectedXPaths} for ${website} is still the same.`
        
      }
    } else {
      const element = await page.$x(expectedXPaths);
      if (element.length === 0) {
      return `XPath ${expectedXPaths} for ${website} has changed.`
        //console.log(await mailSender(expectedXPaths, website))
      } else {
     
        return `XPath ${expectedXPaths} for ${website} is still the same.`
      }
    }
  }
}

module.exports = xPathChecker;
