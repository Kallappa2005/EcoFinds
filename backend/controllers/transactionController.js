const asyncHandler = require('../middleware/asyncHandler');
const transactionService = require('../services/transactionService');

// @desc    Create a new transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.createTransaction = asyncHandler(async (req, res, next) => {
  // Add buyer from logged in user
  req.body.buyer = req.user.id;
  
  const transaction = await transactionService.createTransaction(req.body);

  res.status(201).json({
    success: true,
    data: transaction
  });
});

// @desc    Get user's purchases
// @route   GET /api/v1/transactions/purchases
// @access  Private
exports.getUserPurchases = asyncHandler(async (req, res, next) => {
  const purchases = await transactionService.getUserPurchases(req.user.id);

  res.status(200).json({
    success: true,
    count: purchases.length,
    data: purchases
  });
});

// @desc    Get user's sales
// @route   GET /api/v1/transactions/sales
// @access  Private
exports.getUserSales = asyncHandler(async (req, res, next) => {
  const sales = await transactionService.getUserSales(req.user.id);

  res.status(200).json({
    success: true,
    count: sales.length,
    data: sales
  });
});

// @desc    Update transaction status
// @route   PUT /api/v1/transactions/:id/status
// @access  Private
exports.updateTransactionStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a status'
    });
  }
  
  const transaction = await transactionService.updateTransactionStatus(
    req.params.id,
    status,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: transaction
  });
});
