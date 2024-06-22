const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("usertab", "root", "12345678", {
  host: "127.0.0.1",
  dialect: "mysql",
});
module.exports = sequelize;
