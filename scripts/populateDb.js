const mongoose = require('mongoose');
const { createSampleBooking } = require('./sampleBooking');
require('dotenv').config();

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await createSampleBooking();
    
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  populateDatabase();
} 