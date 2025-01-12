const mongoose = require('mongoose');

const adminServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,  // in hours
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    priceType: {
        type: String,
        enum: ['fixed', 'hourly'],
        default: 'fixed'
    },
    category: {
        type: String,
        required: true,
        enum: ['regular', 'deep', 'end_of_lease', 'spring', 'commercial', 'other']
    },
    extras: [{
        name: String,
        price: Number,
        description: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AdminService', adminServiceSchema); 