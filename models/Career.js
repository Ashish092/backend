const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Please add employment type'],
        enum: ['Full-time', 'Part-time', 'Contract', 'Casual'],
        default: 'Full-time'
    },
    description: {
        type: String,
        required: [true, 'Please add a job description']
    },
    requirements: [{
        type: String,
        required: [true, 'Please add at least one requirement']
    }],
    responsibilities: [{
        type: String,
        required: [true, 'Please add at least one responsibility']
    }],
    benefits: [{
        type: String
    }],
    salary: {
        type: String,
        required: [true, 'Please add salary information']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Career', careerSchema); 