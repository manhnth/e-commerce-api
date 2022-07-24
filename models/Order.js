const mongoose = require('mongoose');

const singleOrderItemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  amount: { type: Number, require: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    require: true
  }
});

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    require: true
  },
  shippingFee: {
    type: Number,
    require: true
  },
  subTotal: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  orderItems: [singleOrderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientSecret: {
    type: String,
    require: true
  },
  paymentIntentId: {
    type: String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema)