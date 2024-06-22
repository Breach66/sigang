const TextbookAdminService = require("../../services/admin/TextbookAdminService");
const TextbookAdminController = {
  create: (req, res) => {
    console.log(req.file);
    const file = req.file ? req.file : "";
    // console.log(file.path.substr(6));
    req.body.img = file.path.substr(6);
    const { cid, name } = req.body;
    TextbookAdminService.create(req.body);
    res.json(req.body);
  },

  findAll: async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    console.log(page, pageSize);
    const offset = (page - 1) * pageSize; //页码
    const limit = parseInt(pageSize); //条数
    const rows = await TextbookAdminService.findAll({ offset, limit });
    res.json(rows);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, author, quality, price } = req.body;
    const result = await TextbookAdminService.update({
      id,
      name,
      author,
      quality,
      price,
    });
    if (!result) {
      res.json({ code: -1, msg: "更新失败" });
    }
    res.json({ code: 1, msg: "更新成功" });
  },
  /*update:async(req,res)=>{
        const{id}=req.params;
        const{name,author}=req.body;
   const result=   await TextbookAdminService.update({id,name,author})
    if(!result){
       res.json({code:-1,msg:'更新失败'}) 
    }
    res.json({code:1,msg:'更新成功'});
},  */
  delete: async (req, res) => {
    const { id } = req.params;
    const result = await TextbookAdminService.delete(id);
    if (!result) {
      res.json({ code: -1, msg: "删除失败" });
    }
    res.json({ code: 1, msg: "删除成功" });
  },
};
//控制层 只是做业务的处理
//具体增删改查 交给service层
module.exports = TextbookAdminController;
