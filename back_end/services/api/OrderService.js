const Order = require("../../models/order");
const Textbook = require("../../models/textbook");
/*const OrderService = {
  async create({ id, uid }) {
    return await Order.create({ tid: id, uid });
  },
};*/
const OrderService = {
  async create({ id, uid }) {
    // 查询课本信息
    const textbook = await Textbook.findByPk(id);

    // 设置 quantity 和 total_price
    const quantity = parseInt(textbook.quality);
    const total_price = parseFloat(textbook.price * quantity);

    // 创建订单
    return await Order.create({
      tid: id,
      uid,
      quantity: quantity,
      total_price: total_price,
    });
  },
};
module.exports = OrderService;
