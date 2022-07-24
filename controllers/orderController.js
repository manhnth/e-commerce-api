const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createOrder = (req, res) => {
  res.send('create')
}

const updateOrder = (req, res) => {
  res.send('update')
}
const getAllOrders = (req, res) => {
  res.send('all')
}

const getSingleOrder = (req, res) => {
  res.send('single')
}


const getCurrentUserOrders = (req, res) => {
  res.send('current')
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder
};