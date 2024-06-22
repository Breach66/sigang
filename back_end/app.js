var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/admin/users");
//var textbookRouter=require('./routes/admin/textbook');
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//设置静态资源路径
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin/users", usersRouter);
//app.use("/admin/textbook",textbookRouter);

module.exports = app;
