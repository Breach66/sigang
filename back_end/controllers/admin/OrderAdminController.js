const OrderAdminService = require("../../services/admin/OrderAdminService");

const OrderAdminController = {
  //findAll
  async findAll(req, res) {
    const rows = await OrderAdminService.findAll();
    res.json(rows);
  },
  //findOne
  //update
  async update(req, res) {
    const { id } = req.params;
    console.log(id);
    const result = await OrderAdminService.update(id);
    if (result === 0) {
      return res.json({ msg: "更新失败", code: -1 });
    }
    res.json({ msg: "更新成功", code: 1 });
  },
  //delete
  async delete(req, res) {
    const { id } = req.params;
    const result = await OrderAdminService.delete(id);
    if (!result) {
      res.json({ msg: "删除失败", code: -1 });
    }
    res.json({ msg: "删除成功", code: 1 });
  },
};
module.exports = OrderAdminController;
