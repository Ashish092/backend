const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const AdminService = require('../models/AdminService');

// Get all admin services
router.get('/', protect, admin, async (req, res) => {
    try {
        const services = await AdminService.find().sort({ category: 1, name: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new admin service
router.post('/', protect, admin, async (req, res) => {
    try {
        const service = new AdminService(req.body);
        await service.save();
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Get single admin service
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const service = await AdminService.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update admin service
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const service = await AdminService.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete admin service
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const service = await AdminService.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router; 