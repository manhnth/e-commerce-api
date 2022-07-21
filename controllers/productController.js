const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary');
const fs = require('fs')

const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const uploadProductImg = async (req, res) => {
  console.log(req.files);
  const result = await cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'e-commerce-products'
    },
    function (error, result) { console.log(result, error) }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({ img: { src: result.secure_url } })
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new CustomError.NotFoundError('not found');
  }

  res.status(StatusCodes.OK).json({ product })
};

const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findByIdAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true
  });

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! product removed!' });
};

module.exports = {
  createProduct,
  uploadProductImg,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
}