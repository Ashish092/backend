const Faq = require('../models/Faq');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find({ isActive: true }).sort('order');
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private/Admin
const createFaq = async (req, res) => {
    try {
        const faq = await Faq.create(req.body);
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getFaqs,
    createFaq,
    updateFaq,
    deleteFaq
}; 