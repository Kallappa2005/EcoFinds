const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProduct,
  updateProduct,
  deleteProduct,
  toggleLikeProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

router.put('/:id/like', protect, toggleLikeProduct);

module.exports = router;
