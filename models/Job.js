const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  bookingNo: {
    type: String,
    required: true,
    unique: true,
    default: () => `BK${Date.now()}${Math.floor(Math.random() * 1000)}`
  },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  service: {
    id: String,
    title: String,
    price: Number,
    duration: Number
  },
  suburb: {
    name: String,
    postcode: String
  },
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  schedule: {
    date: Date,
    time: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add this pre-save middleware to ensure bookingNo is always set
jobSchema.pre('save', function(next) {
  if (!this.bookingNo) {
    this.bookingNo = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Job', jobSchema); 