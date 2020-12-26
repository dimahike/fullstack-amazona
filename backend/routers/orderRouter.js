import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orederItems: req.body.orederItems,
        shippingAddess: req.body.shippingAddess,
        paymentMethod: req.body.paymentMethod,
        itensPrice: req.body.itensPrice,
        shippingPrice: req.body.shippingPrice,
        taPrice: req.body.taPrice,
        totalPrice: req.body.totalPrice,
        user: req.iser._id,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: 'New order created', order: createdOrder });
    }
  }),
);

export default orderRouter;
