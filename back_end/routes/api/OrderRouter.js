//post
const express = require('express');
const router = express.Router();
const OrderController=require('../../controllers/api/OrderController')
router.post('/:id',OrderController.create);
module.exports = router;