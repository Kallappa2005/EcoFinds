const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Electronics', 'Clothing', 'Fashion', 'Furniture', 'Books', 'Sports', 'Home & Garden', 'Toys', 'Other']
  },
  condition: {
    type: String,
    required: [true, 'Please select condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  images: {
    type: [String],
    default: []
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['listed', 'sold', 'removed'],
    default: 'listed'
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
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Format datePosted virtual property
ProductSchema.virtual('datePosted').get(function() {
  return this.createdAt;
});

module.exports = mongoose.model('Product', ProductSchema);
