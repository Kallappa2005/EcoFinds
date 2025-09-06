const User = require('../models/userModel');

// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Update user profile
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

// Update eco stats
const updateEcoStats = async (userId, newStats) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Update each eco stat field
  Object.keys(newStats).forEach(key => {
    if (user.ecoStats[key] !== undefined) {
      user.ecoStats[key] += newStats[key];
    }
  });

  await user.save();
  return user;
};

module.exports = {
  getUserById,
  updateUser,
  updateEcoStats
};
