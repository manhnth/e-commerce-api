const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please provide product name'],
    maxlength: [100, 'Name can not be more than 100 character'],
  },
  description: {
    type: String,
    require: [true, 'Please provide description'],
    maxlength: [1000, 'Description can not be more than 1000 character']
  },
  price: {
    type: Number,
    require: [true, 'Please provide price'],
    default: 0
  },
  img: {
    type: String,
    default: 'example.jpg'
  },
  category: {
    type: String,
    enum: {
      values: ['office', 'living', 'bedroom', 'dinning'],
      message: '{Value} is not supported'
    }
  },
  company: {
    type: String,
    enum: {
      values: ['sophie', 'bolia', 'elite'],
      message: '{Value} is not supported'
    }
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  inventory: {
    type: Number,
    require: true,
    default: 15
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  averageRatting: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  }
},
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// ProductSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'product',
//   justOne: false
// });

module.exports = mongoose.model('Product', ProductSchema);