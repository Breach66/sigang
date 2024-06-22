const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const{secret}=require('../../config/config')
//const User=require('../../models/user');
const AuthServices=require('../../services/admin/authServices');
router.post('/',async(req,res)=>{
  const{username,password,role}=req.body;
 //const row=await User.create({username,password,role})
 
const row= await AuthServices.create(req.body);
res.json(row);//注册成功返回数据
});
//判断一个用户是否存在
router.get('/',async(req,res)=>{
  const {username}=req.query;
  console.log(username);
 const result=await AuthServices.check(username);
if(result){
 
  res.json({ code:1, result});
  
}else{
  res.json({ code:0, result: 'User does not exist'});
}

});
//登录接口
router.post('/login',async(req,res)=>{

const result=await AuthServices.login(req.body)

if(result){
  const token= jwt.sign({username:result.username,uid:result.uid},'123456',{expiresIn:'1h'})
  res.json({ code:1, token});
}else{
  res.json({ code:0, result});
}
})




module.exports=router;