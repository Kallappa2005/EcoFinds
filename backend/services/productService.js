const Product = require('../models/productModel');

// Calculate eco impact
const calculateEcoImpact = (product) => {
  const impact = {
    co2Saved: 0,
    waterSaved: 0
  };

  // Base impact by category
  const categoryImpact = {
    'Electronics': { co2: 100, water: 1000 },
    'Clothing': { co2: 25, water: 2500 },
    'Fashion': { co2: 25, water: 2500 },
    'Furniture': { co2: 60, water: 500 },
    'Books': { co2: 10, water: 300 },
    'Sports': { co2: 30, water: 400 },
    'Home & Garden': { co2: 20, water: 600 },
    'Toys': { co2: 15, water: 250 },
    'Other': { co2: 15, water: 350 }
  };

  // Calculate based on category and price (as a rough estimate of size/impact)
  const category = product.category;
  if (categoryImpact[category]) {
    impact.co2Saved = categoryImpact[category].co2;
    impact.waterSaved = categoryImpact[category].water;
    
    // Adjust based on price as proxy for size/complexity
    const priceAdjustment = Math.sqrt(product.price / 1000);
    impact.co2Saved *= priceAdjustment;
    impact.waterSaved *= priceAdjustment;
  }

  return {
    co2Saved: Math.round(impact.co2Saved),
    waterSaved: Math.round(impact.waterSaved)
  };
};

// Create product
const createProduct = async (productData, userId) => {
  // Add seller to product
  productData.seller = userId;
  
  // Calculate eco impact
  productData.ecoImpact = calculateEcoImpact(productData);
  
  return await Product.create(productData);
};

// Get all products
const getAllProducts = async (query = {}) => {
  return await Product
    .find({ status: 'listed', ...query })
    .populate({
      path: 'seller',
      select: 'name verified'
    });
};

// Get product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id).populate({
    path: 'seller',
    select: 'name verified rating'
  });
  
  if (product) {
    // Increment views
    product.views += 1;
    await product.save();
  }
  
  return product;
};

// Update product
const updateProduct = async (id, updateData, userId) => {
  let product = await Product.findById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Make sure user is product owner
  if (product.seller.toString() !== userId.toString()) {
    throw new Error('Not authorized to update this product');
  }
  
  // Update product
  product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  
  return product;
};

// Delete product
const deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Make sure user is product owner
  if (product.seller.toString() !== userId.toString()) {
    throw new Error('Not authorized to delete this product');
  }
  
  await Product.findByIdAndDelete(id);
  
  return { success: true };
};

// Like/unlike product
const toggleLikeProduct = async (productId, userId) => {
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Check if user already liked this product
  const likedIndex = product.likedBy.indexOf(userId);
  
  if (likedIndex === -1) {
    // User hasn't liked it, so add like
    product.likes += 1;
    product.likedBy.push(userId);
  } else {
    // User already liked it, so remove like
    product.likes -= 1;
    product.likedBy.splice(likedIndex, 1);
  }
  
  await product.save();
  return product;
};

// Get products by user
const getProductsByUser = async (userId) => {
  return await Product.find({ seller: userId })
    .populate('seller', 'name email verified')
    .sort({ createdAt: -1 });
};

module.exports = {
  calculateEcoImpact,
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByUser,
  updateProduct,
  deleteProduct,
  toggleLikeProduct
};
