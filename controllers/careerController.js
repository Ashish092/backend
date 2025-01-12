const Career = require('../models/Career');

// Get all active careers
const getCareers = async (req, res) => {
    try {
        const careers = await Career.find({ isActive: true })
            .sort({ createdAt: -1 });
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all careers (including inactive) for admin
const getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find({})
            .sort({ createdAt: -1 });
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new career
const createCareer = async (req, res) => {
    try {
        const career = await Career.create(req.body);
        res.status(201).json(career);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update career
const updateCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(career);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete career
const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json({ message: 'Career deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCareers,
    getAllCareers,
    createCareer,
    updateCareer,
    deleteCareer
}; 