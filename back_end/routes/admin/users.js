var express = require("express");
var router = express.Router();
const User = require("../../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  //在sql插入一条用户信息     User.create({ username: '张三', password: '123456', role: 'admin' })
  const rows = await User.findAll();
  //   console.log(rows);
  res.json(rows);
});
router.post("/", async function (req, res) {
  const { username, password, role } = req.body; //req.body客户端向服务器端发送的数据
  const row = await User.create({ username, password, role });
  res.json(row);
});
module.exports = router;
