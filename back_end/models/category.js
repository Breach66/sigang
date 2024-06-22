const sequelize=require("../config/database");
const {DataTypes}=require('sequelize')
const Category=  sequelize.define('Category',{
    cid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(10),
        allowNull:false,
    },
    sort:{
        type: DataTypes.INTEGER,
        defaultValue:0
        
    },
});
module.exports=Category;