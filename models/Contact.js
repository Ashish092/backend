const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postcode: String,
        country: { type: String, default: 'Australia' }
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'
    },
    source: {
        type: String,
        enum: ['website', 'referral', 'social_media', 'other'],
        default: 'website'
    },
    notes: String,
    tags: [String],
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    lastActivity: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ firstName: 1, lastName: 1 });
contactSchema.index({ phone: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ tags: 1 });

module.exports = mongoose.model('Contact', contactSchema); 