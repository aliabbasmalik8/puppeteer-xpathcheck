const createError = require("http-errors");
const express = require("express");
const checkXPathsLinkedIn = require("./src/controllers/linkedinXpath.controller");
const checkXPathsInstagram = require("./src/controllers/instagramXpath.controller");
const checkXPathsYoutube = require("./src/controllers/youtubeXpath.controller");
const checkXPathsTikTok = require("./src/controllers/tiktokXpath.controller");
const checkXPathsFB = require("./src/controllers/facebookXpath.controller");
const checkXPathsTwitter = require("./src/controllers/twitterXpath.controller");
const createBrowser = require("./src/utils/createBrowser");

const app = express();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const runAll = async () => {
  const browser = await createBrowser();
  // await checkXPathsLinkedIn(browser);
  // await checkXPathsInstagram(browser);
  await checkXPathsYoutube(browser);
  // await checkXPathsTikTok(browser);
  // await checkXPathsFB(browser);
  // await checkXPathsTwitter(browser);
  await browser.close();
};

runAll();

module.exports = app;
