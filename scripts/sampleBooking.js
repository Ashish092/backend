const sampleBooking = {
  customer: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "0412345678"
  },
  address: {
    street: "123 Main Street",
    suburb: "Richmond",
    city: "Melbourne",
    state: "VIC",
    postcode: "3121"
  },
  schedule: {
    date: new Date("2024-03-20"),
    startTime: "09:00",
    bufferMinutes: 15,
    endTime: "09:15"
  },
  services: [
    {
      serviceId: "standard-clean-1",
      name: "Standard House Cleaning",
      hours: 3,
      amount: 120,
      extras: [
        {
          name: "Window Cleaning",
          price: 30
        },
        {
          name: "Oven Cleaning",
          price: 45
        }
      ],
      isCustom: false
    }
  ],
  notes: "Please pay special attention to the kitchen area",
  status: "pending",
  tags: ["new-client", "priority"],
  isFlexibleTime: true,
  isFlexibleDate: false,
  alternativeTimes: [
    {
      startTime: "14:00",
      bufferMinutes: 15,
      endTime: "14:15"
    }
  ],
  propertyDetails: {
    pets: {
      present: true,
      details: "One friendly dog, will be in the backyard"
    },
    equipment: {
      clientProvided: false,
      companyProvided: true,
      details: "Please bring all cleaning supplies"
    },
    parking: {
      type: "onsite",
      instructions: "Park in the driveway"
    }
  },
  frequency: {
    isRecurring: true,
    times: 4,
    period: "fortnightly"
  },
  payment: {
    method: "card",
    timing: "onDay",
    notes: "Preferred payment method is card"
  }
};

// You can use this to create a new booking:
const ManualBooking = require('../models/manualBooking');

async function createSampleBooking() {
  try {
    const booking = new ManualBooking(sampleBooking);
    await booking.save();
    console.log('Sample booking created successfully');
  } catch (error) {
    console.error('Error creating sample booking:', error);
  }
}

// Export for use in other files
module.exports = { sampleBooking, createSampleBooking }; 