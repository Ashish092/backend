const mongoose = require('mongoose');

const manualBookingSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  address: {
    street: String,
    suburb: String,
    city: String,
    state: String,
    postcode: String
  },
  schedule: {
    date: {
      type: Date,
      default: Date.now
    },
    startTime: {
      type: String,
      default: '09:00'
    },
    bufferMinutes: {
      type: Number,
      default: 15
    },
    endTime: {
      type: String,
      default: '09:15'
    }
  },
  services: [{
    serviceId: String,
    name: String,
    hours: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    },
    extras: [{
      name: String,
      price: Number
    }],
    isCustom: {
      type: Boolean,
      default: false
    }
  }],
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  tags: [String],
  isFlexibleTime: {
    type: Boolean,
    default: false
  },
  isFlexibleDate: {
    type: Boolean,
    default: false
  },
  alternativeDates: [{
    date: Date,
    startTime: String,
    bufferMinutes: Number,
    endTime: String
  }],
  alternativeTimes: [{
    startTime: String,
    bufferMinutes: Number,
    endTime: String
  }],
  propertyDetails: {
    pets: {
      present: {
        type: Boolean,
        default: false
      },
      details: String
    },
    equipment: {
      clientProvided: {
        type: Boolean,
        default: false
      },
      companyProvided: {
        type: Boolean,
        default: true
      },
      details: String
    },
    parking: {
      type: {
        type: String,
        enum: ['onsite', 'street', 'none', ''],
        default: ''
      },
      instructions: String
    }
  },
  frequency: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    times: {
      type: Number,
      default: 1
    },
    period: {
      type: String,
      enum: ['weekly', 'fortnightly', '3weekly', 'monthly', ''],
      default: ''
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['bank', 'cash', 'card', ''],
      default: ''
    },
    timing: {
      type: String,
      enum: ['onDay', 'now', 'partial'],
      default: 'onDay'
    },
    partialAmount: Number,
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
manualBookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('ManualBooking', manualBookingSchema); 