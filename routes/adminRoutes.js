const express = require('express');
const router = express.Router();
const { login, getStats, verifyAdmin } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/stats', protect, getStats);
router.get('/verify', protect, admin, verifyAdmin);

module.exports = router; 