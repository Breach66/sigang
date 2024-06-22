const express=require('express');
const router=express.Router();
const OrderAdminController=require('../../controllers/admin/OrderAdminController')
//admin/order
//查询
//localhost:3000/admin/order

router.get('/',OrderAdminController.findAll);
//更新
router.put('/:id',OrderAdminController.update);
//删除
router.delete('/:id',OrderAdminController.delete);






//导出
module.exports=router