const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        console.log('Connection state:', mongoose.connection.readyState);
        console.log('Database name:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    })
    .finally(() => {
        mongoose.connection.close();
    }); 