const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { User, Store, Rating } = require('../models');
const adminController = require('../controllers/adminController');
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    const stats = {
      totalUsers,
      totalStores,
      totalRatings
    };

    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    res.status(500).json({ message: 'Failed to load admin statistics' });
  }
});
router.post('/add-user', verifyToken, isAdmin, adminController.addUser);

module.exports = router;
