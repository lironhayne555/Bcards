var express = require("express");
const multer = require("multer");
var path = require("path");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const createError = require("http-errors");
const headers = require("./middleware/headers");
const auth = require("./middleware/auth");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use("/public/", express.static("/public"));
app.use(headers);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500).send(err.message);
  //res.render('error');
});

module.exports = app;
