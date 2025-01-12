const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please add a question']
    },
    answer: {
        type: String,
        required: [true, 'Please add an answer']
    },
    category: {
        type: String,
        enum: ['Services', 'Booking', 'Products', 'Safety', 'Pricing'],
        default: 'Services'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Faq', faqSchema); 