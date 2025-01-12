const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', protect, admin, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ 'schedule.date': -1 });
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new booking
router.post('/', protect, admin, async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Get single booking
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update booking
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete booking
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router; 