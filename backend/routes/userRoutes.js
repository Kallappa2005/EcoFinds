const express = require('express');
const { 
  getProfile, 
  updateProfile,
  getEcoStats
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.get('/eco-stats', getEcoStats);

module.exports = router;
