const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        // Add debug logging
        console.log('Attempting to connect to MongoDB...');
        console.log('Database Name:', config.mongodbUri.split('/').pop().split('?')[0]);
        
        const conn = await mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increased timeout
            socketTimeoutMS: 45000, // Add socket timeout
            retryWrites: true,
            w: 'majority',
            // Add these options for Vercel deployment
            maxPoolSize: 10,
            minPoolSize: 5
        });

        console.log('\n🌿 MongoDB Connection:');
        console.log(`✅ Database Connected: ${conn.connection.host}`);
        console.log(`📁 Database Name: ${conn.connection.name}`);
        console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);

        return conn;

    } catch (error) {
        console.error('\n❌ MongoDB Connection Error:');
        console.error(`🔴 Error Type: ${error.name}`);
        console.error(`🔴 Error Message: ${error.message}`);
        console.error(`🔴 Error Code: ${error.code || 'N/A'}`);
        
        // Additional debugging info
        if (error.name === 'MongoServerSelectionError') {
            console.error('Failed to connect to MongoDB server. Possible causes:');
            console.error('1. Network connectivity issues');
            console.error('2. MongoDB Atlas IP whitelist restrictions');
            console.error('3. Invalid connection string');
        }

        // Retry logic for production
        if (process.env.NODE_ENV === 'production') {
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectDB, 5000);
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB; 