const asyncHandler = require('../middleware/asyncHandler');
const productService = require('../services/productService');

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Build query based on request parameters
  const queryParams = {};
  
  // Filter by category
  if (req.query.category && req.query.category !== 'All') {
    queryParams.category = req.query.category;
  }
  
  // Filter by condition
  if (req.query.condition && req.query.condition !== 'All') {
    queryParams.condition = req.query.condition;
  }
  
  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    queryParams.price = {};
    if (req.query.minPrice) queryParams.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) queryParams.price.$lte = Number(req.query.maxPrice);
  }
  
  // Search by text
  if (req.query.search) {
    queryParams.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const products = await productService.getAllProducts(queryParams);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.user.id);

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.deleteProduct(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get products by user
// @route   GET /api/v1/products/user/me
// @access  Private
exports.getUserProducts = asyncHandler(async (req, res, next) => {
  const products = await productService.getProductsByUser(req.user.id);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Like/unlike a product
// @route   PUT /api/v1/products/:id/like
// @access  Private
exports.toggleLikeProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.toggleLikeProduct(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: product
  });
});
