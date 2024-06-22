const OrderService = require("../../services/api/OrderService");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
/*const OrderController = {
  async create(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;

    const user = jwt.verify(token, secret);
    
    await OrderService.create({ id: parseInt(id), uid: +user.uid });
    res.send(id);
  },
};*/
const OrderController = {
  async create(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
      const user = jwt.verify(token, secret);

      // 调用 OrderService 创建订单
      await OrderService.create({ id: parseInt(id), uid: +user.uid });

      res.status(201).send({ message: "Order created successfully", id });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to create order", details: error.message });
    }
  },
};
module.exports = OrderController;
