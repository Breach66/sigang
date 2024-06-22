const express=require('express');
const router=express.Router();
const AuthAdminController=require('../../controllers/admin/AuthAdminController');
//引入控制器
//CRUD模块


//注册模块
//router.post('/register',控制器.c)
router.post('/register',AuthAdminController.register)
/* 
url: /admin/auth/register
method: post

*/

//登录模块
/* 
url: /admin/auth/login
method: post

*/
router.post('/login',AuthAdminController.login)



module.exports=router;