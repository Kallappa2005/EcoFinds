const express = require('express');
const { 
  createTransaction,
  getUserPurchases,
  getUserSales,
  updateTransactionStatus
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.route('/')
  .post(createTransaction);

router.get('/purchases', getUserPurchases);
router.get('/sales', getUserSales);
router.put('/:id/status', updateTransactionStatus);

module.exports = router;
