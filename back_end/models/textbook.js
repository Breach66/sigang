const { Sequelize } = require('sequelize')
const sequelize=require('../config/database')
const {DataTypes}=require("sequelize");
const Category=require("./category");
//课本回收信息表 textbook
const Textbook= sequelize.define('textbook',{
   tid:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   name:{
    type:DataTypes.STRING(100),
    allowNull:false
   },
   author:{
    type:DataTypes.STRING(100),
    allowNull:false
   },
   cid:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   price: {  
      type: DataTypes.FLOAT, 
      allowNull: false
    },
    img:{
      type:DataTypes.STRING,
    },
    quality: { // 新增字段 quality
      type: DataTypes.STRING(50), // 调整数据类型和长度
      allowNull: false,
      defaultValue: '1' // 你可以设置一个默认值
    },
    

});
Category.hasMany(Textbook,{foreignKey:"cid"});//一对多分类对图书
Textbook.belongsTo(Category,{foreignKey:"cid"});//一对一图书对分类
module.exports=Textbook














