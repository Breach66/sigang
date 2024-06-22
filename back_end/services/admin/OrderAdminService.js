const Order=require('../../models/order')
const User=require('../../models/user')
const Textbook=require('../../models/textbook')


const OrderAdminService={
  async findAll(){
  return await  Order.findAll({
    include:[
     {model:User,attributes:['username']},
     {model:Textbook,attributes:['name','author']},

    ],
  });
    },
    async update(id){
        return await Order.update({status:'confirmed'}, {where:{id}});
    },
    async delete(id){
        return await Order.destroy({where:{id}});

    },
};
module.exports=OrderAdminService