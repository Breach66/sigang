const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
//const OrderRouter = require("./OrderRouter");
router.use("/user", UserRouter);
//router.use('/order', OrderRouter);

module.exports = router;
