//两种请求方式 get| post
//resful 风格 get获取|post提交（增加）|put（更新）|delete（删除）
//get
//post
//put
//delete
//url: http://localhost:3000/admin/textbook
const multer=require('multer');
const upload=multer({dest:'public/uploads/'});
const TextbookAdminController=require('../../controllers/admin/TextbookAdminController')
const express = require('express')
const router = express.Router();
router.get('/',TextbookAdminController.findAll)
router.post('/',upload.single('file'),TextbookAdminController.create)
//url: http://localhost:3000/admin/textbook/1
router.put('/:id',TextbookAdminController.update)
router.delete('/:id',TextbookAdminController.delete)
module.exports = router;



