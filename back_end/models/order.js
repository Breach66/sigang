const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Textbook = require("./textbook");
const User = require("./user");
const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  tid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Textbook,
      key: 'tid'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "completed"),
    defaultValue: "pending", //status状态，类型为 ENUM，取值范围为 'pending'（待确认）、'confirmed'（已确认）和 'completed'（已完成），默认值为 'pending'。
  },
});
//用户和课本模型导入进来
Textbook.belongsToMany(User, { through: Order, foreignKey: "uid" });
User.belongsToMany(Textbook, { through: Order, foreignKey: "tid" });
Order.belongsTo(User,{foreignKey: "uid"});
Order.belongsTo(Textbook,{foreignKey: "tid"});
User.hasMany(Order,{foreignKey: "uid"});
Textbook.hasMany(Order,{foreignKey: "tid"});


module.exports = Order;
