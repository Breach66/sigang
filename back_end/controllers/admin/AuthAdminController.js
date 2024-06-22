const AuthAdminService=require('../../services/admin/AuthAdminService')
const jwt=require('jsonwebtoken')
const {secret,expiresIn}=require('../../config/config')
const AuthAdminController={
    //c
    //注册        
    register:async function(req,res){
      if(!req.body.username&&req.body.password){
        res.json({code:-1,msg:"请输入用户名和密码"})
      }
     const result=await AuthAdminService.create(req.body);
    res.json(result);
   // res.json(req.body);
    /*if(req.body.username==="admin"&&req.body.password==="123456"){
      res.json({code:1,msg:"注册成功"});
    }*/
 },
  login:async(req,res)=>{
   const{username,password}=req.body;
   //console.log(req.body)
   //验证用户名和密码
  //const confirmUsername='admin'
  // const confirmPassword='123456'
   const user=await AuthAdminService.query(username);
     console.log(user.username,user.password,user.role) ;
     //对用户身份进行验证
     if(user&&!(user.role=='admin')){
      res.json({code:-1,msg:'没有权限'});
     }
     if(user&&!(user.password===password)){
      res.json({code:-1,msg:'密码错误'});
     }


   /*if(username!==user.username|| password !==user.password){
       res.json({code:-1,msg:"用户名或密码错误"})
   }*/
   
   const token=jwt.sign({username,id:user.uid},secret,{expiresIn});
   res.json({code:1,msg:"登录成功",token});
  },






    //R
};
module.exports=AuthAdminController;