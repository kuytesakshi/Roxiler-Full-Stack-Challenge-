const {User,Rating,Store} = require('../models');
const { hashPassword } = require('../middleware/authMiddleware');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching users', error: err.message });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let averageRating = null;

  if (user.role === 'store_owner') {
  const store = await Store.findOne({ where: { userId } });

  if (!store) {
    console.warn(`No store found for userId ${userId}`);
    return res.status(404).json({ msg: 'Store not found for this user' });  // Early exit
  }

  console.log('Store found:', store);  // Log store details for debugging
  
  const ratings = await Rating.findAll({ where: { storeId: store.id } });
  console.log(`Ratings for storeId ${store.id}:`, ratings);

if (ratings.length === 0) {
  console.warn(`No ratings found for storeId ${store.id}`);
}
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  averageRating = ratings.length ? (total / ratings.length).toFixed(2) : "No ratings yet";
}

    // Include averageRating in response only if user is a store owner
    const userDetails = user.toJSON();
    if (user.role === 'store_owner') {
      userDetails.averageRating = averageRating;
}

    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user details', error: err.message });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    const hashed = await hashPassword(newPassword);
    user.password = hashed;
    await user.save();
    res.json({ msg: 'Password updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating password', error: err.message });
  }
};
