const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNo: {
        type: String,
        unique: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: String,
            suburb: { type: String, required: true },
            state: { type: String, required: true },
            postcode: { type: String, required: true }
        }
    },
    service: {
        description: { type: String, required: true },
        hours: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
        extras: [{
            name: String,
            amount: Number
        }]
    },
    subtotal: { type: Number, required: true },
    gst: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['draft', 'sent', 'paid', 'overdue'],
        default: 'draft'
    },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    paidAt: Date
});

// Generate invoice number before saving
invoiceSchema.pre('save', async function(next) {
    try {
        if (!this.invoiceNo) {
            const count = await this.constructor.countDocuments();
            this.invoiceNo = `INV${String(count + 1).padStart(5, '0')}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema); 