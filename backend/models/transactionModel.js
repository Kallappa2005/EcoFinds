const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  datePurchased: {
    type: Date,
    default: Date.now
  },
  deliveryOption: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true
  },
  deliveryAddress: {
    type: String
  },
  status: {
    type: String,
    enum: ['purchased', 'shipped', 'delivered', 'completed', 'canceled'],
    default: 'purchased'
  },
  ecoImpact: {
    co2Saved: {
      type: Number,
      default: 0
    },
    waterSaved: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
