const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quoteId: {
    type: String,
    required: true,
    unique: true,
    default: () => `Q${Date.now()}${Math.floor(Math.random() * 1000)}`
  },
  serviceType: String,
  cleaningType: String,
  frequency: String,
  propertyType: String,
  bedrooms: String,
  bathrooms: String,
  rateType: String,
  preferredDate: String,
  preferredTime: String,
  parkingAvailable: String,
  access: String,
  customer: {
    name: String,
    companyName: String,
    email: String,
    phone: String,
  },
  address: {
    street: String,
    suburb: String,
    state: String,
    postCode: String
  },
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quote', quoteSchema); 