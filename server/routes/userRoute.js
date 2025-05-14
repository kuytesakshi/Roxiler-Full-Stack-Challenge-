const express = require('express');
const router = express.Router();
const { getAllUsers, updatePassword,getUserDetails } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAllUsers);
router.put('/password', verifyToken, updatePassword);
router.get('/details/:id', verifyToken,getUserDetails )
module.exports = router;
