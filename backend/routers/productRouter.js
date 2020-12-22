import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { data } from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('work 1');
    const product = await Product.findById(req.params.id);
    console.log('work 2');
    if (product) {
      console.log('work 3');
      res.send(product);
      console.log('work 4');
    } else {
      console.log('work 5');
      res.status(404).send({ message: 'Product Not Found' });
    }
  }),
);

export default productRouter;
