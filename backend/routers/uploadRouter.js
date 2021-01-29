import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import { isAuth, isSellerOrAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage }).single('image');

const uploadRouter = express.Router();

uploadRouter.post('/', upload, (req, res) => {
  res.send(`/${req.file.path}`);
});

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'full-stack--amazona-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 }).single('image');
uploadRouter.post('/s3', isAuth, isSellerOrAdmin, uploadS3, (req, res) => {
  res.send(req.file.location);
});

uploadRouter.delete(
  '/s3/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      let splitedUrl = product.image.split('/');
      let length = splitedUrl.length;

      const nameFile = splitedUrl[length - 1];

      await s3
        .deleteObject({
          Bucket: 'full-stack--amazona-bucket',
          Key: nameFile,
        })
        .promise();

      res.send({ message: 'Image deleted', image: nameFile });
    } else {
      res.status(404).send({ message: 'Product did not find.' });
    }
  }),
);

export default uploadRouter;

// import express from 'express';
// import multer from 'multer';

// import { isAuth } from '../utils.js';

// const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// export default uploadRouter;
