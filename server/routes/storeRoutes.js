const express = require('express');
const router = express.Router();
const { createStore, getAllStores, getStoreRatings,getDashboard } = require('../controllers/storeController');
const { verifyToken, isAdmin, isStoreOwner } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, createStore); // Admin only
router.get('/', verifyToken, getAllStores);
router.get('/ratings', verifyToken, isStoreOwner, getStoreRatings);
router.get('/dashboard', verifyToken, isStoreOwner, getDashboard);
module.exports =router;