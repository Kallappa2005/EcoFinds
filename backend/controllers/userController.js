const asyncHandler = require('../middleware/asyncHandler');
const userService = require('../services/userService');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
    location: req.body.location,
    phone: req.body.phone
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await userService.updateUser(req.user.id, fieldsToUpdate);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get user eco stats
// @route   GET /api/v1/users/eco-stats
// @access  Private
exports.getEcoStats = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json({
    success: true,
    data: user.ecoStats
  });
});
