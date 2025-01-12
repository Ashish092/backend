const Staff = require('../models/Staff');

// Get all staff members
const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find().sort({ createdAt: -1 });
        res.json({ success: true, data: staffs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get single staff member
const getStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ success: false, error: 'Staff not found' });
        }
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create new staff member
const createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json({ success: true, data: staff });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update staff member
const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!staff) {
            return res.status(404).json({ success: false, error: 'Staff not found' });
        }
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete staff member
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).json({ success: false, error: 'Staff not found' });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
}; 