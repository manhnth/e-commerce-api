const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Product = require('../models/Product');
const { checkPermissions } = require('../utils');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createOrder = async (req, res) => {
  // CREATE ORDER AND CREATE PAYMENT INTENT
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee');
  }
  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.BadRequestError(`No product with id: ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  total = tax + shippingFee + subtotal;

  // create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });



  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ order, clientSecret: paymentIntent.client_secret })
}

const updateOrder = async (req, res) => {
  const { orderID } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderID });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderID}`);
  }
  checkPermissions(req.user, order.user);
  order.status = 'paid';
  order.paymentIntentId = paymentIntentId;
  await order.save();

  res.status(StatusCodes.Ok).json({ order });
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

const getSingleOrder = async (req, res) => {
  const { orderID } = req.params;
  const order = await Order.findOne({ _id: orderID });
  if (!orderID) {
    throw new CustomError.NotFoundError(`No order with id: ${orderID} `);
  }
  checkPermissions(req.user, order.user);

  res.status(StatusCodes).json({ order });
}


const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes).json({ orders, count: order.length })
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder
};