const express = require('express');
const router = express.Router();
const { submitRating ,getUserRatings} = require('../controllers/ratingController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, submitRating);
router.get('/user-ratings', verifyToken, getUserRatings);
module.exports = router;
