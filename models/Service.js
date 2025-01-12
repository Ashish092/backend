const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/images/default-service.jpg'
    },
    price: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    features: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    longDescription: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    // Disable automatic index creation
    autoIndex: false
});

// Explicitly define only the index we want
serviceSchema.index({ id: 1 }, { unique: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 