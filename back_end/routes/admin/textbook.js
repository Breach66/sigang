const Textbook = require("../../models/textbook");
const express = require("express");
const Category = require("../../models/category");
const router = express.Router();
router.get("/", async (req, res) => {
  const Textbooks = await Category.findByPk(1, {
    include: Textbook,
  });
  res.json({ code: 1, data: Textbooks });
});

/*router.post("/", async (req, res) => {
  const id = await Textbook.create({
    name: "红楼梦",
    author: "曹雪芹",
    cid: 1,
  });
  if (!id) {
    res.json({ code: 0, msg: "添加失败" });
    return; //添加一条数据
  }
  res.json({ code: 1, msg: "ok" });
});*/

router.post('/', async function (req, res) {
  const { name, author, cid } = req.body //req.body客户端向服务器端发送的数据
  const row = await Textbook.create({name,author,cid})
   res.json(row)

})










//resful
//put更新
//admin/textbook/2
router.put('/:tid', async (req, res) => {
  const { tid } = req.params;
  const textbook = req.body;
 const row= await Textbook.update(textbook, { where : { tid} });
if (!row){
  res.json({code:0,msg:"修改失败"});
  return;
}
res.json({code:1,msg:"ok"});
});
//delete
router.delete('/:tid',async(req,res)=>{
  const{tid}=req.params;
  const row=await Textbook.destroy({where:{tid}});
if(!row){
  res.json({code:0,msg:"删除失败"});
  return;
}
res.json({code:1,msg:"ok"});
});
module.exports = router;
