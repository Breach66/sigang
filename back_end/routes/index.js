var express = require("express");
var router = express.Router();
const adminRouter = require("../routes/admin/index");
const apiRouter = require("./api/index");
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
//localhost:3000/admin
router.use("/admin", adminRouter);
//localhost:3000/api
router.use("/api", apiRouter);

module.exports = router;
