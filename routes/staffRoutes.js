const express = require('express');
const router = express.Router();
const { 
    getStaffs, 
    getStaff, 
    createStaff, 
    updateStaff, 
    deleteStaff 
} = require('../controllers/staffController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(protect, admin);

router.route('/')
    .get(getStaffs)
    .post(createStaff);

router.route('/:id')
    .get(getStaff)
    .put(updateStaff)
    .delete(deleteStaff);

module.exports = router; 