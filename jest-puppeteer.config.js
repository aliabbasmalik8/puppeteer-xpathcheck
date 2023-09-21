module.exports = {
  launch: { 
    headless: false, 
    slowMo: 30, 
    headless: process.env.CI === "true",
    executablePath: "chrome.exe"
  } 
}