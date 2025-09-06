const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate token and set cookie response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

// Register user
const register = async (userData) => {
  const user = await User.create(userData);
  return user;
};

// Login user
const login = async (email, password) => {
  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

module.exports = {
  sendTokenResponse,
  register,
  login
};
