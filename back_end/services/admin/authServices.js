const User=require('../../models/user')
const AuthServices={
//注册
 async create(params){
   const row= await User.create(params);
return row;
},
async check(username){
  const res=await User.findOne({
  where:{
    username,
  },
});
return res;
},
//登录
async login(params){
  const res=await User.findOne({
    where:{
      username:params.username,
    }
  })
if(res){
  if(res.password===params.password){
    return res;
  }else{
    return false;
  }
}


}

};





module.exports=AuthServices;