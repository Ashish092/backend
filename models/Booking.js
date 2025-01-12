const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingNo: {
        type: String,
        unique: true,
    },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    address: {
        street: String,
        suburb: { type: String, required: true },
        state: { type: String, required: true },
        postcode: { type: String, required: true }
    },
    schedule: {
        date: { type: Date, required: true },
        time: { type: String, required: true }
    },
    service: {
        type: { type: String, required: true },
        hours: { type: Number, required: true },
        amount: { type: Number, required: true },
        extras: [String]
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    tags: [String],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate booking number before saving
bookingSchema.pre('save', async function(next) {
    try {
        if (!this.bookingNo) {
            const count = await this.constructor.countDocuments();
            this.bookingNo = `BK${String(count + 1).padStart(4, '0')}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 