const express = require('express');
const router = express.Router();
const { getAllManualBookings, createManualBooking, updateManualBooking, getManualBooking, deleteManualBooking } = require('../controllers/manualBookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllManualBookings);
router.post('/', protect, createManualBooking);
router.put('/:id', protect, updateManualBooking);
router.get('/:id', protect, getManualBooking);
router.delete('/:id', protect, deleteManualBooking);

module.exports = router; 