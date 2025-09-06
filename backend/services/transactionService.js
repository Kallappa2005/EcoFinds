const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const { updateEcoStats } = require('./userService');

// Create a new transaction
const createTransaction = async (transactionData) => {
  // Get product details
  const product = await Product.findById(transactionData.product);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (product.status !== 'listed') {
    throw new Error('This product is no longer available');
  }
  
  // Create transaction
  const transaction = await Transaction.create({
    ...transactionData,
    price: product.price,
    seller: product.seller,
    ecoImpact: product.ecoImpact
  });
  
  // Update product status to sold
  product.status = 'sold';
  await product.save();
  
  // Update buyer's eco stats
  await updateEcoStats(transactionData.buyer, {
    totalCO2Saved: product.ecoImpact.co2Saved,
    totalWaterSaved: product.ecoImpact.waterSaved,
    totalItemsBought: 1,
    ecoPoints: 30
  });
  
  // Update seller's eco stats
  await updateEcoStats(product.seller, {
    totalItemsSold: 1,
    ecoPoints: 50
  });
  
  return transaction;
};

// Get user's purchased items
const getUserPurchases = async (userId) => {
  return await Transaction.find({ buyer: userId })
    .populate({
      path: 'product',
      select: 'title description price images category condition ecoImpact'
    })
    .populate({
      path: 'seller',
      select: 'name verified'
    });
};

// Get user's sold items
const getUserSales = async (userId) => {
  return await Transaction.find({ seller: userId })
    .populate({
      path: 'product',
      select: 'title description price images category condition ecoImpact'
    })
    .populate({
      path: 'buyer',
      select: 'name verified'
    });
};

// Update transaction status
const updateTransactionStatus = async (id, status, userId) => {
  const transaction = await Transaction.findById(id);
  
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  
  // Verify user is either buyer or seller
  if (transaction.buyer.toString() !== userId.toString() && 
      transaction.seller.toString() !== userId.toString()) {
    throw new Error('Not authorized to update this transaction');
  }
  
  transaction.status = status;
  await transaction.save();
  
  return transaction;
};

module.exports = {
  createTransaction,
  getUserPurchases,
  getUserSales,
  updateTransactionStatus
};
